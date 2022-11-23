import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users";

export const AggregateList = () => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    console.log("calling")
    Meteor.call("getConfirmedList", 10, (err, values) => {
      if (err) {
        console.error("Error in getConfirmedList");
      }
      console.log(values);
      setLinks(values);
    });
  }, []);

  return (
    <div>
      <h2>Aggregate List from Normal Aggregation</h2>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>idPratica</th>
            <th style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>stato</th>
            <th style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>mail</th>
            <th style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>Genitore Nome</th>
            <th style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>Genitore CogNome</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.idPratica}>
              <td style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>{link.idPratica}</td>
              <td style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>{link.stato}</td>
              <td style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>{link.mail}</td>
              <td style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>{link.genitore.nome}</td>
              <td style={{ border: "1px solid black", margin: "5px", padding: "2px" }}>{link.genitore.cognome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
