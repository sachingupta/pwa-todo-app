import * as React from "react";
import { useState } from "react";

import { TodoForm } from "../components/TodoForm";

interface ITodoFormContainerProps {
    addTodo: (text: string) => void;
}

export function TodoFormContainer(props: ITodoFormContainerProps) {
    const [value, setValue] = useState("");

    const onChange = (e: any) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (value) {
            props.addTodo(value);
            setValue("");
        }
    }
    return (
        <TodoForm value={value} onSubmit={handleSubmit} onChange={onChange} />
    );
}