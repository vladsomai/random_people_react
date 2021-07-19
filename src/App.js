import React, { useState } from "react";

const App = () => {
  const [People, setPerson] = useState([]);

  const fetchPerson = () => {
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((RandomPeople) => {
        for (let RandomPerson of RandomPeople.results) {
          setPerson([...People, RandomPerson]);
          console.log(RandomPerson.name.first);
        }
        console.log("Random person fetched..");
      });
  };

  const printAllPeople = () => {
    for (let Person of People) {
      console.log(Person.name.first);
    }
  };

  return (
    <div className="container text-center">
      <h1 className=" bg-secondary text-light rounded-3 m-5 pb-3 pt-3">
        Random people
      </h1>

      <div className="d-flex justify-content-around">
        <button className="btn btn-lg btn-success" onClick={fetchPerson}>
          Add person
        </button>
        <button className="btn btn-lg btn-info" onClick={printAllPeople}>
          Print all
        </button>
      </div>

      {Object.keys(People).length === 0 ? null : (
        <table className="table table-striped table-hover mt-5">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {People.map((Person) => (
              <tr key={People.indexOf(Person)}>
                <td>{Person.name.first}</td>
                <td>{Person.name.last}</td>
                <td>{Person.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default App;
