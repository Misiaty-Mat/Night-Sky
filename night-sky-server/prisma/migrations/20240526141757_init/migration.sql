-- CreateEnum
CREATE TYPE "MoonPhase" AS ENUM ('New', 'Waxing_Crescent', 'First_Quarter', 'Waxing_Gibbous', 'Full', 'Waning_Gibbous', 'Third_Quarter', 'Waning_Crescent');

-- CreateEnum
CREATE TYPE "RainType" AS ENUM ('Snow', 'Drizzle', 'Heavy', 'None');

-- CreateTable
CREATE TABLE "Sky" (
    "id" SERIAL NOT NULL,
    "cloudLevel" INTEGER NOT NULL,
    "moonPhase" "MoonPhase" NOT NULL DEFAULT 'New',
    "rainType" "RainType" NOT NULL DEFAULT 'None',
    "fogLevel" INTEGER NOT NULL,

    CONSTRAINT "Sky_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constellation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgLink" TEXT NOT NULL,
    "skyId" INTEGER NOT NULL,

    CONSTRAINT "Constellation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Star" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgLink" TEXT NOT NULL,
    "constellationId" INTEGER NOT NULL,

    CONSTRAINT "Star_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Constellation_skyId_idx" ON "Constellation"("skyId");

-- CreateIndex
CREATE INDEX "Star_constellationId_idx" ON "Star"("constellationId");

-- AddForeignKey
ALTER TABLE "Constellation" ADD CONSTRAINT "Constellation_skyId_fkey" FOREIGN KEY ("skyId") REFERENCES "Sky"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "Constellation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
