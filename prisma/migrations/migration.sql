-- Add a full-text index on the "name" (and optionally description) columns
CREATE INDEX companion_fulltext_idx
  ON "Companion"
  USING GIN (to_tsvector('english', coalesce("name", '') || ' '));