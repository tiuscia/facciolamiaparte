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
      dateFormatError: false,
      dateError: false,
      urlError: false,
      requiredError: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.selectCitta = this.selectCitta.bind(this);
    this.selectCategoria = this.selectCategoria.bind(this);
    this.isUrlValidAction = this.isUrlValidAction.bind(this);
    // this.isDateToValidAction = this.isDateToValidAction(this);
    // this.isDateFromValidAction = this.isDateFromValidAction(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm = (event) => {
    event.preventDefault();
    const {
      selectedCittaObj,
      selectedCategoriaObj,
      titolo,
      descrizione,
      ashtag,
      fromDate,
      toDate,
    } = this.state;

    // reset errors
    this.setState(
      {
        requiredError: false,
        dateError: false,
        urlError: false,
        dateFormatError: false,
      },
      () => {
        console.log("state after error reset", { ...this.state });
        // TODO optimize and get error from input
        if (
          // check required
          titolo === "" ||
          descrizione === "" ||
          selectedCittaObj.id === "" ||
          selectedCategoriaObj.id === "" ||
          (selectedCategoriaObj.nome === "ashtag" && ashtag === "")
        ) {
          console.log("REQUIRED SBAGLIATOOOOOOO", fromDate, toDate);
          this.setState({ requiredError: true });
        } else if (
          (fromDate && !isDateFormat(fromDate, "DD/MM/YYYY")) ||
          (toDate && !isDateFormat(toDate, "DD/MM/YYYY"))
        ) {
          // check date format
          console.log("DATE FORMAT SBAGLIATOOOOOOO", fromDate, toDate);
          this.setState({ dateFormatError: true });
        } else if (!this.checkDate()) {
          // check required order
          console.log("DATE ORDER SBAGLIATOOOOOOO", fromDate, toDate);
          this.setState({ dateError: true });
        } else {
          // good to go
          console.log("GOOD TO GO");
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
        this.resetState();
      });

    console.log("listaRef dati inviati", listaRef);
  }

  resetState() {
    this.setState({
      titolo: "",
      descrizione: "",
      link: "",
      ashtag: "",
      selectedCittaObj: { nome: "", id: "" },
      selectedCategoriaObj: { nome: "", id: "" },
      fromDate: "",
      toDate: "",
      dateFormatError: false,
      dateError: false,
      urlError: false,
      requiredError: false,
    });
  }

  checkDate() {
    const { fromDate, toDate } = this.state;
    if (fromDate !== "" && toDate !== "") {
      return moment(fromDate).isSameOrBefore(toDate);
    }
    if (fromDate === "" && toDate !== "") {
      return false;
    }
    return true;
  }

  selectCitta(nomeCitta, idCitta) {
    let selected = { nome: nomeCitta, id: idCitta };
    this.setState({ selectedCittaObj: selected });
  }

  selectCategoria(nomeCategoria, idCategoria) {
    let selected = { nome: nomeCategoria, id: idCategoria };
    this.setState({ selectedCategoriaObj: selected });
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
        />
      </div>
    );
  }
}

export default FormLayout;
