import { Meta, StoryObj } from "@storybook/react";
import SelectDropdown from "../components/SelectDropdown";

const meta: Meta<typeof SelectDropdown> = {
  title: "Form/SelectDropdown",
  component: SelectDropdown,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    multiple: { control: "boolean" },
    withSearch: { control: "boolean" },
    outline: { control: "boolean" },
    usePortal: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Choose...",
    multiple: true,
    withSearch: true,
    outline: true,
    usePortal: true,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option with Icon", value: "optionWithIcon" },
      { label: "Long Long Option 3", value: "longOption3" },
      { label: "Long Long Option 4", value: "longOption4" },
      { label: "Long Long Long Option 5", value: "longOption5" },
      { label: "Long Long Long Long Option 6", value: "longOption6" },
    ],
    selectedValues: [{ label: "Option 1", value: "option1" }],
    onSelectChange: () => {},
  },
};
