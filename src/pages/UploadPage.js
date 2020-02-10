import React, { useState } from 'react';
import { Container, FormGroup, CustomInput, Form, Button } from "reactstrap";
import axios from "axios";

const UploadPage = () => {

    const [previewImage, setPreviewImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);

    const handleUpload = e => {
        e.preventDefault();

        // axios call to upload to the server
        let formData = new FormData();

        formData.append("image", uploadImage);

        let jwt = localStorage.getItem("jwt");

        axios
            .post("https://insta.nextacademy.com/api/v1/images/", formData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(result => {
                if (result.data.success) {
                    setResponseMessage("Image uploaded successfully!");
                } else {
                    setResponseMessage("Error uploading Image.");
                }
            })
            .catch(error => {
                console.log(error.response);
                setResponseMessage("Major error, contact admin!");
            });
    };

    const handleImage = e => {
        // Handle the preview and file to upload
        let imageFile = e.target.files[0];

        let newImage = URL.createObjectURL(imageFile);

        setPreviewImage(newImage);
        setUploadImage(imageFile);
    };
    return (
        <Container className="pt-5">
            <h6>Upload New Image</h6>
            <div
                className="border border-light rounded mx-auto d-block mt-4"
                style={{ height: "500px", width: "500px", position: "relative" }}
            >
                {previewImage ? (
                    responseMessage ? (
                        <h2
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            }}
                        >
                            {responseMessage}
                        </h2>
                    ) : (
                            <img
                                className="w-75"
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                                src={previewImage}
                                alt="preview"
                            />
                        )
                ) : (
                        <h2
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            }}
                        >
                            Choose image to preview
          </h2>
                    )}
            </div>
            <Form onSubmit={handleUpload}>
                <FormGroup className="w-50 mx-auto d-block">
                    <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        className="mt-4"
                        onChange={handleImage}
                    />
                </FormGroup>
                <Button outline color="primary">
                    Upload
        </Button>
            </Form>
        </Container>
    );
};

export default UploadPage;