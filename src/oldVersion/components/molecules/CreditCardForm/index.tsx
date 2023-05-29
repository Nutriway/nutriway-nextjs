import React, { FormEvent, useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../../../hooks/useResponsiveFontSize";
import PrimaryButton from "../../atoms/PrimaryButton";
import {
  createAppointmentPaymentCompleted,
  createPaymentIntent,
} from "../../../api/appointmentPayment";
import { useAuth } from "../../../providers/useAuth";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import ClockLoader from "react-spinners/ClockLoader";
import { AvailabilityType } from "../../../pages/client/ClientScheduleAppointment";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      hidePostalCode: true,
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CardForm = ({
  availability,
  onPaymentDone,
  appointmentId,
  setAppointment,
}: {
  availability?: AvailabilityType;
  onPaymentDone: (isPaid: boolean) => void;
  appointmentId?: number;
  setAppointment?: (appointment: AppointmentType) => void;
}) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!user) {
        toast.error("Por favor inicia sessão de novo");
        return;
      }

      if (!availability && !appointmentId) {
        toast.error("Ocorreu um erro, por favor contacte info@nutriway.pt");
        return;
      }

      setLoading(true);
      // We don't want to let default form submission happen here,
      // which would refresh the page.

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const response = await createPaymentIntent(user.jwt);
      const { client_secret, paymentId, amount, currency } = response!.data;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement) || { token: "" },
          billing_details: {
            name: user.username,
            email: user.email,
          },
        },
      });

      if (result.error) {
        // Show error to your customer (for example, insufficient funds)
        setError("Erro ao procesar pagamento");
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          const appointment = await createAppointmentPaymentCompleted({
            userId: user.id,
            jwt: user.jwt,
            paymentId,
            amount,
            currency,
            availability,
            appointmentId,
          });
          if (appointment && setAppointment) {
            setAppointment(appointment.data);
          }
          toast.success("Pagamento efetuado com sucesso");
          onPaymentDone(true);
          //THE LOGIC HERE IT'S NEEDED FOR A SCALABLE APP AND IT'S ON THE SERVER
          //A FUNCTION CALLED paymentIntentListener that tries to listen a webhook (probably wrong, need refactor)
          //CONTINUE SUCCESS LOGIC TO THE NEXT SCREEN
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    } catch (error) {
      setError("Não foi possível concluir o pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <Typography variant="h6" sx={{ mt: 0, mb: 5 }}>
          Detalhes do cartão
        </Typography>
        <Box sx={{ mt: 4, mb: 4 }}>
          <CardElement
            options={options}
            onReady={() => {}}
            onChange={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
          />
        </Box>
      </label>

      {error && <Typography variant={"body1"}>{error.toString()}</Typography>}
      <PrimaryButton
        type="submit"
        disabled={!stripe || loading}
        sx={
          !loading
            ? { float: "right", mt: 3, textAlign: "center" }
            : {
                float: "right",
                mt: 3,
                textAlign: "center",
                padding: "0 34px",
                backgroundColor: "transparent",
              }
        }
      >
        {!loading ? "Pagar" : <ClockLoader size={40} />}
      </PrimaryButton>
    </form>
  );
};

export default CardForm;
