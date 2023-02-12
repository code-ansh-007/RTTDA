import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const email = currentUser?.email; // ? did this so as to remove flicker of the email when the user logs out
  return (
    <>
      <Head>
        <title>RTTDA User Profile</title>
      </Head>
      <main className="flex flex-col items-center w-full pt-[210px] overflow-y-auto space-y-4 justify-center">
        <span className="text-blue-300">
          Signed in as:&nbsp; <span className="text-blue-300">{email}</span>
        </span>
        <button
          onClick={async () => {
            await logout();
            router.push("/");
          }}
          type="submit"
          className="border-blue-500 w-fit border-2 text-blue-300 p-1 px-[16px] rounded-md  duration-200  focus:outline-none active:scale-105 ease-in-out"
        >
          Logout
        </button>
      </main>
    </>
  );
};

export default UserDashboard;
