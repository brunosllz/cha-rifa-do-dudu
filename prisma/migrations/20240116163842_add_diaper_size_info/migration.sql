/*
  Warnings:

  - Added the required column `diaperSize` to the `selectedNumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `selectedNumber` ADD COLUMN `diaperSize` VARCHAR(191) NOT NULL;
