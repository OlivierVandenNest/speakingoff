import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { requestMeeting, requestTopics, changeMeeting, changeTopics, startMeeting, finishMeeting } from "../../store/actions";
import MeetingLink from "./MeetingLink";
import TopicList from "./TopicList.js";
import MeetingProgressBar from "./MeetingProgressBar";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import { MeetingStatus } from "../../constants";
import { useHistory } from "react-router";
import "./meetingoverview.scss";

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting,
        isMeetingPending: state.requestMeeting.isMeetingPending,
        meetingError: state.requestMeeting.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingRequest: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        },
        onMeetingChange: (meeting) => {
            dispatch(changeMeeting(meeting));
        },
        onMeetingStart: (meetingName) => {
            dispatch(startMeeting(meetingName));
        },
        onMeetingFinish: (meetingName) => {
            dispatch(finishMeeting(meetingName));
        }
    };
};

// Access to 'match' object since the MeetingOverview React component is used in a Route
// All the shit between brackets are attributes of the props object
function MeetingOverview({
    match,
    serverResponse,
    isMeetingPending,
    meetingError,
    onMeetingRequest,
    topics,
    areTopicsPending,
    topicsError,
    onTopicsRequest,
    onMeetingChange,
    onTopicsChange,
    onMeetingStart,
    onMeetingFinish
}) {
    useEffect(() => {
        console.log(`meeting name: ${match.params.meetingName}`);
        onMeetingRequest(match.params.meetingName);
        return () => {
            console.log("leaving meeting overview");
            onMeetingChange({});
        };
    }, []);

    const history = useHistory();

    const handleStart = (e) => {
        onMeetingStart(serverResponse.meeting?.meetingInputDTO?.meetingName);
    };

    const handleFinish = (e) => {
        onMeetingFinish(serverResponse.meeting?.meetingInputDTO?.meetingName);
        history.push(`/meeting/${serverResponse.meeting?.meetingInputDTO?.meetingName}/report`);
    };

    return (
        <div className="MeetingOverview">
            {serverResponse.meeting?.status === MeetingStatus.Preparation && (
                <div>
                    <MeetingLink />
                    <TopicList />
                    <div className="flex-row">
                        <Button className="mt-5 mx-auto button" variant="info" onClick={handleStart}>
                            Start Meeting!
                        </Button>
                    </div>
                </div>
            )}
            {serverResponse.meeting?.status === MeetingStatus.Started && (
                <div>
                    {isMeetingPending ? (
                        <Spinner className="mx-auto" animation="border" role="status" variant="info" />
                    ) : (
                        <>
                            <MeetingLink />
                            {(serverResponse.meeting?.progress > 0 || !_.isEmpty(serverResponse.meeting?.meetingTopicsList)) && <MeetingProgressBar />}
                            <TopicList />
                        </>
                    )}
                    <div className="flex-row">
                        <Button className="mt-5 mx-auto button" variant="info" onClick={handleFinish}>
                            End Meeting!
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingOverview);
