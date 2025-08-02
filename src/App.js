import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';
import PokemonList from './components/PokemonList';

function App() {
  const [searchName, setSearchName] = useState(""); // từ khóa tìm kiếm
  const [inputValue, setInputValue] = useState(""); // giá trị ô input

  // Hàm search và clear input
  const handleSearch = () => {
    if (!inputValue.trim()) return; // không search nếu rỗng
    setSearchName(inputValue);
    setInputValue(""); // clear input
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <img
          src="/pokemon-logo.png"
          alt="Pokemon Logo"
          className="logo"
          onClick={() => window.location.reload()}
        />
        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          onEnter={handleSearch}  // truyền handleSearch cho Enter
        />

        <SearchButton onClick={handleSearch} />
      </div>

      <div>
        <PokemonList searchName={searchName} />
      </div>
    </div>
  );
}

export default App;
