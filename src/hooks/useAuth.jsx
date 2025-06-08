import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/services/slices/auth/authSlice";
import { useValidateTokenQuery } from "@/services/api/authApi/authApi";

const useAuthGuard = (setShow) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: token,
    isLoading,
    isSuccess,
    error,
  } = useValidateTokenQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    const authToken = localStorage.getItem(
      import.meta.env.VITE_API_TOKEN_KEY
    );

    if (!authToken) {
      navigate("/");
      return;
    }

    if (isLoading) return;

    if (error) {
      setShow(false);
      navigate("/login");
      return;
    }

    const user = {
      ...token?.user,
      phoneVerified: token?.phone_verified,
      notificationCount: token?.notifications,
    };

    dispatch(setAuth(user));

    if (user?.phoneVerified === 0) {
      navigate("/verificationCode");
      setShow(false);
      return;
    }

    if (isSuccess) {
      setShow(true);
    }
  }, [token, isSuccess, error, isLoading]);
};

export default useAuthGuard;
