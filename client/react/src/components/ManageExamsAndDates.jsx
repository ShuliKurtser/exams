import React, { useEffect, useState } from "react";
import { UpdateDate, GetRegistationDate } from "../utils/RegistationDate";
import style from './css/ManageExamsAndDates.module.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';



function ManageExamsAndDates() {
  const [dates, setDates] = useState({});

  useEffect(() => {
    GetRegistationDate().then((data) => {
      setDates(data);
    });
  }, []);




  const handleChangeDates = (event) => {
    let { name, value } = event.target;
    let _dates = { ...dates };
    _dates[name] = value;
    setDates(_dates);
  };


  const handleUpdateUserData = () => {
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);

    if (startDate <= endDate) {
      UpdateDate(dates)
        .then(response => {
          console.log('העדכון הצליח:', response);
          Swal.fire({
            title: 'הודעה',
            text: 'העדכון הצליח ',
            icon: 'success',
            confirmButtonText: 'אישור'
          });
        })
        .catch(error => {
          console.error('שגיאה בפוסט:', error);
          setDates(dates);
        });
    } else {
      Swal.fire({
        title: 'הודעה',
        text: 'תאריך תחילת רישום חייב להיות לפני תאריך סיום רישום',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    }
  };

  return (
    <>
      <h1 className={style.h1}>עדכוני מערכת</h1>
      <div className={style.body}>
        <span style={{ fontWeight: "bold", color: "rgb(17, 17, 96)", textDecoration: "underline" }}> עדכון תאריכי הרשמה לבחינה:</span>

        <br />
        <label htmlFor="startDate"> תאריך תחילת רישום:</label>
        <input
          name="startDate"
          type="date"
          value={dates?.startDate}
          onChange={handleChangeDates}
        />
        <label htmlFor="endDate"> תאריך סיום רישום:</label>
        <input
          name="endDate"
          type="date"
          value={dates?.endDate}
          onChange={handleChangeDates}
        />

        <button onClick={handleUpdateUserData}> לחץ לעדכון</button>
      </div>

      <button className={style.body}>
        <Link className="Link" to="/AddExams">עדכון סוגי בחינות </Link>
      </button>


      <button className={style.body}>
        <Link className="Link" to="/ForOfficeUse">ניהול בחינות </Link>
      </button>

    </>


  );
}
export default ManageExamsAndDates;
