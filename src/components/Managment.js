import { Grid } from "@mui/material";
import React, { useState } from "react";
import StudentForm from "./StudentForm";
import Box from '@material-ui/core/Box';
import StudentList from "./StudentList";

export default function Managment(){
    const [studentId, setStudentId] = useState(0);

    return(
        <Grid container spacing={2}>
            <Grid>
                <StudentForm {...{studentId, setStudentId}}></StudentForm>
            </Grid>
            <Grid>
                <Box pt={10}>
                    <StudentList{...{setStudentId}}></StudentList>
                </Box>
            </Grid>
        </Grid>
    )
}