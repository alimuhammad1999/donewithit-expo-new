import { Listing } from "../Screens/ListingScreen";

export default Object.freeze({
    LISTING_DETAILS: "ListingDetails",
    LISTING_ADD: "AddListing",
    LISTING_SCREEN: "ListingScreen",
    ACCOUNT: "Account",
    ACCOUNT_DETAILS: "AccountDetails",
    MESSAGES: "Messages",
    LOGIN: "Login",
    REGISTER: "Register",
    WELCOME: "Welcome",
})

export type RootStackParamList = {
    ListingDetails: Listing; // Expects a Listing object as a parameter
    ListingScreen: undefined;
    Account: undefined;
    AccountDetails: undefined;
    Messages: undefined;
    Login: undefined;
    Register: undefined;
    Welcome: undefined;
};