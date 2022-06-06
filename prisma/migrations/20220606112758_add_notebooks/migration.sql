-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "notebookId" TEXT;

-- CreateTable
CREATE TABLE "NoteBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "NoteBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "NoteBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
