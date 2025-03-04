import { z } from "zod";

 export const loginValidationSchema =z.object({
    email:z
    .string({required_error:"Email is required"})
    .email("Email is invalid"),
    password:z
    .string({required_error:"Password is required"})
    .min(6,"Password must be 6 to 20 characters")
    .max(20,"Password must be 6 to 20 characters"),
})