"use client";
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '@/Schema/auth.schema';
// import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from "next-auth/react";
import { toast } from 'sonner';


export default function SignIn() {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  console.log(form);

async function handelRegister(data: LoginSchemaType) {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log("NextAuth Response:", response);

    // التحقق من وجود الخطأ وعرضه باستخدام الـ Toast
    if (response?.error) {
      toast.error(response.error, { position: 'top-center' });
      return; // إيقاف التنفيذ حتى لا ينتقل للصفحة الرئيسية
    }

    // لو كل شيء تمام
    toast.success('Successfully logged in!', { position: 'top-center' });
    router.push("/");
    router.refresh();
  }

  return <>
    <div className="relative min-h-screen">

      {/* 🔥 Background Layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/imgSlider/slider7.avif"
          alt="background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* 🔥 Form Content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-20">

        <form
          onSubmit={form.handleSubmit(handelRegister)}
          className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-4"
        >

          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-3xl font-semibold text-gray-800">
              Sign In
            </h2>
          </div>

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  className="placeholder:font-semibold mt-1 p-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter password"
                  className="placeholder:font-semibold mt-1 p-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign In
          </button>

          {/* Link */}
          <div className="text-center text-lg font-semibold text-gray-500">
            <Link
              href="/SignUp"
              className="text-green-600 hover:underline font-medium px-2"
            >
              Don’t have an account? Sign Up
            </Link>
          </div>

        </form>
      </div>
    </div>
  </>;
}