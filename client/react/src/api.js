import axios from 'axios';
// יצירה של משתנה שמכיל את ההגדרות הבסיסיות של הקריאת שרת שנבצע בשימוש במשתנה הזה
//שזה חוזר על עצמו במלא מקומות - url הגדרות בסיסיות  - לדוגמא כתובת 

const api = axios.create({
    baseURL: 'https://localhost:44381/api/',
    headers: {
        "Content-Type": "application/json"
    }
})


// כדי לבצע קריאות שרת ללא ההתחלה של הכתובת utils ייצוא של המשתנה ושימוש בקבצים של 
export default api;
