import React, { useEffect } from "react";
import { connect } from "react-redux";
import { requestMeeting, requestTopics, changeMeeting, changeTopics } from "../../store/actions";
import MeetingLink from "./MeetingLink";
import MeetingPhaseDetails from "./MeetingPhaseDetails.js";

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting,
        isMeetingPending: state.requestMeeting.isMeetingPending,
        meetingError: state.requestMeeting.error,
        topics: state.requestTopics.topics,
        areTopicsPending: state.requestTopics.areTopicsPending,
        topicsError: state.requestTopics.topicsError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingRequest: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        },
        onTopicsRequest: (meetingName) => {
            dispatch(requestTopics(meetingName));
        },
        onMeetingChange: (meeting) => {
            dispatch(changeMeeting(meeting));
        },
        onTopicsChange: (topics) => {
            dispatch(changeTopics(topics));
        }
    };
};

// Access to match object since the MeetingOverview React component is used in a Route
// All the shit between brackets are attributes of the props object
function MeetingOverview({
    match,
    meeting,
    isMeetingPending,
    meetingError,
    onMeetingRequest,
    topics,
    areTopicsPending,
    topicsError,
    onTopicsRequest,
    onMeetingChange,
    onTopicsChange
}) {
    useEffect(() => {
        console.log(`meeting name: ${match.params.meetingName}`);
        onMeetingRequest(match.params.meetingName);
        onTopicsRequest(match.params.meetingName);
        return () => {
            console.log("leaving meeting overview");
            onMeetingChange({});
            onTopicsChange({});
        };
    }, []);

    return (
        <div className="MeetingOverview">
            <MeetingLink />
            {/* <h1 className="mb-5">Coca Cola Product Meeting</h1>
            <MeetingProgressBar /> */}
            <MeetingPhaseDetails />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingOverview);
