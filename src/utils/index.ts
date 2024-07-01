import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

export const parsingInt = (int: any): number => {
    const isValidInt = /^\d+$/.test(int)

    if (!isValidInt) return NaN;

    const houseID: number = parseInt(int, 10)

    return houseID
}

export class PrismaError extends Error {
    details: any
    constructor(message: string, details: any) {
        super(message)
        this.details = details
    }

    GetDetails() {
        return {
            message: this.message,
            details: {
                message: this.details.message,
                clientVersion: this.details.clientVersion,
                code: this.details?.code,
                meta: this.details?.meta
            }
        }
    }

    ToString() {
        return Object.assign({}, this)
    }
}

export function GeneratePrismaError(error: any): Error {
    if (error instanceof PrismaClientKnownRequestError)     return new Error("Specific error. Need to be handle")
    if (error instanceof PrismaClientValidationError)       return new Error("Incorrect or missing fields in the request")

    return new Error("Internal error")
}