import React from "react";
import "./App.css";
import Movies from "./components/Movies";
// import {addMovies} from "./Database";

import * as Realm from "realm-web";

const credentials = { usr: "pdelebarre@gmail.com", pwd: "msgiphil" };

// const REALM_APP_ID = "realm-movie-nite-dtfju"; // e.g. myapp-abcde
// const app = Realm.App.getApp({ id: REALM_APP_ID });

// // Create a component that displays the given user's details
// function UserDetail({ user }) {
//   return (
//     <div>
//       <p>Logged in with id: {user.id}</p>
//     </div>
//   );
// }

// Create a component that lets an anonymous user log in
function Login({ setUser }) {
  async function loginEmailPassword(cred) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(cred.usr, cred.pwd);
    // Authenticate the user
    const user = await app.logIn(credentials);
    setUser(user);
  }

  // const  loginApiKey = async (apiKey) => {
  //   // Create an API Key credential
  //   const credentials = Realm.Credentials.apiKey(apiKey);
  //   const user = await app.logIn(credentials);
  //   setUser(user);
  // }

  //return <button onClick={loginApiKey("kzaedvmISl5nUeWa")}>Log In</button>;

  return <button onClick={loginEmailPassword(credentials)}>Log In</button>;
}

// Declare Schema
const MovieSchema = {
  name: "Movies",
  properties: {
    id: "int",
    title: "string",
    genres: "string",
    overview: "string",
    posterpath: "string",
    voteaverage: "int",
    watched: "boolean",
  },
};

const App = () => {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState(app.currentUser);

  //const mongodb = user.mongoClient("mongodb-atlas");

  // const addMovies = () => {
  //   const movies = mongodb.db("movie-nite").collection("movies");
  //   for (let i = 0; i < 3; i++) {
  //     movies.insertOne({
  //       title: "Harry Putter " + i,
  //       overview: "bla bla",
  //     });
  //   }
  // };

  // If a user is logged in, show their details.
  // Otherwise, show the login screen.
  return (
    <div className="App">
      <div className="App-header">
      {/* {user ? <UserDetail user={user} /> : <Login setUser={setUser} />} */}
      {user ? <Movies user={user}/> : <Login setUser={setUser} />}
      </div>
      {/* <button type="button" onClick={addMovies}>
        Add movies
      </button> */}
    </div>
  );
};

export default App;
