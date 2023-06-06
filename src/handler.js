const {nanoid} = require ('nanoid');
const notes = require ('./notes');

const addNoteHandler = (request, h) => {
const {tittle, tags, body} = request.payload

const id = nanoid(16);
const createdAt = new Date().toISOString();
const upadateAt = createdAt;

const newNote = {
    tittle, tags, body, createdAt, upadateAt,
};

notes.push(newNote);

const isSuccess = notes.filter((note) => note.id === id).length > 0;

if(isSuccess) {
    const response = h.response({
        status: 'Success',
        message: 'catatan berhasil ditemukan',
        data: {
            noteId: id,
        },
    })
    response.code(201);
    return response;
}

const response = h.response({
    status: 'fail',
    message: 'catatan gagal ditambahkan',
});
response.code(500);
return response;
};

const getAllNoteHandler = () => ({
status: 'succes',
data: {
    notes,
},
});

const getNoteByIdHandler = (request,h) => {
    const{id} = request.params;

    const note = notes.filter((n) => n.id === id[0]);
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };

    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    })
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;

    const {tittle,tags,body} = request.payload;
    const upadateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            tittle,
            tags,
            body,
            upadateAt,
        };

    const response = h.response ({
        status:'success',
        message: 'Catatan Berhasil Diupadate',
    })
    response.code(200);
    return response;
    }

    const response = h.response ({
        status: 'fail',
        message: 'Gagal memperbarui catatan, Id tidak ditemukan',
    })
    response.code(400);
    return response;
}

const deleteNoteByIdHandler = (request, h) => {
 const { id } = request.paarams;

 const index = notes.findIndex((note) => note.id === id )

 if (index !== -1) {
    notes.splice(index, -1);
    const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
 }

 const response = h.response ({
    status: 'fail',
    message: 'Catatan gagal dihapus, Id tidal ditemukan',
 });
 response.code(404);
 return response;
}

module.exports = {addNoteHandler,getAllNoteHandler,getNoteByIdHandler,editNoteByIdHandler,deleteNoteByIdHandler};