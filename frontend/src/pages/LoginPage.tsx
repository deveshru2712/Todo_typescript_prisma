import React, { useState } from "react";
import authStore, { LogInCredentials } from "../store/authStore";

const LoginPage = () => {
  const [form, setForm] = useState<LogInCredentials>({
    email: "",
    password: "",
  });

  const { isLoading, logIn } = authStore();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    logIn(form);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-8 text-darkGray">
      <div className="border border-softBlue px-2 py-1 font-semibold rounded-lg text-blue-400 bg-blue-100 cursor-pointer hover:scale-105 duration-200">
        Managing task have never been so easy!
      </div>
      <div className="w-1/4 border rounded-lg shadow-md p-6 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Log In</h1>
        <span className="text-lg font-semibold text-slate-400">
          Log in to manage your task.
        </span>

        <div className="w-full">
          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-start gap-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
                name="email"
                value={form.email}
                onChange={onChangeHandler}
                className="w-full border px-2 py-1 rounded-lg "
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-1">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                name="password"
                value={form.password}
                onChange={onChangeHandler}
                className="w-full border px-2 py-1 rounded-lg "
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-softBlue hover:opacity-70 active:scale-105 duration-200 text-white rounded-lg py-2"
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
