import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://www.marinespecies.org/rest',
    timeout: 5000
});

// on récupère les détails d'un taxon avec l'id
export const getAnimalByAphiaID = async (id) => {
    try {
        const response = await apiClient.get(`/AphiaRecordByAphiaID/${id}`)
        return response.data
    } catch (error) {
        console.error('Erreur API WoRMS :', error)
        return null
    }
}

// on récupère les détails d'un taxon avec le nom
export const searchAnimalsByName = async (name) => {
    try {
        const response = await apiClient.get(`/AphiaRecordsByName/${name}`)
        return response.data
    } catch (error) {
        console.error('Erreur API WoRMS :', error)
        return []
    }
}

// on récupère les régions où on a vu un taxon
export const getDistributionsByAphiaID = async (id) => {
    try {
        const response = await apiClient.get(`/AphiaDistributionsByAphiaID/${id}`)
        return response.data
    } catch (error) {
        console.error('Erreur distribution :', error)
        return []
    }
}