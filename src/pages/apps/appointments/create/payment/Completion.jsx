import { Button } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Completion = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        gap: "11px",
      }}
      className="w-full h-screen flex items-center justify-center flex-col"
    >
      <div className="w-[80px] h-[80px] bg-green-600 text-white rounded-full mx-auto my-2 flex items-center justify-center">
        <TiTick fontSize={65} />
      </div>
      <p className="text-lg font-bold mb-0">{t("paymentSuccess")}!</p>

      <Button
        color="primary"
        radius="sm"
        className="mt-28 w-[80%] bg-[#01ABAB]"
        onClick={() => navigate(`/dashboard`)}
      >
        {t("goBack")}
      </Button>
    </div>
  );
};

export default Completion;
