import api from "./index";
import { toast } from "react-toastify";
import dayjs from "dayjs";

type FoodDeliveryType = {
  deliveryId: number,
  client: { id: number };
  date: string | undefined;
  street: string | undefined;
  nif: string;
  zipCode: string;
  jwt: string;
  clientPhoneNumber: string;
};

export const getClientFoodDeliveries = async (jwt: string) => {
  try {
    const { data } = await api(jwt).get("client-food-deliveries?populate=*");

    return data;
  } catch (error) {}
};

export const updateFoodDelivery = async ({
  deliveryId,
  client,
  date,
  nif,
  clientPhoneNumber,
  street,
  zipCode,
  jwt,
}: FoodDeliveryType) => {
  try {
    const res = await api(jwt).put(`client-food-delivery/updateDelivery/${deliveryId}`, {
      client,
      delivery_date: dayjs(date).toISOString(),
      delivery_address: "",
      nif: "",
      clientPhoneNumber,
      postalCode: "",
    });
    toast.success("Delivery submitted");
    return res.data;
  } catch (error) {
    if(dayjs(date).toISOString() === 'invalid')
      toast.error("Por favor submeta uma data válida.")
    toast.error("Error on delivery submittion");
  }
};

export const getFoodDeliveryPaymentStatus = async (
  paymentId: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `client-food-delivery/getMbway/${paymentId}`
    );
    return data;
  } catch (err) {
  }
};

export const createFoodDelivery = async (jwt: string, client: any) => {
  try {
    const res = await api(jwt).post("client-food-deliveries", {
      data: {
        status: "pending",
        client: { id: client.data.id },
        state: "waitingForClientPayment",
      },
    });
    return res.data;
  } catch (error) {}
};
