import React, { useState, useEffect } from 'react';
    import TodoForm from './components/TodoForm';
    import TodoList from './components/TodoList';
    import { ListTodo } from 'lucide-react';

    interface Todo {
      id: string;
      text: string;
      completed: boolean;
    }

    function App() {
      const [todos, setTodos] = useState<Todo[]>(() => {
        // Initialize todos from local storage or an empty array
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });

      useEffect(() => {
        // Save todos to local storage whenever they change
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = (text: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(), // Unique ID for each todo
          text,
          completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      };

      const toggleTodo = (id: string) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };

      const updateTodo = (id: string, newText: string) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          )
        );
      };

      const deleteTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/80">
            <header className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 flex items-center justify-center space-x-3">
                <ListTodo size={48} className="text-blue-600" />
                <span>My Todo List</span>
              </h1>
              <p className="text-lg text-gray-600 mt-2">Stay organized and get things done!</p>
            </header>

            <TodoForm addTodo={addTodo} />
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      );
    }

    export default App;