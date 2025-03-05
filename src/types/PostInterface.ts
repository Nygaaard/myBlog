export interface PostSchema {
    id: number;
    title: string;
    content: string;
    created_at: string;
}
 
export interface ErrorData {
    title?: string;
    content?: string;
}