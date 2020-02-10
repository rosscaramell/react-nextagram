import React, { useEffect, useState } from 'react';
import axios from "axios";

const MyProfile = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        axios({
            method: 'get',
            url: `https://insta.nextacademy.com/api/v1/images/me`,
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },

        }).then(result => {
            console.log(result)
            setData(result.data)
        })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
            })
    }, [])

    return (
        <>
            <h1>Hello</h1>
            {
                data.map((user, index) => {
                    return (
                        <img key={index} src={user} />
                    )
                })
            }
        </>
    )


}

export default MyProfile;