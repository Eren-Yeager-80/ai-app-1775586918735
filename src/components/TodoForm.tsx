import React, { useState } from 'react';
    import { Plus } from 'lucide-react';

    interface TodoFormProps {
      addTodo: (text: string) => void;
    }

    const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
      const [todoText, setTodoText] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (todoText.trim()) {
          addTodo(todoText);
          setTodoText('');
        }
      };

      return (
        <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-6">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 p-3 text-lg border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors duration-200 rounded-l-md"
            aria-label="New todo text"
          />
          <button
            type="submit"
            className="ml-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            aria-label="Add todo"
          >
            <Plus size={24} className="mr-2" /> Add Task
          </button>
        </form>
      );
    };

    export default TodoForm;