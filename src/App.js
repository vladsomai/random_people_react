import React, { useState } from "react";

const App = () => {
  const [People, setPerson] = useState([]);

  const [API_Responded, setAPIResponded] = useState(true);

  const fetchPerson = () => {
    fetch("https://randomuser.me/api")
      .then((response) => {
        if (response.ok) {
          setAPIResponded(true);
          return response.json();
        } else {
          return;
        }
      })
      .then((RandomPeople) => {
        for (let RandomPerson of RandomPeople.results) {
          setPerson([...People, RandomPerson]);
          console.log(RandomPerson.name.first);
        }
        console.log("Random person fetched..");
        window.scrollBy(0, 100);
      })
      .catch((error) => {
        console.log(
          "Could not fetch data from randomuser.me/api, please check your internet connection!"
        );
        // console.log(error);
        setAPIResponded(false);
      });
  };

  return (
    <div className="container">
      <div className="sticky-top d-flex flex-column text-center">
        <h1 className="bg-secondary text-light rounded-pill my-3 py-3">
          Random people
        </h1>
        <div className="">
          <button className="btn btn-lg btn-primary" onClick={fetchPerson}>
            Add person
          </button>
        </div>
      </div>
      {Object.keys(People).length === 0 ? null : (
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover mt-5 table-dark border-secondary table-bordered text-center">
            <thead>
              <tr className="fs-5">
                <th className="bg-secondary">First name</th>
                <th className="bg-secondary">Last name</th>
                <th className="bg-secondary">Email</th>
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
        </div>
      )}
      {!API_Responded ? (
        <p className="display-1 text-warning text-center">
          Data cannot be fetched!
        </p>
      ) : (
        <p className="text-white"></p>
      )}

      <footer className="text-center">
        <p className="text-light">&copy; Vlad Somai</p>
      </footer>
    </div>
  );
};
export default App;
