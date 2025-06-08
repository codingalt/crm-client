import React, { useEffect, useState } from "react";
import css from "./verification-code.module.scss";
import { useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { verificationCodeSchema } from "@/utils/validations/AuthValidation";
import { Button, Image } from "@nextui-org/react";
import {
  useReSendVerificationCodeMutation,
  useValidateCodeMutation,
} from "@/services/api/authApi/authApi";
import ApiErrorDisplay from "@/hooks/ApiErrorDisplay";
import { formatTime } from "@/utils/helpers/helpers";
import { toastError, toastSuccess } from "@/components/common/toast/Toast";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.svg";

const VerificationCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { user } = useSelector((store) => store.auth);
  const clientContact = localStorage.getItem("clientContact");

  useEffect(() => {
    if (user) {
      if (user.phoneVerified === 0) {
        setShow(true);
      } else if (user.phoneVerified === 1) {
        navigate(-1);
      }
    }
  }, [user]);

  const initialValues = {
    code: "",
  };

  const [validateCodeError, setValidateCodeError] = useState(null);

  const [validateCode, res] = useValidateCodeMutation();
  const { isLoading, isSuccess, error } = res;

  useEffect(() => {
    if (error) {
      if (error.status === 422) {
        toastError("Incorrect OTP. Please try again");
      } else {
        const apiErrors = useApiErrorHandling(error);
        setValidateCodeError(apiErrors);
      }
    }
  }, [error]);

  // Resend Code Mutation
  const [resendCode, resp] = useReSendVerificationCodeMutation();
  const {
    isLoading: isLoadingResend,
    isSuccess: isSuccessResend,
    error: isErrorResend,
  } = resp;

  useEffect(() => {
    if (isSuccessResend) {
      toastSuccess("Verification code sent successfully");
    }
  }, [isSuccessResend]);

  const apiErrors2 = useApiErrorHandling(isErrorResend);

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleResendCode = async () => {
    await resendCode();
    setRemainingTime(120);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess]);

  const handleSubmit = async (values) => {
    await validateCode({ code: values.code });
  };

  return (
    <div className="w-full bg-hintSecondary h-screen overflow-hidden pb-10">
      <div className="w-full h-[90vh] mx-auto">
        <div className="w-full py-7 md:pb-0 pb-5 sm:py-7 px-8 sm:px-16 flex items-center gap-3 mb-10">
          <div className="w-[35px] md:w-10">
            <Image src={logo} width="100%" height="100%" />
          </div>
          <p className="font-bold text-lg text-[#01abab]">Hint</p>
        </div>
        {show && (
          <div
            className={`${css.wrapper} bg-white p-12 border rounded-xl flex flex-col max-w-xl`}
          >
            <div className={css.top}>
              <h2>{t("verificationCode")}</h2>
            </div>

            {/* Display Errors  */}
            <ApiErrorDisplay
              apiErrors={validateCodeError}
              className="mx-auto mt-3"
            />
            <ApiErrorDisplay apiErrors={apiErrors2} className="mx-auto mt-3" />

            <Formik
              initialValues={initialValues}
              validationSchema={verificationCodeSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, touched }) => (
                <Form className={`${css.verificationFotm} w-full mt-6 md:mt-8`}>
                  <div className={css.inputContainer}>
                    <Field
                      type="number"
                      name="code"
                      id="code"
                      maxLength={6}
                      placeholder="122122"
                      className={
                        errors.code && touched.code && "inputBottomBorder"
                      }
                      style={{ letterSpacing: "30px" }}
                    />
                    <ErrorMessage
                      name="code"
                      component="div"
                      className={css.errorSpan}
                    />

                    <div className={`flex gap-2 flex-col ${css.note}`}>
                      <p className="text-sm">
                        {t("verificationCodeSent")} {clientContact}
                      </p>
                      <div className="flex">
                        {remainingTime > 0 ? (
                          <span className="text-medium text-hintPrimary font-semibold">
                            {formatTime(remainingTime)}
                          </span>
                        ) : (
                          <Button
                            isLoading={isLoadingResend}
                            onClick={handleResendCode}
                            type="button"
                            className="bg-transparent font-semibold pl-0 text-hintPrimary"
                            disabled={isLoadingResend || remainingTime > 0}
                            style={
                              isLoadingResend || remainingTime > 0
                                ? {
                                    userSelect: "none",
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }
                                : {}
                            }
                          >
                            {t("resendCode")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={css.button}>
                    <Button isLoading={isLoading} type="submit">
                      Next
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationCodePage;
