import "./App.css";
import { useState } from "react";
import SelectDropdown from "./components/SelectDropdown";

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
  return (
    <main className="flex w-screen justify-center items-center h-screen">
      <div className="w-96">
        <SelectDropdown
          options={options}
          multiple={true}
          withSearch={true}
          selectedValues={selectedValues}
          onSelectChange={onSelectChange}
          outline
          label="Tech stack"
          placeholder="Pick your tech"
        />
      </div>
    </main>
  );
}

export default App;
