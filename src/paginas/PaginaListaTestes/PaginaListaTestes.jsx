import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import { buscarTestes } from "../../servicos/testes.servico";
import "./PaginaListaTestes.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import { salvarNoLocalStorage } from "../../servicos/localstorage.servico";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";

function PaginaListaTestes() {
  const navigate = useNavigate();
  const [testes, setTestes] = useState(buscarTestes());
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const excluirTeste = (testeParaExcluir) => {
    if (confirm(`Deseja excluir o teste: ${testeParaExcluir.reagente}?`)) {
      const testesAtualizados = testes.filter(
        (item) => item.id !== testeParaExcluir.id,
      );
      setTestes(testesAtualizados);
      salvarNoLocalStorage("testes", testesAtualizados);
      toast.success("Teste excluído com sucesso!");
    }
  };

  const editarTeste = (testeParaEditar) => {
    navigate("/cadastro-teste/" + testeParaEditar.id);
  };

  const testesFiltrados = testes.filter((item) => {
    return item.reagente.toLowerCase().includes(termoPesquisa.toLowerCase());
  });

  return (
    <Principal titulo="Lista de Testes" voltarPara="/">
      <CampoCustomizado
        type="search"
        label="Pesquisar"
        placeholder="Digite o nome do reagente"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />

      {testesFiltrados.map((item) => {
        return (
          <div key={item.id} className="PaginaListaTestes_item">
            <div>
              <h3>{item.reagente}</h3>
              <span>Responsável: {item.responsavel}</span>
              <br />
              <span>
                Data: {item.dataTeste.split("-").reverse().join("/")} | Dosagem:{" "}
                {item.dosagem} mg
              </span>
              <br />
              <strong className={"PaginaListaTestes_" + item.resultado.replace(" ", "")}>
                {item.resultado}
              </strong>
            </div>

            <div className="PaginaListaTestes_item_acoes">
              <MdEdit size={24} onClick={() => editarTeste(item)} />
              <MdDelete
                size={24}
                color="red"
                onClick={() => excluirTeste(item)}
              />
            </div>
          </div>
        );
      })}

      {!testesFiltrados.length && (
        <span className="PaginaListaTestes_vazia">Nenhum teste encontrado.</span>
      )}

      {/* espaço para o botão + não ficar em cima do último teste */}
      <div style={{ height: 56 }} />

      <div className="PaginaListaTestes_botaoAdicionar">
        <MdAdd onClick={() => navigate("/cadastro-teste")} />
      </div>
    </Principal>
  );
}

export default PaginaListaTestes;
