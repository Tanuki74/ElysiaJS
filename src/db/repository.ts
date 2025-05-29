import { db } from './index';
import { notes, InsertNote } from './schema';
import { eq } from 'drizzle-orm';

export class NoteRepository {
  async findAll() {
    return await db.select().from(notes);
  }

  async findById(id: number) {
    const result = await db.select().from(notes).where(eq(notes.id, id));
    return result[0] || null;
  }

  async create(note: InsertNote) {
    const result = await db.insert(notes).values(note);
    return result;
  }

  async update(id: number, note: Partial<InsertNote>) {
    return await db.update(notes)
      .set(note)
      .where(eq(notes.id, id));
  }

  async delete(id: number) {
    return await db.delete(notes).where(eq(notes.id, id));
  }
}
