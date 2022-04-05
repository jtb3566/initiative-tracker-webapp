
//TODO: case for ties
const sortParticipants = (participants) => {
    return participants.sort((a , b) => {
        return b.initiative - a.initiative
    })
}

export default sortParticipants