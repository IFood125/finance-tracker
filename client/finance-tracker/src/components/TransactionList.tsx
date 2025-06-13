import React from 'react';
import { Transaction } from '@/types/transaction';

type TransactionListProps = {
    transactions: Transaction[];
    transactionItemProps?: React.LiHTMLAttributes<HTMLLIElement> & {
        [key: `data-${string}`]: any;
    };
    onTransactionClick?: (transaction: Transaction) => void;
};

export default function TransactionList({ transactions, transactionItemProps, onTransactionClick }: TransactionListProps) {
    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Transactions</h2>
            <ul className="space-y-4">
                {transactions.map((transaction) => (
                    <li
                        key={transaction._id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50"
                        {...(transactionItemProps || {})}
                        onClick={() => onTransactionClick && onTransactionClick(transaction)}
                    >
                        <div>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                            <p className="text-lg font-medium text-gray-800">{transaction.category || 'Uncategorized'}</p>
                            <p className="text-sm text-gray-600">{transaction.description || 'No description'}</p>
                        </div>
                        <p className="text-lg font-bold text-gray-800">
                            {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}