import React, { useState, useRef, useEffect } from "react";
import css from "./Profile.module.scss";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";
import avatar from "../../assets/user2.png";
import { IoCameraOutline } from "react-icons/io5";
import InformationCard from "./InformationCard";
import { toastError, toastSuccess } from "../Toast/Toast";
import { useGetUserProfileDataQuery, useUpdateProfileImageMutation, useUpdateUserBasicInfoMutation } from "../../services/api/profileApi/profileApi";
import { Skeleton } from "@nextui-org/react";
import { useApiErrorHandling } from "../../hooks/useApiErrors";

const Profile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  // Get Profile Data 
  const { data, isLoading,error,refetch } = useGetUserProfileDataQuery()
  const user = data?.user;

  // Update Profile Picture 
  const [updateProfileImage, res] = useUpdateProfileImageMutation();
  const {error: errorProfileImage} = res;

  useApiErrorHandling(errorProfileImage);

  useEffect(() => {
    if (
      errorProfileImage &&
      errorProfileImage.status !== 500 &&
      errorProfileImage.status != "FETCH_ERROR"
    ) {
      toastError("Failed to update profile picture.");
      setImage(null);
    }
  }, [errorProfileImage]);

  // Update Basic Information 
  const [updateBasicInfo, res2] = useUpdateUserBasicInfoMutation();
  const { error: errorBasicInfo, isLoading: isLoadingBasicInfo, isSuccess: isSuccessBasicInfo} = res2;

  useApiErrorHandling(errorBasicInfo);

  useEffect(() => {
    if (isSuccessBasicInfo) {
      toastSuccess("Profile updated successfully.");
      setIsEditProfile(false);
    }
  }, [isSuccessBasicInfo]);

  const openImage = async(e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (img.size <= 2 * 1024 * 1024) {
        // 2MB in bytes
        setImage({
          image: URL.createObjectURL(img),
        });

        const formData = new FormData();
        formData.append("image", img);

        await updateProfileImage(formData);
      } else {
        toastError("File size should be 2MB or less.");
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <div className="max-w-screen-xl mx-auto my-6 md:my-6 px-2 sm:px-4">
        <h2 className="max-w-[290px] sm:max-w-none text-2xl sm:text-3xl font-medium sm:text-left">
          Edit your personal profile
        </h2>
        <div className="w-full flex-col sm:flex-row flex items-start sm:items-start gap-6 sm:gap-8 mt-7 sm:mt-14">
          <div
            onClick={() => imageRef.current.click()}
            className="relative border cursor-pointer overflow-hidden w-32 h-32 rounded-full object-cover"
          >
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ImagePlaceholder
                src={
                  image
                    ? image.image
                    : user?.image
                    ? import.meta.env.VITE_USER_PROFILE_IMAGE + user.image
                    : avatar
                }
                width="100%"
                height="100%"
              />
            )}

            <input
              ref={imageRef}
              type="file"
              onChange={(e) => {
                openImage(e);
              }}
              style={{ display: "none" }}
              accept="image/*"
            />

            <div className="z-10 transition-all absolute left-0 right-0 bottom-0 w-full h-11 md:h-12 bg-black bg-opacity-70">
              <div className="w-full h-full text-xl text-white flex items-center justify-center">
                <IoCameraOutline />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[100%] md:w-[calc(100%-128px)]">
            <h3 className="text-lg font-semibold text-[#01abab]">
              How it Works:
            </h3>
            <ul className="pl-0">
              <li className="text-xs md:text-sm text-default-600 mb-1 list-none">
                Here you can edit your profile.
              </li>
              <li className="text-xs md:text-sm text-default-600 mb-1 list-none">
                If you need to reset your password? You can choose forgot
                password option on login screen.
              </li>
              <li className="text-xs md:text-sm text-default-600 mb-1 list-none">
                Choose your location in above address field to view services
                nearby.
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Information Form  */}
        <InformationCard
          data={user}
          isLoading={isLoading}
          isEditProfile={isEditProfile}
          setIsEditProfile={setIsEditProfile}
          isLoadingBasicInfo={isLoadingBasicInfo}
          updateBasicInfo={updateBasicInfo}
          error={error}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default Profile;
