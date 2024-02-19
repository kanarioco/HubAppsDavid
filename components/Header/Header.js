import { getUser } from "../../global/state/globalState";
import { changeColorRGB } from "../../utils";
import { initControler } from "../../utils/route";
import "./Header.css";
import "../Footer/Footer.css";


//!-------------------------------------------------------------------
//? ------------------1) TEMPLATE ------------------------------------
//!-------------------------------------------------------------------

const template = () => `
<h1>HUB APP!</h1>
  <nav>
    <img
      src="img/amongUscolores.png"
      alt=" change to style mode page"
      id="changeColor"
    />
    <img
      src="img/amongUsVerde.png"
      alt=" navigate to home app"
      id="buttonPrincipal"
    />
    <img
      src="img/amongUsBomba.png"
      alt="logout"
      id="buttonLogout"
    />
  </nav>
`;
const addListeners = () => {
  /** Para cada elemento grafico que son los botones que hacen acciones con el usuario
   * le meteremos su escuchador
   */
  //! ---------------->COLOR CHANGE RANDOM------ evento click del boton de cambio de color
  const changeColor = document.getElementById("changeColor");
  changeColor.addEventListener("click", (e) => {
    /** en este caso lo que hacemos el generar un color y cambiar el stylo del background del body */
    const color = changeColorRGB();

//! _________cambio para header y footer________
    document.querySelector("header").style.background = color;
    document.querySelector("footer").style.background = color;


  });

  //! ----------------> PRINCIPAL ------------- evento click del boton que nos lleva a los juegos
  const buttonPrincipal = document.getElementById("buttonPrincipal");
  buttonPrincipal.addEventListener("click", (e) => {
    // llamamos al initController con el Principal para que pinte la pagina Principal
    initControler("Principal");
  });

  //! ----------------> LOGOUT ----------------
  const buttonLogout = document.getElementById("buttonLogout");
  buttonLogout.addEventListener("click", (e) => {
    /** Ahora vamos a empezar a utilizar los estados con sus funciones get y set
     * En este caso primero vamos a traernos el nombre del usuario que esta logado y
     * que se encuentra en el sessionStorage
     * Esto lo hacemos porque es el nombre con el que podemos traer los datos del localStorage
     * Al traernos los datos del localStorage vamos a modificar el objeto y poner el token a false
     * porque es el token lo que nos da el ok o no en nuestra aplicacion
     *
     * Es una simulacion para luego cuando estemos en el back nos sea mucho mas sencillo entender que
     * para las request al back que necesiten autenticacion necesitaremos un token valido.
     */
    const userState = getUser().name;
    const currentUser = localStorage.getItem(userState);
    const parseCurrentUser = JSON.parse(currentUser);
    const updateUser = { ...parseCurrentUser, token: false };
    const stringUpdateUser = JSON.stringify(updateUser);
    localStorage.removeItem(userState);
    sessionStorage.removeItem("currentUser");
    localStorage.setItem(userState, stringUpdateUser);

    /** una vez borrado el currentUser del sessionStorage llamamos al initControler para que renderice el
     * login, aunque si no le hubieramos puesto ningun parametro hubiera hecho la misma accion porque
     * evalua si tenermos currentUser en el sessionStorage
     *
     */
    initControler("Login");
  });
};

export const PrintTemplateHeader = () => {
  document.querySelector("header").innerHTML = template();
  addListeners();
};
