"use client";
import { isValidURL } from "@/lib/utils/validation";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Modal from "./Modal";
import { CheckIcon } from "@heroicons/react/24/outline";
const CtaForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [successfulSubmited, setSuccessfulSubmit] = useState(false);
  const [statusColor, setStatusColor] = useState("text-neutral-500");
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(url);
    if (!isValidURL(url)) {
      setStatus("Please enter a valid URL.");
      setStatusColor("text-rose-600");
      return;
    }
    try {
      setSuccessfulSubmit(true);
      const response = await fetch("API_ENDPOINT");
      const data = await response.json();
      // setStatus(data.status);
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error occurred while making the request.");
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-5 max-w-fit justify-center"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              https://
            </span>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="www.xyz.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="xyz@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-sm leading-3 text-purple-950 dark:text-blue-300">
            give us 10 min will send your new website link to your email-id
          </p>
        </div>

        <button type="submit" className="btn btn-primary max-w-fit self-center">
          Get Started For Free
        </button>

        {status && (
          <div className="mt-3 text-center">
            <p className={`${statusColor}`}>{status}</p>
          </div>
        )}
      </form>
      {successfulSubmited && (
        <Modal>
          <div className="w-50 flex flex-col gap-5 items-center">
            <h3 className="text-lg text-center">
              We will send your a your modified website link to this{" "}
              <h3 className="text-sm text-sky-200 text-center">{email}</h3>
            </h3>

            <div className="flex justify-center items-center h-10 w-10 text-blue-500 bg-green-200 rounded-full ">
              <CheckIcon className="h-9 w-9 font-bold text-white bg-green-500 border-2 border-green-400 rounded-full p-2 " />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CtaForm;
