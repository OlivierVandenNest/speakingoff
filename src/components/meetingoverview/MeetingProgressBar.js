import ProgressBar from "react-bootstrap/ProgressBar";
import Topic from "./Topic";

const MeetingProgressBar = () => {
    return (
        <div className="mb-5 px-5">
            <ProgressBar animated now={25} variant="info"></ProgressBar>
            <div className="mt-3 meeting-progress-bar">
                <Topic phaseName={"Product Design"} duration={"ongoing"} />
                <Topic phaseName={"Marketing"} duration={"15 min"} />
                <Topic phaseName={"Sales"} duration={"45 min"} />
                <Topic phaseName={"Legal"} duration={"1h 15min"} />
            </div>
        </div>
    );
};

export default MeetingProgressBar;
