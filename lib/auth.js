import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const register = async (username, email, password) => {
     try {
        let response = await fetch(`${API_URL}/api/auth/local/register`, {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        response = await response.json();
        if (response) {
            Cookie.set("jwt", response.jwt);
        }
        return response
    } catch (e) {
        return { error: 'An error occured' }
    }


};

export const login = async (identifier, password) => {
   try {
        let response = await fetch(`${API_URL}/api/auth/local`, {
            method: 'POST',
            body: JSON.stringify({ identifier, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        response = await response.json();
        if (response) {
            Cookie.set("jwt", response.jwt);
        }
        return response
    } catch (e) {
        return { error: 'An error occured' }
    }


};

export const logout = () => {
    Cookie.remove("jwt");
};