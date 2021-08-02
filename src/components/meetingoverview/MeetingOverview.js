import React, { useEffect } from "react";
import { connect } from "react-redux";
import { requestMeeting, requestTopics, changeMeeting, changeTopics, startMeeting, finishMeeting } from "../../store/actions";
import MeetingLink from "./MeetingLink";
import TopicList from "./TopicList.js";
import MeetingProgressBar from "./MeetingProgressBar";
import _ from "lodash";
import Button from "react-bootstrap/Button";

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
        },
        onMeetingStart: (meetingName) => {
        	dispatch(startMeeting(meetingName));
        },
        onMeetingFinish: (meetingName) => {
        	dispatch(finishMeeting(meetingName));
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
    onTopicsChange,
    onMeetingStart,
    onMeetingFinish
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
    
    const handleStart = (e) => {
    	onMeetingStart(meeting.meetingName);
    };
    
    const handleFinish = (e) => {
    	onMeetingFinish(meeting.meetingName);
    };

    return (
        <div className="MeetingOverview">
            {meeting.status === 'preparation' && (
            	<div>
		        	<MeetingLink />
		        	<TopicList />
		        	<div className="meeting-start">
				        <Button className="mt-5 mx-auto button" variant="info" onClick={handleStart}>
				            Start Meeting!
				        </Button>
				    </div>
				</div>
            )}
            {meeting.status === 'started' && (
            	<div>
            		<MeetingLink />
		        	<div>
		        		{(meeting.progress > 0 || !_.isEmpty(meeting.meetingTopics)) && <MeetingProgressBar />}
		        	</div>
		        	<TopicList />
			    	<div className="meeting-finish">
					    <Button className="mt-5 mx-auto button" variant="info" onClick={handleFinish}>
					        End Meeting!
					    </Button>
					</div>
				</div>
            )}
            {meeting.status === 'finished' && (
            	<div>
            		This meeting has ended. In the future, there will be an option to download the meeting report here.
            	</div>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingOverview);
