import { Typography, Container, Box, List, ListItemText, Button, Link, Paper } from "@mui/material"
import type { Patient } from "../common/types/patient";

export default function PatientView(props: {patients : Patient[]}) {

    return (
    <Container>
        <Typography variant="h2">Pacientes</Typography>
        <Box>
            <Button>Agregar paciente</Button> { /* El botón debería ser solo para el coordinador */ }
            <Paper>
                <List>
                    {props.patients.map(e=>{
                        return(<ListItemText key={e.id} >
                                <Link href="#">
                                    {e.name}
                                </Link>
                            </ListItemText>)
                    })}
                </List>    
            </Paper>
            
        </Box>
    </Container>
    )

}