import { Prisma } from "@prisma/client";
import { CreateBedroomDto } from "./dto/create-bedroom.dto";
import { create } from "domain";

export function CreateDtoToCreatePrisma(createBedroomDto: CreateBedroomDto): Prisma.BedroomCreateInput {

    const createBedroomPrisma: Prisma.BedroomCreateInput = {
        price: createBedroomDto.price,
        size: createBedroomDto.size,
        isEquipped: createBedroomDto.isEquipped,
        occupant: createBedroomDto.occupantID
            ? { connect: { ID: createBedroomDto.occupantID } }
            : undefined,
        house: { connect: { ID: createBedroomDto.houseID } }
    }

    return createBedroomPrisma

}