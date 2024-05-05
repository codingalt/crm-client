import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../pages/Root";
import Email from "../components/Auth/Signup/Email";
import VerificationCode from "../components/Auth/Signup/VerificationCode";
import PersonalInformation from "../components/Auth/Signup/PersonalInformation";
import Login from "../components/Auth/Login/Login";
import DashboardPage from "../pages/DashboardPage";
import ServicesPage from "../pages/ServicesPage";
import AddNewServicePage from "../pages/AddNewServicePage";
import StatisticsPage from "../pages/StatisticsPage";
import EmployeesPage from "../pages/EmployeesPage";
import AddEmployeePage from "../pages/AddEmployeePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Email /> },
      {
        path: "/verificationCode",
        element: <VerificationCode />,
      },
      {
        path: "/personalInformation",
        element: <PersonalInformation />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/newService",
        element: <AddNewServicePage />,
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },
      {
        path: "/addEmployee",
        element: <AddEmployeePage />,
      },
    ],
  },
]);
