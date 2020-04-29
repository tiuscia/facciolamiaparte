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
      <ul>
        {itemsList &&
          itemsList.length > 0 &&
          itemsList.map((item) => (
            <li key={item.id}>
              <div className="lista-layout__item">
                {item.link && <a href={`${item.link}`}>{item.titolo}</a>}

                {!item.link && <span>{item.titolo}</span>}
                <div className="lista-layout__item-info">
                  <span>{item.citta.nome}</span> |{" "}
                  <span className="lista-layout__item-label">da</span>{" "}
                  {item.fromDate}{" "}
                  <span className="lista-layout__item-label">a</span>{" "}
                  {item.toDate}
                </div>
                <div className="lista-layout__item-info">
                  {item.link && <a href={`${item.link}`}>link al sito</a>}
                  {item.ashtag && (
                    <>
                      <span className="lista-layout__item-label">ashtag:</span>
                      {item.ashtag}
                    </>
                  )}
                </div>
                <div>{item.descrizione}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListaRisultati;
