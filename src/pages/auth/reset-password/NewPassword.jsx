import React, { useEffect, useState } from "react";
import css from "./ResetPassword.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewPasswordSchema } from "../../../utils/validations/AuthValidation";
import { Button, Image } from "@nextui-org/react";
import {
  useSetNewPasswordMutation,
  useVerifyResetPasswordLinkQuery,
} from "../../../services/api/authApi/authApi";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";
import { CgPassword } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { MdErrorOutline } from "react-icons/md";

const NewPassword = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPass: "",
  };

  const [setNewPassword, res] = useSetNewPasswordMutation();
  const { isLoading, isSuccess, error } = res;

  useEffect(() => {
    if (isSuccess) {
      navigate("/reset-password/success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      if (error?.status == 422) {
        setErrorMessage("Link Epired!");
      } else if (error?.status !== 422 || error?.status == "FETCH_ERROR") {
        setErrorMessage(t("somethingWentWrong"));
      }
    }
  }, [error]);

  const apiErrors = useApiErrorHandling(error && error?.status != 422 && error);

  const handleSubmit = async (values) => {
    await setNewPassword({
      email: email,
      token: token,
      password: values.password,
      password_confirmation: values.confirmPass,
    });
  };

  return (
    <>
    <div className="w-full bg-hintSecondary pb-10">
      <div className="w-full min-h-[95vh] flex flex-col mx-auto">
        <div className="w-full py-6 sm:pt-7 sm:pb-6 px-8 sm:px-16 flex items-center gap-3 mb-4 md:mb-7">
          <div className="w-[40px] md:w-11">
            <Image src={logo} width="100%" height="100%" />
          </div>
          <p className="font-bold text-lg text-[#01abab]">Hint</p>
        </div>
        <div className="w-full flex items-center justify-center max-w-screen-sm mx-auto">
          <div className={`${css.wrapper} scrollbar-hide`}>
            <div className={css.top}>
              <div className="w-14 h-14 text-2xl mb-5 sm:mb-4 rounded-xl border border-gray-300 shadow-sm flex items-center justify-center">
                <CgPassword />
              </div>
              <p>{t("setNewPassword")}</p>
            </div>

            {/* Display Errors  */}
            <ApiErrorDisplay apiErrors={apiErrors} className="mx-auto mt-3" />

            {/* Custom Error  */}
            {error && error?.status == 422 && (
              <div className="mx-auto mt-3 bg-red-50 rounded-lg px-6 py-3 border border-red-300 text-red-700">
                The link you are trying to validate has been expired.
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={NewPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, touched }) => (
                <Form className={css.loginForm}>
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

                  <div className={css.button}>
                    <Button
                      className="w-full"
                      isLoading={isLoading}
                      type="submit"
                    >
                      {t("setNewPassword")}
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

export default NewPassword;
