import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { getClientFoodDeliveries } from "../../../api/foodDelivery";
import {
  createPaymentDeliveryCard,
  paymentDeliveryCard,
} from "../../../api/clientFoodDelivery";
import { styles } from "./styles";
import { useAuth } from "../../../providers/useAuth";

const ConsultantCheckouts = () => {
  const { user } = useAuth();
  const [clientFoodDeliveries, setClientFoodDeliveries] = useState([]);
  const [openMbNetModal, setOpenMbNetModal] = useState(false);
  const [selectedFoodDeliveryId, setSelectedFoodDeliveryId] =
    useState<number>(-1);
  const [cardMbNet, setCardMbNet] = useState({
    cardNumber: "",
    expiredDate: "",
    cvc: "",
  });

  const fetchAppointmentResults = useCallback(async () => {
    const { data } = await getClientFoodDeliveries(user!.jwt);
    setClientFoodDeliveries(data);
  }, [user]);

  useEffect(() => {
    fetchAppointmentResults();
  }, [fetchAppointmentResults]);

  const handleCloseMbNetModal = () => {
    setOpenMbNetModal(false);
  };

  const handleMbNetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCardMbNet({ ...cardMbNet, [name]: value });
  };

  const onSubmitMbNet = async () => {
    await createPaymentDeliveryCard({
      ...cardMbNet,
      clientFoodDelivery: { id: selectedFoodDeliveryId },
      jwt: user!.jwt,
    });
  };

  const renderMbNetModal = () => (
    <Modal
      open={openMbNetModal}
      onClose={handleCloseMbNetModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modalContainer}>
        <Box>
          <Box>
            <Typography variant="h6" component="h2">
              Cartão MB Net
            </Typography>
            <Typography sx={{ mt: 1 }}>Preencha os dados do cartão</Typography>

            <Box sx={styles.modalForm}>
              <TextField
                id="outlined-basic"
                label="Card number"
                name="cardNumber"
                value={cardMbNet.cardNumber}
                onChange={handleMbNetChange}
                variant="outlined"
                sx={{ width: "100%" }}
              />
              <Box sx={styles.cvcContainer}>
                <TextField
                  id="outlined-basic"
                  label="Expired date"
                  name="expiredDate"
                  value={cardMbNet.expiredDate}
                  onChange={handleMbNetChange}
                  variant="outlined"
                  sx={{ flex: 1, marginRight: "4px" }}
                />
                <TextField
                  id="outlined-basic"
                  label="cvc"
                  name="cvc"
                  value={cardMbNet.cvc}
                  onChange={handleMbNetChange}
                  variant="outlined"
                  sx={{ flex: 1, marginLeft: "4px" }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={onSubmitMbNet}
                sx={{ marginTop: "8px" }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );

  const renderItem = (foodDelivery: {
    id: number;
    attributes: {
      client: {
        data: {
          id: number;
          attributes: {
            blocked: boolean;
            confirmed: boolean;
            createdAt: string;
            email: string;
            provider: string;
            type: string;
            updatedAt: string;
            username: string;
          };
        };
      };
      client_recipes: { data: any[] };
      delivery_date: string;
      delivery_address: string;
      createdAt: string;
      payment_delivery_card: { data: paymentDeliveryCard };
      price: number;
      publishedAt: string;
      state: string;
      updatedAt: string;
    };
  }) => {
    const onOpenMbNetModal = (id: number) => {
      setSelectedFoodDeliveryId(id);
      setOpenMbNetModal(true);
    };

    return (
      <TableRow>
        <TableCell>{foodDelivery.id}</TableCell>
        <TableCell align="right">
          {foodDelivery.attributes.client.data?.attributes.username ||
            "Não definido"}
        </TableCell>
        <TableCell align="right">{foodDelivery.attributes.price}</TableCell>
        <TableCell align="right">
          {foodDelivery.attributes.delivery_date}
        </TableCell>

        <TableCell align="right">
          <Button onClick={() => onOpenMbNetModal(foodDelivery.id)}>
            Cartão MbNet
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box>
      <NavigationBar />
      {openMbNetModal && renderMbNetModal()}
      <Table sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Delivery Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientFoodDeliveries?.map((foodDelivery: any) =>
            renderItem(foodDelivery)
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ConsultantCheckouts;
