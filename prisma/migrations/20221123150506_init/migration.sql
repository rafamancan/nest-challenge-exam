-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "codigo_amostra" TEXT NOT NULL,
    "cocaina" INTEGER NOT NULL,
    "anfetamina" INTEGER NOT NULL,
    "metanfetamina" INTEGER NOT NULL,
    "mda" INTEGER NOT NULL,
    "mdma" INTEGER NOT NULL,
    "thc" INTEGER NOT NULL,
    "morfina" INTEGER NOT NULL,
    "codeina" INTEGER NOT NULL,
    "heroina" INTEGER NOT NULL,
    "benzoilecgonina" INTEGER NOT NULL,
    "cocaetileno" INTEGER NOT NULL,
    "norcocaina" INTEGER NOT NULL,
    "resultado" BOOLEAN NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exams_codigo_amostra_key" ON "exams"("codigo_amostra");
