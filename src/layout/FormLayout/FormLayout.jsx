import React from "react";
import moment from "moment";
// import * as admin from "firebase-admin";
import Header from "../../component/Header/Header.jsx";
import Form from "../../component/Form/Form.jsx";
import { db } from "../../firebase";
import CITTA from "../../utils/cittas.js";
import CATEGORIE from "../../utils/categorie.js";
import { isDateFormat, isValidUrl } from "../../utils/inputValidation.js";
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
      dateFromError: false,
      dateToError: false,
      dateError: false,
      urlError: false,
      requiredError: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.selectCitta = this.selectCitta.bind(this);
    this.selectCategoria = this.selectCategoria.bind(this);
    this.isUrlValidAction = this.isUrlValidAction.bind(this);
    this.isDateToValidAction = this.isDateToValidAction(this);
    this.isDateFromValidAction = this.isDateFromValidAction(this);
    this.submitForm = this.submitForm.bind(this);
  }

  // componentDidMount() {}

  submitForm = (event) => {
    const {
      selectedCittaObj,
      selectedCategoriaObj,
      titolo,
      descrizione,
      ashtag,
    } = this.state;
    event.preventDefault();

    console.log("before reset");
    console.log("state before", { ...this.state });

    // reset
    this.setState(
      { requiredError: false, dateError: false, urlError: false },
      () => {
        console.log("inside reset");
        console.log("state after", { ...this.state });
        // TODO optimize and get error from input
        // TODO use a function that returns a boolean instead of editing the state
        if (
          titolo === "" ||
          descrizione === "" ||
          selectedCittaObj.id === "" ||
          selectedCategoriaObj.id === "" ||
          (selectedCategoriaObj.nome === "ashtag" && ashtag === "")
        ) {
          this.setState({ requiredError: true });
        } else if (!this.checkDate()) {
          this.setState({ dateError: true });
        } else {
          const newStateCopy = { ...this.state };
          if (!newStateCopy.requiredError && !newStateCopy.dateError) {
            this.sendData();
          }
        }
      }
    );
  };

  sendData() {
    const {
      titolo,
      descrizione,
      // fromDate,
      // toDate,
      link,
      ashtag,
      selectedCategoriaObj,
      selectedCittaObj,
    } = this.state;

    let dataToSend = {
      titolo,
      descrizione,
      // fromDate: admin.firestore.Timestamp.fromDate(
      //   new Date("April 10, 2020") // fromDate
      // ),
      // toDate:
      //   admin.firestore.Timestamp.fromDate(new Date("December 10, 1815")) || "", // toDate
      citta: selectedCittaObj,
      categoria: selectedCategoriaObj,
      link: link || "",
      ashtag: ashtag || "",
    };

    const listaRef = db
      .collection("aggratis")
      .add(dataToSend)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
      });

    console.log("listaRef dati inviati", listaRef);
  }

  checkDate() {
    const { fromDate, toDate } = this.state;
    if (fromDate && toDate) {
      return moment(fromDate).isSameOrBefore(toDate);
    }
    return false;
  }

  selectCitta(nomeCitta, idCitta) {
    let selected = { nome: nomeCitta, id: idCitta };
    this.setState({ selectedCittaObj: selected });
  }

  selectCategoria(nomeCategoria, idCategoria) {
    let selected = { nome: nomeCategoria, id: idCategoria };
    this.setState({ selectedCategoriaObj: selected });
  }

  isDateFromValidAction(inputFromDate) {
    if (inputFromDate && !isDateFormat(inputFromDate, "DD/MM/YYYY")) {
      this.setState({ dateFromError: true });
    } else {
      this.setState({ dateFromError: false });
    }
  }
  isDateToValidAction(inputToDate) {
    if (inputToDate && !isDateFormat(inputToDate, "DD/MM/YYYY")) {
      this.setState({ dateToError: true });
    } else {
      this.setState({ dateToError: false });
    }
  }

  isUrlValidAction(input) {
    if (!isValidUrl(input)) {
      this.setState({ urlError: true });
    } else {
      this.setState({ urlError: false });
    }
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
      dateError,
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
          isUrlValidAction={this.isUrlValidAction}
          isDateToValidAction={this.isDateToValidAction}
          isDateFromValidAction={this.isDateFromValidAction}
        />
      </div>
    );
  }
}

export default FormLayout;
