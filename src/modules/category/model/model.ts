import {z} from "zod";
import {ModelStatus} from "../../../share/model/base-model";


export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3, 'name must be at least 3 characters'),
    description: z.string().optional(),
    image: z.string().nullable().optional(),
    position: z.number().min(0, 'invalid position').default(0),
    parent_id: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    created_at: z.date(),
    updated_at: z.date()
})

export type Category = z.infer<typeof CategorySchema>
