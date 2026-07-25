import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const CredentialsSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export class CredentialsDto extends createZodDto(CredentialsSchema) {}