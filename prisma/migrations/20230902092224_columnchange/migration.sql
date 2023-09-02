/*
  Warnings:

  - You are about to drop the column `orderdBooks` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderdBooks",
ADD COLUMN     "orderedBooks" JSONB[];
