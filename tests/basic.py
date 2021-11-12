#!/usr/bin/python3

import pytest
from brownie import chain, accounts
import brownie


def within(a, b):
    assert abs(a - b) < 5


def test_basic(token):
    assert token.name() == "Magnet"
    assert token.decimals() == 9

    token.setVault(accounts[0])
    assert token.vault() == accounts[0]

    #token.mint(accounts[0], 100)
    #assert token.balanceOf(accounts[0]) == 100

    #assert token.totalSupply() == 0