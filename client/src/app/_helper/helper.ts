import { QueryPagination, UserQueryPagination } from "../_models/pagination"
import { User } from "../_models/user"

const defaultAvatar = '/assets/DefaultAvatar.png'
const defaultImage = '/assets/Default.png'
function getAvatar(user: User): string {
    if (user.photos) {
        const avatar = user.photos.find(p => p.is_avartar === true)
        if (avatar)
            return avatar.url
    }

    return defaultAvatar
}

function getPhotoOfTheDay(user: User): string {
    if (user.photos && user.photos.length > 0) {
        const index = Math.floor(Math.random() * user.photos.length)
        return user.photos[index].url
    }
    return defaultImage
}

export function parseUserPhoto(user: User): User {
    user.avatar = getAvatar(user)
    user.photoOfTheDay = getPhotoOfTheDay(user)
    return user
}

export function parseQuery(query: QueryPagination | UserQueryPagination): string {
    let queryString = '?'
    if (query.pageSize)
        queryString += `&pageSize=${query.pageSize}`
    if (query.currentPage)
        queryString += `&currentPage=${query.currentPage}`
    if ('username' in query && query.username)
        queryString += `&username=${query.username}`
    if ('username' in query && query.looking_for)
        queryString += `&looking_for=${query.looking_for}`
    if ('username' in query && query.min_age)
        queryString += `&min_age=${query.min_age}`
    if ('username' in query && query.max_age)
        queryString += `&max_age=${query.max_age}`

    return queryString
}