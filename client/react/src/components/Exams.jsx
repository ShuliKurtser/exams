import React, { useEffect, useState } from "react";
import { GetExams } from "../utils/Exams";
import { Add, AddExams } from "../utils/ExamsUser";
import { GetExamsForUser } from "../utils/ExamsUser";
import { GetAllPersonDetailsById } from "../utils/PersonalDetails"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../features/userSlice";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import { date } from "yup";
import PersonalDetails from "./PersonalDetails";
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import style from './css/Exams.module.css';
import Swal from 'sweetalert2';


function Exams() {
  const [imgUrl, setImgUrl] = useState(null);
  const [Progresspercent, setProgresspercent] = useState(0);
  const [exams, setExams] = useState([]);
  const [dueDates, setDueDates] = useState([]);
  const [examsForUser, setExamsForUser] = useState([]);
  const [examsForUser1, setExamsForUser1] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState([]);
  const [selectedExamIndex, setSelectedExamIndex] = useState(-1);
  const [selectedDueDateIndex, setselectedDueDateIndex] = useState(-1);
  const [examsSum, setExamsSum] = useState(0);
  const logedUser = useSelector((state) => state.user.logedUser);
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState(false);



  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    GetExams().then((res) => {
      const filteredExam = logedUser?.gender !== "נקבה" ? res : res.filter(item => item.subjects === "משגיחי כשרות")
      setExams(filteredExam);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = logedUser?.idUser;
        const examsForUser1 = await GetExamsForUser(idUser);
        setExamsForUser1(examsForUser1);
      } catch (error) {
        console.error("Error fetching exams:", error);


      }
    };

    fetchData();
  }, [logedUser]); // מאזין לשינוי ב־logedUser כדי להפעיל את ה־useEffect בכל פעם שהוא משתנה




  const handleAddUserExam = async (e) => {
    e.preventDefault();

    await AddExams(examsForUser)
      .then((response) => {
        if (response) {
          console.log("הפוסט הצליח:", response);
          navigate("/PrivateArea");
        }
      })
      .catch((error) => {
        console.error("שגיאה בפוסט:", error);
      });

    // }
  };
  const handleAddAnotherExam = () => {
    if ((selectedDueDateIndex < 0) || (selectedExamIndex < 0)) {
      Swal.fire({
        title: 'הודעה',
        text: 'יש לבחור נושא בחינה  ומועד בחינה',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    }
    else {
      const allExams = [...examsForUser, ...examsForUser1]
      let idExam = exams[selectedExamIndex]?.idExam;
      let idDueDate = dueDate?.idDueDate;
      let index = allExams
        .findIndex((exam) => (exam.idExam === idExam
          && exam?.idDueDate === idDueDate));

      if (index >= 0) {
        Swal.fire({
          title: 'הודעה',
          text: '!אין אפשרות להרשם לבחינה זו פעמיים',
          icon: 'warning',
          confirmButtonText: 'אישור'
        });
        return
      }

      let dates = dueDate?.dueDate1;
      let index1 = allExams.findIndex((exam) => exam.dueDate?.dueDate1 === dates);

      if (index1 >= 0) {
        Swal.fire({
          title: 'הודעה',
          text: 'לא ניתן להרשם ליותר מבחינה אחת באותו יום',
          icon: 'warning',
          confirmButtonText: 'אישור'

        });
        return
      }

      let addExam = {
        idUser: logedUser?.idUser,
        idExam: exams[selectedExamIndex].idExam,
        examsStatus: null,
        idDueDate: dueDate?.idDueDate,
        dueDate: dueDate
      };

      setError(false);
      let _examsForUser = [...examsForUser];
      _examsForUser.push(addExam);
      setExamsForUser(_examsForUser);
      setSelectedExamIndex(-1);
      setselectedDueDateIndex(-1);
      // setDueDate(null);
      // הוספת מחיר הבחינה לסך הכללי
      setExamsSum(examsSum + dueDate?.cost ?? 0);

    }
  }

  const handleAddUserExam2 = async (e) => {
    e.preventDefault();
    if ((examsForUser.idExam === 0)) {
      Swal.fire({
        title: 'הודעה',
        text: 'לא נוספו בחינות. יש להוסיף בחינות לפני לחיצה על כפתור להוספת הקלות.',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
      return;
    }

    await AddExams(examsForUser)
      .then((response) => {
        if (response) {
          console.log("הפוסט הצליח:", response);
          navigate("/relief");
        }
      })
      .catch((error) => {
        console.error("שגיאה בפוסט:", error);
      });

    // }
  };
  const handleClickReset = (event) => {
    event.preventDefault();
    setSelectedExamIndex(-1);
    setselectedDueDateIndex(-1);
    setDueDate(null);
  };


  const handleDeleteExam = (index, examUser) => {
    let _examsForUser = [...examsForUser];
    let cost = examUser.dueDate.cost;
    // להוריד את הסכום של הבחינה מהסכום הכולל
    setExamsSum(examsSum - cost);
    // פונקציה שמקבלת 2 פרמטרים:
    // פרמטר ראשון מאיזה מיקום במערך למחוק
    // פרמטר שני כמה פרטים מהמיקום הנוכחי - אז פה את אומרת לו מקום 1 בלבד
    _examsForUser.splice(index, 1);
    setExamsForUser(_examsForUser);
    // }
  }

  const handleChangeDueDate = (e) => {
    setselectedDueDateIndex(e.target.value);
    let dueDateSelect = exams[selectedExamIndex].dueDates.find(d => d?.idDueDate == e.target.value);
    setDueDate(dueDateSelect);
  }


  return (
    <>
      <div className={style.wrapDetails}>
        <h1 >נושא הבחינה</h1>
        <div>

          <form>
            <h2>רשימת נושאי בחינה</h2>
            <select
              className={style.option}
              name="question"
              onChange={(e) => {
                setSelectedExamIndex(e.target.value)
                setselectedDueDateIndex(-1)
              }}
              value={selectedExamIndex}
            >
              <option value={-1} disabled>
                בחר בחינה
              </option>
              {exams.map((exam, index) => (
                <option key={index} label={exam.subjects} value={index}>
                  {exam.subjects}
                </option>
              ))}
            </select>
            <select
              className={style.option}
              name="dueDate"
              onChange={(e) => handleChangeDueDate(e)}
              value={selectedDueDateIndex}
            >
              <option >
                בחר מועד בחינה
              </option>
              {exams[selectedExamIndex]?.dueDates &&
                exams[selectedExamIndex].dueDates.map((due) => (
                  <option key={due.idDueDate} value={due.idDueDate}>
                    {due.description} - <span>{new Date(due.dueDate1).toLocaleDateString()}</span>
                  </option>
                ))}
            </select>


            <button className={style.button} onClick={handleClickReset}>אפס</button>
            <p>מחיר הבחינה: {dueDate?.cost}</p>


          </form>
          <button
            className={style.button}
            // disabled={(selectedDueDateIndex < 0) || (selectedExamIndex < 0)}
            onClick={handleAddAnotherExam}
          >לחץ להוספת בחינה</button>

          <table>
            <thead>
              <tr>
                <th>בחינה </th>
                <th>מועד בחינה</th>
                <th>מחיר בחינה</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* examsForUser - כאן יש את כל הבחינות שהוא הוסיף כרגע בעמוד הנוכחי */}
              {examsForUser.map((examUser, index) => {
                // exams - כל הבחינות שנמצאות במערכת
                let exam = exams.find((e) => e.idExam === examUser.idExam);
                return (
                  <tr key={index}>
                    <td>{exam?.subjects}</td>
                    <td>{examUser.dueDate?.description} - {examUser.dueDate?.dueDate1} </td>
                    <td>{examUser.dueDate?.cost}</td>
                    <td><IconButton onClick={() => handleDeleteExam(index, examUser)}>
                      <ClearIcon />
                    </IconButton></td>
                  </tr>)

              })}
            </tbody>
          </table>
          <br />
          <span>חובה להסדיר את התשלום לפני הגעה לבחינה. </span>
          <span>ללא הצגת קבלה על תשלום לא תתאפשר כניסה  </span>

          <span>סה"כ: {examsSum + ' ש"ח'}</span><br />
          <br />
          <span>אם יש צורך בהקלות יש ללחוץ על כפתור להוספת הקלות אחרת לחץ על סיום</span>

          <br />

          <div className="Exams">

          </div>
          <button
            className={`${style.button} ${examsForUser.length == 0 ? style.disabled : ''}`}
            onClick={handleAddUserExam2}
            disabled={examsForUser.length == 0}>לחץ להוספת הקלות </button>
          <button className={`${style.button} ${examsForUser.length == 0 ? style.disabled : ''}`} onClick={handleAddUserExam} disabled={examsForUser.length == 0}>לסיום</button>



        </div>
      </div>
    </>
  );
}


export default Exams;


