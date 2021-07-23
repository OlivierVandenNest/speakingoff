import { useState } from "react";
import { Button } from "react-bootstrap";
import MeetingCreateForm from "../forms/MeetingCreateForm";
import MeetingJoinForm from "../forms/MeetingJoinForm";

const Home = () => {
    const [creatingMeeting, setCreatingMeeting] = useState(false);
    const [joiningMeeting, setJoiningMeeting] = useState(false);

    const createClicked = () => {
        setCreatingMeeting(true);
        setJoiningMeeting(false);
    };

    const joinClicked = () => {
        setCreatingMeeting(false);
        setJoiningMeeting(true);
    };

    return (
        <div>
            <h1 className="mb-5">SpeakingOff</h1>
            <div className="homeactionlist">
                {!creatingMeeting && (
                    <Button className="mt-5 mx-auto button" variant="info" onClick={createClicked}>
                        Create Meeting
                    </Button>
                )}
                {creatingMeeting && <MeetingCreateForm />}
                {!joiningMeeting && (
                    <Button className="mt-5 mx-auto button" variant="info" onClick={joinClicked}>
                        Join Meeting
                    </Button>
                )}
                {joiningMeeting && <MeetingJoinForm />}
            </div>
        </div>
    );
};

export default Home;
