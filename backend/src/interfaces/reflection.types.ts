export interface Reflection {
    id: number
    user_id: number
    title: string
    content: string | null
    drawing: string | null
    created_at: string
}

export class ReflectionDTO {
    title: string
    content: string | null
    drawing: string | null
}