import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure()

const SignUpForm = ({ toggle, toggleLogin }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [delay, setDelay] = useState(null);


    const handleSubmit = e => {
        e.preventDefault();
        if (!username) return;
        if (password.length <= 6) return;
        // if (confirmPassword !== password) return;
        // if (email.length <= 0) return;
        console.log(username);
        console.log(password);
        console.log(confirmPassword);
        console.log(email);
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: username,
                email: email,
                password: password,
            }
        })
            .then(response => {
                console.log(response)

                //here if im successful i can close the modal now
                // u can do ur notification thingi here
                toast.success("Your account was created");
                toggle();
            })


            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
                let messages = error.response.data.message
                messages.forEach(message => {
                    toast.error(message)
                })
            })

    };

    // axios call for username validation
    const checkUsername = newUsername => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check username!");
        axios
            .get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            )
            .then(response => {
                console.log(response.data);
                if (response.data.valid) {
                    setUsernameValid(true);
                } else {
                    setUsernameValid(false);
                }
            });
    }
    const handleUsernameInput = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delay);
        const newUsername = e.target.value;
        setUsername(newUsername);

        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {
            checkUsername(newUsername);
        }, 500);

        setDelay(newDelay);
    };

    const getFormFeedback = () => {
        if (confirmPassword !== password) {
            return (
                <FormFeedback invalid>
                    Please ensure your passwords are the same
            </FormFeedback>
            );
        }
    };

    const getInputFeedback = () => {
        if (confirmPassword !== password) {
            return { invalid: true };
        } else {
            return { valid: true };
        }
    };

    const getFormFeedback1 = () => {
        if (password.length <= 6) {
            return (
                <FormFeedback invalid>
                    Please ensure that you have six characters or more
            </FormFeedback>
            );
        }
    };
    const getInputFeedback2 = () => {
        if (confirmPassword !== password) {
            return { invalid: true };
        } else {
            return { valid: true };
            // toast.success("Logged in successfully!", {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true
            // });
        };
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        placeholder="Choose a username"
                        onChange={e => handleUsernameInput(e)}
                        value={username}
                        {...usernameValid ? { valid: true } : { invalid: true }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder="Choose a password, min 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        {...getInputFeedback2()}
                        {...getInputFeedback()}
                    />
                    {getFormFeedback1()}
                    {getFormFeedback()}
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        {...getInputFeedback()}
                    />
                    {getFormFeedback()}
                    <Button type="submit" value="submit">Submit</Button>

                </FormGroup>
            </Form>
        </>
    )

};

export default SignUpForm;
