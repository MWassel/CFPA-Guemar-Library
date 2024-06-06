/*
  Warnings:

  - You are about to alter the column `publishing_year` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `publishing_year` INTEGER NULL,
    MODIFY `about_book` VARCHAR(255) NULL;
