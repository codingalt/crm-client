import React, { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

const data = [
  { id: 1, name: "Recommended" },
  { id: 2, name: "Best selling" },
  { id: 3, name: "Newest arrivals" },
];

const SortRow = ({ dataLength, isLoading, error }) => {
  const [selected, setSelected] = useState(data[0]);

  return (
    <div className="w-full flex-col-reverse sm:flex-row flex items-start sm:items-center justify-between gap-8 sm:gap-0 mb-4 sm:mb-8 sm:mt-1">
      <div>
        {dataLength && (
          <p className="text-default-500 sm:text-lg">{dataLength}+ results</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <p className="text-default-500">Sort by:</p>
        <div className="z-20">
          <Listbox
            disabled={isLoading || error}
            value={selected}
            onChange={setSelected}
          >
            <div className="relative w-80 sm:w-60">
              <ListboxButton
                disabled={isLoading || error}
                className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-medium sm:leading-6"
              >
                <span className="flex items-center">
                  <span className="ml-3 block truncate text-gray-900">
                    {selected.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <BiChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-900"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {data.map((item) => (
                  <ListboxOption
                    key={item.id}
                    value={item}
                    className="group relative cursor-default select-none py-3 pl-4 pr-9 text-gray-900 data-[focus]:bg-[#01abab] data-[focus]:text-white"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 text-medium block truncate font-normal group-data-[selected]:font-semibold">
                        {item.name}
                      </span>
                    </div>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#01abab] group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <BiCheck aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default SortRow;
