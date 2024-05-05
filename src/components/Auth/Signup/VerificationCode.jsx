import React from "react";
import css from "./Signup.module.scss";
import { useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { verificationCodeSchema } from "../../../utils/validations/AuthValidation";

const VerificationCode = () => {
  const navigate = useNavigate();
  const initialValues = {
    code: "",
  };

  // const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {};

  return (
    <div className="w-full h-[99vh] flex justify-center items-center max-w-screen-sm mx-auto">
      <div className={css.wrapper}>
        <div className={css.top}>
          <p>Verification Code</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={verificationCodeSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.inputContainer}>
                <Field
                  type="number"
                  value="122122"
                  name="code"
                  id="code"
                  placeholder="Enter your code"
                  className={errors.code && touched.code && "inputBottomBorder"}
                  style={{ letterSpacing: "30px" }}
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className={css.errorSpan}
                />

                <div
                  className={`flex justify-between items-center ${css.note}`}
                >
                  <p>The verification code is sent to the number 050-5050505</p>
                  <button type="button">Send Again</button>
                </div>
              </div>

              <div className={css.button}>
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className={css.backBtn}
                >
                  Back
                </button>
                <button
                  onClick={() => navigate("/personalInformation")}
                  type="submit"
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerificationCode;
