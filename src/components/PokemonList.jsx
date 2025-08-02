import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import PokemonDetail from "./PokemonDetail";

const PokemonList = ({ searchName }) => {
    const [allPokemons, setAllPokemons] = useState([]); // danh sách tất cả
    const [filteredPokemons, setFilteredPokemons] = useState([]); // danh sách sau khi lọc
    const [pokemons, setPokemons] = useState([]);       // danh sách hiển thị
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const PAGE_SIZE = 20;

    // Load toàn bộ pokemon 1 lần
    const fetchAllPokemons = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            setAllPokemons(res.data.results);
            setFilteredPokemons(res.data.results);
            setPokemons(res.data.results.slice(0, PAGE_SIZE));
            setLoading(false);
        } catch (err) {
            setError("Lỗi khi tải dữ liệu!");
            setLoading(false);
        }
    };

    // Lọc theo từ khóa search
    useEffect(() => {
        if (!searchName) {
            setFilteredPokemons(allPokemons);
            setOffset(0);
        } else {
            const keyword = searchName.toLowerCase();
            const filtered = allPokemons.filter((p) => p.name.includes(keyword));
            setFilteredPokemons(filtered);
            setOffset(0); // quay về trang đầu khi search mới
        }
    }, [searchName, allPokemons]);

    // Cập nhật danh sách hiển thị theo offset
    useEffect(() => {
        const start = offset;
        const end = offset + PAGE_SIZE;
        setPokemons(filteredPokemons.slice(start, end));
    }, [offset, filteredPokemons]);

    useEffect(() => {
        fetchAllPokemons();
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            {loading && <p>Đang tải...</p>}
            {error && <p className="error-text">{error}</p>}

            {/* Nếu không có kết quả */}
            {pokemons.length === 0 && !loading ? (
                <div className="no-result-center">Không tìm thấy Pokémon!</div>
            ) : (
                <div className="pokemon-list">
                    {pokemons.map((p, index) => (
                        <PokemonCard
                            key={index}
                            name={p.name}
                            url={p.url}
                            onClick={() => setSelectedPokemon(p.url)}   // THÊM DÒNG NÀY
                        />
                    ))}
                </div>
            )}

            {/* Nút phân trang (cả khi search) */}
            {filteredPokemons.length > PAGE_SIZE && (
                <div className="pagination">
                    <button
                        onClick={() => setOffset((prev) => Math.max(prev - PAGE_SIZE, 0))}
                        disabled={offset === 0}
                    >
                        Previous
                    </button>

                    {/* Hiển thị số trang */}
                    <span className="page-info">
                        Page {Math.floor(offset / PAGE_SIZE) + 1} /{" "}
                        {Math.ceil(filteredPokemons.length / PAGE_SIZE)}
                    </span>

                    <button
                        onClick={() =>
                            setOffset((prev) =>
                                prev + PAGE_SIZE >= filteredPokemons.length ? prev : prev + PAGE_SIZE
                            )
                        }
                        disabled={offset + PAGE_SIZE >= filteredPokemons.length}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal hiển thị detail */}
            {selectedPokemon && (
                <PokemonDetail
                    pokemonUrl={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            )}
        </div>
    );
};

export default PokemonList;
