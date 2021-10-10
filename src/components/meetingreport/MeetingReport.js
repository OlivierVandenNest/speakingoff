import { connect } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
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
    const [showCopyReport, setShowCopyReport] = useState(true);

    useEffect(() => {
        console.log(`meeting name: ${match.params.meetingName}`);
        onMeetingRequest(match.params.meetingName);
        return () => {
            console.log("leaving meeting report");
            onMeetingChange({});
        };
    }, []);

    const handleCopyReport = (event) => {
        event.stopPropagation();
        var clipBoardContent = `**${meeting.meeting?.meetingInputDTO.meetingName}**`;
        clipBoardContent = meeting.meeting?.meetingTopicsList.reduce((content, topic) => {
            let topicDescription = topic.topicInputDTO.topicDescription;
            return `${content}\n\n${topic.topicInputDTO.topicName}${topicDescription == "" ? "" : `:\n${topicDescription}`}`;
        }, clipBoardContent);
        navigator.clipboard.writeText(clipBoardContent);
        setShowCopyReport(false);
        setTimeout(() => setShowCopyReport(true), 3000);
    };

    return (
        <div className="text-align-center">
            <div className="mx-auto border border-info rounded p-5 flex-column mw800">
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
            {showCopyReport ? (
                <Button className="mt-5" variant="info" onClick={handleCopyReport}>
                    Copy Report
                </Button>
            ) : (
                <h6 className="themecolor mt-5">Copied to clipboard!</h6>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingReport);
