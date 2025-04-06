
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

interface ExpenseItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: Date;
}

interface BudgetTrackerProps {
  expenses: ExpenseItem[];
  weeklyBudget?: number;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ expenses, weeklyBudget = 0 }) => {
  // Calculate total expenses for the current week
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  const weeklyExpenses = expenses.filter(expense => 
    expense.date >= startOfWeek && expense.date <= endOfWeek
  );
  
  const totalSpent = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = weeklyBudget - totalSpent;
  
  // Group expenses by category for the chart
  const expensesByCategory = weeklyExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort categories by amount spent
  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Top 5 categories
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Weekly Grocery Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">
            <span className="text-muted-foreground text-base mr-2">Total Spent:</span>
            ₹{totalSpent.toFixed(2)}
          </div>
          
          <div className={`flex items-center ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-xl font-semibold">
              {remaining >= 0 ? `₹${remaining.toFixed(2)} left` : `₹${Math.abs(remaining).toFixed(2)} over budget`}
            </span>
            {remaining >= 0 ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />}
          </div>
        </div>
        
        {weeklyExpenses.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium mb-2">Spending by Category</h4>
            <div className="space-y-2">
              {sortedCategories.map(([category, amount]) => (
                <div key={category} className="flex items-center">
                  <div className="w-1/3 text-sm">{category}</div>
                  <div className="w-2/3 flex items-center gap-2">
                    <div className="h-2 bg-primary rounded-full" style={{
                      width: `${Math.min(100, (amount / totalSpent) * 100)}%`
                    }} />
                    <span className="text-sm">₹{amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Recent Expenses</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklyExpenses.slice(0, 5).map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No expenses recorded for this week
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
