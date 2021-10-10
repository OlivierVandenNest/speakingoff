import React from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { connect } from "react-redux";
import { addTopic, requestMeeting } from "../../store/actions.js";
import expand from "../../assets/expand_rounded.svg";
import collapse from "../../assets/collapse_rounded.svg";
import _ from "lodash";

const backend = process.env.REACT_APP_BACKEND;

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingChange: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        }
    };
};

const TopicForm = ({ serverResponse, onMeetingChange }) => {
    const [clicked, setClicked] = useState(true);

    const initialState = { topicname: "Enter topic name", description: "Enter description (optional)" };

    const handleToggle = (e) => {
        e.stopPropagation();
        setClicked(!clicked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let hourMinutes = _.isEmpty(event.target[1].value) ? 0 : parseInt(event.target[1].value);
        let minutes = _.isEmpty(event.target[2].value) ? 0 : parseInt(event.target[2].value);

        const topic = {
            topicName: event.target[0].value,
            duration: hourMinutes * 60 + minutes,
            topicDescription: event.target[4].value,
            meetingName: serverResponse.meeting.meetingInputDTO.meetingName
        };

        fetch(`${backend}/meetings/addtopic`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topic)
        })
            .then(() => {
                onMeetingChange(serverResponse.meeting.meetingInputDTO.meetingName);
            })
            .catch((err) => console.log(`error from backend: ${err}`));
    };

    return (
        <div className="mt-4 p-3 border border-info rounded mb-0">
            <Form onSubmit={handleSubmit}>
                <div className="flex-row mb-3 w100">
                    {clicked && (
                        <>
                            <div className="w50">
                                <Form.Control type="text" placeholder={initialState.topicname} />
                            </div>
                            <div className="flex-row ml-auto w25">
                                <h6 className="my-auto">Duration</h6>
                                <Form.Control type="text" className="ml-2" />
                                <h6 className="my-auto ml-2">h</h6>
                                <Form.Control type="text" className="ml-2" />
                                <h6 className="my-auto ml-2">min</h6>
                            </div>
                        </>
                    )}
                    <Button className="button ml-auto" variant="white" onClick={handleToggle}>
                        <img src={clicked ? collapse : expand} alt="expand" className="expandcollapseimg" />
                    </Button>
                </div>
                {clicked && (
                    <div className="flex-row w100">
                        <div className="w50">
                            <Form.Control type="text" placeholder={initialState.description} />
                        </div>
                        <Button className="ml-3" variant="info" type="submit">
                            Add
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
