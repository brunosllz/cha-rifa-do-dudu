-- DropForeignKey
ALTER TABLE `selectedNumber` DROP FOREIGN KEY `selectedNumber_buyerId_fkey`;

-- AddForeignKey
ALTER TABLE `selectedNumber` ADD CONSTRAINT `selectedNumber_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `buyer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
