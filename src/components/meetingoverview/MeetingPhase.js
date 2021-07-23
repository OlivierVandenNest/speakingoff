const MeetingPhase = ({phaseName, duration}) => {
    return (
        <div>
            <h2>{phaseName}</h2>
            <h3 className="font-weight-light">{duration}</h3>
        </div>
    )
}

export default MeetingPhase
