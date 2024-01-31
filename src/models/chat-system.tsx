interface Inbox {
    sender : number
    receiver : number
    message : Message
    isRead : boolean
} 

interface Message {
    ID : number 
    text : string
    timestamp : Date
}