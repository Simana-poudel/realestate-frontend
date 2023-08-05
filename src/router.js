import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Homepage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import VerifyPage from "./components/VerifyPage";
import PropertyAddPage from "./components/PropertyAddPage";
import OfferPropertyAddPage from "./components/OfferPropertyAddPage";
import OfferPropertyDetailPage from "./components/OfferPropertyDetailPage";
import PropertyDetailPage from "./components/PropertyDetail";
import SearchPage from "./components/SearchPage";
import UserList from "./components/UserList";
import AboutUs from "./components/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children :[
            {
                path:"/",
                element: <HomePage />
            },
            {
                path:"/login",
                element: <LoginPage />
            },
            {
                path:"/register",
                element: <RegisterPage />
            },
            {
                path:"/verify-signup",
                element: <VerifyPage />
            },
            {
                path:"/addproperty",
                element: <PropertyAddPage />
            },
            {
                path:"/offerproperty",
                element: <OfferPropertyAddPage />
            },
            {
                path:"/offerproperty/:offerpropertyId",
                element: <OfferPropertyDetailPage />
            },
            {
                path:"/property/:propertyId",
                element: <PropertyDetailPage />
            },
            {
                path:"/searchproperty/:district/:propertyType",
                element: <SearchPage />
            },
            {
                path:"//searchproperty",
                element: <SearchPage />
            },
            {
                path:"/searchproperty/:propertyType",
                element: <SearchPage />
            },
            {
                path:"/chats",
                element: <UserList />
            },
            {
                path:"/room/:roomId/:ownername",
                element: <UserList />
            },
            {
                path:"/room/:roomId",
                element: <UserList />
            },
            {
                path:"/aboutus",
                element: <AboutUs />
            },

        ]
    },
]);

export default router;