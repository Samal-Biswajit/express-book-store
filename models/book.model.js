import { pgTable, uuid, varchar, text, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import authorsTable from './author.model.js';

const booksTable = pgTable(
  'books',
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid('authorid')
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index('title_index').using(
      'gin',
      sql`to_tsvector('english', ${table.title})`,
    ),
  }),
);

export default booksTable;
