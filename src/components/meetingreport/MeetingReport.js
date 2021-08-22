import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { requestMeeting, changeMeeting } from "../../store/actions";

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
        },
        onMeetingChange: (meeting) => {
            dispatch(changeMeeting(meeting));
        }
    };
};

const MeetingReport = ({ match, meeting, isMeetingPending, onMeetingRequest, onMeetingChange }) => {
    useEffect(() => {
        console.log(`meeting name: ${match.params.meetingName}`);
        onMeetingRequest(match.params.meetingName);
        return () => {
            console.log("leaving meeting report");
            onMeetingChange({});
        };
    }, []);

    return (
        <div className="border-info rounded px-5 pb-5 flex-column text-align-center">
            {isMeetingPending ? (
                <Spinner className="mx-auto" animation="border" role="status" variant="info" />
            ) : (
                <>
                    <h1 className="font-weight-bold">{meeting.meeting?.meetingInputDTO.meetingName}</h1>
                    {meeting.meeting?.meetingTopicsList.map((topic) => {
                        return (
                            <div className="mx-5 mt-5">
                                <h3 className="font-weight-bold">{topic.topicInputDTO.topicName}</h3>
                                <p>{topic.topicInputDTO.topicDescription}</p>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingReport);
