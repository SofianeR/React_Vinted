import { useEffect } from "react";

const Footer = ({ page, setPage, pageCount, isLoading, fetchOffer }) => {
  const paginationArray = [];

  useEffect(() => {
    fetchOffer();
  }, [page]);

  for (let i = 0; i < pageCount; i++) {
    paginationArray.push(
      <button
        key={i}
        onClick={() => {
          setPage(i + 1);
          console.log(page);
        }}>
        {i + 1}
      </button>
    );
  }

  return (
    <footer>
      <div className="pagination">
        {isLoading === true
          ? paginationArray.map((item, index) => {
              return item;
            })
          : null}
      </div>
      <div className="contact">
        <p>
          Made by <span>Le Reacteur</span> 2022
        </p>
      </div>
    </footer>
  );
};
export default Footer;
