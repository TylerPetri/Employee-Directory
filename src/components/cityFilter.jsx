function Filter(props) {
    return (
        <>
        <h6 id="none">No results</h6>
            <input id="form" list="cities" placeholder="Filter by city"></input>
                <datalist id="cities">
                    {props.displayedList.results.map((person,idx) => {
                        return (
                                <option key={idx} value={person.location.city}/>
                            )
                        })
                    }
                </datalist>
            <div className="btns">
                <button onClick={props.submitForm}>Search</button>
                <button onClick={props.reset}>Reset</button>
            </div>
        </>
    )
}

export default Filter