import {toast} from "react-toastify";
import api from "./index";

export const getUserByEmail = async (email: string, jwt: string) => {
  const { data } = await api(jwt).get(`users?filters[email][$eq]=${email}`);
  return data[0];
};

export const getUserRecipes = async (userId: number, jwt: string) => {
  const { data } = await api(jwt).get(
    `client-recipes?pagination[pageSize]=200&filters\\[users\\][id][$eq]=${userId}`
  );
  return data.data;
};

export const changePassword = async ({
  currentPassword,
  password,
  passwordConfirmation,
  jwt,
}: {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
  jwt: string;
}) => {
  try {
    return await api(jwt).post("auth/change-password", {
      currentPassword,
      password,
      passwordConfirmation,
    });
  } catch (error: any) {
    throw new Error("Changing password error", error);
  }
};

export const updatePersonalInformation = async (
  gender: string,
  age: string,
  weight: string,
  height: string,
  activity: string,
  metabolicRate: number,
  city: string,
  street: string,
  zipCode: string,
  phoneNumber: string,
  userId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(`users/${userId}`, {
      gender,
      weight,
      height,
      age,
      activity,
      metabolicRate,
      city,
      street,
      zipCode,
      phoneNumber,
    });
    toast.success("Dados atualizados");
    return data;
  } catch (error) {
    toast.error("Erro ao atualizar os dados");
  }
};
