import { Box, Collapse, Dialog, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { updateUserExam } from '../utils/ExamsUser';
import ExamsForOfficePopUpRow from './ExamsForOfficePopUpRow'


const ExamsForOfficePopUp = (props) => {
  const { open, onClose, examsUsers, onChange } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (

    <Dialog onClose={handleClose} open={open} midWidth={true} maxWidth={false}>
      <DialogTitle>בחינות</DialogTitle>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0, }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {examsUsers.length > 0 ?
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">

                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">סטטוס</TableCell>
                      <TableCell align="center">ציון</TableCell>
                      <TableCell align="center">כיתה</TableCell>
                      <TableCell align="center">מועד בחינה</TableCell>
                      <TableCell align="center">תאריך בחינה</TableCell>
                      <TableCell align="center">נושא בחינה</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examsUsers.map((examsRow, index) => (
                      <ExamsForOfficePopUpRow
                        onChange={onChange}
                        examsRow={examsRow}
                        examsUsers={examsUsers}
                        index={index}
                        handleClose={handleClose}
                      ></ExamsForOfficePopUpRow>
                    ))}

                  </TableBody>
                </Table>
              </Box>
              : <span>לא קיימים מבחנים</span>}
          </Collapse>
        </TableCell>
      </TableRow>
    </Dialog>
  );
}

export default ExamsForOfficePopUp;