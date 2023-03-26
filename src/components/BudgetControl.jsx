import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({
    expenses, 
    budget, 
    setExpenses,
    setBudget,
    setIsValidBudget
    }) => {
    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total , 0)
        const totalAvailable = budget - totalSpent

        //percentage spent
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2)

        setAvailable(totalAvailable)
        setSpent(totalSpent)

        setTimeout(() => {
            setPercentage(newPercentage)
        }, 1500)
    }, [expenses])

    const toCurrency = (quantity) => {
        return quantity.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    const handleResetApp = () => {
        const result = confirm("Are you sure to restart the app?")

        if(result) {
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: (percentage < 100) ? "#6E8566" : "#DC2626",
                    trailColor: "#f5f5f5",
                    textColor:  (percentage < 100) ? "#6E8566" : "#DC2626"
                })}
                value={percentage}
                text={`${percentage} % Spent`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
                >
                    Reset App
                </button>
                <p>
                    <span>Budget: </span> {toCurrency(budget)}
                </p>
                <p className={`${available < 0 ? "negativo" : ""}`}>
                    <span>Available: </span> {toCurrency(available)}
                </p>
                <p>
                    <span>Spent: </span> {toCurrency(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl