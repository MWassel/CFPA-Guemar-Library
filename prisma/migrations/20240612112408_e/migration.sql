/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Book_copy` DROP FOREIGN KEY `book_id_fk`;

-- DropForeignKey
ALTER TABLE `Lending` DROP FOREIGN KEY `user_id_fk`;

-- AlterTable
ALTER TABLE `Book` DROP PRIMARY KEY,
    MODIFY `book_id` VARCHAR(25) NOT NULL,
    ADD PRIMARY KEY (`book_id`);

-- AlterTable
ALTER TABLE `Book_copy` MODIFY `book_id` VARCHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `Lending` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(25) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- AddForeignKey
ALTER TABLE `Book_copy` ADD CONSTRAINT `book_id_fk` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lending` ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
