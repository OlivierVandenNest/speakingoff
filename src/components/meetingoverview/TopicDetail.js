import { Button, ProgressBar, InputGroup, FormControl, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import addConclusionLogo from "../../assets/add_conclusion.svg";
import circle from "../../assets/circle.svg";
import circlechecked from "../../assets/circlechecked.svg";
import expand from "../../assets/expand_rounded.svg";
import collapse from "../../assets/collapse_rounded.svg";
import { MeetingStatus } from "../../constants";
import "./meetingoverview.scss";

import { useState } from "react";
import { connect } from "react-redux";
import { requestMeeting, toggleTopic } from "../../store/actions";

const backend = process.env.REACT_APP_BACKEND;

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting,
        isMeetingPending: state.requestMeeting.isMeetingPending,
        topicToggleStates: state.topicToggleReducer.topics
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingChange: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        },
        onTopicToggle: (meetingName, topicName) => {
            dispatch(toggleTopic(meetingName, topicName));
        }
    };
};

const TopicDetail = ({ topicInputDTO, serverResponse, isMeetingPending, topicToggleStates, onMeetingChange, onTopicToggle }) => {
    const [toggeled, setToggeled] = useState(
        topicToggleStates?.filter((topicToggleState) => {
            console.log(topicToggleState);
            return (
                topicToggleState.meetingName === topicInputDTO.meetingName && topicToggleState.topicName === topicInputDTO.topicName && topicToggleState.toggled
            );
        }).length > 0
    );
    const [finished, setFinished] = useState(topicInputDTO.isFinished);
    const [isWritingConclusion, setIsWritingConclusion] = useState(topicInputDTO.topicDescription == "");

    const handleToggle = (e) => {
        e.stopPropagation();
        onTopicToggle(topicInputDTO.meetingName, topicInputDTO.topicName);
        setToggeled(!toggeled);
    };

    const handleFinish = (e) => {
        e.stopPropagation();
        setFinished(!finished);
        topicInputDTO.isFinished = !topicInputDTO.isFinished;
        updateTopic(topicInputDTO);
    };

    const handleConclusion = (e) => {
        e.stopPropagation();
        setIsWritingConclusion(true);
    };

    const handleWrittenConclusion = (e) => {
        e.preventDefault();
        topicInputDTO.topicDescription = e.target[0].value;
        updateTopic(topicInputDTO);
    };

    const updateTopic = (topic) => {
        fetch(`${backend}/meetings/updatetopic`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topicInputDTO)
        })
            .then(() => onMeetingChange(serverResponse.meeting.meetingInputDTO.meetingName))
            .catch((err) => console.log(`error when updating topic: ${err}`));
    };

    return (
        <div className={`mt-4 p-3 block-example border border-info rounded mb-0 ${finished ? "bg-secondary-color" : ""}`}>
            <div className="flex-row">
                <div className="flex-row">
                    <h2>{topicInputDTO.topicName}</h2>
                    {toggeled && <h3 className="ml-3 font-weight-light">{topicInputDTO.duration}</h3>}
                </div>
                <Button className="ml-auto button" variant="white" onClick={handleToggle}>
                    <img src={toggeled ? collapse : expand} alt="expand" className="expandcollapseimg" />
                </Button>
            </div>
            {toggeled && serverResponse.meeting?.status === MeetingStatus.Started && (
                <div className="mt-3 w100 flex-row space-between">
                    <ProgressBar className="w50" animated now={finished ? 100 : 0} variant="info" />
                </div>
            )}
            {toggeled && serverResponse.meeting?.status === MeetingStatus.Started && (
                <div className="mt-3 flex-row">
                    {isWritingConclusion ? (
                        <div className="w50">
                            <Form onSubmit={handleWrittenConclusion}>
                                <InputGroup>
                                    <FormControl as="textarea" aria-label="Topic Conclusion" defaultValue={topicInputDTO.topicDescription} />
                                    <Button className="ml-2" variant="info" type="submit">
                                        Add Conclusion
                                    </Button>
                                </InputGroup>
                            </Form>
                        </div>
                    ) : (
                        <div className="flex-row w50">
                            <div className="w100 block">
                                <p className="wordwrap">{topicInputDTO.topicDescription}</p>
                            </div>
                            <Button className="button" type="button" variant="white" onClick={handleConclusion} disabled={isMeetingPending}>
                                <img src={addConclusionLogo} alt="conclusion" />
                            </Button>
                        </div>
                    )}
                    <div className="ml-auto mr-3 flex-row">
                        <h5 className="font-weight-bolder my-auto">{finished ? "FINISHED" : "FINISH"}</h5>
                        {isMeetingPending ? (
                            <Spinner animation="border" role="status" variant="info" />
                        ) : (
                            <Button className="button" type="checkbox" variant="white" onClick={handleFinish} disabled={isMeetingPending}>
                                <img src={finished ? circlechecked : circle} alt="finish" className="finishtopicsvg" />
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);
