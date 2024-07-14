
import { Routes, Route } from "react-router-dom";
import './App.css';
import PersonalDetails from "./components/PersonalDetails";
import SignIn from "./components/SignIn";
import ContactUs from "./components/ContactUs";
import ForOfficeUse from "./components/ForOfficeUse";
import Home from "./components/Home";
import Exams from "./components/Exams";
import PrivateArea from "./components/PrivateArea";
import Nav from "./components/Nav";
import Relief from "./components/Relief";
import AddAnEmploee from "./components/AddAnEmployee";
import AddExams from "./components/AddExams";
import ManageExamsAndDates from "./components/ManageExamsAndDates";



function App() {

  return (
    <>
      <div className="right-to-left-text">

        <Routes>
          <Route path="" element={<Nav />} >
            <Route path='/' element={<Home />}></Route>
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/PersonalDetails" element={<PersonalDetails />} />
            <Route path="/PrivateArea" element={<PrivateArea />} />
            <Route path="/Exams" element={<Exams />} />
            <Route path="/AddExams" element={<AddExams />} />
            <Route path="/ForOfficeUse" element={<ForOfficeUse />} />
            <Route path="/Relief" element={<Relief />} />
            <Route path="/AddAnEmploee" element={<AddAnEmploee />} />
            <Route path="/AddAnEmploee/NewEmploee" element={<PersonalDetails />} />
            <Route path="/signUp" element={<PersonalDetails />} />
            <Route path="/ManageExamsAndDates" element={<ManageExamsAndDates />} />
            {/* <Route path="/signUp" element={<h1>hello sign up</h1>}></Route> */}

          </Route>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<PersonalDetails />} />


        </Routes>

      </div>
    </>
  )
}

export default App;


