/*
  Warnings:

  - You are about to alter the column `dni` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(9)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "dni" SET DATA TYPE VARCHAR(8);
