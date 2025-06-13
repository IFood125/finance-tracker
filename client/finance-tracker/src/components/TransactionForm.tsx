import { useEffect, useRef, useState } from "react";
import api from "@/utils/api";
import { fetchCategories, addCategory } from "@/utils/categoryApi";

export default function TransactionForm() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<number | string>("");
    const [date, setDate] = useState("");
    const [type, setType] = useState<"income" | "expense">("expense");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [useCustom, setUseCustom] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const hasAddedCategory = useRef(false);

    useEffect(() => {
        fetchCategories().then((data) => {
            setCategories(data || []);
        });
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "custom") {
            setUseCustom(true);
            setCategory("");
        } else {
            setUseCustom(false);
            setCategory(e.target.value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalCategory = useCustom ? customCategory : category;
        try {
            await api.post("/api/transactions", {
                title,
                amount: Number(amount),
                date,
                type,
                category: finalCategory,
                description,
            });
            // Locally add new category for immediate dropdown update
            if (finalCategory && !categories.includes(finalCategory)) {
                setCategories((prev) => [...prev, finalCategory]);
                // Only send to backend once per submit
                if (!hasAddedCategory.current) {
                    addCategory(finalCategory);
                    hasAddedCategory.current = true;
                }
            }
            // Reset form fields
            setTitle("");
            setAmount("");
            setDate("");
            setType("income");
            setCategory("");
            setCustomCategory("");
            setUseCustom(false);
            hasAddedCategory.current = false;
            setDescription("");
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value as "income" | "expense")}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <label className="block">
                Category:
                <select
                    value={useCustom ? "custom" : category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="custom">Other (enter your own)</option>
                </select>
            </label>
            {useCustom && (
                <input
                    type="text"
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )}
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Transaction
            </button>
        </form>
    );
}
