import Expense from "./Expense"


const ExpensesList = ({
    expenses,
    setEditExpense,
    deleteExpense,
    filter,
    filteredExpenses
    }) => {
    return (
        <div className="listado-gastos contenedor">
            
            {filter ? (
                <>
                <h2>{filteredExpenses.length ? "My Expenses" : "There are no expenses in this category yet"}</h2>
                    {filteredExpenses.map(expense => (
                    <Expense
                    key={expense.id}
                    expense={expense}
                    setEditExpense={setEditExpense}
                    deleteExpense={deleteExpense}
                    />
                ))}
                </>
            ) : (
                <>
                <h2>{expenses.length ? "My Expenses" : "There are no expenses yet"}</h2>
                {expenses.map(expense => (
                
                    <Expense
                    key={expense.id}
                    expense={expense}
                    setEditExpense={setEditExpense}
                    deleteExpense={deleteExpense}
                    />
                ))}
                </>
            )
            }
        </div>
    )
}

export default ExpensesList