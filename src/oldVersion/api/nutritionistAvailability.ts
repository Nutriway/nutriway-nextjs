import api from "./index";

export const getNutritionistAvailability = async (
  nutritionistId: number,
  jwt: string
) => {
  let today = new Date().toISOString().substring(0, 10);
  try {
    const { data } = await api(jwt).get(
      `nutritionist-availabilities?populate=*&pagination[pageSize]=2000&filters[nutritionist][id][$eq]=${nutritionistId}
      &filters[date][$gte]=${today}`
    );
    return data.data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getAllNutritionistAvailabilities = async (jwt: string) => {
  let today = new Date().toISOString().substring(0, 10);
  try {
    const { data } = await api(jwt).get(
      `nutritionist-availabilities?populate=*&pagination[pageSize]=2000&filters[date][$gte]=${today}`
    );
    return data.data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const getNutritionistAvailabilitiesWithNoAppointment = async (
  jwt: string
) => {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  let tomorrow = today.toISOString().substring(0, 10);

  try {
    const { data } = await api(jwt).get(
      `nutritionist-availabilities?populate=*&pagination[pageSize]=2000&filters[date][$gte]=${tomorrow}&filter[appointment][$null]=true`
    );
    return data.data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const addAppointmentToAvailability = async (
  appointmentId: number,
  availabilityId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(
      `nutritionist-availabilities/${availabilityId}`,
      {
        data: {
          appointment: { id: appointmentId },
        },
      }
    );
    return data;
  } catch (error) {}
};

export const getNutritionistAvailabilityByDate = async (
  nutritionistId: number,
  date: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `nutritionist-availabilities?populate[appointment][populate]=*pagination[pageSize]=2000&filters[nutritionist][id][$eq]=${nutritionistId}
      &filters[date][$eq]=${date}`
    );
    return data.data;
  } catch (error) {
    console.log("error fetch ", error);
  }
};

export const createNutritionistAvailability = async (
  nutritionist: any,
  date: any,
  jwt: string
) => {
  const existingAvailability = await getNutritionistAvailabilityByDate(
    nutritionist.id,
    date,
    jwt
  );
  if (existingAvailability.length === 0) {
    try {
      await api(jwt).post("nutritionist-availabilities", {
        data: {
          nutritionist,
          date,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }
};

export const createAvailabilityIfNotExists = async (
  nutritionist: any,
  date: any,
  jwt: string
) => {
  const existingAvailability = await getNutritionistAvailabilityByDate(
    nutritionist.id,
    date,
    jwt
  );

  if (existingAvailability?.length > 0) {
    return existingAvailability[0]?.id;
  } else {
    try {
      const newAvailability = await api(jwt).post(
        "nutritionist-availabilities",
        {
          data: {
            nutritionist: { id: nutritionist?.data.id },
            date,
          },
        }
      );

      return newAvailability.data.data.id;
    } catch (error) {
      console.log("error", error);
    }
  }
};

export const getNutritionistAvailabilityId = async (
  nutritionist: any,
  date: any,
  jwt: string
) => {
  const id = await createAvailabilityIfNotExists(nutritionist, date, jwt);
  return id;
};

export const deleteOldNutritionistAvailability = async (
  availabilityId: number,
  jwt: string
) => {
  try {
    await api(jwt).delete(`nutritionist-availabilities/${availabilityId}`);
  } catch (error) {
    console.log("Enter error", error);
  }
};

export const deleteAvailability = async (
  date: string,
  nutritionist: any,
  jwt: string
) => {
  const existingAvailability = await getNutritionistAvailabilityByDate(
    nutritionist.id,
    date,
    jwt
  );

  //delete only if no appointment is associated
  try {
    if (existingAvailability[0].attributes.appointment.data === null) {
      await api(jwt).delete(
        `nutritionist-availabilities/${existingAvailability[0].id}`
      );
    }
  } catch (error) {
    console.log("Enter error", error);
  }
};
