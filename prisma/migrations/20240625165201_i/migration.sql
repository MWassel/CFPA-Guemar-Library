/*
  Warnings:

  - You are about to alter the column `return_status` on the `Lending` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Lending` MODIFY `return_status` VARCHAR(191) NOT NULL DEFAULT 'Not Returned';
