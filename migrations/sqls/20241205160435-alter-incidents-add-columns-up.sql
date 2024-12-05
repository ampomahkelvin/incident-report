/* Replace with your SQL commands */
ALTER TABLE "incidents"
    ADD COLUMN "temperature" FLOAT,
    ADD COLUMN "humidity" FLOAT,
    ADD COLUMN "client_id" INTEGER,
    ADD CONSTRAINT "fk_client_id"
    FOREIGN KEY("client_id") REFERENCES "users"("id")