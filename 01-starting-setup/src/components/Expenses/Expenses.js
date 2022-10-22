import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import './Expenses.css'
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = (props) => {
  const [filterYear, setFilterYear] = useState('2020');
  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };
  const filteredList = props.items.filter((el) => {
    return el.date.getFullYear().toString() === filterYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={filterYear} onChangeFilter={filterChangeHandler} />
        {filteredList.length === 0 && <p>Not found</p>}
        {filteredList.length > 0 &&
          filteredList.map((el, idx) => {
            return (
              <ExpenseItem
                key={el.id}
                title={el.title}
                amount={el.amount}
                date={el.date}
              />
            );
          })}
      </Card>
    </div>
  );
}

export default Expenses;