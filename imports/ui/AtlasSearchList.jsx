import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

export const AtlasSearchList = () => {
  const [links, setLinks] = useState([]);
  const [searchText, setSearchText] = useState("");
  let timeOut;
  useEffect(() => {
    Meteor.call("getConfirmedList", 20, (err, values) => {
      if (err) {
        console.error("Error in getConfirmedList");
      }
      console.log(values.length)
      setLinks(values.length == 0 ? [] : values)
    });
  }, []);

  const getData = () => {
    Meteor.call(
      "atlasSearchList",
      { text: searchText, limit: 10 },
      (err, values) => {
        console.log("!23124124", values)
        setLinks(values.length == 0 ? [] : values)
      }
    );
  };

  useEffect(() => {
    if(searchText && searchText !== ""){
        getData();
    }
  }, [searchText]);

  return (
    <div>
      <h2>Atlas Search Aggregation</h2>
      <p>
        <span>Search</span> &nbsp;{" "}
        <input
          type="text"
          onChange={(e) => setSearchText(e?.target?.value)}
          value={searchText}
        />
      </p>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                margin: "5px",
                padding: "2px",
              }}
            >
              idPratica
            </th>
            <th
              style={{
                border: "1px solid black",
                margin: "5px",
                padding: "2px",
              }}
            >
              stato
            </th>
            <th
              style={{
                border: "1px solid black",
                margin: "5px",
                padding: "2px",
              }}
            >
              mail
            </th>
            <th
              style={{
                border: "1px solid black",
                margin: "5px",
                padding: "2px",
              }}
            >
              Genitore Nome
            </th>
            <th
              style={{
                border: "1px solid black",
                margin: "5px",
                padding: "2px",
              }}
            >
              Genitore CogNome
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.idPratica}>
              <td
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "2px",
                }}
              >
                {link.idPratica}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "2px",
                }}
              >
                {link.stato}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "2px",
                }}
              >
                {link.mail}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "2px",
                }}
              >
                {link.genitore.nome}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  margin: "5px",
                  padding: "2px",
                }}
              >
                {link.genitore.cognome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
