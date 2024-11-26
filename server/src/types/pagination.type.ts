import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    pagesize: t.Number(),
    current: t.Number(),
    length: t.Optional(t.Number()),
})

export type pagination = Static<typeof _pagination>

export function CreatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginationtype: U) {
    return t.Object({
        datas: t.Array(itemType),
        pagination: paginationtype
    })
}
