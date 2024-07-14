import React, { useEffect, useState } from "react";
import { GetAllReliefType, GetallReliefReason, AddRealif_User, GetPersonRelief } from "../utils/ReliefUser";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import style from './css/Relief.module.css';
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

function Relief() {
  const [file, setFile] = useState(null);
  const [Progresspercent, setProgresspercent] = useState(0);
  // מערך שיגיע מהקריאת שרת את כל סיבות ההקלה שקיימות
  const [reliefReason, setReliefReason] = useState([]);
  // משתנה שמכיל בתוכו איזה סיבת הקלה המשתמש בחר מהרשימה - בהתחלה זה יהיה -1 כי הוא לא בחר כלום
  const [selectedReliefReason, setSelectedReliefReason] = useState(-1);
  // מערך שיגיע מהקריאת שרת את כל סוגי ההקלות שקיימות
  const [reliefType, setReliefType] = useState([]);
  // משתנה שמכיל בתוכו איזה סוג הקלה המשתמש בחר מהרשימה - בהתחלה זה יהיה -1 כי הוא לא בחר כלום
  const [selectedReliefType, setSelectedReliefType] = useState(-1);
  // משתנה ששמור שם פרטי המשתמש המחובר - ובשורה הזאת אנחנו מביאים אותו מהאובייקט הגלובלי - רידקס
  const logedUser = useSelector((state) => state.user.logedUser);
  // מערך שיכיל את כל ההקלות שהמשתמש בחר להוסיף - זה יכנס למערך הזה לאחר שלחץ על הוספת הקלה
  const [reliefs, setReliefs] = useState([]);
  // const [reliefsForUser, setReliefsForUser] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState(null);
  const [reliefFile, setReliefFile] = useState();
  const [userReliefs, setUserReliefs] = useState([])
  // עם מערך ריק- פונקציה של ריאקט 
  // מתבצעת פעם אחת כשהקומפוננטה נטענת - אפשר לכתוב בתוכו כל קוד שאת רוצה שיהיה לך בתחילת הקומפוננטה
  // שתוכלי להציג נתונים למשתמש - מקריאת שרת וכו....
  useEffect(() => {
    GetAllReliefType().then((res) => {
      setReliefType(res);
    });

    GetallReliefReason().then((res) => {
      setReliefReason(res);
    });
  }, []);

  useEffect(() => {
    if (logedUser) {
      GetPersonRelief(logedUser?.idUser)
        .then(res => setUserReliefs(res));

    }
  }, [logedUser])

  const handleAddUserRelief = async (e) => {
    e.preventDefault();
    let _reliefs = [...reliefs];


    debugger;
    AddRealif_User(_reliefs)
      .then((response) => {
        console.log("הפוסט הצליח:", response);
        navigate("/PrivateArea");
      })
      .catch((error) => {
        console.error("שגיאה בפוסט:", error);
      });

  };

  const handleClickReset = () => {
    setSelectedReliefReason(-1);
    setSelectedReliefType(-1);
  };

  const uploadFile = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    let type = file.type.split('/')[1];
    const fileUrl = `files/relief_File_${uuidv4().slice(0, 8)}.${type}`;

    setReliefFile({ ...reliefFile, filePath: fileUrl });

    const storageRef = ref(storage, fileUrl);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }


  const isReliefExist = (selectedReliefType, selectedReliefReason) => {
    let idReliefTypes = reliefType[selectedReliefType].idReliefTypes;
    let idReliefReasons = reliefReason[selectedReliefReason].idReliefReasons;
    const existReliefs = [...reliefs, ...userReliefs]
    return existReliefs.findIndex(reliefA => reliefA.idReliefTypes == idReliefTypes
      && reliefA.idReliefReasons == idReliefReasons) >= 0;
  }


  const handleAddAnotherRelief = () => {
    debugger;
    // נותנת לו להוסיף הקלה רק אם הוא בחר סוג הקלה וסיבת הקלה
    if (selectedReliefType >= 0 && selectedReliefReason >= 0) {
      if (!reliefFile || reliefFile.filePath == null) {
        Swal.fire({
          title: 'הודעה',
          text: 'יש לצרף קובץ',
          icon: 'warning',
          confirmButtonText: 'אישור'
        });
        return;
      }

      let idReliefTypes = reliefType[selectedReliefType].idReliefTypes;
      let idReliefReasons = reliefReason[selectedReliefReason].idReliefReasons;

      let index = reliefs.findIndex(
        (reliefA) => reliefA.idReliefTypes === idReliefTypes && reliefA.idReliefReasons === idReliefReasons
      );

      if (index >= 0) {
        Swal.fire({
          title: 'הודעה',
          text: 'לא ניתן להוסיף סוג הקלה וסיבת הקלה פעמיים',
          icon: 'warning',
          confirmButtonText: 'אישור'
        });
      } else if (isReliefExist(selectedReliefType, selectedReliefReason)) {
        Swal.fire({
          title: 'הודעה',
          text: 'כבר קיימת לך הקלה מסוג ומסיבה זו ',
          icon: 'warning',
          confirmButtonText: 'אישור'
        });
      } else {
        // יוצרת אובייקט תואם למה שהשרת מצפה לקבל - כדי שיוכל להצליח להוסיף את ההקלה
        // יוצרת את האובייקט לפי המשתמש המחובר וסוג הקלה והסיבה שהמשתמש בחק
        let addRelief = {
          idUser: logedUser?.idUser,
          idReliefTypes: reliefType[selectedReliefType].idReliefTypes,
          idReliefReasons: reliefReason[selectedReliefReason].idReliefReasons,
          ReliefExplanation: "",
          // ReliefStatus: false,
          ReliefFile: reliefFile.filePath,
        };

        // מעתיקה את המערך הקודם - כי יכול להיות שיש לו כבר הקלות שהוא בחר מקודם
        let _reliefs = [...reliefs];
        // מוסיפה את ההקלה החדשה
        _reliefs.push(addRelief);
        setReliefs(_reliefs);
        // ומאפסת את הבחירה של הסיבה והסוג הקלה
        setSelectedReliefReason(-1);
        setSelectedReliefType(-1);


      }
    } else {
      Swal.fire({
        title: 'הודעה',
        text: 'יש לבחור סוג הקלה וסיבת הקלה',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
    }
  };
  const handleDeleteRelief = (index) => {
    let _reliefs = [...reliefs];

    _reliefs.splice(index, 1);
    setReliefs(_reliefs);
  }

  return (
    <div className={style.wrapDetails} >
      <h1>הקלות</h1>
      <div className={style.container}
      >

        <select className={style.option}

          name="reliefType"
          onChange={(e) => setSelectedReliefType(e.target.value)}
          value={selectedReliefType}

        >
          <option className={style.option} value={-1} disabled>
            <p> בחר סוג הקלה</p>
          </option>
          {reliefType.map((relief, index) => (
            <option key={relief.idReliefTypes} value={index}>
              {relief.reliefTypes}
            </option>
          ))}
        </select>


        <select className={style.option}
          name="reliefReason"
          onChange={(e) => setSelectedReliefReason(e.target.value)}
          value={selectedReliefReason}
        >
          <option className={style.option} value={-1} disabled>
            בחר סיבה להקלה
          </option>
          {reliefReason.map((relief, index) => (
            <option key={relief.idReliefReasons} value={index}>
              {relief.reasons}
            </option>
          ))}

        </select>

        <button className={style.button} onClick={handleClickReset}>אפס</button>

      </div>

      <div>

        <h3>צרופה עבור בקשה להקלות</h3>
        <div className="Reliefs">
          <form onSubmit={(e) => uploadFile(e)}>
            <input accept="image/*,.pdf" type="file" className="input" />
            <button className={style.button} type='submit'>העלאת קובץ </button>
          </form>



          <h3>העלאה{Progresspercent}%</h3>
        </div>


      </div>
      <button className={style.button2}
        onClick={handleAddAnotherRelief}>לחץ להוספת הקלה</button>

      <table >
        <thead >
          <tr>
            <th className={style.table}>סוג הקלה</th>
            <th className={style.table} >סיבת הקלה</th>



          </tr>
        </thead>
        <tbody>
          {reliefs.map((relief, index) => (
            <tr key={index}>
              <td>
                {reliefType.find((r) => r.idReliefTypes === relief.idReliefTypes).reliefTypes}
              </td>
              <td>
                {/* עובר על מערך של כל הסיבות ומחפש את המזהה סיבה כדי לקחת את השם של הסיבה
                  כי אנחנו שומרות רק את המזהה במערך של ההקלות*/}
                {reliefReason.find((r) => r.idReliefReasons === relief.idReliefReasons).reasons}
              </td>

              <td>
                <IconButton onClick={() => handleDeleteRelief(index)}>
                  <ClearIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={`${style.button2} ${reliefs.length == 0 ? style.disabled : ''}`} onClick={handleAddUserRelief} disabled={reliefs.length == 0}>לסיום</button>



    </div>
  );
}




export default Relief;

