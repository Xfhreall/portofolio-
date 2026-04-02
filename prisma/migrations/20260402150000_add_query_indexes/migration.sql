-- Improve read performance for ordered list queries used by project and experience pages
CREATE INDEX IF NOT EXISTS "Project_order_createdAt_idx" ON "Project"("order", "createdAt");
CREATE INDEX IF NOT EXISTS "Project_isFeatured_order_createdAt_idx" ON "Project"("isFeatured", "order", "createdAt");
CREATE INDEX IF NOT EXISTS "Experience_order_createdAt_idx" ON "Experience"("order", "createdAt");
