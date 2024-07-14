import { FemaleSharp } from '@mui/icons-material';
import { Box, Collapse, Dialog, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

const PersonalDetailsForOfficePopUp = (props) => {
    const { open, onClose, userDetails } = props;

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={false}>
            <DialogTitle>פרטי התקשרות</DialogTitle>
            <Table>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">

                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">סיסמא</TableCell>
                                            <TableCell align="center">דוא"ל</TableCell>
                                            <TableCell align="center">מיקוד</TableCell>
                                            <TableCell align="center">מספר דירה</TableCell>
                                            <TableCell align="center">מספר בית</TableCell>
                                            <TableCell align="center">עיר</TableCell>
                                            <TableCell align="center">כתובת</TableCell>
                                            <TableCell align="center">טלפון נייד</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userDetails ? (
                                            <TableRow key={userDetails.idUser}>
                                                <TableCell align="center">{userDetails.userPassword}</TableCell>
                                                <TableCell align="center">{userDetails.email}</TableCell>
                                                <TableCell align="center">{userDetails.zip}</TableCell>
                                                <TableCell align="center">{userDetails.number}</TableCell>
                                                <TableCell align="center">{userDetails.houseNum}</TableCell>
                                                <TableCell align="center">{userDetails.city}</TableCell>
                                                <TableCell align="center">{userDetails.street}</TableCell>
                                                <TableCell align="center">{userDetails.phone}</TableCell>

                                            </TableRow>
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center">לא קיימים פרטי משתמש</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Table>
        </Dialog>
    );
}

export default PersonalDetailsForOfficePopUp;


