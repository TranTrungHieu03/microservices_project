import {z} from "zod";
import {ModelStatus} from "../../../share/model/base-model";
import {ErrBrandNameTooShort} from "./error";

export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrBrandNameTooShort.message),
    description: z.string().optional(),
    image: z.string().nullable().optional(),
    tagLine: z.string().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date()
})

export type Brand = z.infer<typeof BrandSchema>
