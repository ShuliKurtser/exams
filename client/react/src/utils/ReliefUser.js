import api from '../api';

const GetAllReliefs = async() => {
    return await api.get('ReliefUser/GetAllReliefs').then(res => res.data);
}
const GetPersonRelief = async(iduser) => {
    return await api.get(`ReliefUser/GetPersonRelief?iduser=${iduser}`).then(res => res.data);
}

const GetAllReliefType = async() => {
    return await api.get('ReliefUser/GetAllReliefType').then(res => res.data);
}

const GetallReliefReason = async() => {
    return await api.get('ReliefUser/GetallReliefReason').then(res => res.data);
}

const AddRealif_User = async(user) => {
    return await api.post('ReliefUser/AddRealif_User',user).then(res => res.data);
}

const updateUserRelief = async (id, reliefUserToUpdate) => {
    return await api.put(`ReliefUser/ReliefUser/${id}`, reliefUserToUpdate).then(res => res.data);
}


export {GetAllReliefs, GetPersonRelief,GetAllReliefType, GetallReliefReason,AddRealif_User, updateUserRelief}

   