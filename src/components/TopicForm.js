import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import { connect } from "react-redux";
import { requestTopics } from "../store/actions";

const backend = process.env.REACT_APP_BACKEND;

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTopicsChange: (meetingName) => {
            dispatch(requestTopics(meetingName));
        }
    };
};

const TopicForm = ({ meeting, onTopicsChange }) => {
    const [formValues, setFormValues] = useState({});

    const initialState = { topicname: "Enter topic name", duration: "Enter duration", topicowner: "Enter topic owner" };

    const handleSubmit = (event) => {
        event.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        const topic = {
            topicId: uuid_v4(),
            topicName: event.target[0].value,
            duration: event.target[1].value,
            topicCreator: event.target[2].value,
            createdDate: today,
            meetingName: meeting.meetingName
        };

        fetch(`${backend}/addtopic`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topic)
        })
            .then(() => {
                setFormValues({});
                onTopicsChange(meeting.meetingName);
            })
            .catch((err) => console.log(`error from backend: ${err}`));
    };

    return (
        <div className="mx-auto mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="topicname">
                    <Form.Label>Topic Name</Form.Label>
                    <Form.Control type="text" placeholder={initialState.topicname} value={formValues.topicname} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="topicduration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" placeholder={initialState.duration} value={formValues.duration} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="topicowner">
                    <Form.Label>Topic Owner</Form.Label>
                    <Form.Control type="text" placeholder={initialState.topicowner} value={formValues.topicowner} />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
