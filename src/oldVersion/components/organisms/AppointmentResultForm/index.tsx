import React, { useEffect } from "react";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Card, Slider, Typography, CardContent } from "@mui/material";
import { styles } from "./styles";
import ClockLoader from "react-spinners/ClockLoader";
import "react-toastify/dist/ReactToastify.css";
import PrimaryButton from "../../atoms/PrimaryButton";
import CustomTextField from "../../atoms/CustomTextField";
import { getMealType } from "../../../util/appointments";
import CustomCheckbox from "../../atoms/CustomCheckbox";

const micronutrientsList: string[] = [
  "alcohol",
  "caffeine",
  "cooper",
  "choline",
  "cholesterol",
  "fluoride",
  "fiber",
  "folate",
  "iodine",
  "magnesium",
  "manganese",
  "sugar",
  "iron",
  "sodium",
  "calcium",
  "zinc",
  "selenium",
  "potassium",
  "phosphorus",
  "saturated fat",
  "vitamin a",
  "vitamin c",
  "vitamin d",
  "vitamin e",
  "vitamin k",
  "vitamin b1",
  "vitamin b2",
  "vitamin b5",
  "vitamin b6",
  "vitamin b12",
  "folic acid",
];

export type nutrient = {
  min: number;
  max: number;
};

export interface formType {
  calories: nutrient;
  carbs: nutrient;
  protein: nutrient;
  fat: nutrient;
}

export type nutritionalRestrictionType = {
  diet: {
    vegetarian: boolean;
    vegan: boolean;
  };
  intolerances: {
    gluten: boolean;
    dairy: boolean;
  };
};

type AppointmentResultFormProps = {
  mealType: string;
  onNutrientsSubmition(form: any, mealType: string): void;
};

function AppointmentResultForm({
  mealType,
  onNutrientsSubmition,
}: AppointmentResultFormProps) {
  const [form, setForm] = useState<formType>({
    calories: { min: 0, max: 5000 },
    carbs: { min: 0, max: 500 },
    protein: { min: 0, max: 500 },
    fat: { min: 0, max: 500 },
  });

  const [nutritionalRestrictions, setNutritionalRestrictions] =
    useState<nutritionalRestrictionType>({
      diet: { vegetarian: false, vegan: false },
      intolerances: { gluten: false, dairy: false },
    });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }, [loading]);

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    try {
      setLoading(true);
      //const newRecipes = await axios.get(getUrl());

      /*  await createRecipes(
        newRecipes.data.results,
        clientId,
        mealType,
        user!.jwt
      ); */

      onNutrientsSubmition(form, mealType);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /*  
 * This code will be used in the future, but for the first version we will comment it
 const getUrl = () => {
    const key = process.env.REACT_APP_SPOONACULAR_API_KEY;

    let baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=50&type=${
      mealType === "dinner" || mealType === "lunch"
        ? "main&nbspcourse"
        : mealType
    }&cuisine=mediterranean&fillIngredients=true&addRecipeInformation=true`;

    baseURL += getNutritionalRestrictions();

    for (const [key, value] of Object.entries(form)) {
      if (value) {
        //trim and first letter to capital
        var str = key.toLowerCase().split(" ");
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
        }

        var newKey = str.join("");
        baseURL += `&min${newKey}=${value.min}&max${newKey}=${value.max}`;
      }
    }
    return baseURL;
  }; */

  const getNutritionalRestrictions = () => {
    let intolerances = [];
    let diet = [];
    for (const [key, value] of Object.entries(
      nutritionalRestrictions["intolerances"]
    )) {
      if (value) {
        intolerances.push(key);
      }
    }
    for (const [key, value] of Object.entries(
      nutritionalRestrictions["diet"]
    )) {
      if (value) {
        diet.push(key);
      }
    }

    let str = "";
    if (intolerances.length > 0) {
      str += `&intolerances=${intolerances.join(",")}`;
    }
    if (diet.length > 0) {
      str += `&diet=${diet.join(",")}`;
    }
    return str;
  };

  const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: { min: value, max: form[name as keyof formType].max },
    });
  };

  const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: { min: form[name as keyof formType].min, max: value },
    });
  };

  const onChangeSlider = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number[]
  ) => {
    const { name } = e.target;
    setForm({ ...form, [name]: { min: value[0], max: value[1] } });
  };

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { checked } = e.target;
    const { name } = e.target;

    setNutritionalRestrictions({
      ...nutritionalRestrictions,
      [type]: {
        ...nutritionalRestrictions[type as keyof nutritionalRestrictionType],
        [name]: checked,
      },
    });

    getNutritionalRestrictions();
  };

  const onAutocompleteChange = (
    e: React.SyntheticEvent<Element, Event>,
    values: string[]
  ) => {
    if (!values) {
      setForm({
        calories: form.calories,
        carbs: form.carbs,
        protein: form.protein,
        fat: form.fat,
      });
      return;
    }

    const newObj = values.reduce((a, v) => {
      if (!form[v as keyof formType]) {
        return { ...a, [v]: { min: 0, max: 500 } };
      }
      return {
        ...a,
        [v]: {
          min: form[v as keyof formType].min,
          max: form[v as keyof formType].max,
        },
      };
    }, {});

    setForm({
      calories: form.calories,
      carbs: form.carbs,
      protein: form.protein,
      fat: form.fat,
      ...newObj,
    });
  };

  return (
    <Box>
      <Box sx={styles.appointmentFormWrapper}>
        <Box sx={styles.form}>
          <Typography variant="subtitle1" sx={styles.formSubtitle}>
            Preencha o formulário de {getMealType(mealType)}
          </Typography>

          <Box sx={styles.formColumns}>
            <Box sx={styles.leftColumn}>
              {Object.keys(form).map((k: any, index: number) => (
                <Box sx={styles.formItem} key={index}>
                  <CustomTextField
                    id={`min${k}`}
                    type="number"
                    label={k}
                    onChange={onChangeMin}
                    //  label={`Min. ${k}` ? k.min > 0 : ''}
                    placeholder={`enter amount of minimum ${k}`}
                    variant="outlined"
                    name={k}
                    value={form[k as keyof formType].min}
                    required
                  ></CustomTextField>

                  <Slider
                    sx={styles.slider}
                    getAriaLabel={() => "Nutrient range"}
                    name={k}
                    max={k === "calories" ? 8000 : 500}
                    value={[
                      form[k as keyof formType].min,
                      form[k as keyof formType].max,
                    ]}
                    //@ts-ignore
                    onChange={onChangeSlider}
                    valueLabelDisplay="auto"
                  />

                  <CustomTextField
                    id={`max${k}`}
                    type="number"
                    onChange={onChangeMax}
                    placeholder={`enter amount of maximum ${k}`}
                    variant="outlined"
                    name={k}
                    value={form[k as keyof formType].max}
                    required
                  ></CustomTextField>
                </Box>
              ))}
            </Box>

            <Box sx={styles.rightColumn}>
              <Box sx={styles.autocompleteWrapper}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={styles.autocompleteLabel}
                    >
                      Selecione nutrientes adicionais
                    </Typography>

                    <Autocomplete
                      sx={styles.autocomplete}
                      onChange={onAutocompleteChange}
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={micronutrientsList}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => {
                        return (
                          <CustomTextField
                            {...params}
                            label="Nutrientes"
                            placeholder="Nutrientes"
                          />
                        );
                      }}
                    />
                  </CardContent>
                </Card>

                <Box sx={styles.checkboxes}>
                  <Box>
                    <CustomCheckbox
                      onChange={(e) => onCheckboxChange(e, "diet")}
                      name="vegetarian"
                    />
                    <Typography> Vegetarian</Typography>
                  </Box>
                  <Box>
                    <CustomCheckbox
                      onChange={(e) => onCheckboxChange(e, "diet")}
                      name="vegan"
                    />
                    <Typography> Vegan </Typography>
                  </Box>
                  <Box>
                    <CustomCheckbox
                      onChange={(e) => onCheckboxChange(e, "intolerances")}
                      name="gluten"
                    />
                    <Typography> Glúten Free</Typography>
                  </Box>
                  <Box>
                    <CustomCheckbox
                      onChange={(e) => onCheckboxChange(e, "intolerances")}
                      name="dairy"
                    />
                    <Typography> Dairy Free</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={styles.buttonWrapper}>
                <PrimaryButton
                  sx={{ mt: 2 }}
                  disabled={loading}
                  onClick={onSubmit}
                >
                  Submeter
                </PrimaryButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {loading && (
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
        )}
      </Box>
    </Box>
  );
}

export default AppointmentResultForm;
