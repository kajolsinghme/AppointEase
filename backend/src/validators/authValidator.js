import { z } from "zod";

export const validatorRegisterUser = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }).nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
    password: z.string().min(4, { message: "Password must be at least 4 characters" }).nonempty({ message: "Password is required" }),
    role: z.enum(["patient", "doctor"], { message: "Role must be either 'patient' or 'doctor'" })
}).strict();

export const validatorLoginUser = z.object({
    email: z.string().email({message: "Invalid email format"}),
    password: z.string().min(4, {message: "Password must be at least 4 characters"})
}).strict();