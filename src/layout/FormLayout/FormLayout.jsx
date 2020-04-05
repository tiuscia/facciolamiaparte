import React from "react";
import Header from "../../component/Header/Header.jsx";
import Form from "../../component/Form/Form.jsx";
import CITTA from "../../utils/cittas.js";
import CATEGORIE from "../../utils/categorie.js";
import "./FormLayout.scss";

class FormLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titolo: "",
      descrizione: "",
      link: "",
      ashtag: "",
      selectedCittaObj: { nome: "", id: "" },
      selectedCategoriaObj: { nome: "", id: "" }
      // categoria: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.selectCitta = this.selectCitta.bind(this);
    this.selectCategoria = this.selectCategoria.bind(this);
  }

  componentDidMount() {}

  selectCitta(nomeCitta, idCitta) {
    let selected = { nome: nomeCitta, id: idCitta };
    this.setState({ selectedCittaObj: selected });
  }

  selectCategoria(nomeCategoria, idCategoria) {
    let selected = { nome: nomeCategoria, id: idCategoria };
    this.setState({ selectedCategoriaObj: selected });
  }

  handleInput(evt) {
    let inputName = evt.target.name;
    let inputValue = evt.target.value;
    this.setState({ [inputName]: inputValue });
  }

  render() {
    const {
      titolo,
      descrizione,
      link,
      ashtag,
      selectedCittaObj,
      selectedCategoriaObj
    } = this.state;
    return (
      <div>
        <Header
          title="fai la tua parte"
          text="qualcosa che adele mi dira' di aggiungere yeah"
        />
        <Form
          titolo={titolo}
          descrizione={descrizione}
          link={link}
          ashtag={ashtag}
          selectedCittaObj={selectedCittaObj}
          selectedCategoriaObj={selectedCategoriaObj}
          handleInput={this.handleInput}
          selectCitta={this.selectCitta}
          selectCategoria={this.selectCategoria}
          listaArrCitta={CITTA}
          listaArrCategorie={CATEGORIE}
        />
      </div>
    );
  }
}

export default FormLayout;
