import { useEffect, useState } from "react";
import axios from "axios";

const PokemonDetail = ({ pokemonUrl, onClose }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await axios.get(pokemonUrl);
            setData(res.data);
        };
        fetchDetail();
    }, [pokemonUrl]);

    if (!data) return <div className="modal"><p>Đang tải...</p></div>;

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>{data.name.toUpperCase()}</h2>
                <img src={data.sprites.front_default} alt={data.name} />

                {/* Chiều cao và cân nặng đã đổi đơn vị */}
                <p>Chiều cao: {data.height * 10} cm</p>
                <p>Cân nặng: {data.weight / 10} kg</p>

                <p>
                    Loại:{" "}
                    {data.types.map((t) => t.type.name).join(", ")}
                </p>
            </div>
        </div>
    );
};

export default PokemonDetail;
