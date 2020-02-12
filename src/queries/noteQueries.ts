class QueriesStrings {
    notesQuery: String = `
        query {
            notes {
                _id
                title
                createdAt
                todos {
                    _id
                    description
                    isChecked
                    createdAt
                }
            }
        }
    `;

    addNoteQuery: String = `
        mutation {
            createNote {
                _id
                title
                todos {
                    _id
                    description
                    isChecked
                    createdAt
                }
                createdAt
            }
        }
    `;

    updateTitleQuery = (noteId: String, titleString: String): String => `
        mutation {
            updateNoteTitle(updatedNote: {
                _id: "${noteId}",
                title: "${titleString}"
            }) {
                _id
                title
            }
        }
    `;

    deleteNoteQuery = (noteId: String): String => `
        mutation {
            deleteNote(noteId: "${noteId}") {
                _id
            }
        }
    `;
}

const Queries: QueriesStrings = new QueriesStrings();
export default Queries;