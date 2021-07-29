import TopicDetail from "./TopicDetail";
import addButton from "../../assets/add_rounded_corners.svg";
import Button from "react-bootstrap/Button";
import TopicForm from "../forms/TopicForm";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { requestTopics } from "../../store/actions.js";

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting,
        meetingTopics: state.requestTopics.topics
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadTopics: (meetingName) => {
            dispatch(requestTopics(meetingName));
        }
    };
};

const TopicList = ({ meeting, meetingTopics, onReloadTopics }) => {
    // State specific to this component
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        var newTopicList = [];
        Object.values(meetingTopics).forEach((topic) => newTopicList.push(topic));
        setTopicList(newTopicList);
    }, [meetingTopics]);

    const createTopic = (event) => {
        setCreatingTopic(!creatingTopic);
    };

    return (
        <div className="px-5 meeting-details">
            <div>
                {topicList.map((topic) => {
                    return <TopicDetail key={topic.topicId} topicName={topic.topicName} duration={topic.duration} progress={0} />;
                })}
            </div>
            {creatingTopic && <TopicForm />}
            <Button className="mt-5 button" variant="white" onClick={createTopic}>
                <img className="add-button-image" src={addButton} alt="add"></img>
            </Button>
            <Button className="mt-5 mx-auto button" variant="info" onClick={() => onReloadTopics(meeting.meetingName)}>
                Reload Topics
            </Button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
