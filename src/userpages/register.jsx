import "./register.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        navigate("/"); // Redireccionar a la página de inicio después del registro
      } else {
        // Manejar errores de registro
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-left-container"></div>
        <div className="landing-right-container">
          <div className="container">
            <div className="screen">
              <div className="screen__content">
                <h2 className="register-title">Registrarse</h2>
                <form className="register" onSubmit={handleSubmit}>
                  <div className="register__field">
                    <input
                      type="text"
                      className="login__input"
                      placeholder="Nombre"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="register__field">
                    <input
                      type="mail"
                      className="login__input"
                      placeholder="Mail"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="register__field">
                    <input
                      type="text"
                      className="login__input"
                      placeholder="Telefono"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="register__field">
                    <input
                      type="password"
                      className="login__input"
                      placeholder="Contraseña"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="login-buttons-container">
                    <button className="button login__submit">
                      <span className="button__text">Continuar</span>
                    </button>
                    <button
                      className="button login__submit login__submit--secondary"
                      onClick={() => navigate("/")}
                    >
                      <span className="button__text">Volver</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
