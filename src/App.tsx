import "./App.css";
import { useState } from "react";
import SelectDropdown from "./components/SelectDropdown";
import Checkbox from "./components/Checkbox";

interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
}

const options: SelectOption[] = [
  { label: "Javascript", value: "javascript" },
  { label: "Typescript", value: "typescript" },
  { label: "Nextjs", value: "nextjs" },
  { label: "Reactjs", value: "reactjs" },
  { label: "Spring Boot", value: "spring_boot" },
  { label: "Nodejs", value: "nodejs" },
  { label: "PostgreSQL", value: "postgresql" },
];

function App() {
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>([]);

  const onSelectChange = (options: SelectOption[]) => {
    setSelectedValues(options);
  };

  const [controls, setControls] = useState<{
    multiple: boolean;
    withSearch: boolean;
    outline: boolean;
    zIndexElement: boolean;
  }>({
    multiple: true,
    withSearch: true,
    outline: true,
    zIndexElement: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControls((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <main className="flex flex-col w-screen justify-center items-center h-screen space-y-8">
      <div className="w-3/4">
        <SelectDropdown
          options={options}
          multiple={controls.multiple}
          withSearch={controls.withSearch}
          selectedValues={selectedValues}
          onSelectChange={onSelectChange}
          outline={controls.outline}
          label="Tech stack"
          placeholder="Pick your tech"
        />
      </div>
      <div className="flex gap-10">
        <Checkbox
          label="Multiple"
          checked={controls.multiple}
          id="multiple"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Outline"
          checked={controls.outline}
          id="outline"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="With search"
          checked={controls.withSearch}
          id="withSearch"
          onChange={handleCheckboxChange}
        />{" "}
        <Checkbox
          label="Element with z-index 1000"
          checked={controls.zIndexElement}
          id="zIndexElement"
          onChange={handleCheckboxChange}
        />
      </div>
      {controls.zIndexElement && <div className="h-16 w-16 bg-amber-400 z-[1000]"></div>}
    </main>
  );
}

export default App;
