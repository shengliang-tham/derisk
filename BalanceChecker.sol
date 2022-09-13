/**
 *Submitted for verification at Etherscan.io on 2019-04-18
 */

pragma solidity ^0.8.17;

contract Token {
    function balanceOf(address) public view returns (uint256);
}

contract BalanceChecker {
    function tokenBalance(address user, address token)
        public
        view
        returns (uint256)
    {
        // check if token is actually a contract
        uint256 tokenCode;
        assembly {
            tokenCode := extcodesize(token)
        } // contract code size

        // is it a contract and does it implement balanceOf
        if (tokenCode > 0 && token.call(bytes4(0x70a08231), user)) {
            return Token(token).balanceOf(user);
        } else {
            return 0;
        }
    }

    function balances(address user, address[] tokens)
        external
        view
        returns (uint256[])
    {
        uint256[] memory addrBalances = new uint256[](tokens.length);

        for (uint256 i = 0; i < tokens.length; i++) {
            addrBalances[i] = tokenBalance(user, tokens[i]);
        }
        return addrBalances;
    }
}
