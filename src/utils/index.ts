export const parsingInt = (int: any): number => {
    const isValidInt = /^\d+$/.test(int)

    if (!isValidInt) return NaN;

    const houseID: number = parseInt(int, 10)

    return houseID
}


export interface PrismaError {
    code?: string;
    meta?: any;
    message: string;
    clientVersion: string;
}