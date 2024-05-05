import React from 'react'
import css from "./Signup.module.scss"
import { useNavigate } from 'react-router-dom';
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupEmailSchema } from '../../../utils/validations/AuthValidation';

const Email = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  // const apiErrors = useApiErrorHandling(error); 

   const handleSubmit = async (values) => {
    
   };

  return (
    <div className="w-full h-[99vh] flex justify-center items-center max-w-screen-sm mx-auto">
      <div className={css.wrapper}>
        <div className={css.top}>
          <p>Enrollment</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={signupEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.inputContainer}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="homoali32423@gmail.com"
                  className={
                    errors.email && touched.email && "inputBottomBorder"
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorSpan}
                />

                <div className={css.note}>
                  Abu/Verification code will be sent to you
                </div>
              </div>

              <div className={css.button}>
                <button
                  type="submit"
                  onClick={() => navigate("/verificationCode")}
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
}

export default Email