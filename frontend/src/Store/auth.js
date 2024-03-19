import { createContext, useContext, useEffect, useState } from "react";
import abi from '../components/ABI.json';
import Web3 from 'web3';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [state, setState] = useState({
        web3: null,
        contract: null,
        accounts: [],
    });
    const [address, setAddress] = useState(null);
    const isLoggedIn = !!token;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("USER");
    }

    const connectWallet = async () => {
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Ganache
        const contractABI = abi.abi;
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const contract = new web3.eth.Contract(contractABI, contractAddress);
                setAddress(accounts[0]);
                setState({ web3, contract, accounts });
            } else {
                alert('Please install and log in to Metamask wallet to initiate the transaction.');
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("An error occurred while connecting to the wallet. Please try again.");
        }
    }

    const userAuthentication = async () => {
        let response;
        try {
            response = await fetch(`http://localhost:8000/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                console.error("Server returned an error:", response.status, response.statusText);
            }

            const data = await response.json();

            if (data.msg) {
                localStorage.setItem("USER", JSON.stringify(data.msg));
            } else {
                console.error("Unexpected API response format:", data);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };

    useEffect(() => {
        const authenticateUser = async () => {
            if (token) {
                await userAuthentication();
            }
        };

        authenticateUser();
    }, [token, userAuthentication]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, token, address, state, connectWallet }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
