import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { buscarTestes } from "../../servicos/testes.servico";
import "./PaginaInicial.css";

import { useNavigate } from "react-router-dom";

function PaginaInicial() {
  const navigate = useNavigate();

  const testes = buscarTestes();
  const totalSucesso = testes.filter((item) => item.resultado === "Sucesso").length;
  const totalFalhas = testes.filter((item) => item.resultado === "Falha").length;

  return (
    <Principal titulo="Página Inicial">
      <div className="PaginaInicial_resumo">
        <div className="PaginaInicial_card PaginaInicial_sucesso">
          Sucesso
          <strong>{totalSucesso}</strong>
        </div>
        <div className="PaginaInicial_card PaginaInicial_total">
          Total
          <strong>{testes.length}</strong>
        </div>
        <div className="PaginaInicial_card PaginaInicial_falha">
          Falhas
          <strong>{totalFalhas}</strong>
        </div>
      </div>

      <BotaoCustomizado
        tipo="primario"
        aoClicar={() => navigate("/cadastro-teste")}
      >
        Registrar Novo Teste
      </BotaoCustomizado>

      <BotaoCustomizado
        tipo="secundario"
        aoClicar={() => navigate("/lista-testes")}
      >
        Lista de Testes
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaInicial;
