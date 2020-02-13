import Note from './Note';

export default interface Todo {
    _id: string,
    description: string,
    isChecked: boolean,
    todoNote: Note,
    createdAt: Date,
    updatedAt?: Date
}