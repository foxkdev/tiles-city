-- AlterTable
ALTER TABLE "MapTile" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "MapTile" ADD CONSTRAINT "MapTile_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MapTile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
