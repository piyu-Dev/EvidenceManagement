import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const backend_api = "http://localhost:8000"
    // const [currentUser,setcurrentUser] = useState('');
    const isLoggedIn = !!token;
    
    // useEffect(() => {
    //     const ls = localStorage.getItem("USER");
    //     if (ls) {
    //         const parsedUser = JSON.parse(ls);
    //         setcurrentUser(parsedUser);
    //     } else {
    //         console.log("Please Login First");
    //     }
    // }, []);


    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("USER");
    }

    const userAuthentication = useCallback(async () => {
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
    })


    useEffect(() => {
        const authenticateUser = async () => {
            if (token) {
                await userAuthentication();
            }
        };

        authenticateUser();
    }, [token, userAuthentication]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, token , backend_api}}>
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












// import { createContext, useContext, useState } from "react";
// import { ethers } from "ethers";
// import abi from '../Fake.json';
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//     const [user,setUser] = useState('');
//     const [state, setState] = useState({
//         provider: null,
//         signer: null,
//         contract: null,
//         contract1: null
//     });

//     const [isloggedin, setIsloggedIn] = useState(false);
//     const [address, setAddress] = useState(null);
//     const connectWallet = async () => {
//         const contractAddress = "0x4FC70f2699a592fb59605f2CC64b666A3c8805A5";   //Ganache

//         const contractABI = abi.abi;
//         try {
//             const { ethereum } = window;
//             if (ethereum) {
//                 const account = await ethereum.request({
//                     method: "eth_requestAccounts",
//                 });
//                 window.ethereum.on("chainChanged", () => {
//                     window.location.reload();
//                 });

//                 window.ethereum.on("accountsChanged", () => {
//                     window.location.reload();
//                 });
//                 const provider = new ethers.providers.Web3Provider(ethereum);
//                 const signer = provider.getSigner();
//                 const contract = new ethers.Contract(
//                     contractAddress,
//                     contractABI,
//                     signer
//                 );
//                 setAddress(account[0]);
//                 setState({ provider, signer , contract });
//             } else {
//                 alert('Please install and log in to Metamask wallet to initiate the transaction.');
//             }
//         } catch (error) {
//             console.error("Error connecting wallet:", error);
//             alert("An error occurred while connecting to the wallet. Please try again.");
//         }
//     }

   
//     return (
//         <AuthContext.Provider value={{ address, state, connectWallet,setUser, isloggedin,setIsloggedIn, user}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const authContextValue = useContext(AuthContext);
//     if (!authContextValue) {
//         throw new Error("useAuth used outside of the Provider");
//     }
//     return authContextValue;
// };