import { z } from 'zod'

interface ValidatorOptions {
  data: object
  schema: z.Schema
}

export const zodValidator = ({ data, schema }: ValidatorOptions) => {
  try {
    return schema.parse(data)
  } catch (err: any) {
    const { path, message } = err.issues[0]
    throw { zod: `${path}: ${message}` }
  }
}
