const API_KEY = '285cc987948ba3fdb6de66142d9d8716';

export async function searchPeople(searchTerm = '', offset = 1) {
    try {
        const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchTerm}&page=${offset}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(`Error with function searchPeople ${error.message}`);
        throw error;
    }
};

export async function getPopularPeople() {
    try {
        const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=1`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(`Error with function getPopularPeople ${error.message}`);
        throw error;
    }
};

export async function getDetailsPeople(idPeople) {
    try {
        const url = `https://api.themoviedb.org/3/person/${idPeople}?api_key=${API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(`Error with function getDetailsPeople ${error.message}`);
        throw error;
    }
};