import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../pages/Root";
import Email from "../components/Auth/Signup/Email";
import Login from "../components/Auth/Login/Login";
import DashboardPage from "../pages/DashboardPage";
import VerificationCode from "../components/Auth/Signup/VerificationCode";
import PersonalInformation from "../components/Auth/Signup/PersonalInformation";
import Protected from "../components/Protected/Protected";
import SubCategoriesPage from "../pages/SubCategoriesPage";
import BusinessProfilePage from "../pages/BusinessProfilePage";
import MakeAppointmentPage from "../pages/MakeAppointmentPage";
import Completion from "../components/BookAppointmentSteps/Payment/Completion";
import AppointmentsPage from "../pages/AppointmentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Email /> },
      {
        path: "/verificationCode",
        element: <Protected Component={VerificationCode} />,
      },
      {
        path: "/personalInformation",
        element: <Protected Component={PersonalInformation} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Protected Component={DashboardPage} />,
      },
      {
        path: "/categories/:categoryName/:categoryId",
        element: <Protected Component={SubCategoriesPage} />,
      },
      {
        path: "/businesses/:businessName/:businessId",
        element: <Protected Component={BusinessProfilePage} />,
      },
      {
        path: "/makeAppointment/:businessName",
        element: <Protected Component={MakeAppointmentPage} />,
      },
      {
        path: "/success",
        element: <Protected Component={Completion} />,
      },
      {
        path: "/appointments",
        element: <Protected Component={AppointmentsPage} />,
      },
    ],
  },
]);
