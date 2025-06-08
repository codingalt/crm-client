import React from "react";
import css from "./SubCategories.module.scss";
import Card from "./Card";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSubCategoriesByCategoryIdQuery } from "@/services/api/categoriesApi/categoriesApi";
import { RiMenuSearchLine } from "react-icons/ri";
import { ArrowLeft } from "lucide-react";
import { truncateText } from "@/utils/helpers/helpers";
import { Button } from "@nextui-org/react";
import DataLoading from "@/components/common/loaders/DataLoading";
import ImagePlaceholder from "@/components/ui/imae-placeholder";

const SubCategoryPage = () => {
  const { categoryId } = useParams();
  const { data, isLoading, error, refetch } =
    useGetSubCategoriesByCategoryIdQuery(categoryId, { skip: !categoryId });
  const navigate = useNavigate();

  if (isLoading) {
    return <DataLoading />;
  }

  return (
    <div className={css.wrapper}>
      <div className={`${css.top} md:text-medium text-sm font-medium my-2`}>
        <div
          onClick={() => navigate("/dashboard")}
          className="md:w-11 md:h-11 w-10 h-10 shrink-0 mr-2 cursor-pointer hover:bg-gray-50 transition-all flex items-center justify-center border rounded-xl"
        >
          <ArrowLeft size={22} />
        </div>
        <div className={`${css.image} shrink-0`}>
          {data?.category && (
            <ImagePlaceholder
              src={import.meta.env.VITE_CATEGORY_IMAGE + data?.category?.image}
              rounded="md"
              width="100%"
              height="100%"
            />
          )}
        </div>

        <span>{truncateText(data?.category?.name, 43)}</span>
      </div>

      <div
        className={`${css.subCategories} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-4 md:gap-x-8 md:gap-y-4`}
      >
        {data?.category?.sub_categories?.map((item, index) => (
          <Card item={item} key={item.id} index={index} />
        ))}
      </div>

      {/* Show Error If data fails to load  */}
      {!isLoading && error && (
        <div className="px-4 mx-auto w-full py-24 md:py-20 flex flex-col gap-2 items-center">
          <p className="font-medium text-[17px] text-[#01abab]">
            Let's try that again.
          </p>
          <span className="px-6 text-xs text-default-600 text-center max-w-xs">
            Oops! Something went wrong. We couldn't fetch the data.
          </span>
          <Button
            size="sm"
            radius="sm"
            className="mt-2 px-6 text-white bg-[#01abab]"
            onClick={refetch}
          >
            Try again
          </Button>
        </div>
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

export default SubCategoryPage;
