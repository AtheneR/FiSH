import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.marinespecies.org/rest',
  timeout: 5000
});

export const recuperationAnimalParAphiaID = async (id) => {
  try {
    const response = await apiClient.get(`/AphiaRecordByAphiaID/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur API WoRMS :', error);
    return null;
  }
};