#!/usr/bin/python3

import pytest
from brownie import chain, OlympusERC20Token, sOlympus


@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass


@pytest.fixture(scope="module")
def otoken(accounts):
    return OlympusERC20Token.deploy({'from': accounts[0]})

@pytest.fixture(scope="module")
def stoken(accounts):
    return sOlympus.deploy({'from': accounts[0]})
