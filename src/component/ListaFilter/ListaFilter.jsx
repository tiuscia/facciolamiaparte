import React from "react";
import "./ListaFilter.scss";
import FormInput from "../FormInput/FormInput.jsx";
import FormDropdown from "../FormDropdown/FormDropdown.jsx";

const ListaFilter = (props) => {
  console.log("props", props);

  return (
    <div className="lista-filter">
      <h2>Filtra i risultati: </h2>
      <FormInput
        type="text"
        placeholder="cerca..."
        name="keyword"
        inputValue={props.keyword}
        getValueFromInput={props.handleInput}
      />
      <FormDropdown
        selectedObj={props.cateria}
        selectItem={props.selectCategoria}
        defaultTxt="Seleziona categoria"
        listArr={props.listaArrCategorie}
      />
      <FormDropdown
        selectedObj={props.citta}
        selectItem={props.selectCitta}
        defaultTxt="Seleziona citta"
        listArr={props.listaArrCitta}
      />
      <FormInput
        type="text"
        placeholder="Data inizio (GG/MM/AAAA)"
        isDate="DD/MM/YYYY"
        name="dataInizio"
        inputValue={props.dataInizio}
        getValueFromInput={props.handleInput}
      />
    </div>
  );
};

export default ListaFilter;
