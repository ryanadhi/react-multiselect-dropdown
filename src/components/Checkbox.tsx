/**
 * Props for the Checkbox component.
 */
interface CheckboxProps {
  /**
   * Determines whether the checkbox is checked.
   */
  checked: boolean;
  
  /**
   * Label text associated with the checkbox.
   */
  label: string;
  
  /**
   * Callback function triggered when the checkbox state changes.
   * @param e - The change event from the input element.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Unique identifier for the checkbox element.
   */
  id: string;
}

const Checkbox = (props: CheckboxProps) => {
  const { checked, label, onChange, id } = props;
  return (
    <div className="">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        className="mr-1"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
