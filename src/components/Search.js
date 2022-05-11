import { useState } from "react";

import { Range, getTrackBackground } from "react-range";

const Search = ({
  sort,
  setSort,
  fetchOffer,
  values,
  setValues,
  setPage,
  valueForChange,
  setValueForChange,
  setLimit,
  // priceMax,
  // setPriceMax,
  // setPriceMin,
}) => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 500;

  return (
    <div className="container-search">
      <form onSubmit={() => {}}>
        {/* <input type="checkbox" onChange={handleCheckBox} /> */}
        <div
          className={
            sort === false ? "checkboxSort" : "checkboxSort checkedSort"
          }
          onClick={() => {
            setSort(!sort);
          }}>
          <div className="selectorSort"></div>
        </div>

        <div className="range">
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onFinalChange={(v) => {
              setValueForChange(v);
            }}
            onChange={(values) => {
              setValues(values);
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "5px",
                  display: "flex",
                  width: "100%",
                }}>
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: values,
                      colors: ["#ccc", "#2DB0BA", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}>
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#2DB0BA",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}>
                <div className="valueRange">
                  <p>{values[props.key]}</p>
                </div>
                <div
                  style={{
                    height: "5px",
                    width: "5px",
                    backgroundColor: isDragged ? "#548BF4" : "#CCC",
                  }}
                />
              </div>
            )}
          />
          <div className="valuesRange"></div>
        </div>
        <div className="select">
          <select
            name="limit"
            id="limit"
            onChange={(e) => {
              setLimit(e.target.value);
            }}>
            <option value="1">Limit</option>
            <option value="2">2</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
          </select>
        </div>
        {/* <input
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
        /> */}
        {/* <input
          type="number"
          placeholder="limit"
          onChange={(e) => {
            setLimit(e.target.value);
          }} */}
        {/* /> */}
      </form>
    </div>
  );
};
export default Search;
