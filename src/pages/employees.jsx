import React, { useState, useEffect } from "react";
import './styles.css'
import axios from 'axios'


function Employees() {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        async function fetchData(){
        const res = await axios.get("https://randomuser.me/api/?results=30")
        setEmployees(res.data.results)
        }
        fetchData()
        console.log(employees)
    },[] )

    return (
        <>
        <div className="jumbotron">Employee directory</div>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone number</th>
                <th>Image</th>
            </tr>
            </thead>

        {employees.map((person,idx) => { 
            return (
                <tbody key={idx}>
                <tr>
                    <td>{person.name.first}</td>
                    <td>{person.email}</td>
                    <td>{person.location.city}</td>
                    <td>{person.phone}</td>
                    <td><img src={person.picture.thumbnail}/></td>
                </tr>
                </tbody>
                )
            })}
        </table>
        </>
    )
}

export default Employees;