import React from "react";
import css from "./SubCategories.module.scss";
import Card from "./Card";
import { useNavigate, useParams } from "react-router-dom";
import ImageComponent from "../ui/Image/ImageComponent";
import { useGetSubCategoriesByCategoryIdQuery } from "../../services/api/categoriesApi/categoriesApi";
import ClipSpinner from "../Loader/ClipSpinner";
import { RiMenuSearchLine } from "react-icons/ri";
import { TbListSearch } from "react-icons/tb";
import { truncateText } from "../../utils/helpers/helpers";

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
          <div className={`${css.top} md:text-medium text-sm font-medium my-2`}>
            <div className={css.image}>
              <ImageComponent
                src={
                  import.meta.env.VITE_CATEGORY_IMAGE + data?.category?.image
                }
                radius={"8px"}
              />
            </div>

            <span>{truncateText(data?.category?.name, 43)}</span>
          </div>

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
        <div className="w-full max-w-md m-auto mt-24 md:mt-0">
          <div className="flex gap-2 items-start md:items-center justify-center w-full text-[#9F9F9F]">
            <RiMenuSearchLine className="text-[20px] md:text-[22px]" />
            <p className="text-[15px] md:text-[18px] font-normal md:font-medium flex flex-col justify-center items-center gap-0.5">
              <span>No Sub Categories Found.</span>
            </p>
          </div>
          <p
            onClick={() => navigate("/dashboard")}
            className="text-[#01ABAB] cursor-pointer text-[15px] md:text-[18px] font-normal md:font-medium flex flex-col justify-center items-center gap-0.5"
          >
            Explore more
          </p>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
