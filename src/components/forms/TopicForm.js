import React from "react";
import { Row, Container, Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import { connect } from "react-redux";
import { requestMeeting, requestTopics } from "../../store/actions.js";
import expand from "../../assets/expand_rounded.svg";
import collapse from "../../assets/collapse_rounded.svg";
import _ from "lodash";

const backend = process.env.REACT_APP_BACKEND;

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingChange: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        },
        onTopicsChange: (meetingName) => {
            dispatch(requestTopics(meetingName));
        }
    };
};

const TopicForm = ({ meeting, onMeetingChange, onTopicsChange }) => {
    const [clicked, setClicked] = useState(true);
    const [formValues, setFormValues] = useState({});

    const initialState = { topicname: "Enter topic name", description: "Enter description (optional)" };

    const handleToggle = (e) => {
        e.stopPropagation();
        setClicked(!clicked);
    };

    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        let hourMinutes = _.isEmpty(event.target[1].value) ? 0 : parseInt(event.target[1].value);
        let minutes = _.isEmpty(event.target[2].value) ? 0 : parseInt(event.target[2].value);

        const topic = {
            topicId: uuid_v4(),
            topicName: event.target[0].value,
            duration: hourMinutes * 60 + minutes,
            topicDescription: event.target[3].value,
            createdDate: today,
            meetingName: meeting.meetingName,
            isFinished: false
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
                onMeetingChange(meeting.meetingName);
                onTopicsChange(meeting.meetingName);
            })
            .catch((err) => console.log(`error from backend: ${err}`));
    };

    return (
        <div className="mt-4 p-3 border border-info rounded mb-0">
            <Form onSubmit={handleSubmit}>
                <div className="topicform-top mb-3">
                    {clicked && (
                        <>
                            <div>
                                <Form.Control type="text" placeholder={initialState.topicname} />
                            </div>
                            <div className="duration-group ml-auto">
                                <h6 className="my-auto">Duration</h6>
                                <Form.Control type="text" className="ml-2" />
                                <h6 className="my-auto ml-2">h</h6>
                                <Form.Control type="text" className="ml-2" />
                                <h6 className="my-auto ml-2">min</h6>
                            </div>
                        </>
                    )}
                    <Button className="button meeting-detail-rightgroup" variant="white" onClick={handleToggle}>
                        <img src={clicked ? collapse : expand} alt="expand" className="expandcollapseimg" />
                    </Button>
                </div>
                {clicked && (
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder={initialState.description} />
                        </Col>
                        <Col>
                            <Button className="ms-auto" variant="info" type="submit">
                                Add
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
