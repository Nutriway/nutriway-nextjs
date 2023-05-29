import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import NavigationBar from '../../../components/organisms/NavigationBar';
import { useAuth } from '../../../providers/useAuth';
import {
    getNutritionistClientsFoodDelivery,
    updateClientFoodDeliveryPrice,
    updateClientFoodDeliveryState,
} from '../../../api/clientFoodDelivery';
import CustomTextField from '../../../components/atoms/CustomTextField';
import { styles } from './styles';

/* enum deliveryState {
  "proccessing",
  "waitingForClientPayment",
  "waitingForAdminPayment",
  "shipped",
}
interface OrderI {
  id: number;
  client: {
    name: string;
  };
  delivery_date: string;
  price: string;
  state: deliveryState;
} */

const NutritionistClientsOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({ id: -1, price: 0, state: '' });

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = (id: number, state: string) => {
        setOrder({ id, price: 0, state });
        setOpenModal(true);
    };

    const onChangeOrderPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setOrder({ ...order, price: Number(value) });
    };

    const fetchOrders = useCallback(async () => {
        if (user) {
            const data = await getNutritionistClientsFoodDelivery(user!.id, user!.jwt);
            setOrders(data);
        }
    }, [user]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    /*const { push } = useRouter();
   const handleUpdate = () => {
    push("NutritionistAddOrder");
  };
 */

    //This method can be way smaller needs refactoring
    const onSubmit = async () => {
        if (order.state === 'processing') {
            try {
                await updateClientFoodDeliveryPrice(order.id, order.price, user!.jwt);
                let newOrder: any = orders.find((ord: any) => ord.id === order.id);
                const newOrders: any = orders.filter((ord: any) => ord.id !== order.id);
                if (newOrder) {
                    newOrder.attributes.price = order.price;
                    //@ts-ignore expecting this to be refactored
                    setOrders([...newOrders, newOrder]);
                }

                handleCloseModal();
            } catch (error) {}
        }
        if (order.state === 'waitingForShipping') {
            await updateClientFoodDeliveryState(order.id, 'shipped', user!.jwt);
            let newOrder: any = orders.find((ord: any) => ord.id === order.id);
            const newOrders: any = orders.filter((ord: any) => ord.id !== order.id);
            if (newOrder) {
                newOrder.attributes.state = 'shipped';
                //@ts-ignore expecting this to be refactored
                setOrders([...newOrders, newOrder]);
            }

            handleCloseModal();
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <NavigationBar />
            <Typography>Encomendas para clientes</Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome do Cliente</TableCell>

                        <TableCell>Data de encomenda</TableCell>
                        <TableCell>Preço</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.attributes.client.data.attributes.username}</TableCell>
                            <TableCell>{order.attributes.delivery_date}</TableCell>
                            <TableCell>{order.attributes.price}</TableCell>
                            <TableCell>{order.attributes.state}</TableCell>
                            <TableCell>
                                {order.attributes.state === 'processing' && (
                                    <Button onClick={() => handleOpenModal(order.id, order.attributes.state)}>
                                        Submeter preço
                                    </Button>
                                )}
                                {order.attributes.state === 'waitingForShipping' && (
                                    <Button onClick={() => handleOpenModal(order.id, order.attributes.state)}>
                                        Enviar encomenda
                                    </Button>
                                )}
                                {/*  <Button onClick={handleUpdate}>Editar</Button> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    {order.state === 'processing' && (
                        <>
                            <Typography sx={styles.modalTitle}>Adicione o preço</Typography>

                            <CustomTextField
                                onChange={onChangeOrderPrice}
                                label="Preço"
                                placeholder="Preço"
                                variant="outlined"
                                name="price"
                                value={order.price}
                            />
                        </>
                    )}
                    {order.state === 'waitingForShipping' && (
                        <>
                            <Typography sx={styles.modalTitle}>Enviar encomenda</Typography>
                            <Typography sx={{ pb: 4 }}>
                                Por favor confira se a entrega foi iniciada no continente antes de Submeter
                            </Typography>
                        </>
                    )}
                    <Button onClick={onSubmit}>Submeter</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default NutritionistClientsOrders;
