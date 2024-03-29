import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type ReactDispatch<T> = Dispatch<SetStateAction<T>>;

/** @description shorthand for Promise*/
export type P<T> = Promise<T>;

/**
 * total = borrowed + available0
 */
export const totalSum = z.custom<{ total: number; args: number[] }>(
    isSumEqTotal,
);

export const LoginSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(4).max(100),
    })
    .required();

export type Login = z.infer<typeof LoginSchema>;

export const NewBookSchema = z
    .object({
        title: z.string().min(1),
        authors: z.array(z.string().min(1)),
        yearPublished: z.number().int().positive(),
        total: z.number().int().positive(),
    })
    .required();

export type NewBook = z.infer<typeof NewBookSchema>;

export type Book = Omit<NewBook, "total"> & {
    _id: string;
    dateAdded: number;
};

export const InventorySchema = z
    .object({
        _id: z.string(),
        title: z.string(),
        available: z.number(),
        borrowed: z.number(),
        total: z.number(),
    })
    .required();

export type BookInventory = z.infer<typeof InventorySchema>;

export type BookData = [Book, BookInventory];

export const UpdateBookSchema = z
    .object({
        title: z.string().min(1),
        authors: z.array(z.string().min(1)).min(1),
        yearPublished: z.number().int().positive(),
    })
    .required();

export type UpdateBook = z.infer<typeof UpdateBookSchema>;

export const UpdateInventorySchema = z
    .object({
        total: z.number().int().positive(),
        available: z.number().int().nonnegative(),
        borrowed: z.number().int().nonnegative(),
    })
    .required();

export type UpdateInventory = z.infer<typeof UpdateInventorySchema>;

/**
 * gte 0
 */
export const nonNegativeInt = z.number().int().nonnegative();
/**
 * gt 0
 */
export const positiveInt = z.number().int().positive();

function isSumEqTotal(data: unknown) {
    if (typeof data !== "object" || data === null) {
        return false;
    }

    const { total, args } = data as { total: number; args: number[] };

    if (typeof total !== "number" || !Array.isArray(args)) {
        return false;
    }

    return total === args.reduce((acc, curr) => acc + curr, 0);
}

export type Member = {
    _id: string;
    name: string;
    email: string;
    age: string;
    joinDate: string;
    approvedBy: string;
};

export const NewMemberSchema = z.object({
    name: z.string().min(1),
    age: z.number().int().positive().max(150).min(6),
    email: z.string().email(),
});

export type NewMember = z.infer<typeof NewMemberSchema>;

export type Borrow = {
    _id: string;
    bookId: string;
    borrower: string;
    date: number;
    promisedReturnDate: number;
    title: string;
    isReturned?: boolean;
};

export type Return = {
    _id: string;
    bookId: string;
    borrower: string;
    returnDate: number;
    borrowDate: number;
    approvedBy: string;
    title: string;
};

export type Penalty = {
    _id: string;
    bookId: string;
    borrower: string;
    penalty: number;
    approvedBy: string;
};

export type User = {
    email: string;
    name: string;
    age: number;
    joinDate: number;
    _id: string;
};

export type Option = {
    value: string;
    text: Uppercase<string>;
};

export type BookSearchResults = {
    _id: string;
    title: string;
};

function timeChecker(value: unknown) {
    const now = Date.now() - 1;
    return (
        typeof value === "number" &&
        value > 0 &&
        Math.floor(value) === value &&
        value > now
    );
}

/**
 * @Note check for valid dates number
 */
const DateChecker = z.custom<number>(timeChecker);

export const NewBorrowSchema = z
    .object({
        bookId: z.string().min(20),
        borrower: z.string().min(20),
        promisedReturnDate: DateChecker,
    })
    .required();

export type BorrowSchemaType = z.infer<typeof NewBorrowSchema> & {
    _id: string;
    date: number;
    approvedBy: string;
    title: string;
};

export type MemberSearchResults = {
    _id: string;
    name: string;
    email: string;
};

export type BorrowReturnLoaderType = {
    name: string;
    date: number;
    promisedReturnDate: z.infer<typeof DateChecker>;
    title: string;
    penalty: number;
};

export const RegisterSchema = z
    .object({
        name: z.string(),
        age: z.number().int().min(14),
        email: z.string().email(),
        password: z.string().min(4),
        secret: z.string().min(4),
    })
    .required();

export type Register = z.infer<typeof RegisterSchema>;
