import * as React from "react";
import { useState, useEffect } from 'react';
import './App.css';
import { ITodo } from "./components/IApp";
import { TodoListRenderer } from "./components/TodoList";
import { TodoFormContainer } from "./components/TodoFormContainer";
import { ThemeContext, themes } from "./components/ThemeContext";
import { Toolbar } from "./components/ToolBar";

interface IHooksAppProps {
  todos: ITodo[];
}

const App = (props: IHooksAppProps) => {
  const [todos, setTodos] = useState(props.todos);
  const [theme, setTheme] = useState(themes.light);
  const [toggleThemeCount, setToggleThemeCount] = useState(0);

  const addTodo = (todoText: string) => {
    const todo: ITodo = { text: todoText };
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  }

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const toggleTheme = () => {
    const newTheme = (theme === themes.dark ? themes.light : themes.dark);
    setTheme(newTheme);
    setToggleThemeCount(toggleThemeCount + 1);
  }

  useEffect(() => {
  /*
    - By using this Hook, you tell React that your component needs to do something after render
    - by default useEffect run after every render
    - Unlike componentDidMount or componentDidUpdate,
     effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive.
      The majority of effects don’t need to happen synchronously.
       In the uncommon cases where they do (such as measuring the layout), 
       there is a separate useLayoutEffect Hook with an API identical to useEffect. 
    */
   /*React to skip applying an effect if certain values haven’t changed between re-renders. 
     To do so, pass an array as an optional second argument to useEffect: */
    document.title = `You clicked hooks-app themChange button ${toggleThemeCount} times`;
    /*
     If your effect returns a function, React will run it when it is time to clean up:
    */
  }, [toggleThemeCount]);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
        <Toolbar />
      </ThemeContext.Provider>
      <TodoListRenderer todos={todos} onComplete={completeTodo} onRemove={removeTodo} />
      <TodoFormContainer addTodo={addTodo} />
    </div>
  );
}

export default App;
