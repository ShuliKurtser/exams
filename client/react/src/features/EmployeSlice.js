import { createSlice } from "@reduxjs/toolkit";

// יצירה של משתנה סטייט עבור החלק הזה של הרדיוסר
const initialValue = {
    logedUser: null,
    // users: []
}

//Redux המפשטת את תהליך יצירת פרוסת-חלק מ  @reduxjs/toolkit היא פונקציה מספריית createSlice 
//store פרוסה -חלק מרידקס מייצגת חלק ממצב היישום הכולל וכולל את  הרדיוסר והפעולות הנחוצות לעדכון החלק הזה של משתנה הסטייט של ה
const userSlice = createSlice({
    name: "user",//מגדיר את השם עבור החלק הזה של הרידקס
    initialState: initialValue,//הגדרת אובייקט סטייט התחלתי עבור החלק הזה
    // הגדרה של הפעולות ברדיוסר - זה בעצם הפעולות עבור החלק הזה של המשתנה סטייט
    //בתוך האובייקט הזה נכתוב את הפונקציות שאחראיות על שינוי המשתנים שמוגדרים באובייקט סטייט
    reducers:{
        setLoggedUser: (state, action) =>{
            // setLoggedUser מעדכן את המשתנה לערך שנשלח לנו מהקומפוננטה איפה שהפעלנו את הפונקציה
            state.logedUser = action.payload;
        },
        setUnLoggedUser: (state, action) =>{
            // כשהיוזר מבקש לעשות התחברות מחדש או הרשמה לרוקן את הערך של היוזר המחובר
            state.logedUser = null;
         
        }
    }
})

// ייצוא של הפונקציות - הפעולות שכתבנו שמשנים את המשתנים שבמשתנה סטייט
// וכך נוכל לייבא את זה בקומפוננטה ולהתשמש בפונקציה
export const {setLoggedUser, setUnLoggedUser} = userSlice.actions;
//שיצרנו store והגדרה שלו במשתנה  index.jsוייבוא שלו ב reducer ייצוא של ה
export default userSlice.reducer;

