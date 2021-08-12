import React from "react";

const LoadingElement = (
  <div
    id="PageLoaderContainer"
    className="animate__animated animate__fadeIn text-white position-fixed top-50 start-50 translate-middle display-6"
  >
    <div
      role="status"
      className="spinner-border mb-4"
      style={{ width: "20rem", height: "20rem" }}
    ></div>

    
    <p className="display-3"><br></br>&nbsp;Loading..</p>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      People: [],
      API_Responded: true,
      PageIsLoading: true,
    };
  }

  fetchPerson = () => {
    fetch("https://randomuser.me/api")
      .then((response) => {
        if (response.ok) {
          this.setState({ API_Responded: true });
          return response.json();
        } else {
          return;
        }
      })
      .then((RandomPeople) => {
        for (let RandomPerson of RandomPeople.results) {
          this.setState((state) => {
            const PersonAdded = state.People.concat(RandomPerson);
            return {
              People: PersonAdded,
            };
          });
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
        this.setState({ API_Responded: true });
      });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        PageIsLoading: false,
      });
    }, 500);
  }
  render() {
    console.log(this.state.PageIsLoading);
    if (this.state.PageIsLoading) {
      return LoadingElement;
    } else {
      return (
        <div className="container">
          <div id="main_page" className="animate__animated animate__fadeIn">
            <div className="sticky-top d-flex flex-column text-center ">
              <div className="bg-secondary text-light rounded-pill my-3 py-3 d-flex justify-content-center">
                <h1 className="animate__animated animate__slideInLeft">
                  Random &nbsp;
                </h1>
                <h1 className="animate__animated animate__slideInRight">
                  people
                </h1>
              </div>

              <div className="">
                <button
                  className="btn btn-lg btn-primary"
                  onClick={this.fetchPerson}
                >
                  Add person
                </button>
              </div>
            </div>
            {Object.keys(this.state.People).length === 0 ? null : (
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
                    {this.state.People.map((Person) => (
                      <tr key={this.state.People.indexOf(Person)}>
                        <td>{Person.name.first}</td>
                        <td>{Person.name.last}</td>
                        <td>{Person.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!this.state.API_Responded ? (
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
        </div>
      );
    }
  }
}
export default App;
