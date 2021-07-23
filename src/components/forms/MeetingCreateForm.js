import React from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import { useHistory } from "react-router";

const backend = process.env.REACT_APP_BACKEND;

const MeetingCreateForm = () => {
    const history = useHistory();
    const initialState = { meetingname: "Enter meeting name" };
    const [formValues, setFormValues] = useState(initialState);

    const handleCreateSubmit = (event) => {
        event.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        const meeting = {
            meetingId: uuid_v4(),
            meetingName: event.target[0].value,
            createdDate: today,
            meetingTopics: {}
        };

        fetch(`${backend}/addmeeting`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meeting)
        })
            .then(() => {
                setFormValues(initialState);
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
                            <Form.Control type="text" placeholder={formValues.meetingname} />
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
