import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import { ITodo } from './components/IApp';

const todos: ITodo[] = [
    { text: "Learn1204 about React" },
    { text: "Meet friend for lunch" },
    { text: "Build really cool todo app" }
]


ReactDOM.render(<App todos={todos}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
