import React, { useState, useEffect } from "react";
import './styles.css'
import axios from 'axios'


function Employees() {

    const [employees, setEmployees] = useState([])
    const [displayedList, setDisplayedList] = useState({
        results: [],
        sortOrder: ""
    })

    useEffect(() => {
        async function fetchData(){
        const res = await axios.get("https://randomuser.me/api/?results=30")
        setEmployees(res.data.results)
        setDisplayedList({results: res.data.results})
        }
        fetchData()
    },[] )

    const sortByName = () => {
  
        var el = document.getElementById('here')
        var el2 = document.getElementById('triangle')

        const sortedEmployees = displayedList.results.sort((a, b) => {
            if (b.name.first > a.name.first) {
                return -1
            }
            if (a.name.first > b.name.first) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrder === "descend") {
            sortedEmployees.reverse()
            setDisplayedList({ 
                results: sortedEmployees,
                sortOrder: "ascend" 
            })
            el.classList.add('sortClickPost')
            el2.classList.add('triangle-up')
            el2.classList.remove('triangle-down')
        } else {
            setDisplayedList({ 
                results: sortedEmployees,
                sortOrder: "descend" 
            })
            el.classList.add('sortClickPost')
            el2.classList.add('triangle-down')
            el2.classList.remove('triangle-up')
        }
    }

    const submitForm = event => {
        event.preventDefault()
        let filteredList = employees;
        var el = document.getElementById('none')

        let data = document.getElementById('form').value.toLowerCase()
        const filt = filteredList.filter(a => a.location.city.toLowerCase() === data)

        if (filt.length > 0) {
            if(displayedList.sortOrder === "ascend") {setDisplayedList({results: filt, sortOrder: "ascend"})}
            else if (displayedList.sortOrder === "descend") {setDisplayedList({results: filt, sortOrder: "descend"})}
            else {setDisplayedList({results: filt})}
            el.style.display = 'none'
        } else {
            el.style.display = 'block'
        }

        document.getElementById('form').value = ""
    }

    const reset = event => {
        event.preventDefault()
        var el = document.getElementById('none')
        el.style.display = 'none'
        if(displayedList.sortOrder === "ascend") {setDisplayedList({results: employees, sortOrder: "ascend"})}
        else if (displayedList.sortOrder === "descend") {setDisplayedList({results: employees, sortOrder: "descend"})}
        else {setDisplayedList({results: employees})}
    }

    return (
        <>
        <div className="jumbotron">Employee directory</div>
        <h6 id="none">No results</h6>
        <input id="form" list="cities" placeholder="Filter by city"></input>
        <datalist id="cities">
            {displayedList.results.map((person,idx) => {
                return (
                        <option key={idx} value={person.location.city}/>
                    )
                })
            }
        </datalist>
        <div className="btns">
            <button onClick={submitForm}>Search</button>
            <button onClick={reset}>Reset</button>
        </div>
        <table>
            <thead>
            <tr>
                <th id="here" onClick={sortByName}>Name <div id="triangle"></div></th>
                <th>Email</th>
                <th>City</th>
                <th>Phone number</th>
                <th>Image</th>
            </tr>
            </thead>

        {displayedList.results.map((person,idx) => { 
            return (
                <tbody key={idx}>
                <tr>
                    <td>{person.name.first} {person.name.last}</td>
                    <td>{person.email}</td>
                    <td>{person.location.city}</td>
                    <td>{person.phone}</td>
                    <td><img src={person.picture.thumbnail} alt="Thumbnail"/></td>
                </tr>
                </tbody>
                )
            })
        }
        </table>
        </>
    )
}

export default Employees;