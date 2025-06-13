import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Transaction } from '@/types/transaction';

ChartJS.register(ArcElement, Tooltip, Legend);

function generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
        colors.push(color);
    }
    return colors;
}

export default function TransactionChart({ transactions }: { transactions: Transaction[] }) {
    if (!transactions.length) return null;
    const type = transactions[0].type; // All transactions are of the same type
    const categoryMap: Record<string, number> = {};

    transactions.forEach(transaction => {
        categoryMap[transaction.category || 'Uncategorized'] =
            (categoryMap[transaction.category || 'Uncategorized'] || 0) + transaction.amount;
    });

    const colors = generateColors(Object.keys(categoryMap).length);
    const label = type === 'income' ? 'Income by Category' : 'Expenses by Category';
    const title = type === 'income' ? 'Income Distribution' : 'Expense Distribution';

    const chartData = {
        labels: Object.keys(categoryMap),
        datasets: [
            {
                label: label,
                data: Object.values(categoryMap),
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
            <Doughnut data={chartData} />
        </div>
    );
}