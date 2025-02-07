import { Cross2Icon as CloseIcon } from "@radix-ui/react-icons";

/**
 * Props for the Badge component.
 */
interface BadgeProps {
  /**
   * Text content displayed inside the badge.
   */
  text: string;

  /**
   * Callback function triggered when the icon inside the badge is clicked.
   * @param e - The mouse event from the icon click.
   */
  onIconClick: (e: React.MouseEvent) => void;
}

const Badge = (props: BadgeProps) => {
  return (
    <div className="bg-gray-100 p-1 rounded-sm text-xs flex items-center gap-2 w-fit">
      <span>{props.text}</span>
      <CloseIcon
        className="w-3 h-3 border border-gray-500 rounded-full cursor-pointer"
        onClick={props.onIconClick}
      />
    </div>
  );
};

export default Badge;
