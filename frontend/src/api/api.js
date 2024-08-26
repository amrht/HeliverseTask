import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const fetchUsers = async (page = 1, search = '', filters = {}) => {
    try {
        const pageSize = 20; 

        const response = await axios.get(`${API_URL}/users`, {
            params: {
                page,
                limit: pageSize,
                search,
                ...filters
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
