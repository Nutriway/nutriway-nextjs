import {
  Box,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { styles } from "./styles";
import Countdown, { zeroPad } from "react-countdown";
import {
  createAppointmentPayment,
  getAppointmentPaymentStatus,
} from "../../../api/mbWay";
import { useAuth } from "../../../providers/useAuth";
import { toast } from "react-toastify";
import CustomTextField from "../../atoms/CustomTextField";
import PrimaryButton from "../../atoms/PrimaryButton";
import {
  getFoodDeliveryPaymentStatus,
  updateFoodDelivery,
} from "../../../api/foodDelivery";
import { deleteAppointment } from "../../../api/appointment";
import { OrderType } from "../../../pages/client/ClientOrders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "../CreditCardForm";
import { AvailabilityType } from "../../../pages/client/ClientScheduleAppointment";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import VisaLogoSmall from "../../../assets/images/VisaLogoSmall";
import MastercardLogoSmall from "../../../assets/images/MastercardLogoSmall";
//@ts-ignore
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const MbwayInfo = ({
  scheduleAppointment,
  appointmentId,
  onPaymentDone,
  delivery,
}: any) => {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const [submitted, handleSubmitted] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  const onSubmit = async () => {
    try {
      if (user) {
        let appointment;
        if (scheduleAppointment) {
          appointment = await scheduleAppointment();
        }
        const newAppointmentId = appointment ? appointment.id : appointmentId;
        const order: OrderType = delivery;
        const payment = delivery
          ? await updateFoodDelivery({
              deliveryId: order.id,
              client: user,
              date: order.attributes.delivery_date,
              nif: order.attributes.nif,
              clientPhoneNumber: phoneNumber,
              street: order.attributes.delivery_address,
              zipCode: order.attributes.postalCode,
              jwt: user!.jwt,
            })
          : await createAppointmentPayment(
              newAppointmentId,
              "123 ",
              `+351${phoneNumber}`,
              user.email,
              "appointment payment",
              user!.jwt
            );
        const paymentId = payment?.id || payment?.IdPedido;

        if (paymentId) {
          handleSubmitted(true);
          checkPaymentStatus(paymentId, newAppointmentId);
        }
      }
    } catch {
      toast.warn("Erro no pagamento. Tente novamente.");
    }
  };

  const handleCancelledPayment = async (newAppointmentId: number) => {
    handleSubmitted(false);
    await deleteAppointment(newAppointmentId, user!.jwt);
  };

  const checkPaymentStatus = (paymentId: string, newAppointmentId: number) => {
    const loop = setInterval(async () => {
      const { status } = delivery
        ? await getFoodDeliveryPaymentStatus(paymentId, user!.jwt)
        : await getAppointmentPaymentStatus(paymentId, user!.jwt);
      if (status === "completed") {
        clearInterval(loop);
        toast.success("Pagamento bem sucedido");
        if (onPaymentDone) {
          onPaymentDone(true);
        }
      }

      if (status === "cancelled") {
        await handleCancelledPayment(newAppointmentId);
        clearInterval(loop);
      }
    }, 3000);

    setTimeout(async () => {
      await handleCancelledPayment(newAppointmentId);
      clearInterval(loop);
    }, 300000);
  };

  type CountdownTime = {
    minutes: number;
    seconds: number;
  };

  const CountdownContent = ({ minutes, seconds }: CountdownTime) => (
    <Typography variant="h5" component="h2">
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </Typography>
  );

  const handleCountdownCompletion = () => {
    handleSubmitted(false);
  };

  return (
    <Box sx={styles.mbwayInfoWrapper}>
      <Box>
        {!submitted ? (
          <Box>
            <Typography variant="h6" component="h2">
              MB WAY
            </Typography>
            <Typography sx={{ mt: 3, mb: 2 }}>
              Insira o seu número de telemóvel.
            </Typography>

            <Box sx={isDesktop ? styles.mbwayForm : styles.mbwayMobileForm}>
              <CustomTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+351</InputAdornment>
                  ),
                }}
                id="outlined-basic"
                label="Número de telemóvel"
                value={phoneNumber}
                onChange={handleInputChange}
                variant="outlined"
                type="number"
              />
              <PrimaryButton
                variant="contained"
                sx={isDesktop ? { ml: 2 } : { mt: 2 }}
                onClick={onSubmit}
                disabled={phoneNumber.length !== 9}
              >
                Confirmar
              </PrimaryButton>
            </Box>
          </Box>
        ) : (
          <Box>
            <Countdown
              date={Date.now() + 300000}
              onComplete={handleCountdownCompletion}
              renderer={CountdownContent}
            />
            <Typography sx={{ mt: 1 }}>
              É necessário aprovar o pagamento na App MB WAY. Será cancelado
              dentro de 5 minutos.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

type PaymentStepProps = {
  setSelectedPaymentMethod: (method: string) => void;
  scheduleAppointment?(): any;
  appointmentId?: number | undefined;
  onPaymentDone: (isPaid: boolean) => void;
  delivery?: any;
  price: string | undefined;
  paymentMethod: string | undefined;
  setPaymentMethod: (payment: string) => void;
  availability?: AvailabilityType;
  setAppointment?: (appointment: AppointmentType) => void;
};

const PaymentStep = ({
  setSelectedPaymentMethod,
  onPaymentDone,
  scheduleAppointment,
  appointmentId,
  delivery,
  price,
  paymentMethod,
  setPaymentMethod,
  availability,
  setAppointment,
}: PaymentStepProps) => {
  const handleSelection = (
    e: React.MouseEvent<HTMLElement>,
    method: string
  ) => {
    setPaymentMethod(method);
    setSelectedPaymentMethod(method);
  };

  const renderPaymentMethod = () => {
    if (paymentMethod === "mbway") {
      return (
        <MbwayInfo
          onPaymentDone={onPaymentDone}
          scheduleAppointment={scheduleAppointment}
          appointmentId={appointmentId}
          delivery={delivery}
        />
      );
    }
    if (paymentMethod === "credit") {
      if (!stripePromise) return;
      //This CardForm is not responsive, please verify if it's laptop and change it to a responsive one
      return (
        <Elements stripe={stripePromise}>
          <CardForm
            availability={availability}
            onPaymentDone={onPaymentDone}
            appointmentId={appointmentId}
            setAppointment={setAppointment}
          />
        </Elements>
      );
    }
  };

  return (
    <Box>
      {paymentMethod === undefined ? (
        <Box>
          <Box>
            <Typography variant="h6" component="h2" sx={{ mt: 0, mb: 1 }}>
              Método de pagamento
            </Typography>

            <Typography
              variant="h6"
              fontWeight={"bold"}
              sx={{ mt: 2, textAlign: "center" }}
            >
              {price}
            </Typography>
          </Box>
          <Box sx={styles.paymentMethodsWrapper}>
            <ToggleButtonGroup
              value={paymentMethod}
              exclusive
              onChange={handleSelection}
              aria-label="availability"
            >
              {/* <ToggleButton sx={styles.paymentMethod} value="mbway">
                <MbWayLogo />
              </ToggleButton> */}
              <ToggleButton sx={styles.paymentMethod} value="credit">
                {/* <CreditCardIcon style={{ fontSize: "64px" }} /> */}
                <VisaLogoSmall />
                <MastercardLogoSmall />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      ) : (
        <Box
          style={{
            width: "100%",
            height: "200px",
          }}
        >
          {renderPaymentMethod()}
        </Box>
      )}
    </Box>
  );
};

export default PaymentStep;
