import { Form, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TPHDatePicker = {
  name: string;
  label: string;
};

export const PHTimePicker = ({ name, label }: TPHDatePicker) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <TimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      ></Controller>
    </div>
  );
};
