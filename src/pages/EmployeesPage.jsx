import React from "react";
import Employees from "../components/Employees/Employees";
import Layout from "../components/Layout/Layout";

const EmployeesPage = () => {
  return <Layout children={<Employees />} />;
};

export default EmployeesPage;
