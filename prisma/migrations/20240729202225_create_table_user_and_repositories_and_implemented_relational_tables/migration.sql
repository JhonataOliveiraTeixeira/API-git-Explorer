-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "respositories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "star" TEXT NOT NULL,
    "forks" TEXT NOT NULL,
    "issuesOpen" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "respositories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
