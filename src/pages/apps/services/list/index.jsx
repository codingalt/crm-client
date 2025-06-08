import React, { useEffect, useMemo } from "react";
import css from "./services.module.scss";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "@nextui-org/react";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { Link, useNavigate } from "react-router-dom";
import { GrContactInfo } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import ServiceSkeleton from "./ServiceSkeleton";
import { truncateText } from "@/utils/helpers/helpers";
import { Rating } from "@mui/material";
import empty from "@/assets/emptyData.png";
import { useSearchServicesQuery } from "@/services/api/servicesApi/servicesApi";
import FilterRow, { useURLFilters } from "./filter";
import FetchDataError from "@/components/widgets/fetch-data-error";
import ServicesPagination from "./filter/common/pagination";
import slugify from "slugify";
import usePagination from "@/hooks/usePagination";

const serializeFilters = (filters) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.priceMin) params.append("min_price", filters.priceMin);
  if (filters.priceMax) params.append("max_price", filters.priceMax);
  if (filters.sort) params.append("sort_by", filters.sort);
  if (filters.country_id) params.append("country_id", filters.country_id);
  if (filters.city_id) params.append("city_id", filters.city_id);
  if (filters.latitude) params.append("latitude", filters.latitude);
  if (filters.longitude) params.append("longitude", filters.longitude);
  if (filters.selectedDate) params.append("date", filters.selectedDate);
  if (filters.timeSlot) params.append("time", filters.timeSlot);
  if (filters.selectedRating)
    params.append("min_rating", filters.selectedRating);

  if (filters.selectedCategory)
    params.append("category_id", filters.selectedCategory);

  return params.toString();
};

const ServicesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { filters } = useURLFilters();
  const {
    pagination,
    updatePagination,
    handlePageChange,
    handlePerPageChange,
  } = usePagination();

  const serializedFilters = useMemo(() => {
    return serializeFilters(filters);
  }, [filters]);

  const { data, isFetching, error, refetch } =
    useSearchServicesQuery(serializedFilters);

  useEffect(() => {
    if (!isFetching && !error && data) {
      updatePagination(data);
    }
  }, [data, isFetching, error]);

  const DATA_LENGTH = data?.results?.services?.length || 0;

  return (
    <div className={`${css.wrapper} md:px-4 lg:px-6`}>
      {/* Filters  */}
      <FilterRow {...{ DATA_LENGTH }} />

      {/* Services  */}
      <div
        className={`${css.services} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-7 gap-x-7 gap-y-4 sm:gap-y-8`}
      >
        {isFetching ? (
          <ServiceSkeleton />
        ) : (
          data?.results?.services?.map((item) => (
            <Link
              to={`/service/${slugify(item.name, { lower: true })}/${item.id}`}
              key={item.id}
            >
              <div className={`${css.card}`}>
                <div className={css.image}>
                  <ImagePlaceholder
                    src={import.meta.env.VITE_SERVICE_IMAGE + item.image}
                    width="100%"
                    height="100%"
                    rounded="md"
                  />
                </div>
                <Tooltip
                  placement="bottom-start"
                  content={item.name}
                  hidden={item.name.length < 22}
                  classNames={{
                    base: [
                      // arrow color
                      "before:bg-black before:bg-opacity-60 before:rounded-[6px]",
                    ],
                    content: [
                      "py-1 px-2.5 shadow-lg rounded-[6px]",
                      "text-white text-[12px] bg-black bg-opacity-60",
                    ],
                  }}
                >
                  <div className={css.title}>{truncateText(item.name, 22)}</div>
                </Tooltip>
                <div className={css.rating}>
                  <Rating
                    value={item.rating}
                    readOnly
                    size="small"
                    sx={{ fontSize: "1.1rem" }}
                  />
                </div>
                <div className={css.detail}>
                  <div className={css.age}>
                    <GrContactInfo />
                    <span>
                      {item.start_age}-{item.end_age} {t("yrs")}
                    </span>
                  </div>
                  <div className={css.time}>
                    <LiaBusinessTimeSolid />
                    <span>
                      {item.time} {t("min")}
                    </span>
                  </div>
                </div>
                <div
                  className={css.price}
                  onClick={() => navigate(`/services/HairCut/1`)}
                >
                  <span>
                    From NIS{" "}
                    <NumericFormat
                      displayType="text"
                      value={item.price}
                      thousandSeparator=","
                      thousandsGroupStyle="lakh"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Show Error If data fails to load  */}
      {!isFetching && error && (
        <div className="w-full py-16 md:py-28">
          <FetchDataError refetch={refetch} />
        </div>
      )}

      {/* Empty Data  */}
      {!isFetching && !error && data?.results?.services?.length === 0 && (
        <div className="w-full max-w-md m-auto mt-24 md:mt-28">
          <div className="flex flex-col gap-2.5 items-center justify-center w-full">
            <div className="w-16">
              <ImagePlaceholder width="100%" src={empty} alt="Empty" />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-default-800">
              <span>No results to display</span>
            </p>
            <p className="mb-1 font-normal mx-auto text-gray-500 text-center max-w-sm">
              Try adjusting your search area
            </p>
          </div>
        </div>
      )}

      {DATA_LENGTH > 0 && (
        <div className="mt-8">
          {/* Pagination */}
          <ServicesPagination
            {...{
              pagination: {
                currentPage: pagination.page,
                lastPage: pagination.lastPage,
                totalItems: pagination.totalItems,
                perPage: pagination.perPage,
                setPage: handlePageChange,
                setPerPage: handlePerPageChange,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
