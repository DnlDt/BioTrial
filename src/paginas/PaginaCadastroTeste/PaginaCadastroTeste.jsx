/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import { buscarTestes, salvarTeste } from "../../servicos/testes.servico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroTeste() {
  const navigate = useNavigate();
  const [formTeste, setFormTeste] = useState({
    id: "",
    reagente: "",
    responsavel: "",
    dataTeste: "",
    dosagem: "",
    resultado: "Em andamento",
    observacoes: "",
  });

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const testeParaEditar = buscarTestes().find(
        (item) => item.id === +params.id,
      );
      if (testeParaEditar) {
        setFormTeste(testeParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (
      !formTeste.reagente.trim() ||
      !formTeste.responsavel.trim() ||
      !formTeste.dataTeste ||
      !formTeste.dosagem
    ) {
      toast.error("Os campos reagente, responsável, data e dosagem são obrigatórios!");
      return;
    }

    if (Number(formTeste.dosagem) <= 0) {
      toast.error("A dosagem deve ser maior que zero!");
      return;
    }

    // data de hoje no formato AAAA-MM-DD
    const hoje = new Date().toLocaleDateString("en-CA");
    if (formTeste.dataTeste > hoje) {
      toast.error("A data do teste não pode ser no futuro!");
      return;
    }

    salvarTeste(formTeste);
    toast.success("Teste salvo com sucesso!");
    navigate("/lista-testes");
  };

  const titulo = formTeste.id ? "Editar Teste" : "Novo Teste";

  return (
    <Principal titulo={titulo} voltarPara="/">
      <CampoCustomizado
        label="Reagente"
        value={formTeste.reagente}
        onChange={(e) =>
          setFormTeste({ ...formTeste, reagente: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Responsável"
        value={formTeste.responsavel}
        onChange={(e) =>
          setFormTeste({ ...formTeste, responsavel: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Data do Teste"
        type="date"
        value={formTeste.dataTeste}
        onChange={(e) =>
          setFormTeste({ ...formTeste, dataTeste: e.target.value })
        }
      />
      <CampoCustomizado
        label="Dosagem (mg)"
        type="number"
        value={formTeste.dosagem}
        onChange={(e) =>
          setFormTeste({ ...formTeste, dosagem: e.target.value })
        }
      />

      <div className="CampoCustomizado_root">
        <span>Resultado</span>
        <select
          className="CampoCustomizado_input"
          value={formTeste.resultado}
          onChange={(e) =>
            setFormTeste({ ...formTeste, resultado: e.target.value })
          }
        >
          <option>Em andamento</option>
          <option>Sucesso</option>
          <option>Falha</option>
        </select>
      </div>

      <CampoCustomizado
        label="Observações"
        value={formTeste.observacoes}
        onChange={(e) =>
          setFormTeste({ ...formTeste, observacoes: e.target.value })
        }
        maxLength={300}
        rows={4}
      />

      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroTeste;
