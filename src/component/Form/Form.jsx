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
  toDate,
  submitForm,
  dateError,
  requiredError
}) => (
  <div className="form">
    <form className="form__input-wrapper" onSubmit={submitForm}>
      <FormInput
        type="text"
        placeholder="titolo"
        name="titolo"
        isRequired
        isMaxLength="50"
        inputValue={titolo}
        getValueFromInput={handleInput}
      />
      <FormInput
        type="textarea"
        placeholder="descrizione"
        name="descrizione"
        isRequired
        inputValue={descrizione}
        getValueFromInput={handleInput}
      />
      <FormInput
        type="text"
        placeholder="link"
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
          placeholder="#ashtag"
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
        placeholder="Data Inizio (GG/MM/AAAA)"
        isDate="DD/MM/YYYY"
        name="fromDate"
        inputValue={fromDate}
        getValueFromInput={handleInput}
      />
      <FormInput
        type="text"
        placeholder="Data Fine (GG/MM/AAAA)"
        isDate="DD/MM/YYYY"
        name="toDate"
        inputValue={toDate}
        getValueFromInput={handleInput}
      />
      <div className="form__error">
        {requiredError && <span>* Compilare tutti i campi obbligatori: </span>}
        {requiredError && !titolo && <span>il titolo è richiesto</span>}
        {requiredError && !descrizione && (
          <span>la descrizione è richiesta</span>
        )}
        {requiredError && !selectedCategoriaObj.id && (
          <span>La categoria è richiesta</span>
        )}
        {requiredError && !selectedCittaObj.id && (
          <span>La cittá è richiesta</span>
        )}
        {requiredError && selectedCategoriaObj.nome === "ashtag" && !ashtag && (
          <span>Il campo ashtag è richiesto</span>
        )}
        {dateError && fromDate && toDate && (
          <span>
            Controllare che la data inizio sia antecedente o uguale a quella di
            fine
          </span>
        )}
      </div>
      <button type="submit">
        <Btn text="invia" />
      </button>
    </form>
  </div>
);

export default Form;
