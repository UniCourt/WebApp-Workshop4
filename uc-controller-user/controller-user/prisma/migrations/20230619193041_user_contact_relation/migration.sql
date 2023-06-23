/*
  Warnings:

  - Added the required column `userId` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "contact_phone_number_key";

-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
