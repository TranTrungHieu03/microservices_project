import {z} from "zod";
import {
    ErrBirthDateInvalid,
    ErrEmailInvalid,
    ErrFirstNameAtLeast2Chars,
    ErrGenderInvalid,
    ErrLastNameAtLeast2Chars,
    ErrPasswordAtLeast6Chars,
    ErrRoleInvalid
} from "./error";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    UNKNOWN = "unknown"
}

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

export enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
    PENDING = "pending",
    BANNED = "banned"
}

export const userSchema = z.object({
    id: z.string().uuid(),
    avatar: z.string().nullable().optional(),
    firstName: z.string().min(2, ErrFirstNameAtLeast2Chars),
    lastName: z.string().min(2, ErrLastNameAtLeast2Chars),
    email: z.string().email(ErrEmailInvalid),
    password: z.string().min(6, ErrPasswordAtLeast6Chars),
    salt: z.string().min(8),
    phone: z.string().nullable().optional(),
    birthDate: z.date({
        invalid_type_error: ErrBirthDateInvalid.message
    }).nullable().optional(),
    role: z.nativeEnum(Role, ErrRoleInvalid),
    gender: z.nativeEnum(Gender, ErrGenderInvalid),
    status: z.nativeEnum(Status).optional(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export type User = z.infer<typeof userSchema>

export const UserRegistrationDTOSchema = userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    
})

export const UserLoginDTOSchema = z.object({
    email: z.string().email(ErrEmailInvalid),
    password: z.string().min(6, ErrPasswordAtLeast6Chars)
});

export  type UserRegistrationDTO = z.infer<typeof UserRegistrationDTOSchema>
export  type UserLoginDTO = z.infer<typeof UserLoginDTOSchema>

export const UserUpdateDTOSchema = userSchema.partial().omit({
    // password: true,
    // salt: true,
    // createdAt: true,
    // updatedAt: true
    email: true
})
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>

export const UserCondDTOSchema = userSchema.partial().omit({
    password: true,
    salt: true,
    phone: true,
    birthDate: true,
    avatar: true,
})
export type UserCondDTO = z.infer<typeof UserCondDTOSchema>