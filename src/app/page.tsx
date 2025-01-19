"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Task = {
    id: number;
    title: string;
    color: string;
    completed: boolean;
};

export default function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/tasks").then((response) => {
            setTasks(response.data);
            setLoading(false);
        });
    }, []);

    const toggleCompletion = (id: number, completed: boolean) => {
        axios.put(`http://localhost:3001/tasks/${id}`, { completed: !completed }).then(() => {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, completed: !completed } : task
                )
            );
        });
    };

    const deleteTask = (id: number) => {
        axios.delete(`http://localhost:3001/tasks/${id}`).then(() => {
            setTasks((prev) => prev.filter((task) => task.id !== id));
        });
    };

    if (loading) return <div className="flex flex-col items-center justify-center gap-4 p-4 text-4xl">Loading tasks...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="mb-4">
                <Link href="/task/new">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Create Task</button>
                </Link>
            </div>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 border rounded-md flex justify-between items-center ${
                            task.completed ? "bg-green-100" : "bg-white"
                        }`}

                    >
                        <div>
                            <h2 className="font-bold" style={{color: task.color,}}>{task.title}</h2>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => toggleCompletion(task.id, task.completed)}
                                className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                {task.completed ? "Undo" : "Complete"}
                            </button>
                            <Link href={`/task/${task.id}`}>
                                <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
