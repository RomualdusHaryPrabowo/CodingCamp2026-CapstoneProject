-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "guest_id" VARCHAR(255) NOT NULL,
    "hard_skill" JSONB NOT NULL,
    "soft_skill" JSONB NOT NULL,
    "prediction_result" VARCHAR(100) NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "History_guest_id_idx" ON "History"("guest_id");

-- CreateIndex
CREATE INDEX "History_createdAt_idx" ON "History"("createdAt");
