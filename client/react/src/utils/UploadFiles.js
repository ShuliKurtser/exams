import axios from "axios";

const uploadFiles = async() => {
    await axios.post('https://localhost:44381/api/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
}

export {uploadFiles}
