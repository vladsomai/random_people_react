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
        window.scrollBy(0, 100);
      });
  };

  return (
    <div className="container">
      <div className="sticky-top pb-1 pt-1 text-center d-flex flex-column">
        <h1 className="bg-secondary text-light rounded-pill mx-5 my-3 py-3">
          Random people
        </h1>
        <div className="">
          <button className="btn btn-lg btn-primary" onClick={fetchPerson}>
            Add person
          </button>
        </div>
      </div>
      {Object.keys(People).length === 0 ? null : (
        <table className="table text-center table-striped table-hover mt-5 table-dark border-secondary table-bordered">
          <thead>
            <tr className='fs-2'>
              <th className='bg-secondary'>First name</th>
              <th className='bg-secondary'>Last name</th>
              <th className='bg-secondary'>Email</th>
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
