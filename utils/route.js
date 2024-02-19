import { getUser } from "../global/state/globalState";
import { Login, PrintPokemonPage, printTemplatePrincipal, PrintMemoryPage } from "../pages";

export const initControler = (pagesRender) => {
    
    switch (pagesRender) {
      case undefined:
        localStorage.getItem(getUser().name) ? printTemplatePrincipal() : Login();
        break;
        case "Pokemon":
        PrintPokemonPage();
        break;
      case "Principal":
        printTemplatePrincipal();
        break;
      case "Login":
        Login();
        break;
        case "Memory":
        PrintMemoryPage();
        break;
      
    }
  };
  