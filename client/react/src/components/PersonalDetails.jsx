import React, { useEffect, useState, useCallback } from "react";
import styles from './css/PersonalInformation.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { AddPersonalDetailes, UpdatePersonalDetail } from '../utils/PersonalDetails';
import { setLoggedUser } from "../features/userSlice";
import { useDropzone } from 'react-dropzone';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem, Container } from "@mui/material";
import * as yup from 'yup';
import { differenceInYears } from 'date-fns';
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import style from './css/Exams.module.css';
import Swal from 'sweetalert2';
import { checkIdentityExists } from '../utils/PersonalDetails';
import { styled } from '@mui/material/styles';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function PersonalDetails() {
  const [imgUrl, setImgUrl] = useState(null);
  const [Progresspercent, setProgresspercent] = useState(0);
  const [selectedIdIndex, setSelectedIdIndex] = useState(-1)
  const [permissions] = useState([
    { value: 1, label: 'נבחן' },
    { value: 2, label: 'עובד' },
    { value: 3, label: 'מנהל' },
  ]);

  let userEmpty = {
    birthDate: "",
    city: "",
    email: "",
    firstName: "",
    gender: "",
    houseNum: "0",
    identityNum: "",
    lastName: "",
    maritalStatus: "",
    number: "",
    permission: "1",
    phone: "",
    street: "",
    urlFilesId: "",
    userPassword: "",
    zip: "0",
  }
  const logedUser = useSelector(state => state.user.logedUser);
  const [userDetails, setUserDetails] = useState(logedUser == null ? userEmpty : logedUser);
  const [isAdd, setIsAdd] = useState(logedUser == null ? true : false);
  const [isAddEmploee, setIsAddEmploee] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [identityExists, setIdentityExists] = useState(null);
  const isUnder21 = (birthDate) => {
    const age = differenceInYears(new Date(), new Date(birthDate));
    return age < 21;


  };
  const today = new Date();//במקום תאריך של היום להביא לפה את התאריך של סוף הרשמה לבחינה
  const isUser = logedUser?.permission == 1 || logedUser?.permission == null
  const uploadFile = (e, fileName, filePath) => {

    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    let type = file.type.split('/')[1];
    const fileUrl = `files/${fileName}_${uuidv4().slice(0, 8)}.${type}`;


    setUserDetails({ ...userDetails, [filePath]: fileUrl });

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
  console.log(logedUser);


  useEffect(() => {
    if (location.pathname === "/AddAnEmploee/NewEmploee") {
      setUserDetails(userEmpty);
      setIsAddEmploee(true);
    }
  }, []);


  // const YourMessageSchema = yup.object().shape({
  const YourMessageSchema = yup.object({
    identityNum: yup.string().required('שדה חובה').matches(/^\d{9}$/, 'יש להזין 9 ספרות'),
    firstName: yup.string().required('שדה חובה'),
    lastName: yup.string().required('שדה חובה'),
    birthDate: yup.date().required('שדה חובה').max(new Date(today.setFullYear(today.getFullYear() - 21)), 'חובה מעל גיל 21'),
    maritalStatus: yup.string().required('שדה חובה'),
    gender: yup.string().required('שדה חובה'),
    userPassword: yup.string().required('שדה חובה').min(8, 'הסיסמה חייבת לכלול לפחות 8 תווים')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8}$/,
        'הסיסמה חייבת לכלול אות קטנה, אות גדולה, ומספר'),
    email: yup.string().required('שדה חובה').email('יש להזין כתובת דוא"ל חוקית'),
    phone: yup.string().required('שדה חובה').matches(/^([0-9]{10})$/, 'יש להזין טלפון חוקי 10 ספרות'),
    city: yup.string().required('שדה חובה'),
    street: yup.string().required('שדה חובה'),
    houseNum: yup.string().min(0).matches(/^\d{0,4}$/, 'יש להזין מספר דירה עד 4 ספרות'),
    number: yup.string().required('שדה חובה').min(0).matches(/^\d{0,4}$/, 'יש להזין מספר בית עד 4 ספרות'),
    zip: yup.string().min(0).matches(/^\d{0,7}$/, 'יש להזין מיקוד עד 7 ספרות'),
    permission: yup.string().required("שדה חובה"),

  });

  const handleChangeUserDetails = async (event) => {
    event.preventDefault()
    let { name, value } = event.target;
    let _userDetails = { ...userDetails };
    _userDetails[name] = value;

    try {

      await YourMessageSchema.validateAt(name, _userDetails);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: { isErr: false, message: "" } }));
    } catch (validationError) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: { isErr: true, message: validationError.errors } }));
    }
    debugger;
    setUserDetails(_userDetails);

    if (name === 'identitynum') {
      const exists = await checkIdentityExists(value);
      setIdentityExists(exists);

      if (exists) {
        setErrors((prevErrors) => ({ ...prevErrors, identitynum: { isErr: true, message: 'תעודת זהות קיימת במערכת' } }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, identitynum: { isErr: false, message: '' } }));
      }
    }
  };

  const handleAddUserData = () => {
    YourMessageSchema.validate(userDetails, { abortEarly: false })
      .then(() => {
        if (isUser && (!userDetails.fileStudyUrl || !userDetails.fileTzUrl)) {
          Swal.fire({
            title: 'הודעה',
            text: 'יש לצרף קבצים',
            icon: 'warning',
            confirmButtonText: 'אישור'
          });
          return
        }
        AddPersonalDetailes(userDetails)
          .then(response => {
            console.log('Response from API:', response);
            // בדיקה אם ה-API החזיר null שמשמעותו שתעודת הזהות כבר קיימת
            if (!response) {
              Swal.fire({
                icon: 'error',
                title: 'שגיאה',
                text: 'כבר קיים משתמש עם מספר תעודת זהות זה'
              }).then(() => {
                navigate("/signin");
              })

            }
            else {
              dispatch(setLoggedUser(response));
              navigate("/Exams");
            }
          })
          .catch(error => {
            console.error('שגיאה בפוסט:', error);
          });
      })
      .catch(err => {
        console.error('Validation errors:', err);
        let _errors = { ...errors };
        err.inner.forEach((error) => {
          if (error.path !== undefined && _errors[error.path] == undefined) {
            _errors[error.path] = { isErr: true, message: error.errors[0] };
          }

        });
        setErrors(_errors);
      })
  };

  const handleUpdateUserData = () => {

    YourMessageSchema.validate(userDetails, { abortEarly: false })
      .then(() => {
        // If validation passes, update the user details
        UpdatePersonalDetail(userDetails.idUser, userDetails)
          .then(response => {
            // Show success message and update the state with the new user details
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'הפרטים שלך עודכנו בהצלחה'
            }).then(() => {
              dispatch(setLoggedUser(response));

              if (logedUser?.permission == 1) {
                navigate("/PrivateArea");
              }
              else {
                navigate("/ForOfficeUse");
              }
              // עדכון הסטייט או פעולות נוספות לפי הצורך
            });
          })
          .catch(error => {
            console.error('שגיאה בפוסט:', error);
            // טיפול בשגיאה או הצגת הודעת שגיאה למשתמש
          });
      })
      .catch(err => {
        console.log(errors);
        console.error('Validation errors:', err.errors);
        // alert('Validation errors:', errors.errors);

        // טיפול בשגיאה או הצגת הודעת שגיאה למשתמש
      });
  }

  return (

    <React.Fragment >
      <Typography gutterBottom className={styles.title} style={{ marginTop: "20px", width: "100%" }}>
        פרטים אישיים
      </Typography>

      <Container component="main" maxWidth="md">

        <Grid container spacing={3}>

          <Grid item xs={4} >
            <TextField
              required
              id="id"
              name="identityNum"
              label="תעודת זהות"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.identityNum}

              error={Boolean(errors.identityNum) && errors.identityNum?.isErr}
              helperText={errors.identityNum?.isErr && errors.identityNum.message}
              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}


            />
          </Grid>

          <Grid item xs={4}>
            <TextField

              required
              id="firstName"
              name="firstName"
              label="שם פרטי"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.firstName}
              error={Boolean(errors.firstName) && errors.firstName?.isErr}
              helperText={errors.firstName?.isErr && errors.firstName.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}

            />
          </Grid>
          <Grid item xs={4}>
            <TextField

              required
              id="lastName"
              name="lastName"
              label="שם משפחה"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.lastName}
              error={Boolean(errors.lastName) && errors.lastName?.isErr}
              helperText={errors.lastName?.isErr && errors.lastName.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>


          <Grid item xs={4}>
            <TextField
              input styles={{ direction: 'ltr', textAlign: 'right', }} type="date"
              required
              id="birthDate"
              name="birthDate"
              label="תאריך לידה"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.birthDate}
              error={Boolean(errors.birthDate) && errors.birthDate?.isErr}
              helperText={errors.birthDate?.isErr && errors.birthDate.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'left' } // Aligns the text within the input to the left
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField style={{ marginRight: '20%', width: '130px' }}
              id="maritalStatus"
              label="מצב משפחתי"
              fullWidth
              name="maritalStatus"
              select
              value={userDetails.maritalStatus}
              onChange={handleChangeUserDetails}
              error={Boolean(errors.maritalStatus) && errors.maritalStatus?.isErr}
              helperText={errors.maritalStatus?.isErr && errors.maritalStatus.message}

            >
              <MenuItem style={{ justifyContent: 'flex-end' }} value="רווק/ה">רווק/ה</MenuItem>
              <MenuItem style={{ justifyContent: 'flex-end' }} value="נשואי/ה">נשואי/ה</MenuItem>
              <MenuItem style={{ justifyContent: 'flex-end' }} value="גרוש/ה">גרוש/ה</MenuItem>
              <MenuItem style={{ justifyContent: 'flex-end' }} value="אלמן/ה">אלמן/ה</MenuItem>

            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField style={{ marginRight: '15%', width: '130px' }}
              id="gender"
              label="מגדר"
              fullWidth
              name="gender"
              select
              value={userDetails.gender}
              onChange={handleChangeUserDetails}
              error={Boolean(errors.gender) && errors.gender?.isErr}
              helperText={errors.gender?.isErr && errors.gender.message}

            >

              <MenuItem style={{ justifyContent: 'flex-end' }} value="זכר">זכר</MenuItem>
              <MenuItem style={{ justifyContent: 'flex-end' }} value="נקבה">נקבה</MenuItem>

            </TextField>

          </Grid>

          <Grid item xs={4} >

            <TextField
              required
              id="password"
              name="userPassword"
              label="סיסמא"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.userPassword}
              error={Boolean(errors.userPassword) && errors.userPassword?.isErr}
              helperText={errors.userPassword?.isErr && errors.userPassword.message}
              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>
          <Grid item xs={4}

          >
            <TextField
              required
              id="phone"
              name="phone"
              label="טלפון נייד"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.phone}
              error={Boolean(errors.phone) && errors.phone?.isErr}
              helperText={errors.phone?.isErr && errors.phone.message}


              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />

          </Grid>
        </Grid>
      </Container>



      <Typography gutterBottom className={styles.title} style={{ marginTop: "50px", marginBottom: "20px", width: "100%" }}>
        כתובת
      </Typography>

      <Container component="main" maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              required
              id="city"
              name="city"
              label="עיר"
              fullWidth
              autoComplete="city"
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.city}
              error={Boolean(errors.city) && errors.city?.isErr}
              helperText={errors.city?.isErr && errors.city.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="street"
              name="street"
              label="רחוב"
              fullWidth
              autoComplete="street"
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.street}
              error={Boolean(errors.street) && errors.street?.isErr}
              helperText={errors.street?.isErr && errors.street.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>

          <Grid item xs={4}>

            <TextField
              required
              id="number"
              name="number"
              label="מס בית"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.number}
              error={Boolean(errors.number) && errors.number?.isErr}
              helperText={errors.number?.isErr && errors.number.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="houseNum"
              name="houseNum"
              label="מס' דירה"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.houseNum}
              error={Boolean(errors.houseNum) && errors.houseNum?.isErr}
              helperText={errors.houseNum?.isErr && errors.houseNum.message}
              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="zip"
              name="zip"
              label="מיקוד"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.zip}
              error={Boolean(errors.zip) && errors.zip?.isErr}
              helperText={errors.zip?.isErr && errors.zip.message}


              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>
          <Grid item xs={4} >
            <TextField
              required
              id="email"
              name="email"
              label="דואר אלקטרוני"
              fullWidth
              variant="standard"
              onChange={handleChangeUserDetails}
              value={userDetails.email}
              error={Boolean(errors.email) && errors.email?.isErr}
              helperText={errors.email?.isErr && errors.email.message}

              InputLabelProps={{
                sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' } // Aligns the label to the right
              }}
              inputProps={{
                sx: { textAlign: 'right' } // Aligns the text within the input to the left
              }}
            />
          </Grid>
          <Grid item xs={4}>
            {logedUser?.permission === 3 && (
              <TextField
                required
                id="permission"
                name="permission"
                label="הרשאה"
                fullWidth
                variant="standard"
                onChange={handleChangeUserDetails}
                value={userDetails.permission}
                error={Boolean(errors.permission) && errors.permission?.isErr}
                helperText={errors.permission?.isErr && errors.permission.message}
                select
                InputLabelProps={{
                  sx: { textAlign: 'right', width: '100%', marginRight: 0, transformOrigin: 'top right' }
                }}
                inputProps={{
                  sx: { textAlign: 'right' }
                }}
              >
                {permissions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <br />
          <br />
          <Outlet />


        </Grid>
        <div className="PersonalDetails">
          {isUser &&

            <form onSubmit={(e) => uploadFile(e, 'id_card', 'fileTzUrl')}>
              <input accept="image/*,.pdf" type="file" className="input" />
              <button className={styles.button} type='submit'>העלאת קובץ ת.ז. </button>
            </form>
          }
          {isUser &&
            <form onSubmit={(e) => uploadFile(e, 'study_permit', 'fileStudyUrl')}>
              <input accept="image/*,.pdf" type="file" className="input" />
              <button className={styles.button} type='submit'>  העלאת קובץ אישור לימודים </button>
            </form>
          }
          {isUser &&
            <h3>העלאה{Progresspercent}%</h3>
          }
        </div>
        {
          isAdd || isAddEmploee ?
            <button className={styles.button} onClick={handleAddUserData}>שלב הבא</button>
            : <button className={styles.button} onClick={handleUpdateUserData}>לעדכון</button>
        }
      </Container>
    </React.Fragment>


  );
}

export default PersonalDetails;


