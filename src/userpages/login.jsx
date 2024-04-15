import React from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return(
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-left-container">
        </div>
        <div className="landing-right-container">
          <div class="container">
            <div class="screen">
                <div class="screen__content">
                    <h2 className="login-title">Inicio de sesion</h2>
                    <form class="register">
                        <div class="login__field">
                            <input type="mail" class="login__input" placeholder="Mail"></input>
                        </div>
                        <div class="login__field">
                            <input type="password" class="login__input" placeholder="Contraseña"></input>
                        </div>
                        <div className="login-buttons-container">
                            <button class="button login__submit">
                                <span class="button__text">Continuar</span>
                            </button>
                            <button className="button login__submit login__submit--secondary" onClick={() => navigate("/")}>
                                <span className="button__text">Volver</span>
                            </button>
                        </div>				
                    </form>
                </div>
                <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape4"></span>
                    <span class="screen__background__shape screen__background__shape3"></span>		
                    <span class="screen__background__shape screen__background__shape2"></span>
                    <span class="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
        </div>          
        </div>
      </div>
    </div>
    );
}

export default Login;