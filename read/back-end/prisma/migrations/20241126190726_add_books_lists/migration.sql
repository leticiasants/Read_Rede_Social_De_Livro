-- CreateTable
CREATE TABLE "ReadBooks" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadBooks_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateTable
CREATE TABLE "ReadingBooks" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingBooks_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateTable
CREATE TABLE "ToReadBooks" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToReadBooks_pkey" PRIMARY KEY ("userId","bookId")
);

-- AddForeignKey
ALTER TABLE "ReadBooks" ADD CONSTRAINT "ReadBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadBooks" ADD CONSTRAINT "ReadBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingBooks" ADD CONSTRAINT "ReadingBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingBooks" ADD CONSTRAINT "ReadingBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToReadBooks" ADD CONSTRAINT "ToReadBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToReadBooks" ADD CONSTRAINT "ToReadBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
