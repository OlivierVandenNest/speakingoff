import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { requestMeeting, changeMeeting } from "../../store/actions";
import MeetingLink from "./MeetingLink";
import TopicList from "./TopicList.js";
import MeetingProgressBar from "./MeetingProgressBar";
import _ from "lodash";

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
        }
    };
};

// Access to 'match' object since the MeetingOverview React component is used in a Route
// All the shit between brackets are attributes of the props object
function MeetingOverview({ match, serverResponse, isMeetingPending, meetingError, onMeetingRequest, onMeetingChange }) {
    useEffect(() => {
        console.log(`meeting name: ${match.params.meetingName}`);
        onMeetingRequest(match.params.meetingName);
        return () => {
            console.log("leaving meeting overview");
            onMeetingChange({});
        };
    }, []);

    return (
        <div className="MeetingOverview">
            {isMeetingPending ? (
                <Spinner className="mx-auto" animation="border" role="status" variant="primary" />
            ) : (
                <>
                    <MeetingLink />
                    {(serverResponse.meeting?.progress > 0 || !_.isEmpty(serverResponse.meeting?.meetingTopicsList)) && <MeetingProgressBar />}
                    <TopicList />
                </>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingOverview);
