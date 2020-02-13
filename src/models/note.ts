import Todo from './todo';

export default interface Note {
    _id: String,
    title: String,
    todos: Todo[],
    createdAt: Date,
    updatedAt?: Date
}