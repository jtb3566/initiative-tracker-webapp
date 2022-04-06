import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    let navigate = useNavigate();
    const handleRedirect = (path) => {
        navigate(path);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component="h1">
                    Roll for Initiative...
                </Typography>
                <hr></hr>
                <Button variant="contained" onClick={() => handleRedirect("/")}> 
                    Encounters
                </Button>
                <Button variant="contained" onClick={() => handleRedirect("/characters")}>
                    Characters
                </Button>
            </Toolbar>
        </AppBar>
    )
}