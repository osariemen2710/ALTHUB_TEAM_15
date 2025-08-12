// src/App.jsx
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Form } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "/binit-logo.svg";
import { Link } from 'react-router-dom'

export default function SignUp() {
  
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex fixed h-screen min-h-screen w-full signup-container">
      {/* Left Section */}
      <div className="w-1/2 items-center justify-center ">
        {/*<div>
          <img src="/binit-logo.svg" alt="BinIt Logo" className="" />
          <h1 className="">Sign Up</h1>
          <p className=" max-w-1/2">
            Create an account to report waste, request pickups, join cleanups,
            and earn rewards.
          </p>
        </div>*/}
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Form
           /*action="https://jsonplaceholder.typicode.com/posts"
            onSuccess={() => {
              alert("Your application is updated.");
            }}
            onError={() => {
              alert("Submission has failed.");
            }}
              */
            control={control}
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-1/2 space-y-4 "
          >
            <div className="p-2 flex flex-col">
              <label htmlFor="name">
                {" "}
                Name <FaUser className="text-gray-500 mr-2" />{" "}
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("username", {
                  required: "First name is required",
                })}
                className=" outline-none"
              />
            </div>
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}

            <div className="flex p-2 flex-col">
              <label htmlFor="email" className="">
                {" "}
                Email <FaEnvelope className="text-gray-500 mr-2 " />
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="flex-1 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <div className="flex p-2 flex-col">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium"
              >
                {" "}
                Password <FaLock className="text-gray-500 mr-2" />
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="flex-1 outline-none"
              />
        </div>
        <div className="flex p-2 flex-col">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium"
              >
                {" "}
                Password <FaLock className="text-gray-500 mr-2" />
              </label>
              <Input
                type="password"
                placeholder="Comfirm password"
                {...register("password", { required: "Password is required" })}
                className="flex-1 outline-none"
              />
</div>

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}


            <Button className="button border-0  w-full h-1/6">
              Sign Up
            </Button>
            <Button className=" bg-(--background) text-(--primary) w-full h-1/6 rounded-lg shadow-md">
              <FcGoogle />Sign up with Google
            </Button>
            <div className="items-center justify-center mt-4"> Already have an account <Link to ="/login">Login</Link>
          </div>
          </Form>
          
        </div>
      </div>

      {/* Right */}
      <div
        className="w-1/2 max-h-full bg-cover bg-center signup-image"
        style={{
          backgroundImage: "url('/binit-image.jpg')",
        }}
      />
    </div>
  );
}
