import { z } from "zod";

export type P<T> = Promise<T>

export const LoginSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(4).max(100),
    })
    .required();

export type Login = z.infer<typeof LoginSchema>;

export const NewBookSchema = z.object({
    title: z.string().min(1),
    authors: z.array(z.string().min(1)),
    yearPublished: z.number().int().positive(),
    total: z.number().int().positive()
})

export type NewBook = z.infer<typeof NewBookSchema>

export type Book = Omit<NewBook, 'total'> & {
    _id: string;
    dateAdded: number;
}

export const InventorySchema = z.object({
    _id: z.string(),
    title: z.string(),
    available: z.number(),
    borrowed: z.number(),
    total: z.number(),
})

export type BookInventory = z.infer<typeof InventorySchema>

export type BookData = [Book, BookInventory]

export const UpdateBookSchema = z.object({
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    yearPublished: z.number().int().positive()
})

export type UpdateBook = z.infer<typeof UpdateBookSchema>