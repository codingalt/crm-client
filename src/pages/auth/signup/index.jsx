import React, { useEffect, useState } from "react";
import css from "./signup.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupEmailSchema } from "../../../utils/validations/AuthValidation";
import { useRegisterUserMutation } from "../../../services/api/authApi/authApi";
import { Button, Image } from "@nextui-org/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import Location from "./Location";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";
import { Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isContactErr, setIsContactErr] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);
  // States for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
  const { isLoading, error } = res;

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
    // Validate contact
    if (values.contact.length < 5) {
      setIsContactErr(true);
      return;
    }

    // Validate address
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
      localStorage.setItem(import.meta.env.VITE_API_TOKEN_KEY, data.token);
      localStorage.setItem("clientContact", values.contact);
      navigate(`/verificationCode`);
    }
  };

  return (
    <>
      <div className="w-full bg-hintSecondary pb-16">
        <div className="w-full md:min-h-screen flex flex-col mx-auto">
          <div className="w-full py-7 md:pb-0 pb-5 sm:py-7 px-8 sm:px-16 flex items-center gap-3">
            <div className="w-[35px] md:w-10">
              <Image src={logo} width="100%" height="100%" />
            </div>
            <p className="font-bold text-lg text-[#01abab]">Hint</p>
          </div>
          <div className="w-full bg-white p-12 border rounded-xl flex justify-center max-w-2xl mx-auto">
            <div className={css.wrapper}>
              <div className={css.top}>
                <h2>{t("accountRegistration")}</h2>
                <p className="text-sm flex items-center gap-1.5 font-normal leading-relaxed text-default-600 mt-1">
                  <span>{t("alreadyHaveAccount")}</span>{" "}
                  <NavLink
                    className="text-hintPrimary border-b border-b-hintPrimary hover:text-hintPrimary/90"
                    to={"/"}
                  >
                    {t("login")}
                  </NavLink>
                </p>
              </div>

              {/* Display Errors  */}
              <ApiErrorDisplay apiErrors={apiErrors} className="mx-auto mt-3" />

              <Formik
                initialValues={initialValues}
                validationSchema={signupEmailSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, setFieldValue, touched }) => (
                  <Form className={`${css.emailForm} mt-5 md:mt-6`}>
                    <div className={css.inputContainer}>
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
                        <span className={css.errorSpan}>
                          Contact is Required
                        </span>
                      )}
                    </div>

                    <div className={css.inputContainer}>
                      <Location
                        errors={errors}
                        touched={touched}
                        setIsAddressError={setIsAddressError}
                        setFieldValue={setFieldValue}
                      />
                      {isAddressError && (
                        <div className={css.errorSpan}>
                          Address is Required.
                        </div>
                      )}
                    </div>

                    {/* Password field with visibility toggle */}
                    <div className={css.inputContainer}>
                      <div className="relative w-full">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder={t("enterPassword")}
                          className={`w-full ${
                            errors.password &&
                            touched.password &&
                            "inputBottomBorder"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={css.errorSpan}
                      />
                    </div>

                    {/* Confirm Password field with visibility toggle */}
                    <div className={css.inputContainer}>
                      <div className="relative w-full">
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPass"
                          id="confirmPass"
                          placeholder={t("confirmPassword")}
                          className={`w-full ${
                            errors.confirmPass &&
                            touched.confirmPass &&
                            "inputBottomBorder"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPass"
                        component="div"
                        className={css.errorSpan}
                      />
                    </div>

                    {/* Terms agreement section */}
                    <div className="mt-10">
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-gray-700">
                          By creating an account, you agree to our{" "}
                          <NavLink
                            to="/terms"
                            className="text-hintPrimary border-b border-b-hintPrimary"
                          >
                            Terms
                          </NavLink>{" "}
                          and have read and acknowledge the{" "}
                          <NavLink
                            to="/privacy"
                            className="text-hintPrimary border-b border-b-hintPrimary"
                          >
                            Global Privacy Statement
                          </NavLink>
                          .
                        </p>
                      </div>
                   
                    </div>

                    <div
                      className={`${css.button} flex items-center w-full !mt-7`}
                    >
                      <Button isLoading={isLoading} type="submit">
                        {t("next")}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
