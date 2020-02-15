import Todo from './todo';

export default interface Note {
    _id: string,
    title: string,
    todos: Todo[],
    createdAt: Date,
    updatedAt?: Date
}