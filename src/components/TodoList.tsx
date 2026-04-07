import React from 'react';
    import TodoItem from './TodoItem';

    interface TodoListProps {
      todos: { id: string; text: string; completed: boolean }[];
      toggleTodo: (id: string) => void;
      updateTodo: (id: string, newText: string) => void;
      deleteTodo: (id: string) => void;
    }

    const TodoList: React.FC<TodoListProps> = ({
      todos,
      toggleTodo,
      updateTodo,
      deleteTodo,
    }) => {
      if (todos.length === 0) {
        return (
          <p className="text-center text-gray-500 text-lg mt-8">
            No tasks yet. Start by adding a new one above!
          </p>
        );
      }

      return (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      );
    };

    export default TodoList;