import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme/theme";

import App from "./App";
import './index.css'
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>

<App/>

</ThemeProvider>
    </PersistGate>
  </Provider>,
);
