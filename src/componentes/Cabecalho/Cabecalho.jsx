import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho() {
  return (
    <header className="Cabecalho_root">
      <img src="/favicon.svg" style={{ width: 28, height: 28 }} />

      <h1 className="Cabecalho_titulo">BioTrial</h1>

      <Avatar nome="João Pinho" />
    </header>
  );
}

export default Cabecalho;
