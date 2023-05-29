import { toast } from "react-toastify";
import api from ".";

export interface paymentDeliveryCard {
  cardNumber: string;
  expiredDate: string;
  cvc: string;
  clientFoodDelivery: { id: number };
  jwt: string;
}

export const createPaymentDeliveryCard = async ({
  cardNumber,
  expiredDate,
  cvc,
  clientFoodDelivery,
  jwt,
}: paymentDeliveryCard) => {
  try {
    const { data } = await api(jwt).post("payment-delivery-cards", {
      data: {
        cardNumber,
        expiredDate,
        cvc,
        client_food_delivery: clientFoodDelivery,
      },
    });

    return data.data;
  } catch (error) {}
};

export const getNutritionistClientsFoodDelivery = async (
  nutritionistId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `client-food-deliveries?populate=*&filters[nutritionist][id][$eq]=${nutritionistId}`
    );

    return data.data;
  } catch (error) {}
};
export const getClientFoodDelivery = async (clientId: number, jwt: string) => {
  try {
    const { data } = await api(jwt).get(
      `client-food-deliveries?populate=*&filters[client][id][$eq]=${clientId}`
    );
    let dataOrdered = data.data.sort(function(a:{id:number},b:{id:number}){return b.id-a.id});
    return dataOrdered;
  } catch (error) {}
};
export const updateClientFoodDeliveryPrice = async (
  clientFoodDeliveryId: number,
  price: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(
      `client-food-deliveries/${clientFoodDeliveryId}`,
      { data: { price, state: "waitingForClientPayment" } }
    );
    toast.success("Delivery updated");
    return data.data;
  } catch (error) {
    toast.error("Error");
  }
};
export const updateClientFoodDeliveryState = async (
  clientFoodDeliveryId: number,
  state: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(
      `client-food-deliveries/${clientFoodDeliveryId}`,
      { data: { state: state } }
    );
    toast.success("Delivery updated");
    return data.data;
  } catch (error) {
    toast.error("Error");
  }
};

export const cancelFoodDelivery = async (
  clientFoodDeliveryId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(
      `client-food-deliveries/${clientFoodDeliveryId}`,
      { data: { status:"cancelled" } }
    );
    toast.success("Delivery updated");
    return data.data;
  } catch (error) {
    toast.error("Error");
  }
}

export const changeFoodDeliveryDate = async(
  clientFoodDeliveryId: number,
  date: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).put(
      `client-food-deliveries/${clientFoodDeliveryId}`,
      { data: { delivery_date:date} }
    );
    toast.success("Delivery updated");
    return data.data;
  } catch (error) {
    toast.error("Error");
  }
}