const todolist = {
  code: `function Main() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '编写 TodoList 组件', completed: true },
    { id: 3, text: '测试组件功能', completed: false }
  ]);
  
  const [inputValue, setInputValue] = React.useState('');
  
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>
      
      <div className="todo-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="添加新的任务..."
          className="todo-input"
        />
        <button
          onClick={addTodo}
          className="todo-add-button"
        >
          添加
        </button>
      </div>
      
      <ul className="todo-items-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="todo-item"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-item-checkbox"
            />
            <span
              className={\`todo-item-text \${todo.completed ? 'completed' : ''}\`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="todo-item-delete-button"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="todo-empty-state">
          暂无任务，添加一个新任务吧！
        </p>
      )}
      
      <div className="todo-stats">
        总计: {todos.length} 项任务，已完成: {todos.filter(t => t.completed).length} 项
      </div>
    </div>
  );
}`,
  css: `
.todo-list-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.todo-list-title {
    text-align: center;
    color: #333;
}

.todo-input-container {
    display: flex;
    margin-bottom: 20px;
}

.todo-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    outline: none;
}

.todo-input:focus {
    border-color: #007bff;
}

.todo-add-button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.todo-add-button:hover {
    background-color: #0056b3;
}

.todo-items-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white;
    margin-bottom: 8px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.todo-item-checkbox {
    margin-right: 10px;
}

.todo-item-text {
    flex: 1;
    color: #333;
}

.todo-item-text.completed {
    text-decoration: line-through;
    color: #888;
}

.todo-item-delete-button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.todo-item-delete-button:hover {
    background-color: #c82333;
}

.todo-empty-state {
    text-align: center;
    color: #888;
    font-style: italic;
}

.todo-stats {
    margin-top: 15px;
    text-align: center;
    color: #666;
    font-size: 14px;
}
`,
};

const counter = {
  code: `function Main() {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h2>计数器</h2>
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <div className="counter-buttons">
        <button className="btn btn-decrement" onClick={decrement}>
          -
        </button>
        <button className="btn btn-reset" onClick={reset}>
          重置
        </button>
        <button className="btn btn-increment" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};
`,
  css: `
.counter-container {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.counter-container h2 {
  color: white;
  margin-top: 0;
  font-size: 24px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.counter-display {
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.counter-value {
  font-size: 48px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.counter-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 80px;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(1px);
}

.btn-decrement {
  background: #ff4757;
  color: white;
}

.btn-decrement:hover {
  background: #ff2e43;
}

.btn-reset {
  background: #ffa502;
  color: white;
}

.btn-reset:hover {
  background: #ff9a00;
}

.btn-increment {
  background: #2ed573;
  color: white;
}

.btn-increment:hover {
  background: #26d467;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .counter-container {
    margin: 20px auto;
    padding: 15px;
  }
  
  .counter-display {
    width: 100px;
    height: 100px;
    padding: 15px;
  }
  
  .counter-value {
    font-size: 36px;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 16px;
    min-width: 70px;
  }
}
`,
};

export const agent = {
  帮我做一个待办事项列表: todolist,
  帮我做一个计数器: counter,
};
