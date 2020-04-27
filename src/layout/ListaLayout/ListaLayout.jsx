import React from "react";
import ListaRisultati from '../../component/ListaRisultati/ListaRisultati.jsx';
import "./ListaLayout.scss";

class ListaLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citta: '',
      keyword:'',
      dataInizio:'',
      dataFine:'',
      categoria:''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {}

  submitForm = event => {
    // reset
    // this.setState({ requiredError: false });
    // this.setState({ dateError: false });

    // event.preventDefault();
    // this.checkDate();
    // this.checkRequired();
  };

  handleInput(evt) {
    // let inputName = evt.target.name;
    // let inputValue = evt.target.value;
    // this.setState({ [inputName]: inputValue });
  }

  render() {
    // const {
    //     citta,
    //     keyword,
    //     dataInizio,
    //     dataFine,
    //     categoria
    // } = this.state;
    return (
      <div>
        <ListaRisultati />
      </div>
    );
  }
}

export default ListaLayout;
