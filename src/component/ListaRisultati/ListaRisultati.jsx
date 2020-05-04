import React from "react";
// import { db } from "../../firebase";
import "./ListaRisultati.scss";

const ListaRisultati = ({ isLoading, itemsList }) => {
  // get data once
  // let allEntities;
  // const listaRef = db.collection("aggratis");
  // listaRef.get().then((snapshot)=>{
  //   if(snapshot.docs){
  //     allEntities =  snapshot.docs.map(doc => doc.data());
  //     console.log('type',typeof allEntities, allEntities);
  //     // snapshot.docs.forEach((doc =>{
  //     //   console.log(doc.data());
  //     // }));
  //   } else {
  //     console.log('no data');
  //   }
  // });

  // const [itemsList, setItemsList] = useState([]);
  // const [isLoading, setIsLoadingt] = useState(true);

  // useEffect(() => {
  //   const listaRef = db.collection("aggratis");

  //   listaRef.onSnapshot((snapshot) => {
  //     const data = [];
  //     console.log(data);

  //     snapshot.forEach((doc) => {
  //       data.push({ ...doc.data(), id: doc.id });
  //     });
  //     setItemsList(data);
  //     setIsLoadingt(false);
  //   });
  // }, []);

  return (
    <div className="lista-layout">
      {isLoading && <span>...is loading</span>}
      {!isLoading && itemsList.length === 0 && (
        <div className="lista-layout__no-result">nessun risultato</div>
      )}

      <ul>
        {itemsList &&
          itemsList.length > 0 &&
          itemsList.map((item) => (
            <li className="lista-layout__singolo-risultato" key={item.id}>
              {item.link && (
                <a
                  className="lista-layout__titolo-risultato"
                  href={`${item.link}`}
                >
                  {item.titolo}
                </a>
              )}
              {!item.link && (
                <span className="lista-layout__titolo-risultato">
                  {item.titolo}
                </span>
              )}
              <div className="lista-layout__item-info">
                <span>{item.citta.nome}</span> |{" "}
                {item.fromDate && (
                  <>
                    <span className="lista-layout__item-label">da</span>{" "}
                    <span>{item.fromDate}</span>
                  </>
                )}{" "}
                {item.toDate && (
                  <>
                    <span className="lista-layout__item-label">a</span>{" "}
                    <span>{item.toDate}</span>
                  </>
                )}
              </div>
              <div className="lista-layout__item-more-info">
                {item.link && <a href={`${item.link}`}>link al sito</a>}{" "}
                {item.ashtag && (
                  <>
                    <span className="lista-layout__item-label">ashtag:</span>{" "}
                    {item.ashtag}
                  </>
                )}
              </div>
              <div>{item.descrizione}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListaRisultati;
