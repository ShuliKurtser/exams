import api from '../api';
// import api from '../firebase/api';
import axios from 'axios';

const GetAllPersonDetailsById = async(iduser) => {
    return await api.get(`PersonalDetailes/GetPersonDetailsById?iduser=${iduser}`).then(res => res.data);
}

const GetPersonalDetailsEmp = async() => {
    return await api.get('PersonalDetailes/GetPersonalDetailsEmp').then(res => res.data);
}

const GetPersonalLogin = async(email, userpassword) => {
    return await api.get(`PersonalDetailes/GetPersonalLogin?email=${email}&userpassword=${userpassword}`).then(res => res);
}

const GetPersonalDetailsTesters = async() => {
    return await api.get('PersonalDetailes/GetPersonalDetailsTesters').then(res => res.data);
}

const GetAllPersonalReliefTypesTesters = async() => {
    return await api.get('PersonalDetailes/GetPersonalDetailsTesters').then(res => res.data);
}

const GetAllPersonalReliefReasonsTesters = async() => {
    return await api.get('PersonalDetailes/GetPersonalDetailsTesters').then(res => res.data);
}


const AddPersonalDetailes = async(user) => {
    return await api.post(`PersonalDetailes/AddPersonalDelailes`,user).then(res => res.data);
}
// לבדוק את הפונקציה  בAPI
const UpdatePersonalDetail = async(id, user) => {
    return await api.put(`PersonalDetailes/UpdatePersonalDetails/${id}`, user).then(res => res.data);
}

export const checkIdentityExists = async (identitynum) => {
    try {
      const response = await axios.get(`/api/checkIdentity/${identitynum}`);
      // Assuming the server returns a boolean value indicating whether the identity exists
      return response.data.exists;
    } catch (error) {
      console.error('Error checking identity existence:', error);
      return false; // Assuming that in case of error, we return false (identity does not exist)
    }
  };
export {GetPersonalDetailsTesters,GetAllPersonDetailsById,GetPersonalDetailsEmp,GetPersonalLogin,AddPersonalDetailes,UpdatePersonalDetail,GetAllPersonalReliefTypesTesters, GetAllPersonalReliefReasonsTesters}


