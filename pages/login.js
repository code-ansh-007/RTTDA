import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { login, signUp } = useAuth(); // ? using firebase login functions via the auth context
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError(
        !email && !password
          ? "Please enter email & password"
          : !email
          ? "Please enter email"
          : "Please enter password"
      );
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
        setEmail("");
        setPassword("");
        router.push("/");
      } catch (error) {
        // ? the user will only reach this state if he or she is filling the wrong credentials
        setError("Incorrect email or password");
      }
      return;
    }
    // ? if user is not logging in it means that he is registering for the first time so he will signUp
    try {
      await signUp(email, password);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      if (error.code == "auth/weak-password") {
        setError("Password length should be atleast 6");
      }
    }
    return;
  }
  return (
    <>
      <Head>
        <title>RTTDA Login</title>
      </Head>
      <main className="mt-[100px] w-full flex flex-col space-y-4 items-center justify-center">
        <div className="relative">
          <i className="fa-solid fa-dragon text-red-500 text-6xl"></i>
          <i className="fa-sharp fa-solid animate-pulse absolute bottom-6 left-20 fa-fire-flame-curved text-2xl rotate-90 text-orange-400"></i>
        </div>
        <span className="text-2xl font-bold">
          {isLoggingIn ? "Login" : "Sign Up"}
        </span>
        {error && (
          <div className="border-2  border-red-500 p-2 py-1 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
        <section className="flex flex-col space-y-4 items-center">
          {/* LOGIN WITH CREDENTIALS DIV */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-2"
          >
            <input
              type="email"
              value={email}
              className="border-2 border-blue-500 p-2 w-[25ch] text-[#a5a5a5] text-sm  rounded-md bg-inherit outline-none"
              placeholder="Email"
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              className="border-2 border-blue-500 p-2 w-[25ch] text-[#a5a5a5] text-sm  rounded-md bg-inherit outline-none"
              placeholder="Password"
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="border-blue-500 w-full border-2 text-blue-300 p-1 px-[16px] rounded-md  duration-200  focus:outline-none active:scale-105 ease-in-out"
            >
              Submit
            </button>
          </form>
          {/* LOGIN WITH GOOGLE DIV */}
          {/* <div className="flex flex-col items-center space-y-5">
            <span>OR</span>
            <button className="border-blue-500 border-2 text-blue-300 p-1 w-full rounded-md  duration-200  focus:outline-none active:scale-105 ease-in-out">
              {isLoggingIn ? "Login" : "Sign Up"} With Google
            </button>
          </div> */}
          <span
            onClick={() => setIsLoggingIn(!isLoggingIn)}
            className="active:scale-105 duration-200 transition transform ease-in-out"
          >
            {isLoggingIn ? "Sign Up" : "Login"}
          </span>
        </section>
      </main>
    </>
  );
};

export default Login;
