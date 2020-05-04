import React from "react";
import onClickOutside from "react-onclickoutside";
import "./FormDropdown.scss";

class FormDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }

  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  }
  toggleList() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  toggleItem(nome, id) {
    const { selectItem } = this.props;
    this.toggleList();
    selectItem(nome, id);
  }

  render() {
    const { isOpen } = this.state;
    const { selectedObj, defaultTxt, listArr } = this.props;
    return (
      <div className="dropdown">
        <div
          className={`dropdown__header ${
            isOpen ? "dropdown__header--open" : ""
          }`}
          onClick={() => this.toggleList()}
        >
          <div
            className={`dropdown__header-title ${
              !selectedObj ||
              selectedObj.id === "" ||
              selectedObj.id === "undefined"
                ? ""
                : "dropdown__header-title--selected"
            }`}
          >
            {selectedObj && selectedObj.id && selectedObj.id !== "undefined"
              ? selectedObj.nome
              : defaultTxt}
          </div>
          <span
            className={`dropdown__arrow dropdown__arrow--up ${
              isOpen ? "dropdown__arrow--active" : ""
            }`}
          ></span>
          <span
            className={`dropdown__arrow dropdown__arrow--down ${
              !isOpen ? "dropdown__arrow--active" : ""
            }`}
          ></span>
        </div>
        {isOpen && (
          <ul className="dropdown__list">
            {listArr.map((item) => (
              // <span>{console.log(item)}</span>
              <li
                className={`dropdown__list-item dropdown__list-item${
                  selectedObj && selectedObj.id === item.id ? "--selected" : ""
                }`}
                key={item.id}
                onClick={() => this.toggleItem(item.nome, item.id)}
              >
                {item.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default onClickOutside(FormDropdown);
