import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaCadastroTeste from "./paginas/PaginaCadastroTeste/PaginaCadastroTeste";
import PaginaListaTestes from "./paginas/PaginaListaTestes/PaginaListaTestes";

const roteador = createBrowserRouter([// todas as rotas possiveissss
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "cadastro-teste/:id?",
    element: <PaginaCadastroTeste />,
  },
  {
    path: "lista-testes",
    element: <PaginaListaTestes />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;
