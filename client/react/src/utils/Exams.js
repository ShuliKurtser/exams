import api from '../api';

const GetExamsById = async(Idexam) => {
    return await api.get(`Exams/GetExamsById?Idexam=${Idexam}`).then(res => res.data);
}

const GetExams = async() => {
    return await api.get('Exams/GetExams').then(res => res.data);
}
const AddExam = async(exam) => {
    return await api.post(`Exams/AddExam`,exam).then(res => res.data);
}
export {GetExamsById,GetExams, AddExam}