import showToast from "./component/Toaster/Toaster";

const url = "http://localhost:2000"; // Remplacez par l'URL de votre API

const headers = {
  "Content-Type": "application/json",
};

export async function postSignup(userData: { username: string; email: string; password: string }) {

    try {
        const response = await fetch(`${url}/api/users`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: userData.username,
            email: userData.email,
            password: userData.password,
        }),
        });
        const data = response.json();
        return { status: response.status, ...data };
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        showToast("Erreur lors de la requête !", "red");
    }
    }

    export async function postLogin(userData: { email: string; password: string }) {
        try {
            const response = await fetch(`${url}/api/login`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(userData),
            });
            return response.json();
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
            showToast("Erreur lors de la requête !", "red");
        }
    }