import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Children } from "react";
import {Header, Card, ButtonWrap} from "../components/index"
import {Input, Textarea, RadioButton, Button, Text, Spacing} from "../elements/index"

function Home() {
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  
  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
  
    // Asking if metamask is already present or not
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
  
    // Setting a balance
    getbalance(account);
  };

  return (
    <Card>
      <Text bold>Claim Reward</Text>
      <Spacing size="20px" />
      <Text>
        If you want to claim your NFT,
        Please connect your wallet
      </Text>
      <RadioButton/>
      <Spacing size="20px" />
      <ButtonWrap oneButton onClickRight={btnhandler}  btnRight="Connect Wallet" />
    </Card>
  );
}

export default Home;