import React, { useState, useEffect } from "react";
import { GetPersonalDetailsEmp } from "../utils/PersonalDetails";
import { setLoggedUser, setUnLoggedUser } from "../features/userSlice";
// import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Id, firstName, lastName, email, password, permission) {
  return { Id, firstName, lastName, email, password, permission };
}

function AddAnEmploee() {
  const [empDetails, setEmpDetails] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    GetPersonalDetailsEmp().then((res) => {
      setEmpDetails(res);
    });
  }, []);

  const handleAddEmp = () => {
    // dispatch(setUnLoggedUser()) 
    // ניווט בלי סלש - משרשר את מה שכתוב לכתובת הנוכחית שאנחנו נמצאים
    navigate("NewEmploee");
  };

  const handleLogOut = () => {
    dispatch(setUnLoggedUser());
    navigate("/");
  }

  return (
    <>
      <h2 style={{ color: "rgb(17, 17, 96)", fontWeight: "bold", fontSize: "25px" }}>רשימת עובדים ומנהלים</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >תעודת זהות </TableCell>
              <TableCell align="center">שם פרטי</TableCell>
              <TableCell align="center">שם משפחה</TableCell>
              <TableCell align="center">דואר אלקטרוני</TableCell>
              <TableCell align="center">סיסמא</TableCell>
              <TableCell align="center">הרשאה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {empDetails.map((emprow) => (
              <TableRow
                key={emprow.identityNum}
                sx={{ '&:lafirstNamest-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ backgroundColor: 'transparent', textDecoration: 'none' }} component="th" scope="row">
                  {emprow.identityNum}
                </TableCell>
                <TableCell align="center">{emprow.firstName}</TableCell>
                <TableCell align="center">{emprow.lastName}</TableCell>
                <TableCell align="center">{emprow.email}</TableCell>
                <TableCell align="center">{emprow.userPassword}</TableCell>
                <TableCell align="center">
                  {emprow.permission === 1 ? "נבחן" :
                    emprow.permission === 2 ? "עובד" :
                      emprow.permission === 3 ? "מנהל" :
                        ""}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <button onClick={handleAddEmp}>הוספת עובד/מנהל</button>

      <button onClick={handleLogOut}>יציאה</button>



    </>
  );
}
export default AddAnEmploee;