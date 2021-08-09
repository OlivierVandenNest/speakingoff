import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting
    };
};

const MeetingProgressBar = ({ meeting }) => {
    return (
        <div className="mt-5 mb-5 px-5">
            <ProgressBar animated now={meeting.progress * 100} variant="info"></ProgressBar>
            <div className="mt-3 meeting-progress-bar">
                {meeting.meetingTopicsList.map((topic) => {
                    return (
                        <div key={topic.topicId}>
                            <h2>{topic.topicName}</h2>
                            <h3 className="font-weight-light">{topic.duration}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, {})(MeetingProgressBar);
