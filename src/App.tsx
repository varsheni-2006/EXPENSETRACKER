import React, { useState, useEffect } from 'react';
import { Balance } from './components/Balance';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { ExpenseChart } from './components/ExpenseChart';
import { Transaction } from './types';
import { Wallet } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const calculateTotals = () => {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0);
    const income = amounts.filter(a => a > 0).reduce((acc, item) => acc + item, 0);
    const expense = Math.abs(amounts.filter(a => a < 0).reduce((acc, item) => acc + item, 0));

    return { total, income, expense };
  };

  const addTransaction = (text: string, amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      text,
      amount,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const { total, income, expense } = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wallet className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          </div>
          <p className="text-gray-500">Track your income and expenses with ease</p>
        </div>

        <Balance balance={total} income={income} expense={expense} />
        
        <ExpenseChart transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TransactionForm onAdd={addTransaction} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </div>
    </div>
  );
}

export default App;