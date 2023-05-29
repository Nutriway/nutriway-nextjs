import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ClientHomePage from "../pages/client/ClientHomePage";
import ConsultantHomePage from "../pages/consultant/ConsultantHomePage";
import NutritionistHomePage from "../pages/nutritionist/NutritionistHomePage";
import PrivateRoutes from "./PrivateRoute";
import ResetPassword from "../pages/auth/ResetPassword";
import NewAppointmentForm from "../components/organisms/NewAppointmentForm";
import ClientRecipes from "../components/organisms/ClientRecipes";
import NutritionistAvailability from "../pages/nutritionist/NutritionistAvailability";
import ClientScheduleAppointment from "../pages/client/ClientScheduleAppointment";
import UserRecipeDetails from "../pages/user/UserRecipeDetails";
import NutritionistClientsOrders from "../pages/nutritionist/NutritionistClientsOrders";
import NutritionistAddOrder from "../pages/nutritionist/NutritionistAddOrder";
import ConfirmedUser from "../pages/auth/ConfirmedUser";
import ChangePassword from "../pages/user/ChangePassword";
import NutritionistAppointments from "../pages/nutritionist/NutritionistAppointments";
import ConsultantCheckouts from "../pages/consultant/ConsultantCheckouts";
import NutritionistRecipes from "../pages/nutritionist/NutritionistRecipes";
import NutritionistAddRecipe from "../pages/nutritionist/NutritionistAddRecipe";
import NutritionistAddDietPlan from "../pages/nutritionist/NutritionistAddDietPlan";
import ClientEvents from "../pages/client/ClientEvents";
import ClientPersonalInformation from "../pages/client/ClientPersonalInformation";
import ClientAddDelivery from "../pages/client/ClientAddDelivery";
import AppointmentHistoryItem from "../components/organisms/AppointmentHistoryItem";
import NutritionistPlansList from "../components/organisms/NutritionistPlansList";
import HomePage from "../pages/public/HomePage";
import ClientDietPlans from "../pages/client/ClientDietPlans";
import NutritionistChosePlanIngredients from "../components/organisms/NutritionistChosePlanIngredients";
import NutritionistAppointmentPage from "../pages/nutritionist/NutritionistAppointmentPage";
import ClientAppointmentPage from "../pages/nutritionist/ClientAppointmentPage";
import NutritionistCreateDietPlanPage from "../pages/nutritionist/NutritionistCreateDietPlanPage";
import DietPlanInfo from "../components/organisms/DietPlanInfo";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirmedUser" element={<ConfirmedUser />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<ChangePassword />} path="/changePassword" />
          <Route element={<ClientHomePage />} path="/clientHomePage" />
          <Route element={<ConsultantHomePage />} path="/consultantHomePage" />
          <Route
            element={<ConsultantCheckouts />}
            path="/consultantCheckouts"
          />
          <Route
            element={<NutritionistHomePage />}
            path="/nutritionistHomePage"
          />
          <Route
            element={<NutritionistClientsOrders />}
            path="/nutritionistClientsOrders"
          />
          <Route
            element={<NutritionistAddOrder />}
            path="/nutritionistClientsOrders/NutritionistAddOrder"
          />
          <Route
            element={<NutritionistRecipes />}
            path="/nutritionistRecipes"
          />

          <Route element={<ClientDietPlans />} path="/clientDietPlans" />

          <Route
            element={<NutritionistPlansList />}
            path="/nutritionistPlans"
          />
          <Route
            element={<NutritionistAddRecipe />}
            path="/nutritionistRecipes/nutritionistAddRecipe"
          />

          <Route
            element={<NutritionistAddDietPlan />}
            path="/nutritionistRecipes/nutritionistAddDietPlan"
          />

          <Route
            element={<NutritionistCreateDietPlanPage />}
            path="/nutritionistCreateDietPlanPage"
          />

          <Route
            element={<NutritionistChosePlanIngredients />}
            path="/nutritionistChosePlanIngredients"
          />
          <Route
            element={<AppointmentHistoryItem />}
            path="/appointmentHistoryItem"
          />
          <Route element={<DietPlanInfo />} path="/dietPlanInfo" />
          <Route element={<NewAppointmentForm />} path="/newAppointment" />

          <Route element={<ClientRecipes />} path="/clientRecipes" />
          <Route
            element={<NutritionistAvailability />}
            path="/nutritionistAvailability"
          />
          <Route
            element={<NutritionistAppointments />}
            path="/nutritionistAppointments"
          />
          <Route
            element={<NutritionistAppointmentPage />}
            path="/nutritionistAppointmentPage"
          />
          <Route
            element={<ClientAppointmentPage />}
            path="/clientAppointmentPage"
          />
          <Route
            element={<ClientScheduleAppointment />}
            path="/clientScheduleAppointment"
          />
          <Route
            element={<ClientPersonalInformation />}
            path="/clientPersonalInformation"
          />

          <Route element={<ClientAddDelivery />} path="/clientAddDelivery" />

          <Route element={<ClientEvents />} path="/clientEvents" />

          <Route element={<UserRecipeDetails />} path="/recipeDetails/:id/:isNutritionist" />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
