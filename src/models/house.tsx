enum HouseworkMode {
    WEEKLY = 1,
    TWO_PER_MONTH = 2,
    THREE_PER_MONTH = 3,
    MONTHLY = 4
}

interface House {
    ID : number
    houseworkMode : HouseworkMode
    googleCalendarID : string

    bedrooms : Bedroom[]
    shoppingList ?: ShoppingList
    occupants ?: User[]
    owner ?: User
    privateChannel : Inbox
    houseworkOrganization ?: HouseWorkOrganization[]
}