/*
  Warnings:

  - Added the required column `name` to the `respositories` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_respositories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "star" TEXT NOT NULL,
    "forks" TEXT NOT NULL,
    "issuesOpen" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "respositories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_respositories" ("forks", "id", "issuesOpen", "star", "userId") SELECT "forks", "id", "issuesOpen", "star", "userId" FROM "respositories";
DROP TABLE "respositories";
ALTER TABLE "new_respositories" RENAME TO "respositories";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
