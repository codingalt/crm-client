import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../pages/Root";
import Email from "../components/Auth/Signup/Email";
import Login from "../components/Auth/Login/Login";
import DashboardPage from "../pages/DashboardPage";
import VerificationCode from "../components/Auth/Signup/VerificationCode";
import Protected from "../components/Protected/Protected";
import SubCategoriesPage from "../pages/SubCategoriesPage";
import BusinessProfilePage from "../pages/BusinessProfilePage";
import MakeAppointmentPage from "../pages/MakeAppointmentPage";
import Completion from "../components/BookAppointmentSteps/Payment/Completion";
import AppointmentsPage from "../pages/AppointmentsPage";
import NotificationsPage from "../pages/NotificationsPage";
import NotFound from "../components/NotFound/NotFound";
import ViewServicePage from "../pages/ViewServicePage";
import VerifyManualAppointmentPage from "../pages/VerifyManualAppointmentPage";
import ManualAppointmentPaymentPage from "../pages/ManualAppointmentPaymentPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import ChatPage from "../pages/ChatPage";
import SearchServicesPageMobile from "../pages/SearchServicesPageMobile";
import AllServicesPage from "../pages/AllServicesPage";
import ProfilePage from "../pages/ProfilePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import CheckEmail from "../components/Auth/ResetPassword/CheckEmail";
import NewPassword from "../components/Auth/ResetPassword/NewPassword";
import ResetSuccess from "../components/Auth/ResetPassword/ResetSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Login /> },
      {
        path: "/signup",
        element: <Email />,
      },
      {
        path: "/verificationCode",
        element: <Protected Component={VerificationCode} />,
      },
      {
        path: "/forgot-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/check-email",
        element: <CheckEmail />,
      },
      {
        path: "/new-password",
        element: <NewPassword />,
      },
      {
        path: "/reset-password/success",
        element: <ResetSuccess />,
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
      {
        path: "/chat",
        element: <Protected Component={ChatPage} />,
      },
      {
        path: "/profile",
        element: <Protected Component={ProfilePage} />,
      },
      {
        path: "/services/:subCategoryName/:subCategoryId",
        element: <Protected Component={AllServicesPage} />,
      },
      {
        path: "/service/:serviceName/:serviceId",
        element: <Protected Component={ViewServicePage} />,
      },
      {
        path: "/notifications",
        element: <Protected Component={NotificationsPage} />,
      },
      {
        path: "/search",
        element: <Protected Component={SearchServicesPageMobile} />,
      },
      {
        path: "/verifyAppointment",
        element: <VerifyManualAppointmentPage />,
      },
      {
        path: "/verifyAppointment/payment",
        element: <ManualAppointmentPaymentPage />,
      },
      {
        path: "/payment/success",
        element: <Protected Component={PaymentSuccessPage} />,
      },
      {
        path: "*",
        element: <Protected Component={NotFound} />,
      },
    ],
  },
]);
