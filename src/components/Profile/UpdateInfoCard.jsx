import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import css from "./Profile.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateProfileSchema } from "../../utils/validations/AuthValidation";
import { Button, DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import moment from "moment";

const UpdateInfoCard = ({
  data,
  setIsEditProfile,
  isLoadingBasicInfo,
  updateBasicInfo,
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(parseDate(moment().format("YYYY-MM-DD")));
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        name: data.name,
        email: data.email,
        gender: data.gender,
      });

      setDate(parseDate(moment(data.dob).format("YYYY-MM-DD")));
    }
  }, [data]);

  const handleSubmit = async (values) => {
      
      const birthDate = `${date.year}-${date.month}-${date.day}`;
    await updateBasicInfo({
      name: values.name,
      gender: values.gender,
      dob: birthDate,
    });
  };

  return (
    <div className="w-full flex flex-1 mt-5 sm:mt-9">
      <Formik
        initialValues={initialValues}
        validationSchema={updateProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, setFieldValue, touched }) => (
          <Form className={css.formWrap}>
            <div className="flex flex-col gap-1.5 mb-5">
              <label
                className="text-[#3C3C3C] text-medium sm:text-lg font-normal capitalize"
                htmlFor="name"
              >
                {t("name")}
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder={t("enterName")}
                className={errors.name && touched.name && "inputBorder"}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={"text-xs text-[#ff0000] font-normal mt-1"}
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label
                className="text-[#3C3C3C] text-medium sm:text-lg font-normal capitalize"
                htmlFor="gender"
              >
                {t("gender")}
              </label>
              <div className={css.customSelect}>
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className={errors.gender && touched.gender && "inputBorder"}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label
                className="text-[#3C3C3C] text-medium sm:text-lg font-normal capitalize"
                htmlFor="birthDate"
              >
                Birth Date
              </label>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <DatePicker
                  isRequired
                  label="Birth Date"
                  variant="bordered"
                  showMonthAndYearPickers
                  value={date}
                  onChange={setDate}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-5 mt-7 sm:mt-10">
              <div className="flex justify-end gap-3 items-center">
                <Button
                  onClick={() => setIsEditProfile(false)}
                  type="submit"
                  radius="md"
                  size="lg"
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#01abab] text-white"
                  radius="md"
                  size="lg"
                  isLoading={isLoadingBasicInfo}
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateInfoCard;
