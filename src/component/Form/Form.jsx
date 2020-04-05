import React from "react";
import FormInput from "../../component/FormInput/FormInput.jsx";
import Btn from "../../component/Btn/Btn.jsx";
import "./Form.scss";
import FormDropdown from "../../component/FormDropdown/FormDropdown.jsx";

const Form = ({
  titolo,
  descrizione,
  link,
  ashtag,
  selectedCittaObj,
  selectCitta,
  handleInput,
  listaArrCitta,
  listaArrCategorie,
  selectedCategoriaObj,
  selectCategoria,
  fromDate,
  toDate
}) => (
  <div className="form">
    <div className="form__input-wrapper">
      <FormInput
        type="text"
        placeholder="Inserisci il titolo"
        name="titolo"
        isRequired
        isMaxLength="50"
        inputValue={titolo}
        getValueFromInput={handleInput}
      />
      <FormInput
        type="textarea"
        placeholder="Inserisci una breve descrizione"
        name="descrizione"
        isRequired
        inputValue={descrizione}
        getValueFromInput={handleInput}
      />
      <FormInput
        type="text"
        placeholder="Inserisci url"
        name="link"
        inputValue={link}
        getValueFromInput={handleInput}
      />
      <FormDropdown
        selectedObj={selectedCategoriaObj}
        selectItem={selectCategoria}
        defaultTxt="Seleziona categoria"
        listArr={listaArrCategorie}
      />
      {selectedCategoriaObj && selectedCategoriaObj.nome === "ashtag" && (
        <FormInput
          type="text"
          placeholder="Inserisci #ashtag"
          name="#ashtag"
          inputValue={ashtag}
          getValueFromInput={handleInput}
        />
      )}
      <FormDropdown
        selectedObj={selectedCittaObj}
        selectItem={selectCitta}
        defaultTxt="Seleziona città"
        listArr={listaArrCitta}
      />
      <FormInput
        type="text"
        placeholder="GG/MM/AAAA"
        isDate="DD/MM/YYYY"
        name="Data Inizio (GG/MM/AAAA)"
        inputValue={fromDate}
        getValueFromInput={handleInput}
      />
      <FormInput
        type="text"
        placeholder="GG/MM/AAAA"
        isDate="DD/MM/YYYY"
        name="Data Fine (GG/MM/AAAA)"
        inputValue={toDate}
        getValueFromInput={handleInput}
      />
    </div>
    <Btn text="invia" type="submit" />
  </div>
);

export default Form;
