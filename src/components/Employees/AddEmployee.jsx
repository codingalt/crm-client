import React from 'react'
import css from "./Employees.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Avatar, Chip, Input, Select, SelectItem } from "@nextui-org/react";
import { BiSolidPencil } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";

const AddEmployee = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  // const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {};

  return (
    <div className={`${css.addEmployee} max-w-screen-lg`}>
      <div className={css.heading}>
        <p>Adding a New Employee</p>
      </div>

      <Formik
        initialValues={initialValues}
        //   validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form>
            <div className="w-full mb-8 flex justify-between items-center gap-16">
              <div className={css.inputContainer}>
                <label htmlFor="name">Employee Name</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="Arya Stark"
                    startContent={
                      <BiSolidPencil className="text-[25px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="name">Employee Contact</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="(239) 555-0108"
                    startContent={
                      <MdPermContactCalendar className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="w-full mb-8 flex justify-between items-center gap-16">
              <div className={css.inputContainer}>
                <label htmlFor="name">Role</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="Manager"
                    startContent={
                      <FaUser className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="name">Email</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="mail@demo.com"
                    startContent={
                      <MdEmail className="text-[25px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className={css.buttons}>
              <button type="submit">Add Employee</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEmployee