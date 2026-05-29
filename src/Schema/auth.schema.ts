import { z } from "zod";

export const RegisterSchema = z.object({

  name: z.string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(8, "Name must be at most 8 characters"),

  email: z.string()
    .nonempty("Email is required")
    .email("Invalid email"),

  password: z.string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),

  rePassword: z.string()
    .nonempty("Confirm password is required"),

  phone: z.string()
    .nonempty("Phone is required")
    .regex(/^01[01250][0-9]{8}$/, "Invalid Egyptian phone number"),

})
.refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
})



export type RegisterSchemaType = z.infer <typeof RegisterSchema> 



/////////////////////////////////////////////////////////////////////////////////








export const LoginSchema = z.object({

  
  email: z.string()
    .nonempty("Email is required")
    .email("Invalid email"),

  password: z.string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),

})



export type LoginSchemaType = z.infer <typeof LoginSchema> 