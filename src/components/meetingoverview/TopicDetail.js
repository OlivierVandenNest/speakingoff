import { Button, ProgressBar } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import MeetingInvitee from "./MeetingInvitee";
import micLogo from "../../assets/mic_logo.png";
import textLogo from "../../assets/text-logo.png";
import circle from "../../assets/circle.svg";
import circlechecked from "../../assets/circlechecked.svg";
import expand from "../../assets/expand_rounded.svg";
import collapse from "../../assets/collapse_rounded.svg";

import { useState } from "react";
import { connect } from "react-redux";
import { requestMeeting } from "../../store/actions";

const backend = process.env.REACT_APP_BACKEND;

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting,
        isMeetingPending: state.requestMeeting.isMeetingPending
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingRequest: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        }
    };
};

const TopicDetail = ({ topicName, duration, progress, meeting, isMeetingPending, onMeetingRequest }) => {
    const [clicked, setClicked] = useState(false);
    const [topic, setTopic] = useState(meeting.meetingTopicsMap.get(topicName).topicInputDTO);
    const [finished, setFinished] = useState(topic.isFinished);

    const handleToggle = (e) => {
        e.stopPropagation();
        setClicked(!clicked);
    };

    const handleFinish = (e) => {
        e.stopPropagation();
        setFinished(!finished);
        updateFinishedTopic(topic);
    };

    const updateFinishedTopic = (topic) => {
        topic.isFinished = !topic.isFinished;
        fetch(`${backend}/meetings/updatetopic`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topic)
        })
            .then(() => onMeetingRequest(meeting.meetingName))
            .catch((err) => console.log(`error when updating finished topic: ${err}`));
    };

    // const checkEnabled = (topicName) => {
    //     let before = true;
    //     for (let topic in topics) {
    //         if (before) {
    //             if (topics[topic].topicName === topicName) {
    //                 before = false;
    //             } else {
    //                 if (!topics[topic].isFinished) {
    //                     return true;
    //                 }
    //             }
    //         } else {
    //             if (topics[topic].isFinished) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // };

    return (
        <div className={`mt-4 p-3 block-example border border-info rounded mb-0 ${topic.isFinished ? "topicfinished" : ""}`} onClick={handleToggle}>
            <div className="meeting-detail-top">
                <div className="meeting-detail-title">
                    <h2>{topicName}</h2>
                    {clicked && <h3 className="ml-3 font-weight-light">{duration}</h3>}
                </div>
                {/* {clicked && (
                    <Button className="meeting-detail-rightgroup mr-2" variant="info">
                        Add Tag
                    </Button>
                )}
                {clicked && (
                    <Button className="mr-2" variant="outline-info">
                        Remove Tag
                    </Button>
                )} */}
                {/* When tag buttons are uncommented, use className={`button ${clicked ? "" : "meeting-detail-rightgroup"}`} */}
                <Button className={`button ${clicked ? "meeting-detail-rightgroup" : "meeting-detail-rightgroup"}`} variant="white">
                    <img src={clicked ? collapse : expand} alt="expand" className="expandcollapseimg" />
                </Button>
            </div>
            {clicked && (
                <div className="mt-3 meeting-detail-mid">
                    <ProgressBar className="meeting-detail-progressbar" animated now={finished ? 100 : progress} variant="info" />
                    {/* <div className="meeting-detail-invitees">
                        <MeetingInvitee />
                        <MeetingInvitee />
                        <MeetingInvitee />
                        <MeetingInvitee />
                    </div> */}
                </div>
            )}
            {clicked && (
                <div className="mt-3 meeting-detail-bottom">
                    <h5 className="font-weight-bolder">ADD CONCLUSION:</h5>
                    <div className="ml-3 action-imgs">
                        <img src={micLogo} alt="mic" />
                        <img className="ml-3" src={textLogo} alt="text" />
                    </div>
                    <div className="ml-auto mr-3 finishbox">
                        <h5 className="font-weight-bolder my-auto">{finished ? "FINISHED" : "FINISH"}</h5>
                        {isMeetingPending ? (
                            <Spinner animation="border" role="status" variant="primary">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <Button className="button" type="checkbox" variant="white" onClick={handleFinish}>
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
