import { useState } from "react";
import "./RegisterPage.scss";
import showToast from "../../component/Toaster/Toaster";
import { postSignup } from "../../datamapper";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire.

    // Vérifie si le champ "Nom d'utilisateur" est vide.
    if (!username) {
      showToast("Le nom d'utilisateur est requis !", "red");
      return;
    }

    // Vérifie si le champ "Email" est vide.
    if (!email) {
      showToast("L'email est requis !", "red");
      return;
    }

    // Vérifie si le champ "Mot de passe" est vide.
    if (!password) {
      showToast("Le mot de passe est requis !", "red");
      return;
    }

    // Vérifie si le mot de passe contient au moins 8 caractères.
    if (password.length < 8) {
      showToast("Le mot de passe doit contenir au moins 8 caractères !", "red");
      return;
    }

    // Vérifie si le champ "Confirmer le mot de passe" est vide.
    if (!confirmPassword) {
      showToast("La confirmation du mot de passe est requise !", "red");
      return;
    }

    // Vérifie si les mots de passe correspondent.
    if (password !== confirmPassword) {
      showToast("Les mots de passe ne correspondent pas !", "red");
      return;
    }

    // Vérifie si le nom d'utilisateur contient au moins 3 caractères.
    if (username.length < 3) {
      showToast("Le nom d'utilisateur doit contenir au moins 3 caractères !", "red");
      return;
    }

    // Vérifie si le nom d'utilisateur ne dépasse pas 20 caractères.
    if (username.length > 20) {
      showToast("Le nom d'utilisateur doit contenir au maximum 20 caractères !", "red");
      return;
    }

    // Prépare les données utilisateur pour l'inscription.
    const userData = {
      username,
      email,
      password,
    };


    // Envoie les données au backend.
    postSignup(userData)
      .then((response) => {
        if (!response) {
          showToast("Erreur lors de la requête !", "red");
          return;
        }
        if (response.status === 201) {
          showToast("Inscription réussie !", "green", "/login");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          showToast("Erreur lors de l'inscription !", "red");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        showToast("Erreur lors de l'inscription !", "red");
      });

    // Réinitialise les champs du formulaire.
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="registerPageContainer">
      <form className="registerForm" onSubmit={submitForm}>
        <h1>Inscription</h1>
        <div className="formGroup">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="registerButton">
          S'inscrire
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;