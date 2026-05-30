"use client";
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '@/Schema/auth.schema';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function SignUp() {

  const router = useRouter();

  async function handelRegister(data: RegisterSchemaType) {
    console.log(data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" }
    });
    const finalData = await response.json();
    console.log(finalData);
    try {
      toast.success('Successfully toasted!', { position: 'top-center' });
    } catch (error) {

      toast.error("This didn't work.", { position: 'top-center' });

    }
    router.push("/SignIn");


  }

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    }
  });
  console.log(form);

  return (
    <>

      <div className="relative min-h-screen">

        {/* 🔥 Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/imgSlider/slider7.avif"
            alt="background"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        </div>

        {/* 🔥 Content */}
        <div className="min-h-screen flex items-center justify-center px-4 py-10">

          <form
            onSubmit={form.handleSubmit(handelRegister)}
            className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4"
          >

            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">
                Get Started Shopping
              </h2>
              <p className="text-gray-500">
                Welcome to FreshCart! Enter your details to get started.
              </p>
            </div>

            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter your name"
                  className="w-full p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Enter password"
                  className="w-full p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="rePassword"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Confirm password"
                  className="w-full p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="01xxxxxxxxx"
                  className="w-full p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              <Link href="/SignIn" className="text-green-600 hover:underline">
                Already have an account? Sign In
              </Link>
            </div>

          </form>
        </div>
      </div>


    </>
  );
}