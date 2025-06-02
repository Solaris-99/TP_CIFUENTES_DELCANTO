import { Typography, Container, Box, List, ListItemButton, Button, Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Patient } from "../common/types/patient";



export default function PatientView(props: {patients : Patient[]}) {


    return (
    <Container>
        <Accordion defaultExpanded>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            >

                <Typography variant="h5">Lista de pacientes</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} width={"95%"} marginX="auto" >
                    <Typography>{props.patients.length} Pacientes</Typography>
                    <Button>Agregar paciente</Button> { /* El botón debería ser solo para el coordinador */ }
                </Box>
               
                <List>
                    {props.patients.map(e=>{
                        return(
                            <ListItemButton component="a" key={e.id}  href="#">
                                    {e.name}
                            </ListItemButton >)
                    })}
                </List>    
            
                
            </AccordionDetails>

        </Accordion>
    </Container>
    )

}
