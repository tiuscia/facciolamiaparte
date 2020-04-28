import React from "react";
import "./ListaFilter.scss";
import FormInput from "../FormInput/FormInput.jsx";
import FormDropdown from "../FormDropdown/FormDropdown.jsx";

const ListaFilter = (props) => {
  console.log("props", props);

  return (
    <div className="lista-filter">
      <h2>qui i filtri</h2>
      <FormInput
        type="text"
        placeholder="cerca..."
        name="keyword"
        inputValue={props.keyword}
        getValueFromInput={props.onKeywordChange}
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
    </div>
  );
};

export default ListaFilter;
