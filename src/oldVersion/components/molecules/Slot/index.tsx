import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Step,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styles } from "./styles";
import ChooseNutritionistStep from "../ChooseNutritionistStep";
import PaymentStep from "../PaymentStep";
import {
  AvailabilityType,
  SlotType,
} from "../../../pages/client/ClientScheduleAppointment";
import MedicalStep from "../MedicalStep";
import { useAuth } from "../../../providers/useAuth";
import {
  createAppointmentByClient,
  CreateAppointmentByClientType,
  createTentativeAppointment,
  deleteAppointment,
  updateAppointmentGoal,
  updateAppointmentMedicalConditionByAppointmentId,
} from "../../../api/appointment";
import dayjs, { Dayjs } from "dayjs";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import CustomStepLabel from "../../atoms/CustomStepLabel";
import { PersonalInformationFormType } from "../../organisms/PersonalInformationForm";
import { updatePersonalInformation } from "../../../api/user";
import PrimaryButton from "../../atoms/PrimaryButton";
import CancelButton from "../../atoms/CancelButton";

type SlotProps = {
  slot: SlotType;
  fetchCalendarAvailabilities: () => Promise<void>;
  appointmentPrice: string;
};

const Slot = ({
  slot,
  fetchCalendarAvailabilities,
  appointmentPrice,
}: SlotProps) => {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [openTentative, setOpenTentative] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedAvailability, setSelectedAvailability] =
    useState<AvailabilityType>();
  const [appointment, setAppointment] = useState<AppointmentType>();
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [appointmentGoal, setAppointmentGoal] = useState("");

  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformationFormType>({
      gender: "",
      weight: "",
      height: "",
      age: "",
      activity: "",
      city: "",
      street: "",
      zipCode: "",
      phoneNumber: "",
    });

  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  let parsedSlotDate = new Date(slot.date as string).toLocaleDateString(
    "pt-pt",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  parsedSlotDate =
    parsedSlotDate[0].toUpperCase() +
    parsedSlotDate.slice(1, parsedSlotDate.length);

  const handleOpen = () => {
    setOpen(slot.available);
    setOpenTentative(!slot.available && !slot.tentative);
  };
  const handleClose = (_: object, reason: string) => {
    if (
      reason === "backdropClick" &&
      (activeStep === 2 || (activeStep === 1 && paymentMethod))
    ) {
      return;
    }
    setOpen(false);
    setActiveStep(0);
    setPaymentMethod(undefined);
  };

  const handleSendEmail = async (accept: boolean) => {
    accept &&
      (await createTentativeAppointment(
        "",
        dayjs(slot.date).format("YYYY-MM-DDTHH:mmZ"),
        user!.id,
        user!.jwt
      ));

    setOpenTentative(false);
    slot.tentative = accept; // update the state of this slot
    await fetchCalendarAvailabilities();
  };

  const nextStep = async () => {
    if (activeStep === 2) {
      await updateUserInformation();
      await fetchCalendarAvailabilities();
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const previousStep = async () => {
    activeStep < 2 && setPaymentMethod(undefined);

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // if we are paying, and we cancel, remove the payment from the database
    if (paymentMethod && appointment) {
      await deleteAppointment(appointment.id, user!.jwt);
    }
  };

  const selectAvailability = (availability: AvailabilityType) => {
    if (availability !== null) {
      setSelectedAvailability(availability);
    }
  };

  /* const selectPaymentMethod = (method: string) => {
    if (method) {
      setSelectedPaymentMethod(method);
    }
  }; */

  const updateMedicalCondition = (condition: string) => {
    if (condition) {
      setMedicalCondition(condition);
    }
  };

  const getActitityRate = (): number => {
    switch (personalInformation.activity) {
      case "low":
        return 1.2;
      case "medium-low":
        return 1.375;
      case "medium":
        return 1.55;
      case "medium-high":
        return 1.725;
      case "high":
        return 1.9;
    }

    return 1;
  };

  const calculateMetabolicRate = () => {
    const activityRate = getActitityRate();

    if (personalInformation.gender === "male") {
      return Math.round(
        activityRate *
          (66 +
            (parseInt(personalInformation.weight) * 13.7 +
              parseInt(personalInformation.height) * 5 -
              parseInt(personalInformation.age) * 6.8))
      );
    }
    return Math.round(
      activityRate *
        (66.5 +
          (parseInt(personalInformation.weight) * 9.6 +
            parseInt(personalInformation.height) * 1.8 -
            parseInt(personalInformation.age) * 4.7))
    );
  };

  const scheduleAppointment = async () => {
    if (selectedAvailability) {
      const appointmentObject: CreateAppointmentByClientType = {
        userId: user!.id,
        availability: selectedAvailability,
        jwt: user!.jwt,
      };

      const ap = await createAppointmentByClient(appointmentObject);
      if (ap) {
        setAppointment(ap.data);
        return ap.data;
      }
    }
  };

  const updateUserInformation = async () => {
    if (appointment?.id) {
      await updateAppointmentMedicalConditionByAppointmentId(
        medicalCondition,
        appointment?.id,
        user!.jwt
      );

      await updateAppointmentGoal(appointmentGoal, appointment?.id, user!.jwt);
    }

    const metabolicRate = calculateMetabolicRate();

    const response =
      !user!.metabolicRate &&
      (await updatePersonalInformation(
        personalInformation.gender,
        personalInformation.age,
        personalInformation.weight,
        personalInformation.height,
        personalInformation.activity,
        metabolicRate,
        personalInformation.city,
        personalInformation.street,
        personalInformation.zipCode,
        personalInformation.phoneNumber,
        user!.id,
        user!.jwt
      ));

    if (response) {
      setPersonalInformation(response);
      setUser(response);
    }
  };

  return (
    <Box>
      <Typography
        onClick={handleOpen}
        sx={
          slot.available
            ? styles.availableSlot
            : !slot.tentative
            ? styles.unavailableSlot
            : styles.tentativeSlot
        }
      >
        {`${(slot.date as Dayjs).format("HH:00")} - ${(slot.date as Dayjs)
          .add(1, "hour")
          .format("HH:00")}`}
      </Typography>

      <Modal
        open={openTentative}
        onClose={() => {
          setOpenTentative(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown
      >
        <Box
          sx={
            isDesktop
              ? activeStep === 2
                ? styles.personalInformationModal
                : styles.modal
              : activeStep === 2
              ? styles.mobilePersonalInformationModal
              : styles.mobileModal
          }
        >
          {isDesktop ? (
            <>
              <h3 style={{ marginTop: 0 }}>
                Não existem vagas para a hora selecionada.
              </h3>
              <h4>
                Será contactado se algum dos nossos profissionais aceitar o seu
                pedido de marcação.
              </h4>
            </>
          ) : (
            <h5 style={{ marginTop: 0 }}>
              Não existem vagas para a hora selecionada.
              <br />
              Será contactado se algum dos nossos profissionais aceitar o seu
              pedido de marcação.
            </h5>
          )}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <p
              style={{ marginBottom: 20 }}
            >{`Pretende solicitar uma marcação para o horário selecionado?`}</p>
            <p
              style={{ marginBottom: 40, fontWeight: "bold" }}
            >{`(${parsedSlotDate})`}</p>
            <Box
              display="flex"
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <PrimaryButton
                onClick={() => {
                  handleSendEmail(true);
                  setOpenTentative(false);
                }}
                sx={
                  isDesktop
                    ? styles.sendEmailButton
                    : styles.sendEmailButtonMobile
                }
              >
                solicitar
              </PrimaryButton>
              <CancelButton
                onClick={() => {
                  handleSendEmail(false);
                }}
                sx={
                  isDesktop
                    ? styles.cancelEmailButton
                    : styles.cancelEmailButtonMobile
                }
              >
                Cancelar
              </CancelButton>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown
      >
        <Box
          sx={
            isDesktop
              ? activeStep === 2
                ? styles.personalInformationModal
                : styles.modal
              : activeStep === 2
              ? styles.mobilePersonalInformationModal
              : styles.mobileModal
          }
        >
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            <Step>
              <CustomStepLabel>
                {!isDesktop && activeStep !== 0 ? "" : "Nutricionista"}
              </CustomStepLabel>
            </Step>
            <Step>
              <CustomStepLabel>
                {!isDesktop && activeStep !== 1 ? "" : "Pagamento"}
              </CustomStepLabel>
            </Step>
            <Step>
              <CustomStepLabel>
                {!isDesktop && activeStep !== 2 ? "" : "Informações"}
              </CustomStepLabel>
            </Step>
          </Stepper>

          <Box sx={styles.stepContentWrapper}>
            {activeStep === 0 && (
              <ChooseNutritionistStep
                slot={slot}
                setSelectedAvailability={selectAvailability}
              />
            )}
            {activeStep === 1 && (
              <PaymentStep
                onPaymentDone={(isPaid: boolean) => {
                  setIsPaid(isPaid);
                  setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }}
                scheduleAppointment={scheduleAppointment}
                setSelectedPaymentMethod={() => {}}
                price={appointmentPrice}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                availability={selectedAvailability}
                setAppointment={setAppointment}
              />
            )}
            {activeStep === 2 && (
              <MedicalStep
                onChangeMedicalCondition={updateMedicalCondition}
                onChangePersonalInformation={setPersonalInformation}
                isUserMetabolicRated={!!user!.metabolicRate}
                onChangeAppointmentGoal={setAppointmentGoal}
                appointmentGoal={appointmentGoal}
              />
            )}
          </Box>

          <Box sx={activeStep !== 2 ? styles.modalFooter : {}}>
            <Button
              sx={styles.previousStepButton}
              disabled={activeStep === 0 || activeStep === 2}
              onClick={previousStep}
            >
              {paymentMethod ? "Cancelar" : "voltar"}
            </Button>

            <Button
              sx={styles.nextStepButton}
              disabled={
                (activeStep === 1 && !isPaid) ||
                (activeStep === 0 && selectedAvailability === undefined)
              }
              onClick={nextStep}
            >
              avançar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Slot;
