import { Box, Collapse, Dialog, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useState } from "react";
import { updateUserExam } from '../utils/ExamsUser';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';




const ExamsForOfficePopUpRow = (props) => {


  const {
    examsRow,
    onChange,
    index,
    examsUsers,
    handleClose
  } = props

  const [newExamRow, setNewExamRow] = useState(examsRow);

  const handleUpdateUserExamData = () => {

    let _newExamRow = { ...newExamRow };
    _newExamRow.idDueDateNavigation = null;

    updateUserExam(_newExamRow.idExamUser, _newExamRow)
      .then(response => {

        console.log('הupdate הצליח:', response);
        Swal.fire({
          icon: 'success',
          toast: true,
          title: 'Success',
          text: 'הפרטים  עודכנו בהצלחה',
          width: '300px',
          position: 'top-start',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'swal2-popup-high-zindex'
          }
        });

      }).then(() => {
        onChange(newExamRow.idUser, newExamRow, index); // Update the table after Swal confirmation

      })
      .catch(error => {
        console.error('שגיאה בפוסט:', error);

      });


  }

  return <TableRow key={newExamRow.idUser}>
    <TableCell >
      <button onClick={handleUpdateUserExamData}>שמור</button>
    </TableCell>
    <TableCell>
      <select style={{ textAlign: "center" }}
        value={
          newExamRow.examsStatus === null
            ? 2
            : newExamRow.examsStatus
              ? 0
              : 1
        }
        onChange={(e) => setNewExamRow({ ...newExamRow, examsStatus: e.target.value == 0 ? true : e.target.value == 1 ? false : null })}
      >
        <option value={2}>ממתין לאישור</option>
        <option value={0}>מאושר</option>
        <option value={1}>נדחה</option>
      </select>
    </TableCell>
    <TableCell >
      <input style={{ textAlign: "center", width: '80px' }}
        disabled={newExamRow.examsStatus !== true}
        name="grade" type="text" value={newExamRow.grade}
        onChange={(e) => setNewExamRow({ ...newExamRow, 'grade': e.target.value })}
      />
    </TableCell>
    <TableCell>
      <input style={{ textAlign: "center", width: '80px' }} name="class" type="text" value={newExamRow.class}
        onChange={(e) => setNewExamRow({ ...newExamRow, 'class': e.target.value })}
      />
    </TableCell>
    <TableCell style={{ textAlign: "center", backgroundColor: 'transparent', textDecoration: 'none' }} component="th" scope="row">
      {newExamRow.idDueDateNavigation.description}
    </TableCell>
    <TableCell style={{ textAlign: "center", backgroundColor: 'transparent', textDecoration: 'none' }} component="th" scope="row">

      <span>{new Date(newExamRow.idDueDateNavigation.dueDate1).toLocaleDateString()}</span>
    </TableCell>

    <TableCell style={{ textAlign: "center", backgroundColor: 'transparent', textDecoration: 'none' }} component="th" scope="row">
      {newExamRow.idDueDateNavigation?.idExamNavigation?.subjects}
    </TableCell>


  </TableRow>

};

export default ExamsForOfficePopUpRow;
