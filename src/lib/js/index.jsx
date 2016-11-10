import React from "react";
import ReactDOM from "react-dom";
import CountriesSelect from "./CountriesSelect.jsx";
import MultiSelect from "./MultiSelect.jsx";

if (document.getElementById("react-multi-select-demo###")) {
    ReactDOM.render(
        <MultiSelect items={[{name: "Hello", code: "hl"}, {name: "World", code: "wr"}, {name: "Hey", code: "hi"}]}/>,
        document.getElementById("react-multi-select-demo###")
    )
}

exports.CountriesSelect = CountriesSelect;
export default MultiSelect;
