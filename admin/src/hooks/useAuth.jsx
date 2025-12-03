import { useContext } from "react";
import authContext from "../contexts/auth";

export default function useAuth() {
    const {isLoggedIn, setIsLoggedIn} = useContext(authContext);
    return {isLoggedIn, setIsLoggedIn}
}
