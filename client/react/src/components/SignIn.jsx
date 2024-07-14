
import React, { useEffect, useState } from "react";
import { GetPersonalLogin } from '../utils/PersonalDetails';
import { GetExams } from '../utils/Exams';
import PrivateArea from './PrivateArea';
import { setLoggedUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetRegistationDate } from "../utils/RegistationDate";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { date } from 'yup';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import style from './css/Exams.module.css';
import Swal from 'sweetalert2'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  });
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [examStartDate, setExamStartDate] = useState({});
  const [examEndDate, setExamEndDate] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch exams when the component mounts
    GetRegistationDate().then((res) => {
      setExamStartDate(res.startDate);
      setExamEndDate(res);
    });
  }, []);

  const signUp = () => {
    const today = new Date();

    if (new Date(examEndDate.endDate) < today) {
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
      navigate(("/signUp"));
    }
  };


  const handleChangeUserEmail = (event) => {
    setError("");
    let value = event.target.value;
    setEmail(value);
  }

  const handleChangePassword = (event) => {
    setError("");
    let value = event.target.value;
    setUserpassword(value);
  }

  const handleClickLogin = async () => {
    if (email === "" || userpassword === "") {
      setError("require userEmail & password");
      Swal.fire({
        title: 'הודעה',
        text: 'חובה להקליד כתובת מייל וסיסמא',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
      return;
    }

    try {
      // אם השדות מלאים ביצוע קריאת שרת של התחברות לאתר עם השם משתמש והסיסמא
      const res = await GetPersonalLogin(email, userpassword);

      if (res.status === 200) {
        // אם קיים המשתמש הזה אז לעדכן את האובייקט שחזר ברידקס
        // userSlice.js עי הפעולה שיצרנו בקובץ 
        console.log(res.data);
        dispatch(setLoggedUser(res.data));
        // navigate העברת המשתמש לניתוב של עמוד הבית עי שימוש בפוקנציה
        if (res.data.permission === 1) {
          navigate('/PrivateArea');
        } else {
          navigate('/ForOfficeUse');
        }
      } else if (res.status === 204) {
        setError("אחד מפרטי ההתחברות שגויים שגויים");
        Swal.fire({
          title: 'הודעה',
          text: 'כתובת המייל או הסיסמא שגויים',
          icon: 'warning',
          confirmButtonText: 'אישור'
        });
      }
    } catch (error) {
      console.error('שגיאה בקריאת השרת:', error);
      Swal.fire({
        title: 'שגיאה',
        text: 'שגיאה בקריאת השרת. נסה שנית מאוחר יותר.',
        icon: 'error',
        confirmButtonText: 'אישור'
      });
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'darkblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            כניסה והרשמה
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="userEmail" type="text" value={email} onChange={handleChangeUserEmail}
              // id="userEmail" type="text" value={email} onChange={handleChangeUserEmail}
              label="Email Address"
              // name="email"
              autoComplete="email"
              autoFocus

            />
            <TextField
              margin="normal"
              required
              fullWidth
              // name="password"
              label="Password"
              name="password" type="password" value={userpassword} onChange={handleChangePassword}
              // type="password"
              // id="password" type="password" value={userpassword} onChange={handleChangePassword}
              autoComplete="current-password"
            />
            {/* <FormControlLabel 
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
               
              /> */}

            <Button onClick={handleClickLogin}
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}


            >

              כניסה
            </Button >


            <Button onClick={signUp}


              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}


            >
              הרשמה
            </Button>




          </Box>
        </Box>

      </Container>
    </ThemeProvider>


  );
}




export default SignIn;
