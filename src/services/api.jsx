import axios from 'axios';

const apiClient= axios.create({
    baseURL: 'http://127.0.0.1:3004/Blog/v1',
    timeout: 5000
})

export const getCourses = async () => {
    try {
        const response = await apiClient.get('/course/')
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}

export const getCourseByName = async (name) => {
    try {
        const response = await apiClient.get(`/course/${name}`);
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}

export const getPost = async () => {
    try {
        const response = await apiClient.get('/post/')
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}

export const getPostById= async (id) => {
    try {
        const response= await apiClient.get(`/post/${id}`);
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e)
    }
}


export const getPostByCourse = async (id) => {
    try {
        const response = await apiClient.get(`/post/cat/${id}`)
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}

export const postComment = async (post, data) => {
    try {
        const response = await apiClient.post(`/post/${post}`,data);
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}


export const putComment = async (post,id, comment) => {
    try {
        const response = await apiClient.put(`/post/${post}/${id}`,comment);
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}

export const deleteComment = async (post,id) => {
    try {
        const response = await apiClient.delete(`/post/${post}/${id}`);
        return response.data
    } catch (e) {
        checkResponseStatus(e);
        return Promise.reject(e);
    }
}

const checkResponseStatus = (e) => {
    const responseStatus = e?.response?.status;

    if (responseStatus) {
        (responseStatus === 401 || responseStatus === 403);
    } else {
        console.warn("No se recibió una respuesta del servidor:", e.message);
        console.error(e);
    }
};