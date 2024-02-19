import { setUser, setUserData } from "../../global/state/globalState";
import { initControler } from "../../utils/route";
import "./Login.css";


const template = () => `
<div class="myMain">
     <p class="pReady">READY FOR EXPERIENCE?</p>
     <input type="email" id="username" placeholder="Email Required" required>
     <button id="butLog" type="submit">Login</button>
     <button id="butSing" type="submit">Sing In</button>
</div>
`;

const addListeners = () => {
 
    const butLog = document.getElementById("butLog");
     const username = document.getElementById("username");
     butLog.addEventListener("click", (e) => {
       const valueInput = username.value;
   
       
       if (localStorage.getItem(`${valueInput}USER`)) {
         const localUser = localStorage.getItem(`${valueInput}USER`);
         const parseUser = JSON.parse(localUser);
   
         // importante es que si me logo es poner el token de autenticacion como true
         parseUser.token = true;
   
         const stringUser = JSON.stringify(parseUser);
         localStorage.setItem(`${valueInput}USER`, stringUser);
         sessionStorage.setItem("currentUser", `${valueInput}USER`);
   
         // y llamamos a la funcion dee set del user logado actual
         setUser(`${valueInput}USER`);
         // y seteamos los datos del locaStorage en los datos de usuario logado con sus favoritos
         setUserData(parseUser);
       } else {
         /** en caso de no estar este usuario de antes registrado en el localStorage lo que hacemos es que lo crearemos
          * de cero con su array de fav vacio y el token en true y el nombre es el nomvre del input
          */
         const customUser = {
           name: username.value,
           fav: [],
           token: true,
         };
   
         // lo metemos al localStorage añadiendole USER despues del nombre  y lo metemos al session como el currentUser de la app
         const stringUser = JSON.stringify(customUser);
         localStorage.setItem(`${valueInput}USER`, stringUser);
         sessionStorage.setItem("currentUser", `${valueInput}USER`);
   
         // seteamos el nombre en su estado asi como los datos del usaurio en el segundo estado customUser
         setUser(`${valueInput}USER`);
         setUserData(customUser);
       }
   
       /** llamamos al initControler sin el parametro para que compruebe que se ha metido el userCurrent en el sessionStorage  */
       initControler();
     });
   };
   
   const onclick = () => { //! Añadido

    const butSing = document.getElementById("butSing")  //! Añadido
       
        butSing.onclick = () => {  //! Añadido
        alert("Database on progress, Please Log 😏");  //! Añadido
   };  //! Añadido
   
      };  //! Añadido

   export const Login = () => {
     /** cuando pintamos el login hay que ocultar la nav con sus navegaciones */
     document.querySelector("nav").style.display = "none";
     document.querySelector("main").innerHTML = template();
     addListeners();
     onclick(); //! Añadido
   };
   

  