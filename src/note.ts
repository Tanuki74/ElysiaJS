import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['Moonhalo']) {}
}

export const note = new Elysia()
    .decorate('note', new Note())
    .get('/note', ({ note }) => note.data)
    .get(
        '/note/:index',
        ({ note, params: { index }, status }) => {
            return note.data[index] ?? status(404, 'oh no :(')
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )