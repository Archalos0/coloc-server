-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OWNER', 'ROOMMATE');

-- CreateEnum
CREATE TYPE "TypeArticle" AS ENUM ('FOOD', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ROOMMATE',
    "phoneNumber" TEXT,
    "lastName" TEXT,
    "birthday" DATE,
    "photo" BYTEA,
    "description" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "House" (
    "ID" SERIAL NOT NULL,
    "ownerID" INTEGER,

    CONSTRAINT "House_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Bedroom" (
    "ID" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "size" DECIMAL(65,30) NOT NULL,
    "isEquipped" BOOLEAN NOT NULL DEFAULT false,
    "occupantID" INTEGER,
    "houseID" INTEGER NOT NULL,

    CONSTRAINT "Bedroom_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ArticleToBuy" (
    "ID" SERIAL NOT NULL,
    "type" "TypeArticle" NOT NULL DEFAULT 'OTHER',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "isBuy" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER,
    "houseID" INTEGER,
    "buyerID" INTEGER,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ArticleToBuy_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_ownerID_key" ON "House"("ownerID");

-- CreateIndex
CREATE UNIQUE INDEX "Bedroom_occupantID_key" ON "Bedroom"("occupantID");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_occupantID_fkey" FOREIGN KEY ("occupantID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_houseID_fkey" FOREIGN KEY ("houseID") REFERENCES "House"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleToBuy" ADD CONSTRAINT "ArticleToBuy_houseID_fkey" FOREIGN KEY ("houseID") REFERENCES "House"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleToBuy" ADD CONSTRAINT "ArticleToBuy_buyerID_fkey" FOREIGN KEY ("buyerID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
