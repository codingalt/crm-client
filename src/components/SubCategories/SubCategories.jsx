import React from "react";
import css from "./SubCategories.module.scss";
import Card from "./Card";
import { useNavigate, useParams } from "react-router-dom";
import ImageComponent from "../ui/Image/ImageComponent";
import { useGetSubCategoriesByCategoryIdQuery } from "../../services/api/categoriesApi/categoriesApi";
import ClipSpinner from "../Loader/ClipSpinner";
import { RiMenuSearchLine } from "react-icons/ri";
import { TbListSearch } from "react-icons/tb";

const SubCategories = () => {
  const { categoryId } = useParams();
  const { data, isLoading } = useGetSubCategoriesByCategoryIdQuery(categoryId);
  const navigate = useNavigate();

  return (
    <div className={css.wrapper}>
      {isLoading ? (
        <div className="w-full h-[70%] flex items-center justify-center">
          <ClipSpinner />
        </div>
      ) : (
        <>
          <p className={`${css.top} md:text-medium text-sm font-medium my-2`}>
            <div className={css.image}>
              <ImageComponent
                src={
                  import.meta.env.VITE_CATEGORY_IMAGE + data?.category?.image
                }
                radius={"8px"}
              />
            </div>

            <span>{data?.category?.name}</span>
          </p>

          <div
            className={`${css.subCategories} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-4 md:gap-x-8 md:gap-y-4`}
          >
            {data?.category?.sub_categories?.map((item, index) => (
              <Card item={item} key={item.id} index={index} />
            ))}
          </div>
        </>
      )}

      {/* Empty Data  */}
      {!isLoading && data?.category?.sub_categories?.length === 0 && (
        <div className="flex gap-2 items-center justify-center w-full text-[#9F9F9F]">
          <RiMenuSearchLine fontSize={22} />
          <p className="text-[20px] font-medium">
            <span>No Sub Categories Found.</span>
            <span onClick={()=> navigate("/dashboard")} className="text-[#01ABAB] ml-1 cursor-pointer">Explore more</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
