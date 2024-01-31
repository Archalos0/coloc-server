enum Role {
    ADMIN,
    OWNER,
    ROOMMATE
}

export default interface User {
    ID : number
    phoneNumber : string
    email : string
    firstName : string
    password : string
    role : Role
    lastName ?: string
    birthday ?: Date
    photo ?: File
    description ?: string

    bedroom ?: Bedroom
    shoppingList ?: ShoppingList
    fridge ?: Article[]
    privateInbox ?: Inbox
}

