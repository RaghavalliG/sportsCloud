import react from "react";
import { useState } from "react";

function Sizes({ getSize }) {
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const [inputFields, setInputFields] = useState([{ size: "", quantity: "" }]);

  const handleChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    console.log(data);
    getSize(data);
  };

  const addFields = (e) => {
    e.preventDefault();
    let newfield = { size: "", quantity: "" };
    setInputFields([...inputFields, newfield]);
  };

  return (
    <div className="App row">
      {inputFields?.map((input, index) => (
        <>
          <div className="col-md-6">
            <div className="prefarance-form-list">
              <label className="input-label">Size</label>

              <select
                className="input-select"
                name="size"
                onChange={(event) => handleChange(index, event)}
              >
                <option>Select Size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>2XL</option>
                <option>3XL</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="prefarance-form-list">
              <label className="input-label">Quantity</label>
              <input
                type="text"
                className="input-select"
                name="quantity"
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          </div>
        </>
      ))}
      <div className="col-md-12">
        <button
          className="btn mt-2 p-0"
          style={{ color: "#ff2512", fontSize: "1rem" }}
          onClick={addFields}
        >
          Add More..
        </button>
      </div>
    </div>
  );
}

export default Sizes;
