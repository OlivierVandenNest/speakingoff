import ProgressBar from 'react-bootstrap/ProgressBar'
import MeetingPhase from './MeetingPhase'

const MeetingProgressBar = () => {
    return (
        <div className="mb-5 px-5">
            <ProgressBar animated now={25} variant="success"></ProgressBar>
            <div className="mt-3 meeting-progress-bar">
                <MeetingPhase phaseName={"Product Design"} duration={"ongoing"}/>
                <MeetingPhase phaseName={"Marketing"} duration={"15 min"}/>
                <MeetingPhase phaseName={"Sales"} duration={"45 min"}/>
                <MeetingPhase phaseName={"Legal"} duration={"1h 15min"}/>
            </div>
        </div>
    )
}

export default MeetingProgressBar
