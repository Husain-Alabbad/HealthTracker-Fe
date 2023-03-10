import React, {useState} from 'react'
import { Container, Form} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

export default function Signup(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const registerHandler = () => {
        props.register(newUser)
    }

  return (
    <div className='create'>
        <h1>Sign Up</h1>

        <Container>
        <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control name="id" onChange={changeHandler}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={changeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="emailAddress" type="email" onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler} />
            </Form.Group>

            <Link to="/signin">
            <button onClick={registerHandler}>Register</button>
            </Link>

        </Container>
        
    </div>
  )
}