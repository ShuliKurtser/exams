import { Box, Collapse, Dialog, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { updateUserExam } from '../utils/ExamsUser';
import PdfLinkView from './ViewPdf';
import ReliefForOfficePopUpRow from './ReliefForOfficePopUpRow';

const ReliefForOfficePopUp = (props) => {
  const { open, onClose, reliefsUsers, setReliefsUsers, onChangeRelief } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} midWidth={true} maxWidth={false}>
      <DialogTitle>הקלות</DialogTitle>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0, }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {reliefsUsers.length > 0 ?
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">

                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'>קובץ הקלה</TableCell>
                      <TableCell align='center'>סטטוס הקלה</TableCell>
                      <TableCell align='center'>סיבת הקלה</TableCell>
                      <TableCell align='center'  > סוג הקלה</TableCell>




                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reliefsUsers.map((examsRow, index) => (
                      <ReliefForOfficePopUpRow
                        index={index}
                        examsRow={examsRow}
                        setReliefsUsers={setReliefsUsers}
                        reliefsUsers={reliefsUsers}
                        onChangeRelief={onChangeRelief}
                      ></ReliefForOfficePopUpRow>
                    ))}

                  </TableBody>
                </Table>
              </Box>
              : <span>לא קיימות הקלות</span>}
          </Collapse>
        </TableCell>
      </TableRow>
    </Dialog>
  );
}

export default ReliefForOfficePopUp;