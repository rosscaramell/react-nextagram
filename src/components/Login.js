import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from 'react-router-dom'


toast.configure()


const Login = ({ toggle, setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [login, setlogin] = useState(null);
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault();
    };

    // this should only trigger after you stop typing for 500ms

    const handleLogin = () => {
        loginCall()
        setEmail("")
        setPassword("")
        // toggle()
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }

    const handlePassInput = (e) => {
        setPassword(e.target.value)
        console.log(password)
    }

    const loginCall = (e) => {
        // e.preventDefault()
        axios({

            method: 'post',
            url: `https://insta.nextacademy.com/api/v1/login`,
            data: {
                username: email,
                password: password
            }

        })
            .then(result => {
                console.log(result)
                toggle();
                toast.success(`Welcome back ${email} and ${password}`)
                localStorage.setItem('jwt', result.data.auth_token)
                localStorage.setItem('name', result.data.user.username)
                setLoggedIn(true)
                history.push('/myProfile')

            })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
                toast.error(`Something went wrong`)
                toggle();
            })
    }

    return (
        <Form onSubmit={loginCall}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">username</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={handleEmailInput} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" onChange={handlePassInput} />
            </FormGroup>
            {/* <Button>Submit</Button> */}
            <Button color="primary" onClick={handleLogin} disabled={!email || !password} >Login</Button>

        </Form>
    )
}
export default Login;