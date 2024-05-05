import React from "react";
import css from "./Signup.module.scss";
import { useNavigate } from "react-router-dom";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { personalInformationSchema } from "../../../utils/validations/AuthValidation";

const PersonalInformation = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
  };

  // const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {};

  return (
    <div className="w-full h-[99vh] flex justify-center items-center max-w-screen-sm mx-auto">
      <div className={css.wrapper}>
        <div className={css.top}>
          <p>Personal Information</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={personalInformationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.inputContainer}>
                <label htmlFor="name">Buisness Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter buisness Name"
                  className={errors.name && touched.name && "inputBottomBorder"}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorSpan}
                />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="description">Buisness Description</label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter buisness description"
                  className={
                    errors.description &&
                    touched.description &&
                    "inputBottomBorder"
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={css.errorSpan}
                />
              </div>

              <div className={css.button}>
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className={css.backBtn}
                >
                  Back
                </button>
                <button onClick={() => navigate("/login")} type="submit">
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

export default PersonalInformation;
