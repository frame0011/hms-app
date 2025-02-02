import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

// กำหนด props ให้รองรับการลงทะเบียนจาก react-hook-form
interface InputTextComponentProps {
  label: string;
  name: string;
  error?: boolean;
  control: Control<any>;
  helperText?: string; // ข้อความแสดงข้อผิดพลาด
}

function InputTextComponent({
  label,
  control,
  name,
  helperText,
}: InputTextComponentProps) {
  return (
    <Controller
      name={name} // ชื่อของ field ในฟอร์ม
      control={control} // ควบคุมโดย react-hook-form
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field} // spread field props จาก react-hook-form (เช่น onChange, value, onBlur)
          label={label} // ชื่อของฟิลด์
          placeholder={label} // placeholder ที่จะปรากฏใน input
          required
          error={Boolean(error)} // ตรวจสอบข้อผิดพลาดจาก react-hook-form
          helperText={error ? error.message : helperText} // ถ้ามีข้อผิดพลาดจะโชว์ข้อความ error
        />
      )}
    />
  );
}

export default InputTextComponent;
