
const Filter = ({filter, setFilter}) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label>
                        Filter Expenses
                    </label>
                    <select 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    >
                    <option value="">--- All categories ---</option>
                    <option value="savings">Savings</option>
                    <option value="groceries">Groceries</option>
                    <option value="home">Home</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="general">General</option>
                    <option value="restaurants">Restaurants</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filter