import React, { useState } from 'react';
import { Transaction } from '@/types/transaction';

interface TransactionItemProps {
    transaction: Transaction;
    onSave?: (updated: Transaction) => void;
}

export default function TransactionItem({ transaction, onSave }: TransactionItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState<Transaction>({ ...transaction });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEdited(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave && onSave(edited);
    };

    const handleCancel = () => {
        setEdited({ ...transaction });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4">
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    name="title"
                    value={edited.title}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    name="amount"
                    type="number"
                    value={edited.amount}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    name="date"
                    type="date"
                    value={edited.date}
                    onChange={handleChange}
                />
                <select
                    className="w-full p-2 border border-gray-300 rounded"
                    name="type"
                    value={edited.type}
                    onChange={handleChange}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    name="category"
                    value={edited.category || ''}
                    onChange={handleChange}
                />
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    name="description"
                    value={edited.description || ''}
                    onChange={handleChange}
                />
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave} type="button">Save</button>
                    <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={handleCancel} type="button">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{transaction.title}</h2>
                <button className="text-blue-500 hover:underline" onClick={() => setIsEditing(true)} type="button">Edit</button>
            </div>
            <p className="text-gray-600">Amount: <span>${transaction.amount.toFixed(2)}</span></p>
            <p className="text-gray-600">Date: {transaction.date}</p>
            <p className="text-gray-600">Type: {transaction.type}</p>
            <p className="text-gray-600">Category: {transaction.category || 'Uncategorized'}</p>
            <p className="text-gray-600">Description: {transaction.description || 'No description'}</p>
        </div>
    );
}
