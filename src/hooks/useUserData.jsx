import { useValidateTokenQuery } from "@/services/api/authApi/authApi";

const useUserData = () => {
  const token = localStorage.getItem(import.meta.env.VITE_API_TOKEN_KEY); 

  const {
    data: tokenData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useValidateTokenQuery(null, {
    skip: !token, 
  });

  const user = tokenData?.user
    ? {
        ...tokenData.user,
        phoneVerified: tokenData?.phone_verified,
        notificationCount: tokenData?.notifications,
      }
    : null;

  return {
    user,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useUserData;
