import { toast } from "react-toastify";
import api from ".";
import { AvailabilityType } from "../pages/client/ClientScheduleAppointment";
import { createAppointmentByClient } from "./appointment";

export const createPaymentIntent = async (
  jwt: string
): Promise<
  | {
      data: {
        client_secret: string;
        paymentId: string;
        amount: string;
        currency: string;
      };
    }
  | undefined
> => {
  try {
    return await api(jwt).post("appointment-payment/createPaymentIntent");
  } catch (error) {
    toast.error("Erro no pagamento");
  }
};

export const createAppointmentPaymentCompleted = async ({
  userId,
  availability,
  appointmentId,
  paymentId,
  amount,
  currency,
  jwt,
}: {
  userId: number;
  availability?: AvailabilityType;
  appointmentId?: number;
  paymentId: string;
  amount: string;
  currency: string;
  jwt: string;
}) => {
  try {
    let appointment;
    if (availability) {
      appointment = await createAppointmentByClient({
        userId,
        availability,
        medicalCondition: "",
        jwt,
      });
    }
    await api(jwt).post("appointment-payments", {
      data: {
        appointment: appointmentId || appointment.data.id,
        paymentId,
        status: "completed",
        amount: amount.toString(),
        currency,
      },
    });

    await api(jwt).post("appointment-payment/sendAppointmentConfirmationEmail");

    return appointment;
  } catch (error) {
    toast.error("Aconteceu um erro, por favor contacte info@nutriway.");
  }
};
