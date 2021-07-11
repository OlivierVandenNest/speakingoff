import MeetingPhaseDetail from "./MeetingPhaseDetail";
import addButton from "../add_button.png";
import Button from "react-bootstrap/Button";

const MeetingPhaseDetails = () => {
    return (
        <div className="px-5 meeting-details">
            <MeetingPhaseDetail phaseName={"Product Design"} duration={"ongoing"} progress={50} />
            <MeetingPhaseDetail phaseName={"Marketing"} duration={"15 min"} progress={0} />
            <MeetingPhaseDetail phaseName={"Sales"} duration={"45 min"} progress={0} />
            <MeetingPhaseDetail phaseName={"Legal"} duration={"1h 15min"} progress={0} />
            <Button className="mt-5 button" variant="white">
                <img className="add-button-image" src={addButton} alt="add"></img>
            </Button>
        </div>
    );
};

export default MeetingPhaseDetails;
