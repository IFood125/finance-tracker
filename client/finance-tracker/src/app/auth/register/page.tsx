"use client";
import { useState } from "react";
import axios from '@/utils/api';
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (err) {
            console.error('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <form
                onSubmit={handleRegister}
                className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-sm w-full"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
                <input
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                <input
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
}