import { Meteor } from "meteor/meteor";
import { UsersCollection } from "../imports/api/users";

function insertLink({ title, url }) {
  UsersCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.methods({
  async getConfirmedList(limit = 10) {
    let pipeline = [
      {
        $match: {
          stato: "confermata",
        },
      },
      {
        $limit: limit,
      },
    ];
    return await UsersCollection.rawCollection().aggregate(pipeline).toArray();
  },
  async atlasSearchList(values) {
    let { text = "", limit = 10 } = values;
    let pipeline = [
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                autocomplete: {
                  query: text,
                  path: "idPratica",
                },
              },
              {
                autocomplete: {
                  query: text,
                  path: "genitore.nome",
                },
              },
              {
                autocomplete: {
                  query: text,
                  path: "genitore.cognome",
                },
              },
            ],
          },
        },
      },
      {
        $limit: limit
      }
    ];
    return await UsersCollection.rawCollection().aggregate(pipeline).toArray();
  },
});

Meteor.startup(async () => {});
