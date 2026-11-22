import {
  buscarNoLocalStorage,
  salvarNoLocalStorage,
} from "./localstorage.servico";

export const salvarTeste = (teste) => {
  const testes = buscarNoLocalStorage("testes") || [];
  if (!teste.id) {
    // inclusão de novo teste
    teste.id = Date.now();
    testes.push(teste);
  } else {
    // edição de teste existente
    const index = testes.findIndex((t) => t.id === teste.id);
    testes[index] = teste;
  }

  salvarNoLocalStorage("testes", testes);
};

export const buscarTestes = () => {
  return buscarNoLocalStorage("testes") || [];
};
