import { Box, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import CustomTextField from "../../../components/atoms/CustomTextField";
import NavigationBar from "../../../components/organisms/NavigationBar";

interface FormType {
  address: string;
  postalCode: string;
  price: string;
  state: string;
  deliveryDate: Dayjs | null;
}

const NutritionistAddOrder = () => {
  const [order, setOrder] = useState<FormType>({
    address: "",
    postalCode: "",
    price: "",
    state: "",
    deliveryDate: null,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const onChangeDateTime = (value: Dayjs | null) => {
    if (value) {
      setOrder({ ...order, deliveryDate: value });
    }
  };

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
      <NavigationBar />

      <Typography>Editar encomenda</Typography>

      <Box>
        <CustomTextField
          onChange={onChange}
          label="Morada"
          placeholder="Morada"
          variant="outlined"
          name="city"
          value={order.address}
        />
        <CustomTextField
          onChange={onChange}
          label="Código postal"
          placeholder="Código postal"
          variant="outlined"
          name="postalCode"
          value={order.postalCode}
        />
        <CustomTextField
          onChange={onChange}
          label="Preço"
          placeholder="Preço"
          variant="outlined"
          name="price"
          value={order.price}
        />
        <DesktopDatePicker
          disablePast={true}
          label="Data"
          inputFormat="DD/MM/YYYY"
          value={order.deliveryDate}
          onChange={onChangeDateTime}
          renderInput={(params) => <CustomTextField {...params} />}
        />
        <Typography>{order.state}</Typography>
      </Box>
    </Box>
  );
};

export default NutritionistAddOrder;
