import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import "./meetingoverview.scss";

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting
    };
};

const MeetingProgressBar = ({ serverResponse }) => {
    return (
        <div className="mt-5 mb-5 px-5">
            <ProgressBar animated now={serverResponse.meeting?.progress * 100} variant="info"></ProgressBar>
            <div className="mt-3 flex-row space-around">
                {serverResponse.meeting?.meetingTopicsList.map((topic) => {
                    return (
                        <div key={topic.topicId}>
                            <h2>{topic.topicInputDTO.topicName}</h2>
                            <h3 className="font-weight-light">{topic.topicInputDTO.duration}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, {})(MeetingProgressBar);
