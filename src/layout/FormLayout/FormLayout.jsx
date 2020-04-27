import React from "react";
import moment from "moment";
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
      selectedCategoriaObj: { nome: "", id: "" },
      fromDate: "",
      toDate: "",
      dateError: false,
      requiredError: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.selectCitta = this.selectCitta.bind(this);
    this.selectCategoria = this.selectCategoria.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {}

  submitForm = event => {
    // reset
    this.setState({ requiredError: false });
    this.setState({ dateError: false });

    event.preventDefault();
    this.checkDate();
    this.checkRequired();
  };

  checkRequired() {
    const {
      titolo,
      descrizione,
      ashtag,
      selectedCittaObj,
      selectedCategoriaObj
    } = this.state;
    if (
      titolo === "" ||
      descrizione === "" ||
      selectedCittaObj.id === "" ||
      selectedCategoriaObj.id === "" ||
      (selectedCategoriaObj.nome === "ashtag" && ashtag === "")
    ) {
      this.setState({ requiredError: true });
    }
  }

  checkDate() {
    const { fromDate, toDate } = this.state;
    const isCorrectDates = moment(fromDate).isSameOrBefore(toDate);
    this.setState({ dateError: !isCorrectDates });
  }

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
      selectedCategoriaObj,
      fromDate,
      toDate,
      requiredError,
      dateError
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
          fromDate={fromDate}
          toDate={toDate}
          submitForm={this.submitForm}
          dateError={dateError}
          requiredError={requiredError}
        />
      </div>
    );
  }
}

export default FormLayout;
