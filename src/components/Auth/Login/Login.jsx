import React from "react";
import css from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../utils/validations/AuthValidation";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  // const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {};

  return (
    <div className="w-full h-[99vh] flex justify-center items-center max-w-screen-sm mx-auto">
      <div className={css.wrapper}>
        <div className={css.top}>
          <p>Connection</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.inputContainer}>
                <label htmlFor="name">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
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
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="***********"
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

              <div className={css.button}>
                <button
                  type="button"
                  className={`border-none ${css.backBtn}`}
                  style={{ width: "auto", fontWeight: "500", fontSize: "18px" }}
                >
                  Forgot Password ?
                </button>
                <button onClick={() => navigate("/dashboard")} type="submit">
                  Enter
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
