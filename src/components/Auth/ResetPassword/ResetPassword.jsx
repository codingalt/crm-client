import React, { useEffect } from "react";
import css from "./ResetPassword.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordSchema } from "../../../utils/validations/AuthValidation";
import { Button, Image } from "@nextui-org/react";
import { useResetPasswordSendLinkMutation } from "../../../services/api/authApi/authApi";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";
import { FaArrowLeftLong, FaFingerprint } from "react-icons/fa6";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const [resetPassword, res] = useResetPasswordSendLinkMutation();
  const { isLoading, isSuccess, error } = res;

  useEffect(()=> {
    if(isSuccess){
      navigate("/check-email");
    }
  },[isSuccess])

  const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {
    await resetPassword({
      email: values.email,
    });
  };

  return (
    <>
      <div className="w-full min-h-[97vh] flex flex-col mx-auto">
        <div className="w-full py-6 sm:py-7 px-8 sm:px-16 flex items-center gap-3 mb-4 md:mb-7">
          <div className="w-[40px] md:w-11">
            <Image src={logo} width="100%" height="100%" />
          </div>
          <p className="font-bold text-lg text-[#01abab]">Hint</p>
        </div>
        <div className="w-full flex items-center justify-center max-w-screen-sm mx-auto">
          <div className={`${css.wrapper} scrollbar-hide`}>
            <div className={css.top}>
              <div className="w-14 h-14 text-default-700 text-2xl mb-7 sm:mb-6 rounded-xl border shadow-sm flex items-center justify-center">
                <FaFingerprint />
              </div>
              <p>{t("forgotPassword")}</p>
              <span className="text-default-500 font-medium mt-3">
                No worries, we'll send you reset instructions.
              </span>
            </div>

            {/* Display Errors  */}
            <ApiErrorDisplay apiErrors={apiErrors} className="mx-auto mt-3" />

            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordSchema}
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

                  <div className={css.button}>
                    <Button
                      className="w-full"
                      isLoading={isLoading}
                      type="submit"
                    >
                      {t("resetPassword")}
                    </Button>
                  </div>

                  <p className="text-medium text-center font-normal text-default-600 mt-14">
                    <NavLink
                      className="text-gray-500 flex items-center justify-center gap-3"
                      to={"/"}
                    >
                      <FaArrowLeftLong />
                      <span>{t("backToLogin")}</span>
                    </NavLink>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
