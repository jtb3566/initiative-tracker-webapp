import rollD20 from './rollD20'
import sortParticipants from './sortParticipants'

const rollInitiative = (participants) => {
  participants.forEach(participant => {
    participant.initiative = rollD20() + participant.initiativeMod
  })

  return sortParticipants(participants)
}

export default rollInitiative
