import Cookie from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";


export const get = async () => {
    const token = Cookie.get("jwt");

    try {
        let response = await fetch(`${API_URL}/api/shortners`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        response = await response.json();
        return response
    } catch (e) {
        return { error: 'An error occured' }
    }


};

export const getSingle = async (alias) => {
    try {
        let response = await fetch(`${API_URL}/api/shortners?alias=${alias}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        response = await response.json();
        return response

    } catch (e) {
        return { error: 'An error occured' }
    }
}


export const create = async (url, alias) => {
    const token = Cookie.get("jwt");

    try {
        let response = await fetch(`${API_URL}/api/shortners`, {
            method: 'POST',
            body: JSON.stringify({ data: { url, alias } }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        response = await response.json();
        return response
    } catch (e) {
        return { error: 'An error occured' }
    }


};

export const deleteAlias = async (id) => {
    const token = Cookie.get("jwt");
    
    try {
        let response = await fetch(`${API_URL}/api/shortners/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        
        response = await response.json();
        return response
    } catch (e) {
        return { error: 'An error occured' }
    }


};