/*
  Warnings:

  - You are about to drop the `MapTiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MapTiles";

-- CreateTable
CREATE TABLE "MapTile" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapTile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MapTile_x_y_key" ON "MapTile"("x", "y");
