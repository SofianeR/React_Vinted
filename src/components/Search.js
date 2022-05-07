const Search = ({ sort, setSort, setPriceMax, setPriceMin, setLimit }) => {
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
      <input
        type="number"
        placeholder="limit"
        onChange={(e) => {
          setLimit(e.target.value);
        }}
      />
    </div>
  );
};
export default Search;
