import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})
