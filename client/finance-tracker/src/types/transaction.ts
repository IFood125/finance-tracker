export interface Transaction {
    _id: string;
    title: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
    category?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}