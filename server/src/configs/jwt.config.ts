import jwt from "@elysiajs/jwt"

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'DFJDIGJHDUED',
    exp: '1d'
})