/*
  Warnings:

  - You are about to alter the column `landing_status` on the `Lending` table. The data in that column could be lost. The data in that column will be cast from `VarChar(25)` to `TinyInt`.
  - Made the column `lending_start_date` on table `Lending` required. This step will fail if there are existing NULL values in that column.
  - Made the column `return_date` on table `Lending` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Lending` MODIFY `lending_start_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `return_date` TIMESTAMP(0) NOT NULL,
    MODIFY `landing_status` BOOLEAN NOT NULL;
