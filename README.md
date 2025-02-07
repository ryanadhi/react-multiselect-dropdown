# Reactjs Select Dropdown with Tailwind and Radix

This is a project built with the following tech stack:

- **Vite** - Next Generation Frontend Tooling
- **React** - A JavaScript library for building user interfaces
- **Storybook** - An open-source tool for building UI components and pages in isolation
- **Tailwind CSS** - A utility-first CSS framework for rapidly building custom designs
- **Radix UI** - A low-level UI component library with a focus on accessibility and customization

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ryanadhi/react-multiselect-dropdown.git
   cd react-multiselect-dropdown
   ```

2. **Install dependencies**

- Using npm:

  ```bash
  npm install
  ```

- Using yarn:

  ```bash
  yarn install
  ```

### Building and Packing the Package Locally
To build and package your project without publishing it to npm:
1.	Build the package

    This will build the necessary JavaScript, CSS, and TypeScript declaration files.
    - Using npm:

      ```bash
      npm run build:package
      ```
    - Using yarn:

      ```bash
      yarn build:package
      ```

    The output will be placed in the `dist/` folder, including:
    ```
    dist/
      index.js       // CommonJS build
      index.mjs      // ES module build
      index.css      // CSS file
      index.d.ts     // Type declarations
    ```
2.	Pack the package

    After building, you can create a .tgz file to install the package locally in another project.
    - Using npm:

      ```bash
      npm pack -o react-multiselect-dropdown.tgz
      ```
    - Using yarn:

      ```bash
      yarn pack -o react-multiselect-dropdown.tgz
      ```
    This will generate a file `react-multiselect-dropdown.tgz` in the root of your project.

### Using the Package in Another Project
Once the package is packed, you can use it in another project:
1.	Install the local package
    
    From the target project, run the following command to install the .tgz package:

    - Using npm:

      ```bash
      npm install ./path-to-your-package/react-multiselect-dropdown.tgz
      ```
    - Using yarn:

      ```bash
      yarn add ./path-to-your-package/react-multiselect-dropdown.tgz
      ```

2. Import and use the component

    In your target project, you can now import the SelectDropdown component and the corresponding styles:

    ```
    import { SelectDropdown } from "react-multiselect-dropdown";
    import "react-multiselect-dropdown/dist/index.css";

    const MyComponent = () => {
      const options = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ];

      const [selectedValues, setSelectedValues] = useState([]);

      const handleSelectChange = (selectedList) => {
        setSelectedValues(selectedList);
      };

      return (
        <SelectDropdown
          label="Your option"
          placeholder="Pick your option"
          options={options}
          selectedValues={selectedValues}
          onSelectChange={handleSelectChange}
          multiple
          withSearch
          outline
        />
      );
    };
    ```

### Running the Project Locally

To start the development server:

- Using npm:

  ```bash
  npm run dev
  ```

- Using yarn:

  ```bash
  yarn dev
  ```

The project should now be running on http://localhost:5173.

### Running Storybook Locally

To start Storybook:

- Using npm:

  ```bash
  npm run storybook
  ```

- Using yarn:

  ```bash
  yarn storybook
  ```

Storybook should now be running on http://localhost:6006.

## Deployment

- **Main Project**: [React Multiselect Dropdown](https://react-multiselect-dropdown.netlify.app/)
- **Storybook**: [Storybook for React Multiselect Dropdown](https://storybook-react-multiselect.netlify.app/)
