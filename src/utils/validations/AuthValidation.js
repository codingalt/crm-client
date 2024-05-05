import * as Yup from "yup";

export const signupEmailSchema = Yup.object({
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
});

export const verificationCodeSchema = Yup.object({
  code: Yup.number().required("Verification code is Required"),
});

export const personalInformationSchema = Yup.object({
  name: Yup.string().required("Buisness name is Required"),
  description: Yup.string().required("Buisness description is Required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6)
    .max(255, "Maximun characters are 255")
    .required("Password is Required"),
});
