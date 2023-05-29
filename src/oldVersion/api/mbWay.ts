import axios from "axios";
import api from ".";

const PAYMENT_STATUS = {
  PENDING: "pending",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

export const mbWayPayment = async (
  invoiceNumber: string,
  paymentValue: string,
  clientPhoneNumer: string,
  clientEmail: string,
  description: string,
  jwt: string
) => {
  const url = `/.netlify/functions/mbwaypay?referencia=${invoiceNumber}&valor=${paymentValue}&nrtlm=${clientPhoneNumer}&email=${clientEmail}&descricao=${description}`;

  try {
    const payment = await fetch(url).then((res) => res.json());
    const { CodigoMoeda, DataHora, IdPedido, MsgDescricao, Valor } = payment;
    const { data } = await api(jwt).post("appointment-payments", {
      data: {
        paymentId: IdPedido,
        value: Valor,
        coinCode: CodigoMoeda,
        dateTime: DataHora,
        description: MsgDescricao,
        status: PAYMENT_STATUS.PENDING,
      },
    });
    return data;
  } catch (err) {
    console.log("ENTER ERROR", err);
  }
};

export const mbWayPaymentState = async (
  id: string,
  idPagamento: string,
  jwt: string
) => {
  const url = `/.netlify/functions/mbwaypaystate?idpagamento=${idPagamento}`;

  try {
    const state = await fetch(url).then((res) => res.json());
    const { Estado, MsgDescricao } = state.EstadoPedidos[0];

    let status = PAYMENT_STATUS.PENDING;

    if (Estado === "000") status = PAYMENT_STATUS.COMPLETED;
    if (Estado === "020") status = PAYMENT_STATUS.CANCELLED;

    await api(jwt).put(`appointment-payments/${id}`, {
      data: {
        status,
        description: MsgDescricao,
      },
    });

    return status;
  } catch (err) {
    console.log("ENTER ERROR", err);
  }
};

/**
   * To activate the payment callback, the process is exactly as described in the previous point. Only the URL format is different.


• [CHAVE_ANTI_PHISHING] – Token previous defined by you to autenticate the answer;

• [REFERENCIA] – MBWAY Reference;

• [ID_TRANSACAO] – Id Transaction (idPedido);

• [VALOR] – Amount payied;

• [DATA_HORA_PAGAMENTO] – Date/Time of payment (returns on format dd-MM-yyyy HH:mm:ss);

• [ESTADO] - Order status. (returns “PAGO” whenever payment is accepted);
   */

export const mbWayPaymentCallback = async () => {
  await axios.get(
    "http://www.localhost:8888/callback.php?chave=[CHAVE_ANTI_PHISHING]&referencia=[REFERENCIA]&idpedido=[ID_TRANSACAO]&valor=[VALOR]&datahorapag=[DATA_HORA_PAGAMENTO]&estado=[ESTADO]"
  );
};

export const createAppointmentPayment = async (
  appointmentId: number,
  invoiceNumber: string,
  clientPhoneNumer: string,
  clientEmail: string,
  description: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).post("appointment-payment/createMbway", {
      appointmentId,
      invoiceNumber,
      clientPhoneNumer,
      clientEmail,
      description,
    });

    return data;
  } catch (err) {
    console.log("ENTER ERROR", err);
  }
};

export const getAppointmentPaymentStatus = async (
  appointmentPaymentId: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `appointment-payment/getMbway/${appointmentPaymentId}`
    );
    return data;
  } catch (err) {
    console.log("ENTER ERROR", err);
  }
};
