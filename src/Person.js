import React from "react";

class PersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: "none",
    };
  }
  fetchJSON_Person = () => {
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((response) =>
        this.setState({ items: response.results.name.first })
      );
  };

  render() {
    return (
      <div className="container">
        <p>Person: {this.state.items}</p>
        <button
          className="btn btn btn-light btn-lg"
          onClick={this.fetchJSON_Person}
        >
          Get person
        </button>
      </div>
    );
  }
}

export default PersonTable;
