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
