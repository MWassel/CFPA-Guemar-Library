/*
  Warnings:

  - You are about to alter the column `author_birthdate` on the `Author` table. The data in that column could be lost. The data in that column will be cast from `VarChar(25)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Author` MODIFY `author_birthdate` DATETIME(3) NULL;
