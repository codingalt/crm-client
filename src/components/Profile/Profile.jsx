import React, { useEffect, useRef, useState } from "react";
import css from "./Profile.module.scss";
import { Button, Image, Input, Switch } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BiSolidPencil } from "react-icons/bi";
import h1 from "../../assets/h1.jpg";
import h2 from "../../assets/h2.jpg";
import h3 from "../../assets/h3.jpg";
import h4 from "../../assets/h4.jpg";
import ImageComponent from "../ui/Image/ImagePostsComponent";
import { businessProfileSchema } from "../../utils/validations/AuthValidation";
import { useGetBusinessProfileQuery } from "../../services/api/profileApi/profileApi";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const submitButton = useRef();

  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    email: "",
    contact: "",
    description: "",
  });

  const { data,isLoading } = useGetBusinessProfileQuery();
  console.log(data);

  useEffect(()=>{
    if(data){
      setInitialValues((prev) => ({
        name: data.business.name,
        address: data.business.address,
        email: data.business.email,
        contact: data.business.contact,
        description: data.business.description,
      }));
    }
  },[data]);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const handleChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setIsEditing(true);
  };

  return (
    <div className={`${css.wrapper}`}>
      <div className={css.headingTop}>
        <h1>Business Details</h1>
        {isEditing && (
          <div className={css.buttons}>
            <Button
              className="px-3 md:px-6"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#01AB8E] px-3 md:px-5 text-white" type="submit">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className={css.profileWrap}>
        <div className={css.left}>
          <Formik enableReinitialize={true} validationSchema={businessProfileSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ errors, setFieldValue, touched, values }) => (
              <Form>
                <div className="w-full mb-8 flex justify-between items-center">
                  <div className={css.inputContainer}>
                    <label htmlFor="name">Business Name</label>
                    <div className={css.input}>
                      <Input
                        type="text"
                        variant="underlined"
                        name="name"
                        id="name"
                        value={values.name}
                        placeholder="Arya Stark"
                        className={
                          errors.name && touched.name && "inputBottomBorder"
                        }
                        onChange={(e) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="name"
                      className={css.errorSpan}
                    />
                  </div>
                </div>

                <div className="w-full mb-8 flex justify-between items-center">
                  <div className={css.inputContainer}>
                    <label htmlFor="email">Business Email</label>
                    <div className={css.input}>
                      <Input
                        type="email"
                        variant="underlined"
                        name="email"
                        id="email"
                        value={values.email}
                        placeholder="codesmanufactory@gmail.com"
                        className={
                          errors.email && touched.email && "inputBottomBorder"
                        }
                        onChange={(e) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="email"
                      className={css.errorSpan}
                    />
                  </div>
                </div>

                <div className="w-full mb-8 flex justify-between items-center">
                  <div className={css.inputContainer}>
                    <label htmlFor="address">Business Address</label>
                    <div className={css.input}>
                      <Input
                        type="text"
                        variant="underlined"
                        name="address"
                        id="address"
                        value={values.address}
                        placeholder="Northern Bypass bossan road gulgasht, Multan"
                        className={
                          errors.address &&
                          touched.address &&
                          "inputBottomBorder"
                        }
                        onChange={(e) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="address"
                      className={css.errorSpan}
                    />
                  </div>
                </div>

                <div className="w-full mb-8 flex justify-between items-center">
                  <div className={css.inputContainer}>
                    <label htmlFor="description">Business Description</label>
                    <div className={css.input}>
                      <Input
                        type="text"
                        variant="underlined"
                        name="description"
                        id="description"
                        value={values.description}
                        placeholder="This is a test description for the test"
                        className={
                          errors.description &&
                          touched.description &&
                          "inputBottomBorder"
                        }
                        onChange={(e) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="description"
                      className={css.errorSpan}
                    />
                  </div>
                </div>

                <div className="w-full mb-8 flex justify-between items-center">
                  <div className={css.inputContainer}>
                    <label htmlFor="description">Photos</label>

                    <div className={css.images}>
                      <div className={css.img}>
                        <ImageComponent src={h1} alt="" />
                      </div>
                      <div className={css.img}>
                        <ImageComponent src={h2} alt="" />
                      </div>
                      <div className={css.img}>
                        <ImageComponent src={h3} alt="" />
                      </div>
                      <div className={css.img}>
                        <ImageComponent src={h4} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className={css.right}>
          <div className={css.top}>
            <p>Opening Hours</p>
            <div className="px-6 py-0.5 bg-[#01AB8E] text-white flex items-center justify-center rounded-full">
              Hours
            </div>
          </div>

          <div className={css.information}>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Monday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Tuesday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Wednesday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Thursday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Friday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Saturday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
            <div className={css.item}>
              <div className="flex items-center gap-1">
                <Switch
                  onValueChange={(e) => {}}
                  size="sm"
                  color="primary"
                  aria-label="Switch"
                />
                <p>Sunday</p>
              </div>
              <span>10:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
