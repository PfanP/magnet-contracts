#!/usr/bin/python3

import pytest
from brownie import chain, accounts



def test_basic(otoken, stoken):
    assert otoken.name() == "Magnet"
    assert otoken.decimals() == 9

    otoken.setVault(accounts[0])
    assert otoken.vault() == accounts[0]

    assert stoken.name() == "Staked Magnet"

    #token.mint(accounts[0], 100)
    #assert token.balanceOf(accounts[0]) == 100

    #assert token.totalSupply() == 0