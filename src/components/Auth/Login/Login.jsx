import React, { useEffect, useState } from "react";
import css from "./Login.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../utils/validations/AuthValidation";
import { Button, Image } from "@nextui-org/react";
import {
  useLoginUserMutation,
  useValidateTokenQuery,
} from "../../../services/api/authApi/authApi";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import ClipSpinner from "../../Loader/ClipSpinner";
import { setToken } from "../../../utils/helpers/tokenUtils";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";

const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  const token = localStorage.getItem("crmClientToken");
 
  const {
    data,
    isLoading: isLoadingValidate,
    isSuccess: isSuccessValidate,
    error: isErrorValidate,
  } = useValidateTokenQuery(null, {
    skip: !token,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!token) {
      setShow(true);
    } else {
      if (!isLoadingValidate && isSuccessValidate) {
      
        navigate(redirect ? redirect : "/dashboard");
      } else if (!isLoadingValidate && isErrorValidate) {
        setShow(true);
        localStorage.removeItem("crmClientToken");
      }
    }
  }, [data, isLoadingValidate, isErrorValidate, isSuccessValidate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const [loginUser, res] = useLoginUserMutation();
  const { isLoading, isSuccess, error } = res;

  const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {
    const { data } = await loginUser({
      email: values.email,
      password: values.password,
    });

    if (data?.token) {
      setToken(data.token);
     
      navigate(redirect ? redirect : "/dashboard");
    }
  };

  if (isLoadingValidate) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999",
          paddingBottom: "3rem",
        }}
      >
        <ClipSpinner color="#01ABAB" size={45} speedMultiplier={0.85} />
      </div>
    );
  }

  return (
    <>
      {show && (
        <div className="w-full min-h-[97vh] flex justify-center items-center max-w-screen-sm mx-auto">
          <div className={css.wrapper}>
            <div className={css.top}>
              <div className="w-14 md:w-16 mb-10 mx-auto">
                <Image src={logo} width="100%" height="100%" />
              </div>
              <p>{t("signIn")}</p>
            </div>

            {/* Display Errors  */}
            <ApiErrorDisplay apiErrors={apiErrors} className="mx-auto mt-3" />

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, touched }) => (
                <Form className={css.loginForm}>
                  <div className={css.inputContainer}>
                    <label htmlFor="name">{t("email")}</label>
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
                    <label htmlFor="password">{t("password")}</label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t("enterPassword")}
                      className={
                        errors.password &&
                        touched.password &&
                        "inputBottomBorder"
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={css.errorSpan}
                    />
                  </div>

                  <div className={css.button}>
                    <button
                      type="button"
                      className={`border-none ${css.backBtn}`}
                      style={{
                        width: "auto",
                        fontWeight: "500",
                        fontSize: "18px",
                      }}
                    >
                      {t("forgotPassword")}
                    </button>
                    <Button isLoading={isLoading} type="submit">
                      {t("enter")}
                    </Button>
                  </div>

                  <p className="text-medium text-center font-medium text-default-600 mt-14">
                    <span>{t("dontHaveAccount")}</span>{" "}
                    <NavLink className="text-blue-400" to={"/signup"}>
                      {t("register")}
                    </NavLink>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
