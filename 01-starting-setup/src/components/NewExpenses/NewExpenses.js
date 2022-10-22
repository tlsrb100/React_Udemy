import React, { useState } from "react";
import './NewExpenses.css';
import ExpenseForm from "./ExpenseForm";

const NewExpenses = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const onSaveExpenseDatahandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {/* <ExpenseForm onSaveExpenseData={onSaveExpenseDatahandler} /> */}
      {isEditing ? <ExpenseForm onSaveExpenseData={onSaveExpenseDatahandler} onCancel={stopEditingHandler} /> : <button onClick={startEditingHandler}>Add New Expense</button>}
    </div>
  );

};


export default NewExpenses;