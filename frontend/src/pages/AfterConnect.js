import React, { useState, useEffect } from "react";
import { Children } from "react";
import {Header, Card, ButtonWrap} from "../components/index"
import {Input, Textarea, RadioButton, Button, Text, Spacing} from "../elements/index"
import { ethers } from "ethers";


function Home() {
  async function walletAddress () {
    alert('hi')
    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]
    })
  }

  return (
    <Card>
      <Text bold>Claim Reward</Text>
      <Spacing size="20px" />
      <Text>
        If you want to claim your NFT,
        Please connect your wallet 얍야뱡뱌얍
      </Text>
      <RadioButton
        label="hi"
        caption="adfsdfa"
        />
      <Spacing size="20px" />
      <ButtonWrap oneButton onClickRight={walletAddress}  btnRight="Connect Wallet" />
    </Card>
  );
}

export default Home;