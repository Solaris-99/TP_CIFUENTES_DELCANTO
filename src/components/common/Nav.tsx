import { Paper, Box, Button } from "@mui/material"


export default function Nav(){

    return(
        <Paper elevation={2} style={{width:"100vw"}}>
                <Box style={{display:"flex", width: "95%", justifyContent: "space-between", marginLeft: "auto", marginRight: "auto"}}>

                <p>Pasos_logo</p> {/**reemplazar */}
                <Box display={"flex"} height={"fit-content"} marginY={"auto"} >

                        <Button href="#" >
                            Pacientes
                        </Button>
                    
                        <Button href="#">
                            Terapeutas
                        </Button>
                        <Button href="#">
                            Salir
                        </Button>
                </Box>

                </Box>
        </Paper>
    )

}
