import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

export default function IniativeTracker() {
    const { state } = useLocation();
    const [encounter, setEncounter] = useState(state);

    return (
        <Container component= "main" maxWidth="sm">
            <h1>The encounter name is {encounter.name}</h1>
        </Container>   
    )
}
