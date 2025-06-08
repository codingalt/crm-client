import { Button, Image } from "@nextui-org/react";
import React from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo2.svg";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <div className="w-full md:max-w-screen-md lg:max-w-screen-2xl h-screen mx-auto pt-5 md:pt-0 px-4 md:px-0 lg:px-10 xl:px-14">
        <header className="py-7 pt-11 md:pt-6 w-full">
          <div className="w-32 md:w-36 -ml-1 md:ml-0">
            <Image src={logo} width={"100%"} height={"100%"} alt="Logo" />
          </div>
        </header>

        <div
          style={{
            gap: "11px",
          }}
          className="w-full flex items-center justify-center flex-col mt-32 md:mt-16"
        >
          <div className="w-[90px] h-[90px] bg-green-600 text-white rounded-full mx-auto my-1 flex items-center justify-center">
            <TiTick fontSize={76} />
          </div>
          <p className="text-xl font-bold mb-0">Appointment Confirmed!</p>
          <p className="text-default-800 -mt-1 text-sm max-w-sm text-center font-medium">
            Your appointment has been successfully confirmed. Thank you for your
            interest!
          </p>

          <Button
            color="primary"
            radius="full"
            size="lg"
            className="mt-12 md:mt-9 w-[80%] max-w-64 bg-[#01ABAB]"
            onClick={() => navigate(`/dashboard`)}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
