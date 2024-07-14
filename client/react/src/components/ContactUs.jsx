
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import FaxIcon from '@mui/icons-material/Fax';
import EmailIcon from '@mui/icons-material/Email';
import style from './css/ContactUs.module.css';
import styled from 'styled-components';//npm install styled-components


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

function ContactUs() {
  return (
    <StyledBackground >
      <div className={style.contactContainer}>
        <div className={style.headerContainer}>
          <h1 className={style.title}>צור קשר</h1>
          <h2 className={style.subtitle}>אנחנו פתוחים מא-ה בין השעות 8:00-16:00</h2>
        </div>
        <div className={style.contentContainer}>
          <div className={style.textContainer}>
            <div className={style.row}>
              <div className={style.iconWrapper}>
                <span className={style.icon}>
                  <PhoneIcon style={{ fontSize: 25 }} />
                </span>
                <span className={style.text}>טלפון: 02-6214840</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.iconWrapper}>
                <span className={style.icon}>
                  <FaxIcon style={{ fontSize: 25 }} />
                </span>
                <span className={style.text}>פקס: 02-6214860</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.iconWrapper}>
                <span className={style.icon}>
                  <EmailIcon style={{ fontSize: 25 }} />
                </span>
                <span className={style.text}>דואר אלקטרוני: oraatoranit@oraa.org.il</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.iconWrapper}>
                <span className={style.icon}>
                  <LocationOnIcon style={{ fontSize: 25 }} />
                </span>
                <span className={style.text}>כתובת: רחוב הצבעונית 12, ירושלים</span>
              </div>
            </div>
          </div>
          <div className={style.mapContainer}>
            <img className={style.mapImage} src="/images/map1.png" alt="Map" />
          </div>
        </div>
      </div>
      {/* </div> */}
    </StyledBackground>
  );
}

export default ContactUs;
