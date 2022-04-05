import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import rollInitiative from "../utilities/rollInitiative";

export default function IniativeTracker() {
    const { state } = useLocation();
    const [encounter, setEncounter] = useState(state);

    useEffect (() => {
        console.log(encounter.characters)
        encounter.participants = rollInitiative(encounter.characters);
        console.log(encounter)
    }, [encounter])

    return (
        <Container component= "main" maxWidth="sm">
            <h1>The encounter name is {encounter.name}</h1>
        </Container>   
    )
}
