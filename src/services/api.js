import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24484342-5d490b786e593542a839fc86b';

axios.defaults.baseURL = BASE_URL;

const getImg = async (imgToSearch, page = 1) => {
  const queryOptions = new URLSearchParams({
    key: API_KEY,
    q: imgToSearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });
  try {
    const { data } = await axios.get('?' + queryOptions.toString());
    return data;
  } catch (error) {
    throw error;
  }
};

export default getImg;
