import React, { useMemo, useState } from "react";
import css from "./Signup.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupEmailSchema } from "../../../utils/validations/AuthValidation";
import { useRegisterUserMutation } from "../../../services/api/authApi/authApi";
import {Button} from "@nextui-org/react"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import { useDispatch } from "react-redux";

const Email = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isContactErr, setIsContactErr] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPass: "",
  };

  const [registerUser, res] = useRegisterUserMutation();
  const {isLoading, isSuccess, error} = res;

  const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {

    if (values.contact.length < 5) {
      setIsContactErr(true);
      return;
    }

    const {data} = await registerUser({
      name: values.name,
      email: values.email,
      phone_number: values.contact,
      password: values.password,
      type: "customer",
    });

    if(data?.token){
      localStorage.setItem("crmClientToken", data.token);
      navigate("/verificationCode");
    }

  };

  return (
    <div className="w-full min-h-[99vh] flex justify-center items-center max-w-screen-sm mx-auto">
      <div className={css.wrapper}>
        <div className={css.top}>
          <p>Account Registration</p>
        </div>

        {/* Display Errors  */}
        <ApiErrorDisplay apiErrors={apiErrors} className="mx-auto mt-3" />

        <Formik
          initialValues={initialValues}
          validationSchema={signupEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form className={`${css.emailForm} mt-12`}>
              <div className={css.inputContainer}>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Smith"
                  className={
                    errors.name && touched.name && "inputBottomBorder"
                  }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorSpan}
                />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className={
                    errors.email && touched.email && "inputBottomBorder"
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorSpan}
                />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="contact">Contact</label>
                <PhoneInput
                  country={"us"}
                  inputClass={
                    touched.contact && errors.contact
                      ? "mobileInput inputBottomBorder"
                      : "mobileInput"
                  }
                  placeholder="(485)-845-8542658"
                  containerClass={css.inputContainer}
                  name="contact"
                  value=""
                  containerStyle={{
                    height: "3rem",
                    marginTop: "27px",
                  }}
                  inputStyle={{
                    height: "3rem",
                    width: "100%",
                  }}
                  buttonStyle={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    background: "#fff",
                  }}
                  onChange={(contact) => {
                    setFieldValue("contact", contact);
                    setIsContactErr(false);
                  }}
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className={css.errorSpan}
                />

                {isContactErr && (
                  <span className={css.errorSpan}>Contact is Required</span>
                )}
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className={
                    errors.password && touched.password && "inputBottomBorder"
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errorSpan}
                />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="confirmPass">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPass"
                  id="confirmPass"
                  placeholder="********"
                  className={
                    errors.confirmPass &&
                    touched.confirmPass &&
                    "inputBottomBorder"
                  }
                />
                <ErrorMessage
                  name="confirmPass"
                  component="div"
                  className={css.errorSpan}
                />
              </div>

              <div
                className={`${css.button} flex items-center justify-between w-full`}
                style={{ justifyContent: "space-between" }}
              >
                <p className="text-medium font-medium text-default-600">
                  <span>Already have an account?</span>{" "}
                  <NavLink className="text-blue-400" to={"/login"}>
                    Login
                  </NavLink>
                </p>
                <Button isLoading={isLoading} type="submit">
                  Next
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Email;
