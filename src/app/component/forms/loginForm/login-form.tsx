import React, { useState } from "react";
import InputTextComponent from "../../share/input/input-text-component.tsx";
import LoginLayout from "../../layout/login-layout.tsx";
import StackLayout from "../../layout/share-layout/stack-layout.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

// Define schema for form validation using Zod
const signUpSchema = z.object({
  username: z.string(),
  password: z.string().min(3).max(20),
});
type signUpSchemaType = z.infer<typeof signUpSchema>;

interface LoginProps {
  onLogin: (data: string) => void;
}

function LoginForm({ onLogin }: LoginProps) {
  const {
    control,
    handleSubmit, // handleSubmit from react-hook-form
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const [dataSubmit, setDataSubmit] = useState({});

  // This will handle form submission and call onLogin when successful
  const onSubmit = (data: signUpSchemaType) => {
    //setDataSubmit(data);
    onLogin(data.username); // Call the onLogin function passed from AppLayout
  };

  return (
    <LoginLayout title="Hello Anonymous" subtitle="Who are you?">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Stack spacing={2}>
          <StackLayout spacing={2} direction="column">
            <InputTextComponent
              label="Username"
              name="username"
              control={control}
              error={!!errors.username}
            />
            <InputTextComponent
              label="password"
              name="password"
              control={control}
              error={!!errors.password}
            />
          </StackLayout>
        </Stack>
        <button type="submit">ล็อกอิน</button>{" "}
        {/* Use submit type for the button */}
      </form>
      <div>{JSON.stringify(dataSubmit)}</div>
    </LoginLayout>
  );
}

export default LoginForm;
