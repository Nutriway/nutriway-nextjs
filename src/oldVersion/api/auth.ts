import axios from "axios";
import { toast } from "react-toastify";
import { UserType } from "../providers/useAuth";

const BASE_URL = process.env.REACT_APP_PROD || "http://localhost:1337/api/";

export const loginRequest = (email: string, password: string) => {
  return axios
    .post(`${BASE_URL}auth/local`, {
      identifier: email,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error("Login error", error);
    });
};

export const registerRequest = (
  email: string,
  password: string,
  name: string,
  type: "client" | "nutritionist" | "consultant"
) => {
  return axios
    .post(`${BASE_URL}auth/local/register`, {
      username: name,
      email: email,
      password: password,
      type: type,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error("Register error", error);
    });
};

//This functions it's to send an email to the user with the code
//and the link that redirect to the page to write the new password
export const forgotPassword = async (email: string) => {
  return await axios
    .post(`${BASE_URL}auth/forgot-password`, {
      email,
    })
    .then((response) => {
      // Handle success.
      toast.success("Email enviado");
      return true;
    })
    .catch((error) => {
      // Handle error.
      toast.error("Ocorreu um erro");
      console.log("An error occurred :", error);
      return false;
    });
};

export const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  return await axios
    .post(`${BASE_URL}auth/reset-password`, {
      code,
      password,
      passwordConfirmation,
    })
    .then(() => {
      toast.success("Password redefinida");
      // Handle success.
      return true;
    })
    .catch((error) => {
      // Handle error.
      toast.error("Erro ao redefinir password");
      console.log("An error occurred:", error.response);
      return false;
    });
};

export const welcomeEmail = async (user: UserType) => {
  try {
    await axios.post(`${BASE_URL}appointment/welcomeEmail`, {
      headers: { Authorization: "Bearer " + user.jwt },
      data: { user },
    });
  } catch (error) {}
};
