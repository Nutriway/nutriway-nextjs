import axios from "axios";
import { mockExtendedIngredients } from "../../pages/client/ClientFavouriteRecipes/constants";

type RecipeTranslated = {
  name: string;
  amount: number;
  unitShort: string;
  unitLong: string;
};

//Move this to api folder create a folder for translations api
const translateApi = async (name: string) => {
  //To initiates this service open docker and run: docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
  return await axios.post("http://localhost:5000/translate", {
    q: name,
    source: "en",
    target: "pt",
    format: "text",
  });
};

/**
 * Fix for the translations that we catch that are being wrongly done
 * @param translatedString Translated string wrongly translated for our use case
 * @returns
 */
const fixTransalation = (translatedString: string) => {
  switch (translatedString) {
    case "excursões":
      return "passas";
    default:
      return translatedString;
  }
};

export const onTranslatingParsingIngredientsToBuy = async () => {
  let newRecipesTranslated: RecipeTranslated[] = [];
  mockExtendedIngredients.map(async (recipeIngredient) => {
    let ingredient = {
      name: "",
      amount: recipeIngredient.measures.metric.amount,
      unitShort: recipeIngredient.measures.metric.unitShort,
      unitLong: recipeIngredient.measures.metric.unitLong,
    };

    const { data } = await translateApi(recipeIngredient.nameClean);

    newRecipesTranslated.push({
      ...ingredient,
      name: fixTransalation(data.translatedText),
    });
  });

  return newRecipesTranslated;
};
