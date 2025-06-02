import { Paper, Box, Link } from "@mui/material"

export default function Nav(){

    return(
        <Paper elevation={2} style={{display: "flex", justifyContent: "space-between", alignContent:"center"}}>
                <p>Pasos_logo</p> {/**reemplazar */}
                <Box display={"flex"} height={"fit-content"} marginY={"auto"} >
                        <Link href="#" >
                            Pacientes
                        </Link>
                    
                        <Link href="#">
                            Terapeutas
                        </Link>
                        <Link href="#">
                            Salir
                        </Link>
                </Box>

        </Paper>
    )

}