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
    usePortal: boolean;
    renderOption: boolean;
  }>({
    multiple: true,
    withSearch: true,
    outline: true,
    zIndexElement: false,
    usePortal: true,
    renderOption: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "multiple") setSelectedValues([]);

    setControls((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <main className="flex flex-col w-screen items-center h-screen space-y-10 p-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl md:text-3xl font-bold tracking-wide">
          React Multiselect Dropdown
        </h1>
        <div className="flex justify-evenly">
          <a
            href="https://github.com/ryanadhi/react-multiselect-dropdown"
            className="underline text-blue-800 hover:text-black hover:bg-blue-200 p-1 rounded-sm transition-all"
            target="__blank"
          >
            Github
          </a>
          <a
            href="https://storybook-react-multiselect.netlify.app"
            className="underline text-blue-800 hover:text-black hover:bg-blue-200 p-1 rounded-sm transition-all"
            target="__blank"
          >
            Storybook
          </a>
        </div>
      </div>
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
          usePortal={controls.usePortal}
          renderOption={
            controls.renderOption
              ? (option) => (
                  <div className="flex items-center gap-2 p-2 bg-teal-50 hover:bg-amber-50 rounded-md cursor-pointer">
                    <span className="text-sm font-semibold font-serif tracking-tight">
                      {option.label}
                    </span>
                  </div>
                )
              : undefined
          }
        />
      </div>
      <div className="grid grid-cols-3 space-x-6 space-y-2">
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
        />
        <Checkbox
          label="Use portal"
          checked={controls.usePortal}
          id="usePortal"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Custom render option"
          checked={controls.renderOption}
          id="renderOption"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Element z-index 1000"
          checked={controls.zIndexElement}
          id="zIndexElement"
          onChange={handleCheckboxChange}
        />
      </div>
      {controls.zIndexElement && (
        <div className="h-16 w-16 bg-amber-400 z-[100]"></div>
      )}
    </main>
  );
}

export default App;
