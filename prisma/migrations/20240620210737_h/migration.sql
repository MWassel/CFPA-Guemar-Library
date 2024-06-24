-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `auther_id_fk`;

-- DropForeignKey
ALTER TABLE `Book_copy` DROP FOREIGN KEY `book_id_fk`;

-- DropForeignKey
ALTER TABLE `Lending` DROP FOREIGN KEY `user_id_fk`;

-- DropForeignKey
ALTER TABLE `Punishment` DROP FOREIGN KEY `lending_id_fk`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `auther_id_fk` FOREIGN KEY (`author_id`) REFERENCES `Author`(`author_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Book_copy` ADD CONSTRAINT `book_id_fk` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Lending` ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Punishment` ADD CONSTRAINT `lending_id_fk` FOREIGN KEY (`lending_id`) REFERENCES `Lending`(`lending_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
