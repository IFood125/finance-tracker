"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionList from '@/components/TransactionList';
import { Transaction } from '@/types/transaction';
import { useRouter } from 'next/navigation';

export default function TransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }
        axios.get('/api/transactions', {
            headers: { Authorization: token }
        })
            .then(res => setTransactions(res.data))
            .catch(err => console.error('Failed to fetch transactions:', err));
    }, [router]);

    const handleTransactionClick = (transaction: Transaction) => {
        router.push(`/transactions/item?id=${transaction._id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">All Transactions</h1>
                <TransactionList
                    transactions={transactions}
                    onTransactionClick={handleTransactionClick}
                />
            </div>
        </div>
    );
}
