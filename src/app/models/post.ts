export interface Post {
    title: string,
    description: string,
    preview: string,
    file: string,
    date: string,
    order?: number,
    user?: string
}