import React from "react";
import {useNavigate} from "react-router-dom"
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const LoginRequiredCard = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-full max-w-sm mx-7 md:mx-auto border rounded-xl">
        <div className="py-8 px-5 md:p-8">
          {/* Simple Icon */}
          <div className="mb-5 flex justify-center">
            <div className="p-4 rounded-full bg-hintSecondary">
              <LogIn className="w-7 h-7 text-hintPrimary" />
            </div>
          </div>

          <h2 className="text-[#111418] tracking-light text-xl md:text-2xl font-semibold leading-tight text-center pb-2">
            Please log in to continue
          </h2>

          <p className="text-gray-500 text-xs md:text-base font-normal leading-normal pb-3 pt-1 text-center">
            To access this feature, you need to be logged in. Please proceed to
            log in.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 mt-5">
            <Button onClick={() => navigate("/login")} className="w-full md:h-11">
              Sign in
            </Button>

            <div className="text-center">
              <Button
                onClick={() => navigate("/signup")}
                variant="link"
                className="text-sm text-gray-500"
              >
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredCard;
