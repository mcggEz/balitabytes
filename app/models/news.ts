import { ObjectId } from "mongodb";

export interface News {
    _id: ObjectId;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    createdAt: Date;
}

export interface NewsInput {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

