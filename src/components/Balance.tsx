import React from 'react';
import { DollarSign } from 'lucide-react';

interface BalanceProps {
  balance: number;
  income: number;
  expense: number;
}

export const Balance: React.FC<BalanceProps> = ({ balance, income, expense }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Balance</h3>
            <p className="text-2xl font-semibold text-gray-900">${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Income</h3>
            <p className="text-2xl font-semibold text-green-600">${income.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Expenses</h3>
            <p className="text-2xl font-semibold text-red-600">${expense.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};