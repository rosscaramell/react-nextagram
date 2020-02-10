import React from 'react';
import UserImages from '../container/UserImages';
import { Card, CardTitle, CardText, CardImg, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";



function Homepage({ users }) {
    return (
        <Container className="container">
            <h2>Homepage</h2>
            {users.map((user) => {
                const userId = user.id

                return (

                    // <Row>
                    // <Col>
                    <Card key={user.id}>
                        <CardTitle tag={Link} to={`/user/${userId}/${user.username}`}>{user.username}</CardTitle>
                        <CardImg style={{ width: "10%" }} src={user.profileImage} alt="User's image" />
                        <CardText></CardText>
                        <UserImages userId={userId} />
                    </Card>
                    // </Col>
                    // </Row>

                )
            }
            )}
        </Container>
    );
}

export default Homepage;