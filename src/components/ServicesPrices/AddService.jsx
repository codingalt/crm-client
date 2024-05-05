import React from "react";
import css from "./Services.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Avatar, Chip, Input, Select, SelectItem } from "@nextui-org/react";
import { FaCamera, FaUser } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { RiUser3Fill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { MdCategory } from "react-icons/md";

const tagsData = [
  { id: 0, name: "Short hair" },
  { id: 1, name: "Draft" },
  { id: 2, name: "Shave" },
  { id: 3, name: "Facial" },
  { id: 4, name: "Massage" },
];

const genderData = [
  { id: 0, name: "General" },
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
  { id: 3, name: "Other" },
];

const AddService = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  // const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (values) => {};

  return (
    <div className={`${css.addService} max-w-screen-lg`}>
      <div className={css.heading}>
        <p>Adding a new service</p>
      </div>

      <Formik
        initialValues={initialValues}
        //   validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form>
            <div className="w-full mb-8 flex justify-between items-center gap-16">
              <div className={css.inputContainer}>
                <label htmlFor="name">Queue Name</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="Enter Queue name"
                    startContent={
                      <BiSolidPencil className="text-[25px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="name">Name of Song Giver</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="Enter Song giver name"
                    startContent={
                      <FaUser className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="w-full mb-8 flex justify-between items-center gap-16">
              <div className={css.inputContainer}>
                <label htmlFor="name">Category</label>
                <div className={css.input}>
                  <Select
                    items={tagsData}
                    isRequired
                    variant="underlined"
                    placeholder="Select Category"
                    labelPlacement="outside"
                    classNames={{
                      base: "max-w-xxl",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    startContent={
                      <BiSolidCategory className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  >
                    {(tag) => (
                      <SelectItem
                        className="bg-white"
                        key={tag.id}
                        textValue={tag.name}
                        value={tag.id}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">{tag?.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <ErrorMessage name="name" />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="name">Sub Category</label>
                <div className={css.input}>
                  <Select
                    items={tagsData}
                    isRequired
                    variant="underlined"
                    placeholder="Select Sub Category"
                    labelPlacement="outside"
                    classNames={{
                      base: "max-w-xxl",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    startContent={
                      <MdCategory className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  >
                    {(tag) => (
                      <SelectItem
                        className="bg-white"
                        key={tag.id}
                        textValue={tag.name}
                        value={tag.id}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">{tag?.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="w-full mb-8 flex justify-between items-center gap-16">
              <div className={css.inputContainer}>
                <label htmlFor="name">Select Tags</label>
                <div className={css.input}>
                  <Select
                    items={tagsData}
                    isRequired
                    variant="underlined"
                    isMultiline={true}
                    selectionMode="multiple"
                    placeholder="Select tags"
                    labelPlacement="outside"
                    classNames={{
                      base: "max-w-xxl",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(items) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <Chip
                              className="py-2"
                              style={{
                                background: "#13D3B3",
                                color: "#fff",
                                marginBottom: "10px",
                              }}
                              key={item.key}
                            >
                              {item.data.name}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(tag) => (
                      <SelectItem
                        className="bg-white"
                        key={tag.id}
                        textValue={tag.name}
                        value={tag.id}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">{tag?.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <ErrorMessage name="name" />
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="name">Length of hole</label>
                <div className={css.input}>
                  <Input
                    type="text"
                    variant="underlined"
                    placeholder="Eg: 30 mints"
                    startContent={
                      <MdOutlineAccessTimeFilled className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-16">
              <div className={css.inputContainer}>
                <label htmlFor="name">Gender</label>
                <div className={css.input}>
                  <Select
                    items={genderData}
                    isRequired
                    variant="underlined"
                    placeholder="Select gender"
                    labelPlacement="outside"
                    startContent={
                      <RiUser3Fill className="text-[21px] text-[#01AB8E] mr-2 pointer-events-none flex-shrink-0" />
                    }
                    classNames={{
                      base: "max-w-xxl",
                      trigger: "min-h-unit-12 py-2",
                    }}
                  >
                    {(tag) => (
                      <SelectItem
                        className="bg-white"
                        key={tag.id}
                        textValue={tag.name}
                        value={tag.id}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">{tag?.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className={css.buttons}>
              <button>Draft</button>
              <button type="submit">Add Service</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddService;
