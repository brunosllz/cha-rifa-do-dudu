/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `selectedNumber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `selectedNumber_number_key` ON `selectedNumber`(`number`);
