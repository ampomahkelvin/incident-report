/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "incidents" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "incident_desc" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "country" VARCHAR NOT NULL,
    "weather_report" JSON,
    "date" TIMESTAMPTZ
);