export interface PostSchema {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}
 
export interface ErrorData {
    title?: string;
    content?: string;
}