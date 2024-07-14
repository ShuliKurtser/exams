import React, { useEffect, useState } from "react";
import { GetExamsForUser } from "../utils/ExamsUser";
import { GetPersonRelief } from "../utils/ReliefUser";
import { GetRegistationDate } from "../utils/RegistationDate";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUnLoggedUser } from "../features/userSlice";
import styles from './css/PrivateArea.module.css';
import Swal from 'sweetalert2';
import ViewPdf from './ViewPdf';

const PrivateArea = () => {
  const [examsUser, setExamsUser] = useState([]);
  const [reliefUser, setReliefUser] = useState([]);
  const [examEndDate, setExamEndDate] = useState({});
  const [examStartDate, setExamStartDate] = useState({});
  const logedUser = useSelector((state) => state.user.logedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const idUser = logedUser?.idUser;
      const res = await GetExamsForUser(idUser);
      const res1 = await GetPersonRelief(idUser);
      setExamsUser(res);
      setReliefUser(res1);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    if (logedUser?.idUser) {
      fetchData();
    }
  }, [logedUser]);

  const handleLogOut = () => {
    dispatch(setUnLoggedUser());
    navigate("/signIn");
  };

  useEffect(() => {
    GetRegistationDate().then((res) => {
      setExamStartDate(res.startDate);
      setExamEndDate(res.endDate);
    });
  }, []);

  const addExam = () => {
    const today = new Date();
    if (new Date(examEndDate) < today) {
      Swal.fire({
        title: 'הודעה',
        text: 'ההרשמה נסגרה נתראה בע"ה במועד הבא',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    } else if (new Date(examStartDate) > today) {
      Swal.fire({
        title: 'הודעה',
        text: 'ההרשמה טרם נפתחה',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    } else {
      navigate("/Exams");
    }
  };

  const addRelief = () => {
    const today = new Date();
    if (new Date(examEndDate) < today) {
      Swal.fire({
        title: 'הודעה',
        text: 'ההרשמה למועד זה נסגרה, נתראה בע"ה במועד הבא',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    } else if (new Date(examStartDate) > today) {
      Swal.fire({
        title: 'הודעה',
        text: 'ההרשמה טרם נפתחה',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    } else {
      navigate("/relief");
    }
  };
   

  return (
    <div style={{marginRight:"20px", marginLeft:"20px"}}>
      <h1 className={styles.title}>אזור אישי</h1>
      <h3 className={styles.secondTitle}>רשימת בחינות</h3>
      <div className={styles.wrapArea}>
        <table>
          <thead>
            <tr>
              <th className={styles.textDecoration}>סטטוס הבחינה</th>
              <th className={styles.textDecoration}>ציון</th>
              <th className={styles.textDecoration}>כיתה</th>
              <th className={styles.textDecoration}>עלות הבחינה</th>
              <th className={styles.textDecoration}>שעת הבחינה</th>
              <th className={styles.textDecoration}>תאריך הבחינה</th>
              <th className={styles.textDecoration}>שם הבחינה</th>
            </tr>
          </thead>
          <tbody>
            {examsUser.length > 0 ? examsUser.map((exam, index) => (
              <tr key={index}>
                <td>
                  {exam.examsStatus === true ? "מאושר" :
                    exam.examsStatus === false ? "נדחה" :
                      "ממתין לאישור"}
                </td>
                <td>{exam.grade}</td>
                <td>{exam.class}</td>
                <td>{exam.idDueDateNavigation.cost}</td>
                <td>{exam.idDueDateNavigation.time}</td>
                <td>
  {exam.idDueDateNavigation?.description && (
    <span>
      {exam.idDueDateNavigation.description} - {new Date(exam.idDueDateNavigation.dueDate1).toLocaleDateString()}
    </span>
  )}
</td>          
                <td>{exam.idDueDateNavigation?.idExamNavigation.subjects}</td>
              </tr>
            )) : <tr><td colSpan="7">לא נמצאו בחינות😒</td></tr>}
          </tbody>
        </table>
      </div>
      <br />
      <div className={styles.tableDivider}></div>
      <h3 className={styles.secondTitle}>רשימת הקלות</h3>
      <div className={styles.wrapArea}>
        <table>
          <thead>
            <tr>
              <th className={styles.textDecoration}>קובץ הקלה</th>
              <th className={styles.textDecoration}>סטטוס הקלה</th>
              <th className={styles.textDecoration}>סיבה להקלה</th>
              <th className={styles.textDecoration}>סוג הקלה</th>
            </tr>
          </thead>
          <tbody>
            
            {reliefUser.length > 0 ? reliefUser.map((relief, index) => (
              <tr key={index}>
                <td>
                  {relief?.reliefFile && relief?.reliefFile !== '' &&
                    <ViewPdf index={relief.idUser} pdfRef={relief?.reliefFile}></ViewPdf>}
                </td>
                <td>
                  {relief.reliefStatus === true ? "מאושר" :
                    relief.reliefStatus === false ? "נדחה" :
                      "ממתין לאישור"}
                </td>
                <td>{relief?.idReliefReasonsNavigation?.reasons}</td>
                <td>{relief?.idReliefTypesNavigation?.reliefTypes}</td>
              </tr>
            )) : <tr><td colSpan="4">לא נמצאו הקלות😒</td></tr>}
          </tbody>
        </table>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <Link className={styles.button} to="/PersonalDetails">פרטים אישיים</Link>
        </button>
        <button className={styles.button} onClick={addExam}>להרשמה לבחינה</button>
        <button className={styles.button} onClick={addRelief}>להוספת הקלה</button>
        <button className={styles.button} onClick={handleLogOut}>יציאה</button>
      </div>
    </div>
  );
};

export default PrivateArea;

