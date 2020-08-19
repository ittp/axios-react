import React from "react";
import { render } from "react-dom";
import axios from "axios";

class App extends React.Component {
  state = {
    loading: true,
    error: "",
    data: null
  };
  loadData = () => {
    this.setState({ loading: true });
    return axios
      .get(
        "https://api.ittpd.ru/items"
      )
      .then((result) => {
        console.log(result);
        this.setState({
          data: result.data,
          loading: false,
          error: false
        });
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState({
          // objects cannot be used as a react child
          // -> <p>{error}</p> would throw otherwise
          error: `${error}`,
          loading: false
        });
      });
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return (
        <p>
          There was an error loading the repos.{" "}
          <button onClick={this.loadData}>Try again</button>
        </p>
      );
    }
    return (
      <form id="items">
        <h1>Data</h1>
        {data.map((item) => (
          <React.Fragment>
            <div class="row" key={item.id}>
              <input readOnly="true" defaultValue={item.order} />
              <input defaultValue={item.cargo} />
              <input defaultValue={item.quantity} />
              <input defaultValue={item.gross} />
              <input defaultValue={item.port} />
              <button>B</button>
            </div>
          </React.Fragment>
        ))}
      </form>
    );
  }
}

render(<App />, document.getElementById("root"));
