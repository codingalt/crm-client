import * as Yup from "yup";

export const signupEmailSchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  contact: Yup.string().required("Contact is Required"),
  password: Yup.string()
    .min(6)
    .max(255, "Maximun characters are 255")
    .required("Password is Required"),
  confirmPass: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password not matched"),
});

export const verificationCodeSchema = Yup.object({
  code: Yup.number()
    .required("Verification code is Required")
    .test(
      "len",
      "Verification code must be exactly 6 characters",
      (val) => val.toString().length === 6
    ),
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

export const updateProfileSchema = Yup.object({
  name: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  gender: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Gender is Required"),
  address: Yup.string().max(255, "Maximun characters are 255"),
});

export const resetPasswordSchema = Yup.object({
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
});

export const NewPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8)
    .max(255, "Maximun characters are 255")
    .required("Password is Required"),
  confirmPass: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password not matched"),
});
