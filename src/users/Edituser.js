import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

export default function Edituser() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUsers] = useState({
        name: "",
        username: "",
        email: ""
    })

    const { name, username, email } = user

    const onInputChange = (e) => {
        setUsers({ ...user, [e.target.name]: e.target.value })
    }

    useEffect( () => {
        loadUser();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user)
        navigate("/")
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUsers(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className='text-center m-4'>Edit user</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-lable'>
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-lable'>
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-lable'>
                                Email
                            </label>
                            <input
                                type={"email"}
                                className="form-control"
                                placeholder="Enter your email"
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'> Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to ="/"> Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
