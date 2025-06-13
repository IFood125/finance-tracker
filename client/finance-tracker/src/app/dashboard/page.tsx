"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TransactionList from '@/components/TransactionList';
import TransactionChart from '@/components/TransactionChart';
import { Transaction } from '@/types/transaction';
import api from '@/utils/api';
import { fakeTransactions } from '@/utils/fakeTransactions';

export default function Dashboard() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }
        // Validate token before retrieving transactions
        api.post('/api/auth', {}, { headers: { Authorization: token } })
            .then(() => {
                // Token is valid, fetch transactions
                api.get('/api/transactions/recent', {
                    headers: { Authorization: token }
                })
                    .then((res) => setTransactions(res.data))
                    .catch((err) => console.error('Failed to fetch recent transactions:', err));
            })
            .catch(() => {
                // Token is invalid
                localStorage.removeItem('token');
                router.push('/auth/login');
            });
    }, [router]);

    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent navigation if a transaction item or its child is clicked
        const target = e.target as HTMLElement;
        if (target.closest('[data-transaction-item]')) return;
        router.push('/transactions');
    };

    const handleTransactionClick = (transaction: Transaction) => {
        router.push(`/transactions/item?id=${transaction._id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-500 text-white p-4 shadow-md">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>
            <main className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <TransactionChart transactions={incomeTransactions} />
                        <TransactionChart transactions={expenseTransactions} />
                    </div>
                    <div onClick={handleListClick} className="cursor-pointer">
                        <TransactionList
                            transactions={transactions.slice(0, 5)}
                            transactionItemProps={{ 'data-transaction-item': true }}
                            onTransactionClick={handleTransactionClick}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}