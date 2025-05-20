import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['Moonhalo']) {}

    add(note: string){
        this.data.push(note)
        return this.data
    }

    remove(index: number){
        return this.data.splice(index, 1)
    }

    update(index: number, note: string){
        return (this.data[index] = note)
    }
}

export const note = new Elysia()
    .decorate('note', new Note())
    .get('/note', ({ note }) => note.data)

    // Update note
    .put('/note', ({ note, body: { data } }) => note.add(data), {
        body: t.Object({
            data: t.String()
        })
    })

    // Read note
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

    // Delete note
    .delete(
        '/note/:index',
        ({ note, params: { index }, status}) => {
            if (index in note.data) return note.remove(index)

            return status(422)
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )

    // Update note 
    .patch(
        '/note/:index',
        ({ note, params: { index }, body: { data }, status }) => {
            if(index in note.data) return note.update(index, data)

            return status(422)
        },
        {
            params: t.Object({
                index: t.Number()
            }),
            body: t.Object({
                data: t.String()
            })
        }
    )