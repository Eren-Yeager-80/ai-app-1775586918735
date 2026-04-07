import React, { useState } from 'react';
    import { Check, Edit, Trash2, X, Save } from 'lucide-react';

    interface TodoItemProps {
      todo: { id: string; text: string; completed: boolean };
      toggleTodo: (id: string) => void;
      updateTodo: (id: string, newText: string) => void;
      deleteTodo: (id: string) => void;
    }

    const TodoItem: React.FC<TodoItemProps> = ({
      todo,
      toggleTodo,
      updateTodo,
      deleteTodo,
    }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editText, setEditText] = useState(todo.text);

      const handleEdit = () => {
        if (isEditing) {
          updateTodo(todo.id, editText);
        }
        setIsEditing(!isEditing);
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleEdit();
        }
        if (e.key === 'Escape') {
          setIsEditing(false);
          setEditText(todo.text);
        }
      };

      return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3">
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ease-in-out
                ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400`}
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.completed && <Check size={16} className="text-white" />}
            </button>

            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="ml-4 flex-1 p-2 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                autoFocus
                aria-label="Edit todo text"
              />
            ) : (
              <span
                className={`ml-4 text-lg font-medium flex-1 truncate ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleEdit}
              className={`p-2 rounded-full transition-colors duration-200 ${isEditing ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-blue-500 hover:bg-blue-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
              aria-label={isEditing ? 'Save changes' : 'Edit todo'}
            >
              {isEditing ? <Save size={20} /> : <Edit size={20} />}
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                }}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                aria-label="Cancel editing"
              >
                <X size={20} />
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              aria-label="Delete todo"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </li>
      );
    };

    export default TodoItem;