import React, { useState } from "react";

import { httpClient, HttpResponse } from "../api/http-client";

interface UserData {
  message: string;
}

export const Register = () => {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Clear existing errors
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);

    const usernameRegex = /^[a-zA-Z0-9-_]{3,30}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must be 3-30 characters long and contain only letters, numbers, underscores, or hyphens."
      );
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!password) {
      setPasswordError("Please enter a password. It cannot be empty.");
    }

    if (usernameError || emailError || passwordError) {
      return; // Prevent submission if errors exist
    }

    try {
      const { data, status }: HttpResponse<UserData> = await httpClient.post(
        "/users/register",
        {
          username,
          email,
          password,
        }
      );

      // Ideally we would show a success message to the user here instead of logging to the console :)
      if (status === 200) {
        console.log(data?.message);
      }

      form.reset();
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  return (
    <main className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            {...(usernameError && {
              "aria-invalid": true,
              "aria-describedby": "username-error",
            })}
          />
          {usernameError && <small id="username-error">{usernameError}</small>}
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            {...(emailError && {
              "aria-invalid": true,
              "aria-describedby": "email-error",
            })}
          />
          {emailError && <small id="email-error">{emailError}</small>}
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            {...(passwordError && {
              "aria-invalid": true,
              "aria-describedby": "password-error",
            })}
          />
          {passwordError && <small id="password-error">{passwordError}</small>}
        </label>

        <button type="submit">Register</button>
      </form>
    </main>
  );
};
