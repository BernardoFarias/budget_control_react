import { useEffect, useState } from "react"
import Message from "./Message"
import closeBtn from "../img/close.svg"

const Modal = ({
    setModal, 
    animateModal, 
    setAnimateModal, 
    saveExpense, 
    editExpense,
    setEditExpense
}) => {

    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
        setName(editExpense.name)
        setAmount(editExpense.amount)
        setCategory(editExpense.category)
        setDate(editExpense.date)
        setId(editExpense.id)
    }
    },[])
    const hideModal = () => {

    setAnimateModal(false)
    setEditExpense({})

    setTimeout(() => {
        setModal(false)
        }, 500)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if([name, amount, category].includes("")) {
            setMessage("All the fields are mandatory")

            return ; 
        }

        saveExpense({name, amount, category, id, date})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                src={closeBtn}
                alt="close modal"
                onClick={hideModal}
                />
            </div>
            <form 
                className={`formulario ${animateModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
                >
                <legend>{editExpense.name ? "Edit Expense" : "New Expense"}</legend>

                {message && <Message type="error">{message}</Message>}

                <div className="campo">
                    <label htmlFor="name">Title</label>
                    <input
                    id="name"
                    placeholder="Add Title"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="amount">Amount</label>
                    <input
                    id="amount"
                    placeholder="Add Amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select 
                    id="category"
                    value={category}
                    onChange={ e => setCategory(e.target.value)}
                    >
                        <option value="">--- Select category ---</option>
                        <option value="savings">Savings</option>
                        <option value="groceries">Groceries</option>
                        <option value="home">Home</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="general">General</option>
                        <option value="restaurants">Restaurants</option>
                    </select>
                </div>

                <input
                type="submit"
                value={editExpense.name ? "Save changes" : "Add Expense"}
                >
                </input>
            </form>
        </div>
    )
}

export default Modal