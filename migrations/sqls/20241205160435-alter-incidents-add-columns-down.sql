/* Replace with your SQL commands */
/* Replace with your SQL commands */
ALTER TABLE "incidents"
    DROP COLUMN IF EXISTS "temperature" CASCADE ,
    DROP COLUMN IF EXISTS  "humidity" CASCADE,
    DROP COLUMN IF EXISTS "client_id" CASCADE