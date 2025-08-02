const SearchButton = ({ onClick }) => {
    return (
        <div>
            <button className="search-button" onClick={onClick}>
                Tìm kiếm
            </button>
        </div>
    );
};

export default SearchButton;
