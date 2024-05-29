# envpls

_ez clap structured env_

### usage

```ts
import envpls from "envpls"

export const env = envpls({
  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT || "5173"),
  },
  url: process.env.URL || "http://localhost:5173",
  domain: process.env.DOMAIN || "localhost",
  isProduction: process.env.NODE_ENV === "production",
  db: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
})
```
