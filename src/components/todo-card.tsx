import { useState, FC } from 'react';
import { TodoType } from '../App';

interface Props {
    index: number;
    id: string;
    text: string;
    done: boolean;
    todoList: TodoType[];
    setTodoList: (val: TodoType[]) => void;
}

export const TodoCard: FC<Props> = ({ index, id, text, done, todoList, setTodoList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);

    const updateTodoList = (updatedTodos: TodoType[]) => setTodoList(updatedTodos);

    const handleDeleteTodo = () => {
        updateTodoList(todoList.filter(item => item.id !== id));
    };

    const handleUpdateTextTodo = () => {
        updateTodoList(todoList.map(item => (item.id === id ? { ...item, text: inputValue } : item)));
        setIsEditing(false);
    };

    const handleUpdateDoneTodo = () => {
        updateTodoList(todoList.map(item => (item.id === id ? { ...item, done: !done } : item)));
        setIsEditing(false);
    };

    const isBorder = todoList.length > 1 && index !== todoList.length - 1;

    return (
        <div className={`w-full flex items-center justify-between gap-6 py-5 border-b ${isBorder ? 'border-gray-200' : 'border-transparent'}`}>
            {isEditing ? (
                <>
                    <div className='w-full flex items-center justify-start gap-3'>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className='w-full h-10 border border-gray-400 rounded-lg px-2 py-1 text-base text-gray-800'
                        />
                    </div>
                    <div className='min-w-max flex items-center justify-end gap-3'>
                        <button onClick={handleUpdateTextTodo} className='w-20 h-10 bg-gray-200 rounded-md'>save</button>
                        <button onClick={() => setIsEditing(false)} className='w-20 h-10 bg-gray-200 rounded-md'>cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex items-center justify-start gap-3'>
                        <input
                            type="checkbox"
                            checked={done}
                            onChange={handleUpdateDoneTodo}
                            className='size-6 min-w-6 accent-[#2ebaef] cursor-pointer'
                        />
                        <hr className='h-6 border border-gray-300' />
                        <div className='flex items-center justify-start gap-2'>
                            <p className='text-base text-gray-800 font-medium'>{index + 1}. </p>
                            {done ? (
                                <del className='text-base text-gray-800 font-medium break-all'>{text}</del>
                            ) : (
                                <p className='text-base text-gray-800 font-medium break-all'>{text}</p>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-3'>
                        <button onClick={() => setIsEditing(true)} className='w-20 h-10 bg-gray-200 rounded-md'>edit</button>
                        <button onClick={handleDeleteTodo} className='w-20 h-10 bg-gray-200 rounded-md'>delete</button>
                    </div>
                </>
            )}
        </div>
    );
};
