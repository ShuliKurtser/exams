import React, { useEffect, useState } from "react";
import ViewPdf from './ViewPdf';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";
import TableRow from '@mui/material/TableRow';

const ForOfficeUseRow = (props) => {
  const { row,
    openExam,
    setOpenExam,
    setExamsUsers,
    openRelief,
    setOpenRelief,
    setReliefsUsers,
    openUserDetails,
    setOpenUserDetails,
    setUserDetails,
    reliefsUsers,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpenExams = () => {
    setOpenExam(true);
    setExamsUsers(row.examsUsers);
  }
  const handleClickOpenUser = () => {
    setOpenUserDetails(true);
    setUserDetails(row);
  }

  const handleClickOpenRelief = () => {
    setOpenRelief(true);
    setReliefsUsers(row.reliefUsers);
  }

  return (
    <React.Fragment >
      <TableRow sx={{ '& > *': { borderBottom: 'unset', paddingRight: 30 } }}>
        <TableCell align="right">
          <Button variant="text" onClick={() => handleClickOpenUser()}>
            פרטי התקשרות
          </Button>

          <Button variant="text" onClick={() => handleClickOpenRelief()}>
            הקלות
          </Button>
          <Button variant="text" onClick={() => handleClickOpenExams()}>
            בחינות
          </Button>
        </TableCell>

        <TableCell align="right" component="td" scope="row">
          {row?.fileStudyUrl && row?.fileStudyUrl !== '' && <ViewPdf index={row.idUser} pdfRef={row.fileStudyUrl}></ViewPdf>}
        </TableCell>
        <TableCell align="right" component="td" scope="row">
          {row?.fileTzUrl && row?.fileTzUrl !== '' && <ViewPdf index={row.idUser} pdfRef={row.fileTzUrl}></ViewPdf>}
        </TableCell>
        <TableCell align="right" component="td" scope="row">
          {row.lastName}
        </TableCell>
        <TableCell align="right" component="td" scope="row">
          {row.firstName}
        </TableCell>
        <TableCell align="right" component="td" scope="row">
          {row.identityNum}
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}
export default ForOfficeUseRow;