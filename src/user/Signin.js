import React, {useState} from 'react'
import { Container, Form} from "react-bootstrap";

export default function Signin(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = () => {
        props.login(newUser)
    }

  return (
    <div className='create'>
        <h1>Sign In</h1>
        <Container >
        
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="emailAddress" type="email" onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler} />
            </Form.Group>

            <button onClick={loginHandler}>Log In</button>

        </Container>
        
        </div>
  )
}