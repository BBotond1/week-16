import { useEffect, useState } from "react";
import "./App.css";
import Beer from "./components/Beer";
import Beers from "./components/Beers";
import LoadingMask from "./components/LoadingMask";

function App() {
  const [beers, setBeers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?per_page=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setBeers(data);
        }, 1000);
      });
  }, [perPage]);

  console.log(beers);

  return (
    <div className="App">
      <input
        type="number"
        min="1"
        value={perPage}
        onChange={(event) => {
          setPerPage(event.target.value);
        }}
      />
      <p>filter:</p>
      <input
        type="text"
        placeholder="filter"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />
      {beers.length > 0 ? <Beers beers={beers} filter={filter} /> : <LoadingMask />}
    </div>
  );
}

export default App;
