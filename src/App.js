import "./App.css";

import Main from "./components/Main";

import { EasybaseProvider } from "easybase-react";
import ebconfig from "./ebconfig";

const App = () => {

  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Main />
    </EasybaseProvider>
  );
};

export default App;
