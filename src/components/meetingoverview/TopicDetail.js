import { Button, ProgressBar } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import MeetingInvitee from "./MeetingInvitee";
import micLogo from "../../assets/mic_logo.png";
import textLogo from "../../assets/text-logo.png";
import circle from "../../assets/circle.svg";
import circlechecked from "../../assets/circlechecked.svg";
import expand from "../../assets/expand_rounded.svg";
import collapse from "../../assets/collapse_rounded.svg";
import { MeetingStatus } from "../../constants";

import { useState } from "react";
import { connect } from "react-redux";
import { requestMeeting } from "../../store/actions";

const backend = process.env.REACT_APP_BACKEND;

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting,
        isMeetingPending: state.requestMeeting.isMeetingPending
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingChange: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        }
    };
};

const TopicDetail = ({ topicInputDTO, serverResponse, isMeetingPending, onMeetingChange }) => {
    const [clicked, setClicked] = useState(false);
    const [finished, setFinished] = useState(topicInputDTO.isFinished);

    const handleToggle = (e) => {
        e.stopPropagation();
        setClicked(!clicked);
    };

    const handleFinish = (e) => {
        e.stopPropagation();
        setFinished(!finished);
        updateFinishedTopic(topicInputDTO);
    };

    const updateFinishedTopic = (topic) => {
        topicInputDTO.isFinished = !topicInputDTO.isFinished;
        fetch(`${backend}/meetings/updatetopic`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topicInputDTO)
        })
            .then(() => onMeetingChange(serverResponse.meeting.meetingInputDTO.meetingName))
            .catch((err) => console.log(`error when updating finished topic: ${err}`));
    };

    return (
        <div className={`mt-4 p-3 block-example border border-info rounded mb-0 ${finished ? "topicfinished" : ""}`} onClick={handleToggle}>
            <div className="meeting-detail-top">
                <div className="meeting-detail-title">
                    <h2>{topicInputDTO.topicName}</h2>
                    {clicked && <h3 className="ml-3 font-weight-light">{topicInputDTO.duration}</h3>}
                </div>
                <Button className="meeting-detail-rightgroup button" variant="white">
                    <img src={clicked ? collapse : expand} alt="expand" className="expandcollapseimg" />
                </Button>
            </div>
            {clicked && serverResponse.meeting?.status === MeetingStatus.Started && (
                <div className="mt-3 meeting-detail-mid">
                    <ProgressBar className="meeting-detail-progressbar" animated now={finished ? 100 : 0} variant="info" />
                </div>
            )}
            {clicked && serverResponse.meeting?.status === MeetingStatus.Started && (
                <div className="mt-3 meeting-detail-bottom">
                    <h5 className="font-weight-bolder">ADD CONCLUSION:</h5>
                    <div className="ml-3 action-imgs">
                        <img src={micLogo} alt="mic" />
                        <img className="ml-3" src={textLogo} alt="text" />
                    </div>
                    <div className="ml-auto mr-3 finishbox">
                        <h5 className="font-weight-bolder my-auto">{finished ? "FINISHED" : "FINISH"}</h5>
                        {isMeetingPending ? (
                            <Spinner animation="border" role="status" variant="primary" />
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
