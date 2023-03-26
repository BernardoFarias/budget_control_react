import { formatDate } from "../helpers"
import { 
    LeadingActions,
    SwipeAction,
    SwipeableList,
    SwipeableListItem,
    TrailingActions
    }from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

import SavingIcon from "../img/saving_icon.svg"
import HomeIcon from "../img/home_icon.svg"
import GroceriesIcon from "../img/groceries_icon.svg"
import EntertainmentIcon from "../img/entertainment_icon.svg"
import HealthtIcon from "../img/health_icon.svg"
import RestaurantsIcon from "../img/restaurants_icon.svg"
import GeneralIcon from "../img/general_icon.svg"

const iconsDictionary = {
    savings : SavingIcon,
    groceries : GroceriesIcon,
    home : HomeIcon,
    entertainment : EntertainmentIcon,
    health : HealthtIcon,
    restaurants : RestaurantsIcon,
    general: GeneralIcon
}


const Expense = ({expense, setEditExpense, deleteExpense}) => {

    const { category , name, amount, id, date} = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
            onClick={() => setEditExpense(expense)}
            >
            Edit
            </SwipeAction>
        </LeadingActions>
    )
    
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
            onClick={() => deleteExpense(id)}
            destructive={true}
            >
            Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
            >
        <div className="gasto sombra">
            <div className="contenido-gasto">
                <img
                src={iconsDictionary[category]}
                alt="Expense Icon"
                />
                <div className="descripcion-gasto">
                <p className="categoria">
                    {category}
                </p>
                <p className="nombre-gasto">
                    {name}
                </p>
                <p className="fecha-gasto">
                    Added on: {""} <span>{formatDate(date)}</span>
                </p>
                </div>
                
            </div>
            <p className="cantidad-gasto">$ {amount}</p>
        </div>
        </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense