import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store";
import { Provider } from "react-redux";

// import 'aos/dist/aos.css';
import './assets/css/General.css';
import './assets/css/bootstrap.min.css';
import './assets/css/responsive.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ThirdwebProvider, ChainId, metamaskWallet, coinbaseWallet, walletConnect, localWallet, trustWallet } from "@thirdweb-dev/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
const supportedChainIds = [1, 4, 137, 56];

root.render(
  <Provider store={store}>
    <ThirdwebProvider
      activeChain={ChainId.BinanceSmartChainMainnet}
      supportedChainIds={supportedChainIds}
      clientId="4a554c9ae99ed5036b89278cf9b52843"
      secretKey="onGgdhv_TRztxsxN2s2prK4yzSpxk94Dnx151HEL_O0PRkYwmPMqmUEeEhB41chZtCHsW6P-V0QCh1kqVulEwg"
       supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        trustWallet(),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();