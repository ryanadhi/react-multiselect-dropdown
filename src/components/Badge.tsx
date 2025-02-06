import { Cross2Icon as CloseIcon } from "@radix-ui/react-icons";

interface BadgeProps {
  text: string;
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
