import { Elysia, t } from 'elysia';
import { NoteRepository } from './db/repository';
import { InsertNote } from './db/schema';

class Note {
    private repository: NoteRepository;

    constructor() {
        this.repository = new NoteRepository();
    }

    async getAll() {
        return await this.repository.findAll();
    }

    async getById(id: number) {
        return await this.repository.findById(id);
    }

    async add(content: string) {
        const note: InsertNote = { content };
        return await this.repository.create(note);
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }

    async update(id: number, content: string) {
        return await this.repository.update(id, { content });
    }
}

export const note = new Elysia({ prefix: '/note'})
    .decorate('note', new Note())
    .get('/', async ({ note }) => await note.getAll())

    // Add note
    .put('/add', async ({ note, body: { data } }) => await note.add(data), {
        body: t.Object({
            data: t.String()
        })
    })

    .guard({
        params: t.Object({
            id: t.Number()
        })
    })

    // Read note
    .get(
        '/read/:id',
        async ({ note, params: { id }, status }) => {
            const result = await note.getById(id);
            return result ?? status(404, 'Note not found');
        }
    )

    // Delete note
    .delete(
        '/delete/:id',
        async ({ note, params: { id }, status}) => {
            const noteExists = await note.getById(id);
            if (noteExists) {
                return await note.remove(id);
            }
            return status(422, 'Note not found');
        }
    )

    // Update note 
    .patch(
        '/update/:id',
        async ({ note, params: { id }, body: { data }, status }) => {
            const noteExists = await note.getById(id);
            if(noteExists) {
                return await note.update(id, data);
            }
            return status(422, 'Note not found');
        },
        {
            body: t.Object({
                data: t.String()
            })
        }
    )