import React, { useEffect, useState } from "react";
import css from "./Signup.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupEmailSchema } from "../../../utils/validations/AuthValidation";
import {
  useRegisterUserMutation,
} from "../../../services/api/authApi/authApi";
import { Button, Image } from "@nextui-org/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import { useDispatch } from "react-redux";
import Location from "./Location";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";

const Email = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isContactErr, setIsContactErr] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    contact: "",
    address: "",
    latLng: "",
    country: "",
    city: "",
    password: "",
    confirmPass: "",
  };

  const [registerUser, res] = useRegisterUserMutation();
  const { isLoading, isSuccess, error } = res;

  const apiErrors = useApiErrorHandling(error);

  useEffect(() => {
    if (error) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [error]);

  const handleSubmit = async (values) => {
    if (values.contact.length < 5) {
      setIsContactErr(true);
      return;
    }

    if (!values.address) {
      setIsAddressError(true);
      return;
    }

    const { data } = await registerUser({
      name: values.name,
      email: values.email,
      phone_number: values.contact,
      password: values.password,
      address: values.address,
      latLng: values.latLng,
      country: values.country,
      city: values.city,
      type: "customer",
    });

    if (data?.token) {
      localStorage.setItem("crmClientToken", data.token);
      localStorage.setItem("clientContact", values.contact);
      navigate(`/verificationCode`);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center max-w-screen-sm mx-auto">
        <div className={css.wrapper}>
          <div className={css.top}>
            <div className="w-14 md:w-16 mb-7 md:mb-9 mx-auto">
              <Image src={logo} width="100%" height="100%" />
            </div>
            <p>{t("accountRegistration")}</p>
          </div>

          {/* Display Errors  */}
          <ApiErrorDisplay apiErrors={apiErrors} className="mx-auto mt-3" />

          <Formik
            initialValues={initialValues}
            validationSchema={signupEmailSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue, touched }) => (
              <Form className={`${css.emailForm} mt-10`}>
                <div className={css.inputContainer}>
                  <label htmlFor="name">{t("name")}</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder={t("enterName")}
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
                  <label htmlFor="email">{t("email")}</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("enterEmail")}
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
                  <label htmlFor="contact">{t("contact")}</label>
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
                      marginBottom: "5px",
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
                  <label htmlFor="address">{t("address")}</label>
                  <Location
                    errors={errors}
                    touched={touched}
                    setIsAddressError={setIsAddressError}
                    setFieldValue={setFieldValue}
                  />
                  {isAddressError && (
                    <div className={css.errorSpan}>Address is Required.</div>
                  )}

                  {isContactErr && (
                    <span className={css.errorSpan}>Contact is Required</span>
                  )}
                </div>

                <div className={css.inputContainer}>
                  <label htmlFor="password">{t("password")}</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t("enterPassword")}
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
                  <label htmlFor="confirmPass">{t("confirmPassword")}</label>
                  <Field
                    type="password"
                    name="confirmPass"
                    id="confirmPass"
                    placeholder={t("confirmPassword")}
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
                  className={`${css.button} flex items-center justify-center w-full`}
                  style={{ justifyContent: "center" }}
                >
                  <Button isLoading={isLoading} type="submit">
                    {t("next")}
                  </Button>
                </div>

                <p className="text-sm text-center font-medium text-default-600 mt-10">
                  <span>{t("alreadyHaveAccount")}</span>{" "}
                  <NavLink className="text-blue-400 underline" to={"/"}>
                    {t("login")}
                  </NavLink>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Email;
