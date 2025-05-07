import { useState } from "react";
import "./LoginPage.scss";
import showToast from "../../component/Toaster/Toaster";
import { postLogin } from "../../datamapper";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="loginpageContainer">
      <form className="loginForm" onSubmit={submitForm}>
        <h1>Connexion</h1>
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
        <button type="submit" className="loginButton">
          Se connecter
        </button>
      </form>
    </main>
  );
}

const submitForm = (e: React.FormEvent) => {
  e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire.
  const email = (e.target as HTMLFormElement).email.value;
  if (!email) {
    showToast("Email requis !", "red");
    return;
  }
  const password = (e.target as HTMLFormElement).password.value;
  if (!password) {
    showToast("Mot de passe requis !", "red");
    return;
  }

  const userData = {
    email: email,
    password: password,
  };

  postLogin(userData).then((response) => {
    if (response) {
      if (response.error) {
        showToast(response.error, "red");
        return;
      }
      showToast("Connexion réussie !", "green", "/");

      localStorage.setItem("jwtToken", response.token); // Stocker le token dans le localStorage

      const form = document.querySelector(".loginForm") as HTMLFormElement;
      form.reset(); // Réinitialiser le formulaire après la soumission
      console.log("je suis la");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      showToast("Erreur lors de la connexion !", "red");
    }
  });
};

export default LoginPage;
