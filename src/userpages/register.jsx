import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-left-container"></div>
        <div className="landing-right-container">
          <div className="container">
            <div className="screen">
              <div className="screen__content">
                <h2 className="register-title">Registrarse</h2>
                <form className="register">
                  <div className="register__field">
                    <input
                      type="text"
                      className="login__input"
                      placeholder="Nombre"
                    ></input>
                  </div>
                  <div className="register__field">
                    <input
                      type="mail"
                      className="login__input"
                      placeholder="Mail"
                    ></input>
                  </div>
                  <div className="register__field">
                    <input
                      type="text"
                      className="login__input"
                      placeholder="Telefono"
                    ></input>
                  </div>
                  <div className="register__field">
                    <input
                      type="password"
                      className="login__input"
                      placeholder="Contraseña"
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
