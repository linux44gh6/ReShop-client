import { z } from "zod";

export const registerValidationSchema =z.object({
    name: z
    .string({ required_error: "Name is required" })
    .nonempty("Name is Required"),
    email:z
    .string({required_error:"Email is required"})
    .email("Email is invalid"),
    password:z
    .string({required_error:"Password is required"})
    .min(6, "Password must be at least 6 characters long"),
})