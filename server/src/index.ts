import { Elysia, t } from "elysia"
import { example } from "./controller/example.controller"
import { swaggerConfig } from "./configs/swagger.config"
import { tlsConfig } from "./configs/tls.config"
import cors from "@elysiajs/cors"
import { MongoDB } from "./configs/database.config"
import { jwtConfig } from "./configs/jwt.config"
import { AccountController } from "./controller/account.controller"
import { UserController } from "./controller/user.controller"
import staticPlugin from "@elysiajs/static"
import { PhotoController } from "./controller/photo.controller"
import { LikeController } from "./controller/like.controller"


MongoDB.connect()


const app = new Elysia()

  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfig)
  .use(AccountController)
  .use(UserController)
  .use(LikeController)
  .use(PhotoController)

  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })



let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🤯🤯 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}🤯🤯`)