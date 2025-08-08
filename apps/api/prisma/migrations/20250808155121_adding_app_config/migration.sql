-- CreateTable
CREATE TABLE "public"."App_Config" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "App_Config_key_key" ON "public"."App_Config"("key");
