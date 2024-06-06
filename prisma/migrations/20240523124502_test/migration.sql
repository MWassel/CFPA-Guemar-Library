-- CreateTable
CREATE TABLE `Author` (
    `author_id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(50) NOT NULL,
    `author_nationality` VARCHAR(25) NULL,
    `author_birthdate` DATE NULL,
    `author_field` VARCHAR(25) NULL,

    PRIMARY KEY (`author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_id` INTEGER NOT NULL,
    `book_title` VARCHAR(100) NOT NULL,
    `publishing_year` VARCHAR(10) NULL,
    `pages_number` INTEGER NULL,
    `publishing_house` VARCHAR(50) NULL,
    `about_book` TEXT NULL,
    `category` VARCHAR(25) NULL,
    `copys_number` INTEGER NULL,
    `book_cover` VARCHAR(255) NULL,

    INDEX `auther_id_fk`(`author_id`),
    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book_copy` (
    `copy_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,

    INDEX `book_id_fk`(`book_id`),
    PRIMARY KEY (`copy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmarks` (
    `user_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `bookmark_id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `bookmark_id`(`bookmark_id`),
    PRIMARY KEY (`user_id`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lending` (
    `copy_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `lending_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lending_start_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `lending_end_date` TIMESTAMP(0) NULL,
    `return_date` TIMESTAMP(0) NULL,
    `landing_status` VARCHAR(25) NOT NULL,

    INDEX `copy_id_fk`(`copy_id`),
    INDEX `user_id_fk`(`user_id`),
    PRIMARY KEY (`lending_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `user_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `like_id`(`like_id`),
    PRIMARY KEY (`user_id`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Punishment` (
    `lending_id` INTEGER NOT NULL,
    `punishment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `punishment_start_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `punishment_end_date` TIMESTAMP(0) NULL,
    `punishment_type` VARCHAR(25) NULL,
    `reason` VARCHAR(50) NULL,

    INDEX `lending_id_fk`(`lending_id`),
    PRIMARY KEY (`punishment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(100) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password_key` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `sex` VARCHAR(10) NULL,
    `specialization` VARCHAR(50) NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `auther_id_fk` FOREIGN KEY (`author_id`) REFERENCES `Author`(`author_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book_copy` ADD CONSTRAINT `book_id_fk` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lending` ADD CONSTRAINT `copy_id_fk` FOREIGN KEY (`copy_id`) REFERENCES `Book_copy`(`copy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Lending` ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Punishment` ADD CONSTRAINT `lending_id_fk` FOREIGN KEY (`lending_id`) REFERENCES `Lending`(`lending_id`) ON DELETE CASCADE ON UPDATE CASCADE;
