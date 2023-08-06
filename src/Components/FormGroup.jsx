import { Stack } from "@mui/material";
import InputForm from "../Components/Form Componenets/InputForm";

function Form({ formData, inputsData, onSubmit, children }) {
  return (
    <form
      onSubmit={(e) => onSubmit(e, formData.formValues, formData.formErrors)}
    >
      <Stack spacing={2}>
        {inputsData.map((inputData, index) => {
          return (
            <InputForm key={index} formData={formData} inputData={inputData} />
          );
        })}
        {children}
      </Stack>
    </form>
  );
}

export default Form;
