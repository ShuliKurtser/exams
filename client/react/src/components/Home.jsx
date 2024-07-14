import React, { useEffect, useState } from "react";
import style from './css/Home.module.css';
import { GetRegistationDate } from "../utils/RegistationDate";
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { updateExamDates } from "../utils/updateExamText";
import { getAllDueDate } from "../utils/dueDate";
import _ from 'lodash';

const StyledBackground = styled.div`
  background-image: url('images/rab.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #333;
  padding: 20px;
`;

function Home() {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [date, setDate] = useState(null);
  const [dueDate, setDueDate] = useState([]);
  
  useEffect(() => {
    getAllDueDate().then(res => {
      const filteredData = res.data.filter(item => item.status === true);
      const groupedData = _.values(_.groupBy(filteredData, 'dueDate1'));
      setDueDate(groupedData);
    });

    GetRegistationDate().then((data) => {
      setDate(data);
    });
  }, []);

  return (
    <StyledBackground>
      <div className={style.contactContainer}>
        <div className={style.headerContainer}>
          <h1 className={style.title}>מכון להוראה תורנית</h1>
          <h2 className={style.subtitle}>הרשמה לבחינות</h2>
        </div>
        <div className={style.contentContainer}>
          <div className={style.textContainer}>
            <p>אתר זה מיועד לכל אזרח מעל גיל 21 אשר מעוניין לגשת לבחינות שנערכות ע"י המכון להוראה תורנית</p>
            <p>נשים יכולות להרשם אך ורק לבחינות בנושא משגיחי כשרות.</p>
            <h2 className={style.subtitle}>{`תאריכי בחינות`}</h2>
            
            {dueDate.map((group, index) => (
              <div 
              key={index} style={{ display: 'flex', flexDirection: 'row' }}>
           <span style={{ fontWeight: 500 }}>
  {new Date(group[0].dueDate1).toLocaleDateString()} - 
</span>
                <span style={{ fontWeight: 500 }}> {group[0].description} - </span>
                <p>
                  {group.map((item, i) => (
                    <span key={item.id}>
                      {item.idExamNavigation?.subjects }
                      {i < group.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>
            ))}

            <h2 className={style.subtitle}>לתשומת לבכם לא ניתן להירשם לשני נושאי בחינה באותו יום!</h2>

            <p>פתיחת הרשמה:
              {date != null && <span>{new Date(date.startDate).toLocaleDateString()} </span>}
            </p>

            <p>סגירת הרשמה:
              {date != null && <span>{new Date(date.endDate).toLocaleDateString()}</span>}
            </p>
            <h2 className={style.subtitle}>הבחינות יתקיימו אי"ה במעוננו רח' חבצלת 12, ירושלים</h2>
          </div>
        </div>
      </div>
    </StyledBackground>
  );
}

export default Home;

