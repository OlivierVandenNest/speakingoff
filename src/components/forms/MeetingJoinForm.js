import React from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";

const MeetingJoinForm = () => {
    const history = useHistory();
    const initialState = { meetingname: "Enter meeting name" };
    const [formValues, setFormValues] = useState(initialState);

    const handleJoinSubmit = (event) => {
        setFormValues(initialState);
        history.push(`/meeting/${event.target[0].value}`);
    };

    return (
        <div className="mx-auto mt-5">
            <Form onSubmit={handleJoinSubmit}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Form.Group className="mb-3" controlId="meetingname">
                            <Form.Control type="text" placeholder={formValues.meetingname} />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Button variant="info" type="submit">
                            Join
                        </Button>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default MeetingJoinForm;
