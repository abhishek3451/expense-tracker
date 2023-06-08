import "./ExpenseDate.css";

function ExpenseDate(props) {
  const day = props.date.toLocaleString("en-us", { day: "2-digit" });
  const month = props.date.toLocaleString("en-us", { month: "long" });
  const year = props.date.getFullYear();
  return (
    <div className="expense-item">
      <div>
        <div>{day} </div>
        <div>{month} </div>
        <div>{year}</div>
      </div>
    </div>
  );
}

export default ExpenseDate;
