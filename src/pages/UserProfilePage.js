import React from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from "../components/Loader";
import { Col } from 'reactstrap';

const UserProfilePage = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { userId, username } = useParams();


    useEffect(() => {
        // performing a GET request
        console.log("test")
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
            .then(result => {
                console.log(result.data)
                // If successful, we do stuffs with 'result'
                setData(result.data)
                setLoading(false)
            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])

    return (
        <>
            <p>About </p>
            <p>User ID : {userId} </p>
            <p> Username: {username} </p>

            {data.map((user, index) => {
                return (
                    <img key={index} src={user} />
                )
            })}
        </>
    )

}



export default UserProfilePage;