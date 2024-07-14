import api from "../api"


const getAllDueDate = async() => {
    
    return await api.get('DueDatesContoller/GetDueDates').then(res => res)
}
const AddDueDate = async(duedate) => {
    return await api.post(`DueDatesContoller/AddDueDate`,duedate).then(res => res.data);
}
const UpdateDueDates = async(IdDueDate,dueDate) => {
    return await api.put(`DueDatesContoller/UpdateDueDates/${IdDueDate}`, dueDate).then(res => res.data);
}
export {getAllDueDate, AddDueDate, UpdateDueDates}