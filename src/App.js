import './App.css';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Wiki</h1>
        <SearchBar />
        <SearchButton />
      </div>
      <div>
        {/* <PokemonList /> */}
      </div>
    </div>
  );
}

export default App;
