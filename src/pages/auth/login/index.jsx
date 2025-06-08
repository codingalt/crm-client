import React, { useEffect, useState } from "react";
import css from "./Login.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/utils/validations/AuthValidation";
import { Button } from "@nextui-org/react";
import {
  useLoginUserMutation,
  useValidateTokenQuery,
} from "@/services/api/authApi/authApi";
import ApiErrorDisplay from "@/hooks/ApiErrorDisplay";
import { setToken } from "@/utils/helpers/tokenUtils";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.svg";
import HintLoading from "@/components/common/loaders/HintLoading";
import { Eye, EyeOff } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imae-placeholder";

const LoginPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  const token = localStorage.getItem(import.meta.env.VITE_API_TOKEN_KEY);

  const {
    data,
    isLoading: isLoadingValidate,
    isSuccess: isSuccessValidate,
    error: isErrorValidate,
  } = useValidateTokenQuery(null, {
    skip: !token,
  });

  const [show, setShow] = useState(false);
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!token) {
      setShow(true);
    } else {
      if (!isLoadingValidate && isSuccessValidate) {
        navigate(redirect ? redirect : "/dashboard");
      } else if (!isLoadingValidate && isErrorValidate) {
        setShow(true);
        localStorage.removeItem(import.meta.env.VITE_API_TOKEN_KEY);
      }
    }
  }, [data, isLoadingValidate, isErrorValidate, isSuccessValidate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const [loginUser, res] = useLoginUserMutation();
  const { isLoading, error } = res;

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
    return <HintLoading />;
  }

  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-white md:bg-hintSecondary">
        {show && (
          <div className="w-full md:min-h-[97vh] px-6 sm:px-16 flex flex-col mx-auto">
            <div className="w-full py-7 pb-5 sm:py-7 flex items-center gap-3 mb-0 md:mb-7">
              <div className="w-[35px] md:w-10">
                <ImagePlaceholder src={logo} width="100%" height="100%" />
              </div>
              <p className="font-bold text-lg text-[#01abab]">Hint</p>
            </div>
            <div className="w-full bg-white p-0 md:p-10 md:rounded-xl md:border flex items-center justify-center max-w-md mx-auto">
              <div className={`${css.wrapper} scrollbar-hide`}>
                <div className={css.top}>
                  <h2>{t("signIn")}</h2>
                  <p className="text-xs flex items-center gap-1.5 font-normal leading-relaxed text-default-600 mt-4">
                    <span>{t("dontHaveAccount")}</span>{" "}
                    <NavLink
                      className="text-hintPrimary border-b border-b-hintPrimary hover:text-hintPrimary/90"
                      to={"/signup"}
                    >
                      {t("createAnAccount")}
                    </NavLink>
                  </p>
                </div>

                {/* Display Errors  */}
                <ApiErrorDisplay
                  apiErrors={apiErrors}
                  className="mx-auto mt-3"
                />

                <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, setFieldValue, touched }) => (
                    <Form className={css.loginForm}>
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
                        <label htmlFor="password">{t("password")}</label>
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

                      <div className={css.button}>
                        <NavLink
                          to="/forgot-password"
                          className={`text-hintPrimary leading-normal hover:text-hintPrimary/90 border-b border-b-hintPrimary text-xs`}
                          style={{
                            width: "auto",
                            fontWeight: "400",
                          }}
                        >
                          {t("forgotPassword")}
                        </NavLink>
                        <Button isLoading={isLoading} type="submit">
                          {t("login")}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
