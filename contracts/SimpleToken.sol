pragma solidity ^0.4.15;


import "zeppelin-solidity/contracts/token/StandardToken.sol";
import 'zeppelin-solidity/contracts/token/BurnableToken.sol';



/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract SimpleToken is StandardToken, BurnableToken {

  string public constant name = "PolyMath Network Token";
  string public constant symbol = "POLY";
  uint8 public constant decimals = 18;

   uint256 public constant INITIAL_SUPPLY = 1000 * (10**6) * (10**uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function SimpleToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

}