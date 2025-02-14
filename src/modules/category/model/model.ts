import {z} from "zod";
import {ModelStatus} from "../../../share/model/base-model";
import {ErrCategoryNameTooShort} from "./error";

export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3, ErrCategoryNameTooShort.message),
    description: z.string().optional(),
    image: z.string().nullable().optional(),
    position: z.number().min(0, 'invalid position').default(0),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    created_at: z.date(),
    updated_at: z.date()
})

export type Category = z.infer<typeof CategorySchema> & { children?: Category[] }
