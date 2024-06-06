/*
  Warnings:

  - Made the column `password_key` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sex` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialization` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `profile_picture` VARCHAR(191) NULL,
    MODIFY `password_key` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `sex` VARCHAR(10) NOT NULL,
    MODIFY `specialization` VARCHAR(50) NOT NULL;
