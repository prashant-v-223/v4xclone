// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = "http://localhost:8080/";
export const apiList = {
  Signup: baseURL + "api/registration/signUp",
  Signin: baseURL + "api/registration/signIn",
  adminSignin: baseURL + "api/admin/signIn",
  Foegotpassword: baseURL + "api/registration/forgotPassword",
  profileupdate: baseURL + "api/registration/profileupdate",
  ChangePassword: baseURL + "api/registration/changepassword",
  livaprice: process.env.REACT_APP_API_URL + "api/registration/livaprice",
  Stacking: baseURL + "api/staking/addstacking",
  allicome: baseURL + "api/staking/allicome",
  allicome1: baseURL + "api/staking/allicome1",
  allstacking: baseURL + "api/user/allstacking",
  gelUserWallate: baseURL + "api/user/gelUserWallate",
  getwallateblance: baseURL + "api/Withdraw/stackingbouns",
  tranferotpsend: baseURL + "api/Withdraw/tranferotpsend",
  Stackingbouns: baseURL + "api/staking/stackingbouns",
  transfercoin: baseURL + "api/user/transfercoin",
  Communityincome: baseURL + "api/user/Community/Building/income",
  getwallateblance121: baseURL + "api/Withdraw/checkotp",
  Withdrdatadata: baseURL + "api/Withdraw/Withdrdata",
  adminalluserget: baseURL + "api/admin/allusers",
  adminuserblock: baseURL + "api/admin/adminuserblock",
  emailcheng: baseURL + "api/admin/emailcheng",
  admintranfor: baseURL + "api/admin/tranforcoins",
  adminwallateblock: baseURL + "api/admin/userwallateblock",
  userRemove: baseURL + "api/admin/userRemove",
  adminalltranfor: baseURL + "api/admin/alltranfor",
  adminprice: baseURL + "api/admin/priceV4X",
  adminsensamount: baseURL + "api/admin/sendamonut",
  Adminsupport: baseURL + "api/admin/supportdata",
  AdminBuystack: baseURL + "api/admin/Buystack",
  Achievementblock: baseURL + "api/user/Achievement/Building/income",
  Passiveblock: baseURL + "api/user/Passive/Building/income",
  daireactteam: baseURL + "api/user/daireactteam",
  indaireactteam: baseURL + "api/user/indaireactteam",
  Mainwallate: baseURL + "api/Withdraw/mainWallet",
  V4X: baseURL + "api/Withdraw/V4XWallet",
  AllBuystack: baseURL + "api/admin/AllBuystack",
  Withdrawdata: baseURL + "api/admin/Withdrawdata",
  Withdrdatadatauser: baseURL + "api/Withdraw/Withdrdatadatauser",
};
