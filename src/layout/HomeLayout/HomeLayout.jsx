import React from "react";
import Header from "../../component/Header/Header.jsx";
import TwoBtns from "../../component/TwoBtns/TwoBtns.jsx";
import ListaFilter from '../../component/ListaFilter/ListaFilter.jsx';
import ListaLayout from "../ListaLayout/ListaLayout.jsx";
import "./HomeLayout.scss";

const HomeLayout = () => {
  return (
    <div>
      <Header title="faccio la mia parte" text="L’isolamento ci mette alla prova, qui cerchiamo di raccogliere anche il più piccolo elemento che ci può aiutare a superarlo.

Faccio la mia parte è una raccolta di servizi gratuiti organizzata per categorie e province.

In questo mare di offerte vogliamo darti la possibilità di scegliere cosa davvero ti interessa, ti stimola, ti aiuta.

Il panettiere del tuo paese consegna a domicilio gratis?
Tuo cognato fa dei webinar gratuiti sulla potatura dell'ortensia?
Tua mamma legge libri per bambini su youtube?
Inseriscili aggiungendo una nuova voce alla nostra lista.

“La curiosità può vincere la paura ancor più di quanto possa fare il coraggio” James Stephens"/>
      <TwoBtns />
      <ListaFilter />
      <ListaLayout />
    </div>
  );
};

export default HomeLayout;
