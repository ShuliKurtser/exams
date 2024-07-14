import api from '../api';

const GetExamsForUser = async(userId) => {
    return await api.get(`ExamsUser/GetExamsForUser?userId=${userId}`).then(res => res.data);
}

const GetAllExams = async() => {
    return await api.get('ExamsUser/GetAllExams').then(res => res.data);
}

const Add = async(examsUser) => {
    //body הפונקציה מקבלת אובייקט לשליחה לשרת ב
    return await api.post(`ExamsUser/Add`, examsUser).then(res => res.data);
}

const AddExams = async(examsUser) => {
    //body הפונקציה מקבלת רשימת אובייקטים לשליחה לשרת ב
    return await api.post(`ExamsUser/AddExams`, examsUser).then(res => res.data);
}

const updateUserExam = async ( id, examUserToUpdate) => {
    return await api.put(`ExamsUser/ExamsUser/${id}`, examUserToUpdate).then(res => res.data);
}


export {GetExamsForUser,GetAllExams,Add,AddExams,updateUserExam}