/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  makeContractCreator,
  getOutput,
  getInput
} from "./utils/makeContractCreator";

import fundsModule from "./abi/fundsModule";

export const createFundsModule = makeContractCreator(
  fundsModule as any[],
  {
    callMethods: {
      MODULE_ACCESS: {
        output: getOutput("string")
      },

      MODULE_CDAI: {
        output: getOutput("string")
      },

      MODULE_CURVE: {
        output: getOutput("string")
      },

      MODULE_DEFI: {
        output: getOutput("string")
      },

      MODULE_FUNDS: {
        output: getOutput("string")
      },

      MODULE_LIQUIDITY: {
        output: getOutput("string")
      },

      MODULE_LOAN: {
        output: getOutput("string")
      },

      MODULE_LOAN_LIMTS: {
        output: getOutput("string")
      },

      MODULE_LOAN_PROPOSALS: {
        output: getOutput("string")
      },

      MODULE_LTOKEN: {
        output: getOutput("string")
      },

      MODULE_PTOKEN: {
        output: getOutput("string")
      },

      calculatePoolEnter: {
        inputs: [
          getInput("lAmount", "uinteger"),
          getInput("liquidityCorrection", "uinteger")
        ],
        output: getOutput("uinteger")
      },

      calculatePoolExit: {
        inputs: [getInput("lAmount", "uinteger")],
        output: getOutput("uinteger")
      },

      calculatePoolExitInverse: {
        inputs: [getInput("pAmount", "uinteger")],
        output: getOutput(["uinteger", "uinteger", "uinteger"] as const)
      },

      calculatePoolExitWithFee: {
        inputs: [getInput("lAmount", "uinteger")],
        output: getOutput("uinteger")
      },

      getModuleAddress: {
        inputs: [getInput("module", "string")],
        output: getOutput("address")
      },

      isFundsOperator: {
        inputs: [getInput("account", "address")],
        output: getOutput("boolean")
      },

      isOwner: {
        output: getOutput("boolean")
      },

      lBalance: {
        output: getOutput("uinteger")
      },

      owner: {
        output: getOutput("address")
      },

      pBalanceOf: {
        inputs: [getInput("account", "address")],
        output: getOutput("uinteger")
      },

      pool: {
        output: getOutput("address")
      }
    },
    sendMethods: {
      addFundsOperator: {
        inputs: [getInput("account", "address")],
        output: getOutput("void")
      },

      burnLockedPTokens: {
        inputs: [getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      burnPTokens: {
        inputs: [getInput("from", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      depositLTokens: {
        inputs: [getInput("from", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      depositPTokens: {
        inputs: [getInput("from", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      distributePTokens: {
        inputs: [getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      emitStatusEvent: {
        output: getOutput("void")
      },

      mintAndLockPTokens: {
        inputs: [getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      mintPTokens: {
        inputs: [getInput("to", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      refundLTokens: {
        inputs: [getInput("to", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      renounceFundsOperator: {
        output: getOutput("void")
      },

      renounceOwnership: {
        output: getOutput("void")
      },

      setPool: {
        inputs: [getInput("_pool", "address")],
        output: getOutput("void")
      },

      transferOwnership: {
        inputs: [getInput("newOwner", "address")],
        output: getOutput("void")
      },

      unlockAndWithdrawPTokens: {
        inputs: [getInput("to", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      withdrawLTokens: {
        inputs: [
          getInput("to", "address"),
          getInput("amount", "uinteger"),
          getInput("poolFee", "uinteger")
        ],
        output: getOutput("void")
      },

      withdrawPTokens: {
        inputs: [getInput("to", "address"), getInput("amount", "uinteger")],
        output: getOutput("void")
      },

      initialize: {
        output: getOutput("void")
      },

      withdrawAllFromDefi: {
        output: getOutput("void")
      },

      depositAllToDefi: {
        output: getOutput("void")
      }
    },
    events: {
      FundsOperatorAdded: {
        inputs: [getInput("account", "address")]
      },

      FundsOperatorRemoved: {
        inputs: [getInput("account", "address")]
      },

      OwnershipTransferred: {
        inputs: [
          getInput("previousOwner", "address"),
          getInput("newOwner", "address")
        ]
      },

      PoolAddressChanged: {
        inputs: [getInput("newPool", "address")]
      },

      Status: {
        inputs: [
          getInput("lBalance", "uinteger"),
          getInput("lDebts", "uinteger"),
          getInput("lProposals", "uinteger"),
          getInput("pEnterPrice", "uinteger"),
          getInput("pExitPrice", "uinteger")
        ]
      }
    }
  } as const
);
