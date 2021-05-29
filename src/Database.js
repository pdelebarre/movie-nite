// import * as Realm from "realm-web";

// Declare Schema
// const MovieSchema = {
//   name: "Movies",
//   properties: {
//     id: "int",
//     title: "string",
//     genres: "string",
//     overview: "string",
//     posterpath: "string",
//     voteaverage: "int",
//     watched: "boolean",
//   },
// };

// Create realm
// new Realm.open({ schema: [MovieSchema], schemaVersion: 1 }).then((realm) => {
//   for (let i = 0; i < 3; i++) {
//     realm.write(() => {
//       const movie = realm.create("Movie", {
//         title: "Harry Putter " + i,
//         overview: "bla bla",
//       });
//     });
//   }
// });

// let addMovies = () => {
//     for(let i = 0; i < 3; i++){
//       realm.write(() => {
//         const movie = realm.create('Movie', {
//           title: 'Harry Putter ' + i,
//           overview:  "bla bla",
//         });
//       });
//     }
//   }

// Export the realm
// export {addMovies};
