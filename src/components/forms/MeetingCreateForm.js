import React from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";

const backend = process.env.REACT_APP_BACKEND;

const MeetingCreateForm = () => {
    const history = useHistory();
    const initialState = { meetingname: "Enter meeting name" };

    const handleCreateSubmit = (event) => {
        event.preventDefault();

        const meeting = {
            meetingName: event.target[0].value
        };

        fetch(`${backend}/meetings/addmeeting`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meeting)
        })
            .then(() => {
                history.push(`/meeting/${meeting.meetingName}`);
            })
            .catch((err) => {
                console.log(`error from backend when adding meeting: ${err}`);
                history.push("/");
            });
    };

    return (
        <div className="mx-auto mt-5">
            <Form onSubmit={handleCreateSubmit}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Form.Group className="mb-3" controlId="meetingname">
                            <Form.Control type="text" placeholder={initialState.meetingname} />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Button variant="info" type="submit">
                            Create
                        </Button>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default MeetingCreateForm;
