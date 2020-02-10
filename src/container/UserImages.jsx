import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText, CardImg, Col, Row } from 'reactstrap';
import Image from "react-graceful-image";


// const UserImages = ({userId}) =>{}


function UserImages({ userId }) {
    const [images, setImages] = useState([])


    useEffect(() => {
        // performing a GET request
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
            .then(result => {
                setImages(result.data)
                // If successful, we do stuffs with 'result'

            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])


    return (
        <Col className="imageArray">

            {images.map((image) => {

                return (

                    <Image key={image.id} src={image.url} />
                    // <div>
                    //     <Card>
                    //         <CardTitle>{user.image}</CardTitle>
                    //         <CardImg style={{ width: "10%" }} src={user.Image} alt="User's image" />
                    //         <CardText></CardText>
                    //     </Card>
                    // </div>
                    // <UserImages userId={userId} />

                )
            }
            )}
        </Col>


    )
};

export default UserImages;