-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "targetCareer" VARCHAR(100) NOT NULL,
    "skillsInput" JSONB NOT NULL,
    "recommendedCareer" VARCHAR(100) NOT NULL,
    "confidencePercent" DOUBLE PRECISION NOT NULL,
    "allPredictions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recommendation_targetCareer_idx" ON "Recommendation"("targetCareer");

-- CreateIndex
CREATE INDEX "Recommendation_createdAt_idx" ON "Recommendation"("createdAt");
