import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setUnLoggedUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from './css/Nav.module.css'
import { useEffect } from "react";

function Nav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logedUser = useSelector(state => state.user.logedUser);
    const handleClick = (url) => {
        navigate(url);

    }

    // אם המשתמש לא מחובר, נציג "אורח"
    const userName = logedUser ? `${logedUser.firstName} ${logedUser.lastName}` : "אורח";

    const handleSignOut = (e) => {
        e.preventDefault()
        dispatch(setUnLoggedUser());
        navigate('/');
    };


    return (
        <>
            <header className={styles.header}>
                <Link className={styles.navLink} to="/"><img style={{ width: 95 }} src="/images/logo3.jpg" alt="logo" /></Link>
                <Link className={styles.navLink} to="/">דף הבית</Link>
                {logedUser?.permission == 1 && <Link className={styles.navLink} to="/PrivateArea">איזור אישי</Link>}
                <div><Link className={styles.navLink} to="/ContactUs">צור קשר</Link></div>
                {logedUser?.permission != 1 || logedUser == null && <Link className="navLink" to="/ForOfficeUse">לשימוש המשרד</Link>}
                {logedUser?.permission == 3 && <Link className={styles.navLink} to="/ManageExamsAndDates">עדכוני מערכת</Link>}
                <div onClick={() => { dispatch(setUnLoggedUser()); }}>
                    <Link className={styles.navLink} to="/signIn">כניסה/הרשמה</Link>
                </div>
                <span className={styles.navLink1}>שלום {userName}</span>

                {logedUser?.permission != null && <Link className={styles.navLink1} onClick={handleSignOut}>התנתק</Link>}

            </header>
            <div className={styles.divider}></div>
            <Outlet />
        </>
    )
}

export default Nav;


