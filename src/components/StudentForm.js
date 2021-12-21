import { Grid, TextField } from "@mui/material";
import React from "react";
import Form from '../layouts/Form'
import Input from "../controls/Input";
import Select from '../controls/Select';

export default function StudentForm(){
    return(
        <Form>
            <Grid container>
                <Grid item xs={3}>
                    <Input
                        label="Name"
                        name="studentName">
                    </Input>
                    <Input
                        label="Surname"
                        name="studentSurname">
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Input
                        label="Phone"
                        name="studentPhone">
                    </Input>
                    <Input
                        label="Mail"
                        name="studentMail">
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Input
                        label="Birthday"
                        name="studentBirthday">
                    </Input>
                    <Input
                        label="Book Number"
                        name="studentBookNumber">
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        label="Group"
                        name="group"
                        options = {[
                            {id:0, title:'Select'},
                            {id:1, title:'Some'},
                            {id:2, title:'Some'}
                        ]}>
                    </Select>
                </Grid>
            </Grid>
        </Form>
    )
}