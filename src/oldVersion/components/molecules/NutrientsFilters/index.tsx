import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Slider,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Nutrients } from "../../../util/recipes";
import CustomCheckbox from "../../atoms/CustomCheckbox";
import CustomTextField from "../../atoms/CustomTextField";
import PrimaryButton from "../../atoms/PrimaryButton";
import { styles } from "./styles";

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
  "vitamin b3",
  "vitamin b5",
  "vitamin b6",
  "vitamin b12",
  "folic acid",
  "net carbohydrates",
];

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
  onNutrientsSubmition(form: Nutrients): void;
};

function NutrientsFilters({
  onNutrientsSubmition,
}: AppointmentResultFormProps) {
  const [form, setForm] = useState<Nutrients>({
    energy: { min: 0, max: 1000 },
    carbohydrate: { min: 0, max: 500 },
    protein: { min: 0, max: 500 },
    fat: { min: 0, max: 500 },
  });

  const [nutritionalRestrictions, setNutritionalRestrictions] =
    useState<nutritionalRestrictionType>({
      diet: { vegetarian: false, vegan: false },
      intolerances: { gluten: false, dairy: false },
    });

  const onSubmit = () => {
    onNutrientsSubmition(form);
  };

  const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: { min: value, max: form[name as keyof Nutrients].max },
    });
  };

  const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: { min: form[name as keyof Nutrients].min, max: value },
    });
  };

  const onChangeSlider = (e: Event, value: number | number[]) => {
    const { name } = e.target as HTMLButtonElement;

    if (typeof value === "object")
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
  };

  const onAutocompleteChange = (
    e: React.SyntheticEvent<Element, Event>,
    values: string[]
  ) => {
    if (!values) {
      setForm({
        energy: form.energy,
        carbohydrate: form.carbohydrate,
        protein: form.protein,
        fat: form.fat,
      });
      return;
    }

    const newObj = values.reduce((a, v) => {
      if (!form[v as keyof Nutrients]) {
        return { ...a, [v]: { min: 0, max: 500 } };
      }
      return {
        ...a,
        [v]: {
          min: form[v as keyof Nutrients].min,
          max: form[v as keyof Nutrients].max,
        },
      };
    }, {});

    setForm({
      energy: form.energy,
      carbohydrate: form.carbohydrate,
      protein: form.protein,
      fat: form.fat,
      ...newObj,
    });
  };

  const getLabel = (nutrient: string) => {
    switch (nutrient) {
      case "energy":
        return "calories (kcal)";
      case "carbohydrate":
        return "carbs (g)";
      case "fat":
        return "fat (g)";
      case "protein":
        return "protein (g)";
      case "alcohol":
        return "alcohol (g)";
      case "sugar":
        return "sugar (g)";
      case "cholesterol":
        return "cholesterol (mg)";
      case "sodium":
        return "sodium (mg)";
      case "manganese":
        return "manganese (mg)";
      case "iron":
        return "iron (mg)";
      case "fiber":
        return "fiber (g)";
      case "vitamin b6":
        return "vita. b6 (mg)";
      case "calcium":
        return "calcium (mg)";
      case "magnesium":
        return "magnesium (mg)";
      case "phosphorus":
        return "phosphorus (mg)";
      case "saturated fat":
        return "saturated fat (g)";
      case "vitamin b12":
        return "vita. b12 (mg)";
      case "potassium":
        return "potassium (mg)";
      case "cooper":
        return "cooper (mg)";
      case "zinc":
        return "zinc (mg)";
      case "vitamin c":
        return "vita. c (mg)";
      case "vitamin b2":
        return "vita. b2 (mg)";
      case "vitamin b1":
        return "vita. b1 (mg)";
      case "vitamin b3":
        return "vita. b3 (mg)";
      case "vitamin b5":
        return "vita. b5 (mg)";
      case "vitamin a":
        return "vita. a (IU)";
      case "vitamin k":
        return "vita. k (µg)";
      case "vitamin d":
        return "vita. d (µg)";
      case "selenium":
        return "selenium (µg)";
      case "folate":
        return "folate (µg)";
      case "vitamin e":
        return "vita. e (mg)";
      case "net carbohydrates":
        return "net carbohydrates (g)";
      case "caffeine":
        return "caffeine (mg)";
    }

    return nutrient;
  };

  return (
    <Box sx={styles.form}>
      <Box sx={styles.formColumns}>
        <Box sx={styles.leftColumn}>
          {Object.keys(form).map((k: string, index: number) => (
            <Box sx={styles.formItem} key={index}>
              <CustomTextField
                id={`min${k}`}
                type="number"
                label={getLabel(k)}
                onChange={onChangeMin}
                //  label={`Min. ${k}` ? k.min > 0 : ''}
                placeholder={`enter amount of minimum ${k}`}
                variant="outlined"
                name={k}
                value={form[k as keyof Nutrients].min}
                required
              ></CustomTextField>

              <Slider
                sx={styles.slider}
                getAriaLabel={() => "Nutrient range"}
                name={k}
                max={k === "calories" ? 1000 : 500}
                value={[
                  form[k as keyof Nutrients].min,
                  form[k as keyof Nutrients].max,
                ]}
                onChange={onChangeSlider}
                valueLabelDisplay="auto"
              />

              <CustomTextField
                id={`max${k}`}
                label={getLabel(k)}
                type="number"
                onChange={onChangeMax}
                placeholder={`enter amount of maximum ${k}`}
                variant="outlined"
                name={k}
                value={form[k as keyof Nutrients].max}
                required
              ></CustomTextField>
            </Box>
          ))}
        </Box>

        <Box sx={styles.rightColumn}>
          <Box sx={styles.autocompleteWrapper}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={styles.autocompleteLabel}>
                  Selecione nutrientes adicionais
                </Typography>

                <Autocomplete
                  disabled
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
                  disabled
                />
                <Typography> Vegetarian</Typography>
              </Box>
              <Box>
                <CustomCheckbox
                  onChange={(e) => onCheckboxChange(e, "diet")}
                  name="vegan"
                  disabled
                />
                <Typography> Vegan </Typography>
              </Box>
              <Box>
                <CustomCheckbox
                  onChange={(e) => onCheckboxChange(e, "intolerances")}
                  name="gluten"
                  disabled
                />
                <Typography> Glúten Free</Typography>
              </Box>
              <Box>
                <CustomCheckbox
                  onChange={(e) => onCheckboxChange(e, "intolerances")}
                  name="dairy"
                  disabled
                />
                <Typography> Dairy Free</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.buttonWrapper}>
            <PrimaryButton sx={{ mt: 2 }} onClick={onSubmit}>
              Submeter
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NutrientsFilters;
