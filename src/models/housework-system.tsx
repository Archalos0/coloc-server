interface HouseWorkOrganization {
    ID : number
    cleaningTask : CleaningTask
    date : Date
    timeNeeded : number
    googleCalendarID : string
    isDone : boolean
    cleaner ?: User
    timestamp : Date
}

interface CleaningTask {
    ID : number
    name : string
    toolsNeeded : string
}