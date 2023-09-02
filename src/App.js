// import React, { useEffect } from "react";
// import "./App.scss";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Web3ReactProvider } from "@web3-react/core";
// import Web3 from "web3";
// import { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Aos from "aos";
// import Login from "./page/Login/index";
// import ResetPassword from "./page/ResetPassword/ResetPassword";
// import Dashboard from "./page/Dashboard/Dashboard";
// import Staking from "./page/Staking/Staking";
// import Withdrawal from "./page/Withdrawal/Withdrawal";
// import StackingRepors from "./page/StackingRepors/StackingRepors";
// import TransferRepors from "./page/TransferRepors/TransferRepors";
// import LavalincomeRepors from "./page/LavalincomeRepors/LavalincomeRepors";
// import Admin from "./page/Admin/Admin";
// import Achievementbouns from "./page/Achievementbouns";
// import Passivebouns from "./page/Passivebouns";
// import Daireacttermpage from "./page/Daireactterm/Daireacttermpage";
// import Totaltrempage from "./page/Totaltrem/Totaltrem";
// import ReferAndEarnReport from "./page/ReferAndEarn/ReferAndEarn";
// import Support from "./page/Support/Support";
// import Homepage3 from "./page/HomeDemo3";
// import "aos/dist/aos.css";
// import Adminlogin from "./page/Adminlogin";
// import Alltranfrorreport from "./page/Admin/Alltranfrorreport";
// import Adminwithdraw_details from "./page/Admin/Adminwithdraw_details";
// import Allicome from "./page/Allicome";
// import { Allicomebouns } from "./Redux/Achievement";
// import Allcome1 from "./page/Allcome1";
// import Livaprice from "./page/Admin/Livaprice";
// import AdminTransfer from "./page/Admin/AdminTransfer";
// import Profile from "./page/Profile/Profile";
// import AdminSupport from "./page/Admin/AdminSupport";
// import Mainwallate from "./page/Mainwallate/Mainwallate";
// import Ewallate from "./page/Ewallate/Ewallate";
// import SecOurRoadmap from "./page/HomeDemo3/SecOurRoadmap";
// import Rodemap from "./page/HomeDemo3/Rodemap";
// import Termsandconditions from "./Termsandconditions";
// import DISCLAIMER from "./Termsandconditions copy";
// import Banars from "./page/Banars/Banars";
// import StakingActive from "./page/StakingActive/StakingActive";
// import Withdrdatadata1 from "./page/Admin/Withdrdatadata1";
// const Spinner = () => {
//   return (
//     <div className="body">
//       <div class="spinner-box">
//         <div class="circle-border">
//           <div class="circle-core"></div>
//         </div>
//       </div>
//     </div>
//   );
// };
// function App() {
//   const [step, setstep] = useState(false);
//   const getLibrary = (provider) => {
//     return new Web3(provider);
//   };

//   useEffect(() => {
//     Aos.init({
//       duration: 1000,
//     });
//   }, []);
//   return (
//     <>
//       <Web3ReactProvider getLibrary={getLibrary}>
//         <BrowserRouter>
//           <React.Suspense fallback={<Spinner />}>
//             <Routes>
//               <Route exact path="" element={<Homepage3 />} />
//               <Route exact path="/login" element={<Login />} />
//               <Route exact path="/Adminlogin" element={<Adminlogin />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route
//                 path="/reset-password/:token"
//                 element={<ResetPassword />}
//               />
//               <Route path="/Staking" element={<Staking />} />
//               <Route path="/Profile" element={<Profile />} />
//               <Route path="/admin/dashboard" element={<Admin />} />
//               <Route path="/admin/tranforreport" element={<Alltranfrorreport />} />
//               <Route path="/admin/withdraw_details" element={<Adminwithdraw_details />} />
//               <Route path="/admin/price" element={<Livaprice />} />
//               <Route path="/admin/Transfer" element={<AdminTransfer />} />
//               <Route path="/admin/Banars" element={<Banars />} />
//               <Route path="/admin/support" element={<AdminSupport />} />
//               <Route path="/Withdrawal" element={<Withdrawal />} />
//               <Route path="/Roadmap" element={<Rodemap />} />
//               <Route path="/daireactterm" element={<Totaltrempage />} />
//               <Route path="/Totaltrem" element={<Daireacttermpage />} />
//               <Route path="/staking/income" element={<StackingRepors />} />
//               <Route path="/admin/all_income" element={<Allicome />} />
//               <Route path="/userallincome" element={<Allcome1 />} />
//               <Route path="/mian/Withdrawal" element={<Mainwallate />} />
//               <Route path="/v4x/Withdrawal" element={<Ewallate />} />
//               <Route path="/Withdrdata" element={<Withdrdatadata1 />} />
//               <Route path="/Staking/Active" element={<StakingActive />} />
//               <Route path="/Termsandconditions" element={<Termsandconditions />} />
//               <Route path="/DISCLAIMER" element={<DISCLAIMER />} />
//               <Route
//                 path="/ReferAndEarn/income"
//                 element={<ReferAndEarnReport />}
//               />
//               <Route path="/transfer/income" element={<TransferRepors />} />
//               <Route path="/Support" element={<Support />} />
//               <Route
//                 path="/Community/Building/income"
//                 element={<LavalincomeRepors />}
//               />
//               <Route
//                 path="/Achievementbouns/Building/income"
//                 element={<Achievementbouns />}
//               />
//               <Route
//                 path="/Passivebouns/Building/income"
//                 element={<Passivebouns />}
//               />
//             </Routes>
//             <ToastContainer />
//           </React.Suspense>
//         </BrowserRouter>
//       </Web3ReactProvider>
//     </>
//   );
// }

// export default App;
import { ConnectWallet, useAddress, useContract, useTransferToken, Web3Button } from "@thirdweb-dev/react";
import v4x from "./Helpers/v4x.json";
import Web3 from "web3";
import Button from "./components/ButtonField";

function App() {
  const contractAddress = "0x0a786CDc660C437f5F286548221232a8d4e53441";
  const { contract } = useContract(contractAddress);
  const {
    mutate: transferTokens,
    isLoading,
    error,
  } = useTransferToken(contract);

  const toAddress = "0xA5BFD1F06E394B7901D587A1a96002C1548F915f";
  const amount = "0.1";
  const getWeb3 = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider);
      return web3;
    } catch (err) {
      console.log("error", err);
    }
  };
  const account = useAddress();
  const Mainwalletstacking = async (e) => {
    if (e === "dappwalletstacking") {
      if (account) {
        let web3 = await getWeb3();
        let contract = await new web3.eth.Contract(
          v4x,
          "0x55d398326f99059fF775485246999027B3197955"
        );
        const decimal = await contract.methods.decimals().call();
        await contract.methods
          .transfer(
            process.env.REACT_APP_OWNER_ADDRESS,
            web3.utils.toBN(0.1 * Math.pow(10, decimal))
          )
          .send({
            from: account,
          })
          .on("receipt", async (receipt) => {
            console.log(receipt);
          });
      } else {
      }
    }
  };
  return (<>
    <ConnectWallet
      theme={"light"}
      btnTitle="Connect Your Wallate"
      style={{
      }}
    />  <Button
      className={" w-100 text-light"}
      Stake={false}
      style={{
        background: "#02a2c4",
        height: 52,
        border: "none",
      }}
      onClick={() => {
        Mainwalletstacking("dappwalletstacking");
      }}
      label={"Stake Using DAPP Wallet"}
    />
    <Web3Button
      contractAddress={contractAddress}
      action={async () => {
        await transferTokens({
          to: toAddress,
          amount: amount,
        });
      }
      }
    >
      Transfer
    </Web3Button >
  </>
  );
}
export default App;