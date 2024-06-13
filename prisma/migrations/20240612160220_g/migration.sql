/*
  Warnings:

  - You are about to drop the column `landing_status` on the `Lending` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Lending` DROP COLUMN `landing_status`,
    ADD COLUMN `actual_return_date` TIMESTAMP(0) NULL,
    ADD COLUMN `return_status` BOOLEAN NOT NULL DEFAULT true;
