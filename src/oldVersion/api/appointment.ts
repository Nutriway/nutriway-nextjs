import api from "./index";
import { toast } from "react-toastify";
import { getNutritionistAvailabilityId } from "./nutritionistAvailability";
import { AvailabilityType } from "../pages/client/ClientScheduleAppointment";
import dayjs from "dayjs";
import { AppointmentType } from "../pages/nutritionist/NutritionistAppointments";
import { UserType } from "../providers/useAuth";

export type CreateAppointmentType = {
  nutritionist: { id: number };
  client: { id: number };
  date: string;
  medicalCondition: string;
  jwt: string;
  goal: string;
};

export type CreateAppointmentByClientType = {
  userId: number;
  availability: AvailabilityType;
  medicalCondition?: string;
  jwt: string;
};

export const createAppointmentByNutritionist = async ({
  nutritionist,
  client,
  date,
  medicalCondition,
  jwt,
  goal,
}: CreateAppointmentType) => {
  try {
    const existingClientAppointments = await getClientAppointmentsByDate(
      client.id,
      date,
      jwt
    );

    if (existingClientAppointments.length > 0) {
      toast.error(
        "O cliente já possui uma consulta agendada para este horário"
      );
    } else {
      const id = await getNutritionistAvailabilityId(nutritionist, date, jwt);
      const existingNutritionistAppointment =
        await getAppointmentByAvailabilityId(id, jwt);

      if (existingNutritionistAppointment?.length > 0) {
        toast.error("Já possui uma consulta agendada para este horário");
      } else {
        const { data } = await api(jwt).post("appointments", {
          data: {
            nutritionist,
            client,
            meeting_url: `https://meet.jit.si/${client!.id}${date
              .replaceAll("-", "")
              .replaceAll(":", "")}`,
            date: date,
            medical_condition: medicalCondition,
            nutritionist_availability: { id: id },
            goal,
          },
        });
        toast.success("Consulta agendada");
        return data;
      }
    }
  } catch (error) {
    toast.error("Erro ao agendar consulta");
  }
};

export const createTentativeAppointment = async (
  medical_condition: string,
  date: string,
  clientId: number,
  jwt: string
) => {
  try {
    const tentativeAppointment = await api(jwt).post(
      "appointment/createTentativeAppointment",
      {
        medical_condition: "",
        meeting_url: `https://meet.jit.si/${clientId}${date
          .replaceAll("-", "")
          .replaceAll(":", "")}`,
        date,
      }
    );

    toast.success("Pedido para consulta submetido!");
    return tentativeAppointment.data;
  } catch (error) {
    toast.error("Pedido de consulta falhou, tente mais tarde");
  }
};

const getClientAppointmentsByDate = async (
  clientId: number,
  date: string,
  jwt: string
) => {
  let url = `appointments?populate=*&pagination[pageSize]=100&filters[client][id][$eq]=${clientId}&filters[nutritionist_availability][date][$eq]=${date}`;
  const { data } = await api(jwt).get(url);
  return data.data;
};

export const getClientTentativeAppointmentsByDate = async (
  clientId: number,
  jwt: string
) => {
  try {
    let url = `appointments?populate=*&pagination[pageSize]=100&filters[client][id][$eq]=${clientId}&filters[nutritionist_availability][id][$null]=true&filters[date][$notNull]=true`;
    const { data } = await api(jwt).get(url);
    return data.data;
  } catch (error) {
    toast.error("Erro ao carregar consultas com nutricionista por encontrar");
  }
};

export const createAppointmentByClient = async ({
  userId,
  availability,
  medicalCondition,
  jwt,
}: CreateAppointmentByClientType) => {
  try {
    const existingClientAppointments = await getClientAppointmentsByDate(
      userId,
      availability.attributes.date,
      jwt
    );

    if (existingClientAppointments.length > 0) {
      toast.error("Já possui uma consulta agendada para este horário");
    } else {
      const { data } = await api(jwt).post("appointments", {
        data: {
          goal: "",
          nutritionist: availability.attributes.nutritionist.data.id,
          client: userId,
          medical_condition: medicalCondition,
          nutritionist_availability: { id: availability.id },
          date: availability.attributes.date,
          meeting_url: `https://meet.jit.si/${userId}${availability.attributes.date
            .replaceAll("-", "")
            .replaceAll(":", "")}`,
        },
      });
      return data;
    }
  } catch (error) {
    toast.error("Erro ao agendar consulta");
  }
};

export const getAppointmentById = async (id: string, jwt: string) => {
  try {
    const { data } = await api(jwt).get(
      `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${id}`
    );
    return data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getClientAppointmentsWithPlan = async (
  clientId: number,
  jwt: string
) => {
  let url = `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=100&filters[client][id][$eq]=${clientId}&filters[appointment_result][nutritionist_diet_plan][plan][$null]`;
  const { data } = await api(jwt).get(url);

  return data;
};

export const getAppointmentByAvailabilityId = async (
  availabilityId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `appointments?populate=*&pagination[pageSize]=2000&filters[nutritionist_availability][id][$eq]=${availabilityId}`
    );
    return data.data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getAppointmentsWithAvailability = async (
  availabilities: any,
  jwt: string
) => {
  let url = `appointments?populate=*&pagination[pageSize]=100&filters[appointment_payment][status][$eq]=completed&filters[appointment_result][id][$notNull]`;

  availabilities.forEach(async (e: any) => {
    url += `&filters[nutritionist_availability][id][$eq]=${e.id}`;
  });

  const { data } = await api(jwt).get(url);

  let appointmentsWithAvailability: Array<any> = [];

  data.data.forEach((ap: any) => {
    availabilities.forEach((av: any) => {
      if (ap.attributes.nutritionist_availability.data.id === av.id) {
        appointmentsWithAvailability.push({
          appointment: ap,
          date: av.attributes.date.substring(0, 16),
        });
      }
    });
  });

  return appointmentsWithAvailability;
};

export const getAllAppointments = async (jwt: string) => {
  let url = `appointments?populate=*&pagination[pageSize]=100`;
  const { data } = await api(jwt).get(url);

  return data.data;
};

export const getNutritionistAppointments = async (
  nutritionistId: number,
  jwt: string
) => {
  let url = `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=100&filters[nutritionist_availability][nutritionist][id][$eq]=${nutritionistId}&filters[appointment_payment][status][$eq]=completed&filters[appointment_result][id][$notNull]`;
  const { data } = await api(jwt).get(url);

  return data.data;
};

export const getNutritionistAppointmentsHistory = async (
  nutritionistId: number,
  jwt: string
) => {
  let url = `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=100&filters[nutritionist_availability][nutritionist][id][$eq]=${nutritionistId}&filters[appointment_payment][status][$eq]=completed&filters[appointment_result][notes][$null]`;
  const { data } = await api(jwt).get(url);

  return data.data;
};

export const getClientAppointments = async (clientId: number, jwt: string) => {
  try {
    let url = `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=100&filters[client][id][$eq]=${clientId}&filters[nutritionist_availability][date][$gte]=${dayjs().toISOString()}&filters[appointment_result][notes][$notNull]`;
    const { data } = await api(jwt).get(url);

    return data.data;
  } catch (error) {
    toast.error("Erro ao carregar consultas");
  }
};

export const getClientAppointmentsHistory = async (
  clientId: number,
  jwt: string
) => {
  let url = `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=100&filters[client][id][$eq]=${clientId}&filters[appointment_result][notes][$null]`;
  const { data } = await api(jwt).get(url);

  return data.data;
};

export const getClientPaidAppointments = async (
  clientId: number,
  jwt: string
) => {
  let url = `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=100&filters[client][id][$eq]=${clientId}&filters[nutritionist_availability][date][$gte]=${dayjs().toISOString()}&filters[appointment_payment][status][$eq]=completed&filters[appointment_result][notes][$notNull]`;
  const { data } = await api(jwt).get(url);

  return data.data;
};

export const updateMeetingUrl = async (
  meeting_url: string,
  appointmentId: number,
  jwt: string
) => {
  try {
    await api(jwt).put(`appointments/${appointmentId}`, {
      data: {
        meeting_url: meeting_url,
      },
    });
    toast.success("Meeting url updated");
  } catch (error) {
    toast.error("Error on Meeting url update");
  }
};

export const updateMedicalCondition = async (
  medicalCondition: string,
  appointmentId: number,
  jwt: string
) => {
  try {
    await api(jwt).put(`appointments/${appointmentId}`, {
      data: {
        medical_condition: medicalCondition,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointmentGoal = async (
  goal: string,
  appointmentId: number,
  jwt: string
) => {
  try {
    await api(jwt).put(`appointments/${appointmentId}`, {
      data: {
        goal,
      },
    });
  } catch (error) {}
};

export const updateAppointmentByNutritionist = async (
  date: string,
  appointment: AppointmentType,
  user: UserType
) => {
  try {
    const existingClientAppointments = await getClientAppointmentsByDate(
      appointment.attributes.client.data.id,
      date,
      user.jwt
    );

    if (existingClientAppointments.length > 0) {
      toast.error(
        "O cliente já possui uma consulta agendada para este horário"
      );
    } else {
      const id = await getNutritionistAvailabilityId(
        appointment.attributes.nutritionist_availability.data.attributes
          .nutritionist,
        date,
        user.jwt
      );
      const existingNutritionistAppointment =
        await getAppointmentByAvailabilityId(id, user.jwt);

      if (existingNutritionistAppointment?.length > 0) {
        toast.error("Já possui uma consulta agendada para este horário");
      } else {
        await api(user.jwt).put(`appointments/${appointment.id}`, {
          data: {
            nutritionist_availability: {
              id: id,
            },
          },
        });
        toast.success("Consulta agendada");
      }
    }
  } catch (error) {
    toast.error("Erro ao agendar consulta");
  }
};

export const updateAppointmentMedicalConditionByAppointmentId = async (
  medicalCondition: string,
  appointmentId: number | undefined,
  jwt: string
) => {
  try {
    if (!appointmentId) {
      return;
    }
    await api(jwt).put(`appointments/${appointmentId}`, {
      data: {
        medical_condition: medicalCondition,
      },
    });
    toast.success("Condição médica atualizada");
  } catch (error) {
    toast.error("Condição médica não atualizada");
  }
};

export const updateAppointmentByClient = async (
  date: string,
  appointment: AppointmentType,
  jwt: string
) => {
  try {
    const existingClientAppointments = await getClientAppointmentsByDate(
      appointment.attributes.client.data.id,
      date,
      jwt
    );

    if (existingClientAppointments.length > 0) {
      toast.error("Já possui uma consulta agendada para este horário");
    } else {
      const id = await getNutritionistAvailabilityId(
        appointment.attributes.nutritionist_availability.data.attributes
          .nutritionist,
        date,
        jwt
      );

      const existingNutritionistAppointment =
        await getAppointmentByAvailabilityId(id, jwt);

      if (existingNutritionistAppointment?.length > 0) {
        toast.error(
          "O nutricionista já possui uma consulta agendada para este horário"
        );
      } else {
        await api(jwt).put(`appointments/${appointment.id}`, {
          data: {
            nutritionist_availability: { id: id },
          },
        });
        toast.success("Consulta agendada");
      }
    }
  } catch (error) {
    toast.error("Erro ao agendar consulta");
  }
};

export const deleteAppointment = async (appointmentId: number, jwt: string) => {
  try {
    await api(jwt).delete(`appointments/${appointmentId}`);
    toast.info("Consulta Cancelada");
  } catch (error) {
    toast.error("Não foi possível cancelar a consulta");
  }
};

export const createAppointmentResult = async (
  appointmentId: number,
  dietPlanId: number,
  jwt: string
) => {
  try {
    await api(jwt).post("appointment-results", {
      data: {
        nutritionist_diet_plan: { id: dietPlanId },
        appointment: { id: appointmentId },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointmentResult = async (
  appointmentId: number,
  newNutrients: any,
  jwt: string
) => {
  const appointmentResultId = await getAppointmentResultByAppointmentId(
    appointmentId,
    jwt
  );

  try {
    await api(jwt).put(`appointment-results/${appointmentResultId.id}`, {
      data: {
        nutrients: newNutrients,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointmentResultDietPlan = async (
  appointmentResultId: number,
  dietPlanId: any,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(
      `appointment-results/${appointmentResultId}`,
      {
        data: {
          nutritionist_diet_plan: { id: dietPlanId },
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const finishAppointment = async (
  notes: string,

  appointmentId: number,
  jwt: string
) => {
  const appointmentResultId = await getAppointmentResultByAppointmentId(
    appointmentId,
    jwt
  );

  try {
    await api(jwt).put(`appointment-results/${appointmentResultId.id}`, {
      data: {
        notes,
      },
    });
    toast.success("Consulta terminada");
  } catch (error) {
    toast.error("Erro ao terminar consulta");

    console.log(error);
  }
};

export const updateAppointmentPlanType = async (
  planType: string,
  planDurationDays: string,
  appointmentId: number,
  jwt: string
) => {
  const appointmentResultId = await getAppointmentResultByAppointmentId(
    appointmentId,
    jwt
  );

  try {
    await api(jwt).put(`appointment-results/${appointmentResultId.id}`, {
      data: {
        planType,
        planDurationDays,
      },
    });
    toast.success("Plano submetido");
  } catch (error) {
    toast.error("Erro ao submeter plano");
    console.log(error);
  }
};

export const handleAppointmentResult = async (
  appointmentId: number,
  newNutrients: any,
  jwt: string
) => {
  try {
    const existingNutritionistAppointmentResult =
      await getAppointmentResultByAppointmentId(appointmentId, jwt);

    if (existingNutritionistAppointmentResult) {
      await updateAppointmentResult(appointmentId, newNutrients, jwt);
    } else {
      await createAppointmentResult(appointmentId, newNutrients, jwt);
    }
  } catch (error) {
    toast.error("Erro");
  }
};

export const getAppointmentResults = async (jwt: string) => {
  try {
    const { data } = await api(jwt).get(
      `appointment-results?populate=*&pagination[pageSize]=10000`
    );
    return data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getAppointmentResultByAppointmentId = async (
  appointmentId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `appointment-results?filters[appointment][id][$eq]=${appointmentId}`
    );
    return data.data[0];
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getAppointmentByAppointmentResultId = async (
  appointmentResultId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[appointment_result][id][$eq]=${appointmentResultId}`
    );
    return data.data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getAppointmentPrice = async (jwt: string) => {
  /*  const { data } = await api(jwt).get(
    `appointment-payment/getIsFirstAppointment`
  ); */

  return "15€"; // data ? "15€" : "30€";
};

export const getAppointmentsRequest = async (jwt: string) => {
  try {
    const { data } = await api(jwt).get(
      "appointments?filters[nutritionist_availability]&populate[client]=*"
    );

    return data;
  } catch (error) {
    toast.error("Erro ao carregar consultas");
  }
};

export const createAppointmentAvailability = async (
  appointment: AppointmentType,
  jwt: string
) => {
  try {
    await api(jwt).post(
      "appointment/createAppointmentAvailabilityByNutritionist",
      {
        appointment,
      }
    );
    toast.success("Consulta aceite");
  } catch (error) {
    toast.error("Ocorreu um erro");
  }
};

export const nutritionistEntersOnAppointment = async (
  appointment: AppointmentType,
  jwt: string
) => {
  try {
    await api(jwt).post("appointment/nutritionistOnAppointmentEmail", {
      appointment,
    });
  } catch (error) {}
};
