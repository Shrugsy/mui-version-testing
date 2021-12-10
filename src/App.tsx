import styled from "@emotion/styled";
import { Button, TextField } from "@material-ui/core";
import { useCallback, useState, ChangeEvent } from "react";

const useFormField = (initialValue: string, label: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setValue(e.target.value),
    []
  );
  const clearValue = useCallback(() => setValue(""), []);
  return [
    { value, onChange, label, id: label },
    { clearValue, setValue },
  ] as const;
};

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  gap: 8px;
`;

export default function App() {
  const [nameField, nameHandlers] = useFormField("", "Name");
  const [ageField, ageHandlers] = useFormField("", "Age");
  const [titleField, titleHandlers] = useFormField("", "Title");
  const [submittedData, setSubmittedData] = useState("");

  return (
    <div className="App">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedData(
            `Name: ${nameField.value}, Age: ${ageField.value}, Title: ${titleField.value}`
          );

          nameHandlers.clearValue();
          ageHandlers.clearValue();
          titleHandlers.clearValue();
        }}
      >
        <TextField {...nameField} />
        <TextField {...ageField} type="number" />
        <TextField {...titleField} />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Form>
      <div>Submitted data: {submittedData || "None"}</div>
    </div>
  );
}
