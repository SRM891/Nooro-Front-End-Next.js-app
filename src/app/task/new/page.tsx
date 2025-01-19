"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateTaskPage() {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("red");
    const router = useRouter();

    const handleSubmit = async () => {
        await axios.post("http://localhost:3001/tasks", { title, color });
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
            <h1 className="text-2xl font-bold">Create Task</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
                className="border p-2 w-full"
            />
            <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Create Task
            </button>
        </form>
    );
}
