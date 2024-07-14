import React, { useEffect, useState } from "react";
// import { GetExamsForUser } from "../utils/ExamsUser";
import { GetPersonalDetailsTesters } from "../utils/PersonalDetails";
import { GetAllPersonalReliefTypesTesters } from "../utils/PersonalDetails";
import { GetAllPersonalReliefReasonsTesters } from "../utils/PersonalDetails";
import { updateUserExam } from "../utils/ExamsUser";
import { GetAllPersonDetailsById } from '../utils/PersonalDetails';
import style from './css/ForOfficeUse.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setLoggedUser, setUnLoggedUser } from "../features/userSlice";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { yearsToMonths } from "date-fns";
import ExamsForOfficePopUp from "./ExamsForOfficePopUp";
import { Button } from "@mui/material";
import ReliefForOfficePopUp from "./ReliefForOfficePopUp";
import ViewPdf from './ViewPdf';
import PersonalDetailsForOfficePopUp from "./PersonalDetailsForOfficePopUp";
import ForOfficeUseRow from './ForOfficeUseRow'
import SwapVertIcon from '@mui/icons-material/SwapVert';

function createData(firstName, lastName, identityNum) {
  return {
    identityNum,
    firstName,
    lastName,
  };
}
function createRelief(reliefTypes, reasons, reliefExplanation, reliefStatus) {
  return {
    reliefTypes,
    reasons,
    reliefExplanation,
    reliefStatus,
  }
}



// כאן מתחיל הקומפוננטה
function ForOfficeUse() {
  const [personalDetailsTesters, setPersonalDetailsTesters] = useState([]);
  const [PersonalTypeRelief, setPersonalTypeRelief] = useState([]);
  const [examDetails, setexamDetails] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [openExam, setOpenExam] = useState(false);
  const [openRelief, setOpenRelief] = useState(false);
  const [examsUsers, setExamsUsers] = useState([]);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [Users, setUsers] = useState();
  const [reliefsUsers, setReliefsUsers] = useState([]);
  const logedUser = useSelector(state => state.user.logedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterId, setFilterId] = useState('');
  const [filterIdentityNum, setFilterIdentityNum] = useState('');
  const [filterLastName, setFilterLastName] = useState('');


//פונציה שמביאה אך ורק את הנבחנים לפי הרשאה 1
  useEffect(() => {
    GetPersonalDetailsTesters().then((res) => {
      setPersonalDetailsTesters(res);
    });
  }, []);

   
  const handleClose = () => {
    setOpenExam(false);
  };
//מחפש אם המזהה של המשתמש שווה למזהה יש בבחינה ואז מעדכן את טבלאות בחינות והקלות
//הפונקציה onChange מתבצעת על מנת לעדכן פרטים של משתמש במערך של משתמשים. היא מעתיקה את המערך המקורי, מחפשת את המשתמש לפי ה-userId, ואם היא מוצאת אותו, היא מעדכנת את הנתונים המתאימים ומעדכנת את ה-state.

  const onChange = (userId, updateedExamUser, examUserIndex) => {
    debugger;
    const _personalDetailsTesters = [...personalDetailsTesters];
    let userIndex = _personalDetailsTesters.findIndex(p => p.idUser == userId);
    if (userIndex > -1) {

      _personalDetailsTesters[userIndex].examsUsers[examUserIndex] = updateedExamUser;
      setPersonalDetailsTesters(_personalDetailsTesters)
    }
  }

  const onChangeRelief = (userId, updateedReliefUser, reliefUserIndex) => {
    debugger;
    const _personalDetailsTesters = [...personalDetailsTesters];
    let userIndex = _personalDetailsTesters.findIndex(p => p.idUser == userId);
    if (userIndex > -1) {

      _personalDetailsTesters[userIndex].reliefUsers[reliefUserIndex] = updateedReliefUser;
      setPersonalDetailsTesters(_personalDetailsTesters)
    }
  }

  const handleLogOut = () => {
    dispatch(setUnLoggedUser());
    navigate("/signIn");
  }
  const handleAddEmp = () => {
    dispatch(setUnLoggedUser());
    navigate("/AddAnEmploee");
  }

  const handleFilter = () => {
    const filteredUsers = personalDetailsTesters.filter((user) => {
      const matchIdentityNum = user.identityNum.includes(filterIdentityNum);
      const matchLastName = user.lastName.includes(filterLastName);
      return matchIdentityNum && matchLastName;
    });
    setPersonalDetailsTesters(filteredUsers);
  };

  const handleResetFilter = () => {
    setFilterIdentityNum('');
    setFilterLastName('');
    GetPersonalDetailsTesters().then((res) => {
      setPersonalDetailsTesters(res);
    });
  };

  const sortArray = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...personalDetailsTesters].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setPersonalDetailsTesters(sortedData);

  };
  
  const filteredDetailsTesters = filterId
    ? personalDetailsTesters.filter((tester) => tester.identityNum === filterId)
    : personalDetailsTesters;
  return (
    <>
    <h1 className={style.h1}>ניהול בחינות</h1>
      <input
        type="text"
        value={filterIdentityNum}
        onChange={(e) => setFilterIdentityNum(e.target.value)}
        placeholder="הזן מס' תעודת זהות לסינון"
      />
      <input
        type="text"
        value={filterLastName}
        onChange={(e) => setFilterLastName(e.target.value)}
        placeholder="הזן שם משפחה לסינון"
      />
      <button style={{ width: '100px', height: '40px' }} onClick={handleFilter}>סנן</button>
      <button style={{ width: '100px', height: '40px' }} onClick={handleResetFilter}>אפס סינון</button>



      <TableContainer component={Paper} dir="ltr">
        <Table aria-label="collapsible table">

          <TableRow>
            <TableCell />
            <TableCell align="right">קובץ אישור לימודים</TableCell>
            <TableCell align="right">קובץ ת"ז</TableCell>
            <TableCell align="right" onClick={() => sortArray('lastName')}>
              <SwapVertIcon></SwapVertIcon>
              שם משפחה</TableCell>
            <TableCell align="right" onClick={() => sortArray('firstName')}>
              <SwapVertIcon></SwapVertIcon>
              שם פרטי</TableCell>
            <TableCell align="right">מס' תעודת זהות</TableCell>
          </TableRow>

          <TableBody>
            {personalDetailsTesters.map((row, index) => (
              <ForOfficeUseRow key={row.idUser} row={row}
                openExam={openExam} setOpenExam={setOpenExam}
                setExamsUsers={setExamsUsers}
                openRelief={openRelief}
                reliefsUsers={reliefsUsers}
                setOpenRelief={setOpenRelief} setReliefsUsers={setReliefsUsers}
                openUserDetails={openUserDetails} setOpenUserDetails={setOpenUserDetails} setUserDetails={setUserDetails}
              />

            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {logedUser?.permission == 3 && <button>
        <Link className="Link" to="/AddAnEmploee">רשימת עובדים/מנהלים</Link>
      </button>}

      <button >
        <Link className="Link" to="/PersonalDetails"> עדכון פרטי עובד</Link>
      </button>
      <button onClick={handleLogOut}>יציאה</button>
      {/* <button onClick={handleUpdateUserExamData}>עדכון</button> */}
      {/* <button onClick={handleAddEmp}>הוספת עובד</button> */}
      <ExamsForOfficePopUp
        open={openExam}
        onClose={setOpenExam}
        examsUsers={examsUsers}
        onChange={onChange}
        handleClose={handleClose}
      />
      <ReliefForOfficePopUp open={openRelief} onClose={setOpenRelief}
        onChangeRelief={onChangeRelief}
        reliefsUsers={reliefsUsers} setReliefsUsers={setReliefsUsers} />
      <PersonalDetailsForOfficePopUp open={openUserDetails} onClose={setOpenUserDetails} userDetails={userDetails} />
    </>

  );

}

export default ForOfficeUse;
