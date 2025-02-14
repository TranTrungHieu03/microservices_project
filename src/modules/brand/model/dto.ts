import {z} from "zod";
import {ErrBrandNameTooShort} from "./error";

export const BrandCreateDTOSchema = z.object({
    name: z.string().min(2, ErrBrandNameTooShort.message),
    description: z.string().optional(),
    image: z.string().nullable().optional(),
    tagLine: z.string().nullable().optional(),
    
})

export type BrandCreateDTO = z.infer<typeof BrandCreateDTOSchema>
export const BrandUpdateDTOSchema = z.object({
    name: z.string().min(2, ErrBrandNameTooShort.message).optional(),
    description: z.string().optional(),
    image: z.string().nullable().optional(),
    tagLine: z.string().nullable().optional(),
    
})

export type BrandUpdateDTO = z.infer<typeof BrandUpdateDTOSchema>

export  type BrandCondDTO = {}
