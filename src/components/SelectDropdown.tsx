import { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon as SearchIcon,
  Cross2Icon as CloseIcon,
} from "@radix-ui/react-icons";
import Badge from "./Badge";

/**
 * Represents an option in the select dropdown.
 */
interface SelectOption {
  /**
   * The display label for the option.
   */
  label: string;

  /**
   * The underlying value of the option.
   */
  value: string;

  /**
   * Indicates whether the option is selected.
   * @default false
   */
  selected?: boolean;
}

/**
 * Props for the Select component.
 */
interface SelectProps {
  /**
   * The list of available options.
   */
  options: SelectOption[];

  /**
   * The currently selected values.
   */
  selectedValues: SelectOption[];

  /**
   * Callback function triggered when the selection changes.
   * @param selectedList - The updated list of selected options.
   */
  onSelectChange: (selectedList: SelectOption[]) => void;

  /**
   * If true, enables multi-selection mode.
   * @default false
   */
  multiple?: boolean;

  /**
   * If true, enables a search input within the dropdown.
   * @default true
   */
  withSearch?: boolean;

  /**
   * If true, applies an outline style to the select component.
   * @default true
   */
  outline?: boolean;

  /**
   * The label displayed above the select component.
   */
  label?: string;

  /**
   * The placeholder text shown when no selection is made.
   */
  placeholder?: string;

  /**
   * Custom z-index if necessary.
   * @default 1100
   */
  zIndex?: number;

  /**
   * If true, renders the dropdown in a portal to prevent clipping issues.
   * @default true
   */
  usePortal?: boolean;

  /**
   * Custom rendering function for options.
   * Allows for fully customizable dropdown items.
   * @param option - The option data to render.
   * @returns A React node representing the custom option.
   */
  renderOption?: (option: SelectOption) => React.ReactNode;
}

const SelectDropdown = (props: SelectProps) => {
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const {
    options,
    outline = true,
    multiple = false,
    withSearch = true,
    selectedValues,
    onSelectChange,
    label,
    placeholder,
    zIndex = 1100,
    usePortal = true,
    renderOption,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (options.length > 0) {
      setFilteredOptions(
        options.map((option) => ({ ...option, selected: false }))
      );
    }
  }, [options]);

  const updateFilteredOptionByValue = (
    val: string,
    isSelected: boolean
  ): void => {
    let newFilteredOptions = [...filteredOptions];

    const findIndex = newFilteredOptions.findIndex(
      (item) => item.value === val
    );

    if (!multiple && isSelected) {
      newFilteredOptions = newFilteredOptions.map((item) => ({
        ...item,
        selected: false,
      }));
    }

    if (findIndex >= 0) {
      newFilteredOptions[findIndex].selected = isSelected;
    }

    setFilteredOptions(newFilteredOptions);
  };

  const onSelect = (opt: SelectOption) => {
    let newValues = [...selectedValues];

    if (multiple) {
      const idx = newValues.findIndex((item) => item.value === opt.value);

      if (idx < 0) {
        newValues.push(opt);
      }
    } else {
      newValues = [opt];
    }

    updateFilteredOptionByValue(opt.value, true);

    onSelectChange(newValues);
    setIsOpen(false);
  };

  const onDeleteItem = (index: number) => {
    const newValues = [...selectedValues];

    const keyValue = newValues[index].value;

    updateFilteredOptionByValue(keyValue, false);

    newValues.splice(index, 1);

    onSelectChange(newValues);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    if (e.target.value === "") {
      setFilteredOptions(options);
    } else {
      const newOptions = options.filter((option) =>
        option.label.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredOptions(newOptions);
    }
  };

  const getHighlightedText = (label: string) => {
    const parts = label.split(new RegExp(`(${searchText})`, "gi"));
    return (
      <span>
        {parts.map((part: string, i) => (
          <span
            key={i}
            className={`${
              part.toLowerCase() === searchText.toLowerCase()
                ? "bg-teal-400 "
                : " "
            }`}
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  const togglePopOver = (): void => setIsOpen((prev) => !prev);

  const popoverContent = (
    <>
      {withSearch && (
        <div className="border border-gray-200 p-2 rounded-t-md flex items-center gap-2">
          <SearchIcon className="w-6 h-6" />
          <input
            className="w-full p-1 outline-none focus:outline-none focus:ring-0"
            placeholder="Search.."
            value={searchText}
            onChange={(e) => handleSearchInput(e)}
          />
          <CloseIcon
            className="rounded-full cursor-pointer bg-gray-300 p-0.5"
            onClick={() => setSearchText("")}
          />
        </div>
      )}
      <div
        className={`border border-gray-200 py-2 rounded-b-md shadow-md ${
          !withSearch ? "rounded-t-md " : " "
        }`}
      >
        {filteredOptions.map((item: SelectOption, i: number) =>
          renderOption ? (
            <div key={i} onClick={() => onSelect(item)}>
              {renderOption(item)}
            </div>
          ) : (
            <div
              onClick={() => onSelect(item)}
              key={i}
              className={`text-gray-900 cursor-pointer hover:bg-teal-50 p-2 rounded-md hover:border-teal-50 focus:outline-none ${
                item.selected ? "bg-teal-50 " : " "
              }`}
            >
              {getHighlightedText(item.label)}
            </div>
          )
        )}
      </div>
    </>
  );

  return (
    <div className="flex items-center px-2 w-full">
      {label && <label className="w-1/4 md:w-1/8 text-gray-900">{label}</label>}
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            onClick={togglePopOver}
            className={`[&_svg]:pointer-events-auto min-h-12 inline-flex p-2 items-center justify-between gap-2 rounded text-lg shadow-sm shadow-black/10 outline-none focus:shadow-xs focus:shadow-gray-100 data-[placeholder]:text-black border border-gray-200 hover:border-gray-500 cursor-pointer ${
              outline ? " " : "bg-gray-300"
            } ${label ? " w-3/4 md:w-7/8" : "w-full "}`}
          >
            {selectedValues.length === 0 && (
              <p className="text-gray-900 text-sm">
                {placeholder ? placeholder : "Pick your item"}
              </p>
            )}
            {!multiple && selectedValues.length > 0 && (
              <p className="text-gray-900 truncate ">
                {selectedValues[0].label}
              </p>
            )}
            {multiple && selectedValues.length > 0 && (
              <div className="flex gap-2 flex-wrap items-center">
                {selectedValues.map((item, i) => (
                  <span
                    key={i}
                    className="selected-values"
                    id={`selected-value-${i + 1}`}
                  >
                    {
                      <Badge
                        text={item.label}
                        onIconClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onDeleteItem(i);
                        }}
                      />
                    }
                  </span>
                ))}
              </div>
            )}

            <ChevronDownIcon className="min-h-4 min-w-4" />
          </button>
        </Popover.Trigger>
        {usePortal ? (
          <Popover.Portal>
            <Popover.Content
              onEscapeKeyDown={togglePopOver}
              className={`PopoverContent bg-white rounded-md p-2 min-w-[var(--radix-popover-trigger-width)] max-h-[var(--radix-popover-content-available-height)] z-[${zIndex}]`}
              sideOffset={5}
            >
              {popoverContent}
            </Popover.Content>
          </Popover.Portal>
        ) : (
          <Popover.Content
            onEscapeKeyDown={togglePopOver}
            className={`PopoverContent bg-white rounded-md p-2 min-w-[var(--radix-popover-trigger-width)] max-h-[var(--radix-popover-content-available-height)] z-[${zIndex}]`}
            sideOffset={5}
          >
            {popoverContent}
          </Popover.Content>
        )}
        {/* <Popover.Portal>
          <Popover.Content
            onEscapeKeyDown={togglePopOver}
            className={`PopoverContent bg-white rounded-md p-2 min-w-[var(--radix-popover-trigger-width)] max-h-[var(--radix-popover-content-available-height)] z-[${zIndex}]`}
            sideOffset={5}
          >
            {popoverContent} */}
        {/* {withSearch && (
              <div className="border border-gray-200 p-2 rounded-t-md flex items-center gap-2">
                <SearchIcon className="w-6 h-6" />
                <input
                  className="w-full p-1 outline-none focus:outline-none focus:ring-0"
                  placeholder="Search.."
                  value={searchText}
                  onChange={(e) => handleSearchInput(e)}
                />
                <CloseIcon
                  className="rounded-full cursor-pointer bg-gray-300 p-0.5"
                  onClick={() => setSearchText("")}
                />
              </div>
            )}
            <div
              className={`border border-gray-200 py-2 rounded-b-md shadow-md ${
                !withSearch ? "rounded-t-md " : " "
              }`}
            >
              {filteredOptions.map((item: SelectOption, i: number) => (
                <div
                  onClick={() => onSelect(item)}
                  key={i}
                  className={`text-gray-900 cursor-pointer hover:bg-teal-50 p-2 rounded-md hover:border-teal-50 focus:outline-none ${
                    item.selected ? "bg-teal-50 " : " "
                  }`}
                >
                  {getHighlightedText(item.label)}
                </div>
              ))}
            </div> */}
        {/* </Popover.Content>
        </Popover.Portal> */}
      </Popover.Root>
    </div>
  );
};

export default SelectDropdown;
