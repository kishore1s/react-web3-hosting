import { createContext, useEffect, useState } from "react";
//In React, createContext is a function used to create a Context object, which allows you to share values (like data or functions) between components without having to pass props manually at every level of the component tree.

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
    const [allcoin, setAllcoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: 'USD',
        symbol: '$'
    });

    const fetchAllCoins = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-HrQugAJjZfjR1VKrwzAfm1aB'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllcoin(res))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAllCoins();
    }, [currency]);

    const contextValue = {
        allcoin,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
