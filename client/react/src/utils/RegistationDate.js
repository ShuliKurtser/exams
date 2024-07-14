import api from '../api';

const GetRegistationDate = async () => {
    return await api.get('RegistationDate/GetRegistationDate').then(res => res.data);
}

const UpdateDate = async (date) => {
    return await api.put('RegistationDate/UpdateDate', date).then(res => res.data);
}

export { GetRegistationDate, UpdateDate };
