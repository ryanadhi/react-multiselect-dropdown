import { Meta, StoryObj } from "@storybook/react";
import Badge from "../components/Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    text: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: "Badge-1",
    onIconClick: () => {},
  },
};
