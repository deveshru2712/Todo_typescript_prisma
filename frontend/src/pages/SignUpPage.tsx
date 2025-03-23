import React from "react";

const SignUpPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-8 text-darkGray">
      <div className="border border-softBlue px-2 py-1 font-semibold rounded-lg text-blue-400 bg-blue-100 cursor-pointer hover:scale-105 duration-200">
        Managing task have never been so easy!
      </div>
      <div className="w-1/4 border rounded-lg shadow-md p-6 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Signup</h1>
        <span className="text-lg font-semibold text-slate-400">
          Create an account to manage your task.
        </span>

        <div className="w-full">
          <form className="w-full flex flex-col gap-3">
            <div className="flex flex-col justify-center items-start gap-1">
              <label htmlFor="username" className="text-lg font-semibold">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="w-full border px-2 py-1 rounded-lg "
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
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
                className="w-full border px-2 py-1 rounded-lg "
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-softBlue hover:opacity-70 active:scale-105 duration-200 text-white rounded-lg py-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
