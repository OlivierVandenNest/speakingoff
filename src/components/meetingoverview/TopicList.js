import TopicDetail from "./TopicDetail";
import addButton from "../../assets/add_rounded_corners.svg";
import Button from "react-bootstrap/Button";
import TopicForm from "../forms/TopicForm";
import { useState } from "react";
import { connect } from "react-redux";
import { requestMeeting } from "../../store/actions";
import { MeetingStatus } from "../../constants";
import "./meetingoverview.scss";

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadMeeting: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        }
    };
};

const TopicList = ({ serverResponse, onReloadMeeting }) => {
    const [creatingTopic, setCreatingTopic] = useState(false);

    const createTopic = (event) => {
        setCreatingTopic(!creatingTopic);
    };

    return (
        <div className="px-5 flex-column">
            <div>
                {serverResponse.meeting?.meetingTopicsList?.map((topic) => {
                    return <TopicDetail key={topic.topicId} topicInputDTO={topic.topicInputDTO} />;
                })}
            </div>
            {creatingTopic && <TopicForm />}
            {serverResponse.meeting?.status === MeetingStatus.Preparation && (
                <Button className="mt-5 button" variant="white" onClick={createTopic}>
                    <img className="add-button-image" src={addButton} alt="add"></img>
                </Button>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
