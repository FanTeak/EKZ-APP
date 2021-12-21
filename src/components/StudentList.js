import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import {createAPIEndpoint, ENDPIONTS} from '../api/index';
import Table from '../layouts/Table'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@material-ui/core/Box';

export default function StudentList(props){
    const {setStudentId} = props;
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.STUDENT).fetchAll()
            .then(res => {
                setStudentList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setStudentId(id);
    }

    return (
        <Box pl={15}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Surname</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Mail</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Book Number</TableCell>
                    <TableCell>Group</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    studentList.map(item=>(
                        <TableRow key={item.studentId}>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.studentName}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.studentSurname}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.studentPhone}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.studentMail}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.studentBirthday}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.studentBookNumber}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.studentId)}>
                                {item.group.groupName}
                            </TableCell>
                            <TableCell>
                                <DeleteSweepIcon color="secondary"/>
                            </TableCell>
                            <TableCell>
                                <EditIcon color="secondary"/>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </Box>
    )
}