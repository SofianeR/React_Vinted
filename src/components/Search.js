const Search = ({ sort, setSort, setPriceMax, setPriceMin }) => {
  return (
    <div className="container-search">
      <input
        type="checkbox"
        onChange={() => {
          setSort(!sort);
        }}
      />
      <input
        type="number"
        placeholder="priceMax"
        onChange={(e) => {
          setPriceMax(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="priceMin"
        onChange={(e) => {
          setPriceMin(e.target.value);
        }}
      />
    </div>
  );
};
export default Search;
