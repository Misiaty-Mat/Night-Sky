import { Constellation } from "../model/Constellation";
import { Sky } from "../model/Sky";
import { Star } from "../model/Star";

const API_URL = "http://localhost:8000/v1";

export const httpGetSkies = async (): Promise<Sky[]> => {
    const response = await fetch(`${API_URL}/sky`);
    return await response.json();
}

export const fetchSkyById = async (id: number): Promise<Sky> => {
    const response = await fetch(`${API_URL}/sky/${id}`);
    return await response.json();
}

export const createSky = async (sky: Sky): Promise<Sky> => {
    const response = await fetch(`${API_URL}/sky`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sky)
    });
    return await response.json();
}

export const updateSky = async (sky: Sky): Promise<Sky> => {
    const response = await fetch(`${API_URL}/sky/${sky.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sky)
    });
    return await response.json();
}

export const deleteSky = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/sky/${id}`, {
        method: 'DELETE'
    });
}

export const fetchConstellationById = async (id: number): Promise<Constellation> => {
    const response = await fetch(`${API_URL}/constellation/${id}`);
    return await response.json();
}

export const createConstellation = async (constellation: Constellation): Promise<Constellation> => {
    const response = await fetch(`${API_URL}/constellation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(constellation)
    });
    return await response.json();
}

export const updateConstellation = async (constellation: Constellation): Promise<Constellation> => {
    const response = await fetch(`${API_URL}/constellation/${constellation.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(constellation)
    });
    return await response.json();
}

export const deleteConstellation = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/constellation/${id}`, {
        method: 'DELETE'
    });
}

export const fetchStarById = async (id: number): Promise<Star> => {
    const response = await fetch(`${API_URL}/star/${id}`);
    return await response.json();
}

export const createStar = async (star: Star): Promise<Star> => {
    const response = await fetch(`${API_URL}/star`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(star)
    });
    return await response.json();
}

export const updateStar = async (star: Star): Promise<Star> => {
    const response = await fetch(`${API_URL}/star/${star.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(star)
    });
    return await response.json();
}

export const deleteStar = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/star/${id}`, {
        method: 'DELETE'
    });
}