/*
  Warnings:

  - Added the required column `gender` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_image` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "profile_image" TEXT NOT NULL;
