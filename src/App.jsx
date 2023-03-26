import { useEffect, useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ExpensesList from './components/ExpensesList'
import {generateId} from "./helpers"
import IconNewExpense from "./img/new-expense.svg"
import Filter from './components/Filter'

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  )
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : []
  )
  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState("")
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)
      
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    const budgetLs = Number(localStorage.getItem("budget")) ?? 0

    if(budgetLs > 0) {
      setIsValidBudget(true)
    }
  }, [])

  useEffect(() => {
    if(filter){
      const filteredExpenses = expenses.filter(expense => expense.category === filter)
      setFilteredExpenses(filteredExpenses)
    }
  },[filter])

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})
    
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = (expense) => {
    if(expense.id) {
      // Update
      const updatedExpenses = expenses.map(expenseState => 
        expenseState.id === expense.id ? expense : expenseState
      )
      setExpenses(updatedExpenses)
      setEditExpense({})
    } else {
      // Add
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
        setModal(false)
        }, 500)
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)

    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
      expenses={expenses}
      setExpenses={setExpenses}
      budget={budget}
      setBudget={setBudget}
      isValidBudget={isValidBudget}
      setIsValidBudget={setIsValidBudget}
      />


      {isValidBudget && (
        <>
        <main>
        <Filter
        filter={filter}
        setFilter={setFilter}
        />
          <ExpensesList 
          expenses={expenses}
          setEditExpense={setEditExpense}
          deleteExpense={deleteExpense}
          filter={filter}
          filteredExpenses={filteredExpenses}
          />
        </main>
         <div className='nuevo-gasto'>
         <img
         src={IconNewExpense}
         alt="IconNewExpense"
         onClick={handleNewExpense}
         />
       </div>
       </>
      )}

      {modal && <Modal 
                setModal={setModal}
                animateModal={animateModal}
                setAnimateModal={setAnimateModal}
                saveExpense={saveExpense}
                editExpense={editExpense}
                setEditExpense={setEditExpense}
                />}
     
    </div>
  )
}

export default App
