import React, { useEffect } from "react";
import { connect } from "react-redux";
import { requestMeeting, requestTopics, changeMeeting, changeTopics } from "../store/actions";
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

    // const fetchTopics = () => {
    //     fetch(`${backend}/meetings/${meeting.meetingName}/topics`, {
    //         method: "get",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then((response) => {
    //             if (response.status === StatusCodes.OK) {
    //                 return response.json();
    //             } else {
    //                 console.log(`bad response status when fetching topics: ${response.status}`);
    //             }
    //         })
    //         .then((topics) => {
    //             const topicList = [];
    //             console.log(topics);
    //             for (const [key, val] in topics) {
    //                 console.log(key, val);
    //                 topicList.push(val);
    //             }
    //             setMeetingTopics(topicList);
    //             console.log(meetingTopics);
    //         })
    //         .catch((err) => console.log(`error from fetching topics: ${err}`));
    // };

    return (
        <div className="MeetingOverview">
            {/* <h1 className="mb-5">Coca Cola Product Meeting</h1>
            <MeetingProgressBar /> */}
            <MeetingPhaseDetails />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingOverview);
