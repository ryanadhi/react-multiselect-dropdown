import { Meta, StoryObj } from "@storybook/react";

import Checkbox from "../components/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    id: { control: "text" },
    checked: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox",
    id: "Checkbox",
    onChange: () => {},
  },
};
