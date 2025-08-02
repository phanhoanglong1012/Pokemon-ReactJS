const SearchBar = ({ value, onChange, onEnter }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Nhập tên Pokemon ..."
                className="search-bar"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && onEnter) {
                        onEnter();
                    }
                }}
            />
        </div>
    );
};

export default SearchBar;
