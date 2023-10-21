"use client";
import React, { FormEvent } from "react";

function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ response });
  };
  return (
    <>
      <h1 className="text-center">SignUp Page</h1>
      <form
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          className="border border-black text-black"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          name="email"
          className="border border-black text-black"
          type="email"
          placeholder="Enter Your Email"
        />
        <input
          name="password"
          className="border border-black  text-black"
          type="password"
          placeholder="Enter Your Password"
        />
        <button type="submit" className="border">
          Register
        </button>
      </form>
    </>
  );
}

export default Form;
