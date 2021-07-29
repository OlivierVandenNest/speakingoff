import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting,
        topics: state.requestTopics.topics
    };
};

const MeetingProgressBar = ({ meeting, topics }) => {
    console.log(meeting.totalDuration);
    console.log(meeting.progress);
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        var newTopicList = [];
        Object.values(topics).forEach((topic) => newTopicList.push(topic));
        setTopicList(newTopicList);
    }, [topics]);

    return (
        <div className="mt-5 mb-5 px-5">
            <ProgressBar animated now={meeting.progress * 100} variant="info"></ProgressBar>
            <div className="mt-3 meeting-progress-bar">
                {topicList.map((topic) => {
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
