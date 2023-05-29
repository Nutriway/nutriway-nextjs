import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getClientFoodDelivery } from "../../../api/clientFoodDelivery";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import ClientOrdersActions from "../../../components/molecules/ClientOrdersActions";
import { ClientType } from "../../nutritionist/NutritionistAppointments";
import dayjs from "dayjs";
export type OrderType = {
  id: number,
  attributes: {
    client: ClientType;
    createdAt: string;
    delivery_address: string;
    delivery_date: string;
    nif: string;
    paymentId: number;
    postalCode: string;
    price: string;
    publishedAt: string;
    state: string;
    status: string;
    updatedAt: string;
  };
};

const ClientOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    if (user) {
      const data = await getClientFoodDelivery(user!.id, user!.jwt);
      setOrders(data);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const renderOrderState = (state: string, status: string) => {
    if (status === "cancelled") {
      return "Cancelada";
    }
    if (state === "waitingForClientPayment") {
      return "Aguarda pagamento";
    }
    return "Enviado";
  };

  const orderStatusRow = (status: string) => {
    if (status === "cancelled") return styles.cancelledCell;
    if (status === "completed") return styles.payedCell;
    return styles.waitingCell;
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleChangePage(event : React.MouseEvent<HTMLButtonElement> | null, newPage : number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={styles.pageWrapper}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={styles.tableCell}>ID</TableCell>
                <TableCell sx={styles.tableCell}>Nome do Cliente</TableCell>

                <TableCell sx={styles.tableCell}>Data de encomenda</TableCell>
                <TableCell sx={styles.tableCell}>Preço</TableCell>
                <TableCell sx={styles.tableCell}>Estado</TableCell>
                <TableCell sx={styles.tableCell}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order: OrderType, index: number) => (
                <TableRow key={index}>
                  <TableCell sx={orderStatusRow(order.attributes.status)} >{order.id}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    {order.attributes.client.data.attributes.username}
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    {order.attributes.delivery_date ? dayjs(order.attributes.delivery_date).format('HH:mm || DD/MM/YYYY') : "Por definir"}
                  </TableCell>
                  <TableCell sx={styles.tableCell}>6,12€</TableCell>
                  <TableCell sx={styles.stateCell}>
                    {renderOrderState(order.attributes.state, order.attributes.status)}
                  </TableCell>
                  {order.attributes.status === "pending" ? (
                    <ClientOrdersActions key={order.id} order={order} fetchOrders={fetchOrders} />
                  ): <TableCell sx={styles.tableCell}/>}

                </TableRow>

              ))}
            </TableBody>
           
            
          </Table>
          <TablePagination
                rowsPerPageOptions={[1, 5, 10]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage = 'Encomendas por página:'
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count} encomendas`}
              />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ClientOrders;
