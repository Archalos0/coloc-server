interface ShoppingList {
    article : Article
    quantity : number
    isBuy : boolean
    isPrivate : boolean
    buyer ?: User
}

enum ArticleType {
    FOOD,
    OTHER
}

interface Article {
    ID : number
    name : string
    description ?: string
    photo ?: File
    type : ArticleType
}

interface Fridge {
    ID: number
    article: Article
    quantity: number
}