import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../services/slices/auth/authSlice";
import { ClipLoader } from "react-spinners";
import { useValidateTokenQuery } from "../../services/api/authApi/authApi";
import { useMediaQuery } from "@uidotdev/usehooks";

const Protected = ({ Component }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const {
    data: token,
    isLoading,
    isSuccess,
    error,
  } = useValidateTokenQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    const authToken = localStorage.getItem("crmClientToken");
    if (!authToken) {
      navigate("/");
    } else {
      // Check for token validity
      if (!isLoading) {
        const user = {
          ...token?.user,
          phoneVerified: token?.phone_verified,
          notificationCount: token?.notifications,
        };
        dispatch(setAuth(user));

        if (user?.phoneVerified === 0){
          navigate("/verificationCode");
          setShow(true);
          return;
        }

          if (!isLoading && isSuccess) {
            setShow(true);
          } else if (!isLoading && error) {
            setShow(false);
            navigate("/");
          }
      }
    }
  }, [token, isSuccess, error, isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999",
          paddingBottom: "3rem",
        }}
      >
        <ClipLoader color="#01AB8E" size={isSmallDevice ? 34 : 45} speedMultiplier={0.85} />
      </div>
    );
  }

  return show && <Component />;
};

export default Protected;
