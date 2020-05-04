import React, { useState, useEffect } from "react";
import ListaRisultati from "../../component/ListaRisultati/ListaRisultati.jsx";
import ListaFilter from "../../component/ListaFilter/ListaFilter.jsx";
import { db } from "../../firebase";
import CITTA from "../../utils/cittas.js";
import CATEGORIE from "../../utils/categorie.js";
import "./ListaLayout.scss";

const ListaLayout = () => {
  const [filterData, setFilterData] = useState({
    citta: { nome: "", id: "" },
    keyword: "",
    dataInizio: "",
    dataFine: "",
    categoria: { nome: "", id: "" },
  });

  const [itemsList, setItemsList] = useState([]);
  const [isLoading, setIsLoadingt] = useState(true);

  useEffect(() => {
    const listaRef = db.collection("aggratis");

    listaRef.onSnapshot((snapshot) => {
      const data = [];
      console.log(data);

      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setItemsList(data);
      setIsLoadingt(false);
    });
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setItemsList({ [inputName]: inputValue });
  };

  const selectCategoria = (nomeCategoria, idCategoria) => {
    let selected = { nome: nomeCategoria, id: idCategoria };
    setFilterData({ categoria: selected });
  };

  const selectCitta = (nomeCitta, idCitta) => {
    let selected = { nome: nomeCitta, id: idCitta };
    setFilterData({ citta: selected });
  };

  const getResults = () => {
    setIsLoadingt(true);

    let listaRef = db.collection("aggratis");
    let queryRef;
    // citta
    if (filterData && filterData.citta && filterData.citta.nome) {
      queryRef = listaRef.where(
        "citta.nome",
        "==",
        filterData.citta.nome.toLowerCase()
      );
    }
    // input parola chiave
    if (filterData && filterData.keyword) {
      queryRef = listaRef.where(
        "titolo",
        "==",
        filterData.keyword.toLowerCase()
      );
    }
    // categoria
    if (filterData && filterData.categoria && filterData.categoria.nome) {
      queryRef = listaRef.where(
        "categoria.nome",
        "==",
        filterData.categoria.nome.toLowerCase()
      );
    }
    //data
    if (filterData && filterData.dataInizio) {
      queryRef = listaRef.where("fromDate", ">=", filterData.dataInizio);
      // how add a date
      // admin.firestore.Timestamp.fromDate(new Date("December 10, 1815"));
      // Date.prototype.setMonth();
      // Date.prototype.setDate();
      // Date.prototype.setYear();
    }

    queryRef.onSnapshot((snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setItemsList(data);
      setIsLoadingt(false);
    });
  };

  return (
    <div>
      <ListaFilter
        {...filterData}
        handleInput={handleInput}
        selectCategoria={selectCategoria}
        listaArrCategorie={CATEGORIE}
        selectCitta={selectCitta}
        listaArrCitta={CITTA}
      />
      <button onClick={getResults}>filtra</button>
      <ListaRisultati isLoading={isLoading} itemsList={itemsList} />
    </div>
  );
};

export default ListaLayout;
