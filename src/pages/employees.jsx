import React, { useState, useEffect } from "react";
import './styles.css'
import axios from 'axios'

function getEmployees () {
        return axios.get("https://randomuser.me/api/?results=30")
}


function Employees() {
    const [employees, setEmployees] = useState([])

    const handleFormSubmit = event => {
        event.preventDefault();
        getEmployees()
        .then((res) => {
            if (res.data.status === "error") {
                throw new Error(res.data.message)
            } else {
            setEmployees(res.data.results)
            console.log(res.data.results)
        }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
        <button type="submit" className="schBtn" onClick={handleFormSubmit}>Search</button>
        {/* <table>
            <tbody>
            <tr>
                <th>employees</th>
                <th>{employees[0].name}</th>
                <th>{employees[0].location}</th>
            </tr>
            </tbody>
        </table> */}
        </>
    )
}

export default Employees;