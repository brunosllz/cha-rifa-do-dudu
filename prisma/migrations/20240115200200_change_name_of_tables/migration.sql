/*
  Warnings:

  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SelectedNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SelectedNumber` DROP FOREIGN KEY `SelectedNumber_buyerId_fkey`;

-- DropTable
DROP TABLE `Buyer`;

-- DropTable
DROP TABLE `SelectedNumber`;

-- CreateTable
CREATE TABLE `buyer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `selectedNumber` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `buyerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `selectedNumber` ADD CONSTRAINT `selectedNumber_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `buyer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
