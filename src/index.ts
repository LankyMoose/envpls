import * as dotenv from "dotenv"
dotenv.config()

type ValidatedEnv<T> = {
  [P in keyof T]: T[P] extends string | undefined ? string : ValidatedEnv<T[P]>
}

type EnvSchema<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? EnvSchema<T[K]> : any
}

export default function envpls<
  const T extends EnvSchema<Record<string, unknown>>
>(envSchema: T) {
  const errors: string[] = []
  recurse(envSchema, errors)
  if (errors.length > 0) {
    throw new Error(`[envplease]: Missing env variables: ${errors.join(", ")}`)
  }
  return envSchema as ValidatedEnv<T>
}

function recurse(
  envSchema: EnvSchema<Record<string, unknown>>,
  errors: string[],
  path: string = ""
) {
  for (const key in envSchema) {
    const keyPath = (path.length > 0 ? path + "." : "") + key
    if (envSchema[key] === undefined) {
      errors.push(keyPath)
    } else if (typeof envSchema[key] === "object") {
      recurse(envSchema[key], errors, keyPath)
    }
  }
}
