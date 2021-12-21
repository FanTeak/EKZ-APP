import { Grid } from "@mui/material";
import React, {useEffect, useState} from "react";
import Form from '../layouts/Form'
import Input from "../controls/Input";
import Select from '../controls/Select';
import Date from "../controls/Date";
import Button from '../controls/Button';
import {ButtonGroup, Button as MuiButton, makeStyles} from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@material-ui/core/Box';
import {createAPIEndpoint, ENDPIONTS} from '../api/index'

const getNewStudent = ()=>({
    studentId: 0,
    studentName: "",
    studentSurname: "",
    studentBirthday: "",
    studentPhone: "",
    studentMail: "",
    studentBookNumber: "",
    groupId: 0
})

const useStyles = makeStyles(theme => ({
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function StudentForm(props){
    const {studentId, setStudentId} = props;
    const[values, setValues] = useState(getNewStudent());
    const [errors, setErrors] = useState({});
    const classes = useStyles();
    const [groupList, setGroupList] = useState([]);
    
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.GROUPS).fetchAll()
            .then(res => {
                let groupList = res.data.map(item => ({
                    id: item.groupId,
                    title: item.groupName
                }));
                groupList = [{ id: 0, title: 'Select' }].concat(groupList);
                setGroupList(groupList);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (studentId == 0) resetForm()
        else {
            createAPIEndpoint(ENDPIONTS.STUDENT).fetchById(studentId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err))
        }
    }, [studentId]);

    const handleInputChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    const resetForm = ()=>{
        setValues(getNewStudent())
    }

    const validateForm = () =>{
        let temp = {};
        temp.studentName = values.studentName != "" ? "" : "This field is required.";
        temp.studentSurname = values.studentSurname != "" ? "" : "This field is required.";
        temp.studentPhone = values.studentPhone != "" ? "" : "This field is required.";
        temp.studentMail = values.studentMail != "" ? "" : "This field is required.";
        temp.studentBookNumber = values.studentBookNumber != "" ? "" : "This field is required.";
        temp.groupId = values.groupId != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const SubmitStudent = e =>{
        e.preventDefault();
        if (validateForm()) {
            if (values.studentId == 0) {
                createAPIEndpoint(ENDPIONTS.STUDENT).create(values)
                    .then(res => {
                        resetForm();
                    })
                    .catch(err => console.log(err));
            }
            else {
                createAPIEndpoint(ENDPIONTS.STUDENT).update(values.studentId, values)
                    .then(res => {
                        setStudentId(0);
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    return(
        <Form onSubmit={SubmitStudent}>
            <Grid container>
                <Grid item xs={3}>
                    <Input
                        label="Name"
                        name="studentName"
                        onChange={handleInputChange}
                        error={errors.studentName}
                        value={values.studentName}>
                    </Input>
                    <Input
                        label="Surname"
                        name="studentSurname"
                        onChange={handleInputChange}
                        value={values.studentSurname}
                        error={errors.studentSurname}>
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Input
                        label="Phone"
                        name="studentPhone"
                        onChange={handleInputChange}
                        value={values.studentPhone}
                        error={errors.studentPhone}>
                    </Input>
                    <Input
                        label="Mail"
                        name="studentMail"
                        onChange={handleInputChange}
                        value={values.studentMail}
                        error={errors.studentMail}>
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        label="Group"
                        name="groupId"
                        onChange={handleInputChange}
                        value={values.groupId}
                        options = {groupList}
                        error={errors.groupId}>
                    </Select>
                    <Input
                        label="Book Number"
                        name="studentBookNumber"
                        onChange={handleInputChange}
                        value={values.studentBookNumber}
                        error={errors.studentBookNumber}>
                    </Input>
                </Grid>
                <Grid item xs={3}>
                    <Date
                        label="Birthday"
                        name="studentBirthday"
                        onChange={handleInputChange}
                        value={values.studentBirthday}>                
                    </Date>
                    <Box m={2} ml={10} pt={1}>
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                endIcon={<AddCircleIcon/>}
                                type="submit">
                                    Submit
                            </MuiButton>
                        </ButtonGroup>
                    </Box>
                </Grid>
            </Grid>
        </Form>
    )
}