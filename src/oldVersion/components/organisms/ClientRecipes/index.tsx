import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavigationBar from "../NavigationBar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { getUserRecipes } from "../../../api/user";

import { useAuth } from "../../../providers/useAuth";
import ClockLoader from "react-spinners/ClockLoader";
import PrimaryButton from "../../atoms/PrimaryButton";
import CustomTextField from "../../atoms/CustomTextField";

type AddressType = {
  city: string;
  street: string;
  zipCode: string;
};

function ClientRecipes(props: any) {
  const [recipes, setRecipes] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | null>(dayjs());
  const [address, setAdress] = useState<AddressType>({
    city: "",
    street: "",
    zipCode: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }, [loading]);

  const { user } = useAuth();

  const getRecipes = useCallback(async () => {
    if (user && !recipes) {
      setLoading(true);
      const userRecipes = await getUserRecipes(user?.id, user!.jwt);

      setRecipes(userRecipes);
      setLoading(false);
    }
  }, [user, recipes]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const handleSubmit = () => {
    /*  createFoodDelivery({
      client: { id: user!.id },
      deliveryDate: deliveryDate?.toISOString(),
      address: `${address?.street}, ${address?.city}, ${address?.zipCode}`,
      nif: "",
      jwt: user!.jwt,
    }); */
  };
  /* 
  const handleSelectedRecipe = (recipeId: number, selected: boolean) => {
    if (recipes) {
      const newRecipes = recipes.map((e: any) => {
        if (e.id === recipeId) {
          e = { ...e, attributes: { ...e.attributes, selected } };
        }
        return e;
      });

      setRecipes(newRecipes);
      setAllowSubmit(true);
    }
  }; */

  const handleChangeDeliveryDate = (newValue: Dayjs | null) => {
    setAllowSubmit(true);
    setDeliveryDate(newValue);
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdress({ ...address, city: value });
  };

  const onChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdress({ ...address, street: value });
  };

  const onChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdress({ ...address, zipCode: value });
  };

  return (
    <Box>
      <NavigationBar />
      <Box sx={styles.listWrapper}>
        <Box sx={styles.formWrapper}>
          <Box sx={styles.addressWrapper}>
            <CustomTextField
              onChange={onChangeCity}
              label="Cidade"
              placeholder="Cidade"
              variant="outlined"
              name="city"
              value={address.city}
            ></CustomTextField>
            <CustomTextField
              onChange={onChangeStreet}
              label="Rua"
              placeholder="Rua"
              variant="outlined"
              name="street"
              value={address?.street}
            ></CustomTextField>
            <CustomTextField
              onChange={onChangeZipCode}
              label="Código-postal"
              placeholder="Código-postal"
              variant="outlined"
              name="zipCode"
              value={address?.zipCode}
            ></CustomTextField>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Data de entrega"
                value={deliveryDate}
                onChange={handleChangeDeliveryDate}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>

            <PrimaryButton onClick={handleSubmit} disabled={!allowSubmit}>
              Submeter
            </PrimaryButton>
          </Box>
        </Box>
        {loading ? (
          <ClockLoader
            color="rgb(83, 168, 50)"
            size={90}
            cssOverride={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          />
        ) : (
          <> </>
          /*   recipes && (
            <RecipesList
              recipes={recipes}
              handleSelectedRecipe={handleSelectedRecipe}
            />
          ) */
        )}
      </Box>
    </Box>
  );
}

export default ClientRecipes;
