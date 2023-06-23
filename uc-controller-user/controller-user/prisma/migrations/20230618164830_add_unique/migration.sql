/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contact_phone_number_key" ON "contact"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_id_key" ON "user"("email_id");
