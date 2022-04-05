import rollD20 from "./rollD20";


//TODO: add case for ties
const rollInitiative = (participants) => {
    participants.forEach(participant => {
        participant.initiative = rollD20() + participant.initiativeMod
    });

    return participants.sort((a , b) => {
        return b.initiative - a.initiative
    })
}

export default rollInitiative