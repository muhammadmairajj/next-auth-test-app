"use client";
import React, { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log({ response });
    if (!response?.error) {
      router.push("/dashboard");
      router.refresh();
    }
  };
  return (
    <>
      <h1 className="text-center">SignIn Page</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
      >
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
          Login
        </button>
      </form>
    </>
  );
}

export default Form;
