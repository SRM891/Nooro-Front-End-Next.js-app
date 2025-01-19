"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditTaskPage({ params }: { params: { id: string } }) {
    const [task, setTask] = useState({ title: "", color: "red" });
    const router = useRouter();

    useEffect(() => {
        axios.get(`http://localhost:3001/tasks/${params.id}`).then((response) => {
            setTask(response.data);
        });
    }, [params.id]);

    const handleSubmit = async () => {
        await axios.put(`http://localhost:3001/tasks/${params.id}`, task);
        router.push("/");
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="p-4 space-y-4"
        >
            <h1 className="text-2xl font-bold">Edit Task</h1>
            <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
                className="border p-2 w-full"
            />
            <select
                value={task.color}
                onChange={(e) => setTask({ ...task, color: e.target.value })}
                className="border p-2 w-full"
            >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">
                Update Task
            </button>
        </form>
    );
}
