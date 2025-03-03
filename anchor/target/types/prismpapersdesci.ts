/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/prismpapersdesci.json`.
 */
export type Prismpapersdesci = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "prismpapersdesci",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "platformConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "platformConfig"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "platformConfig",
      "discriminator": [
        160,
        78,
        128,
        0,
        248,
        83,
        230,
        160
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "userNameTooLong",
      "msg": "User name Too Long"
    },
    {
      "code": 6001,
      "name": "paperTitleTooLong",
      "msg": "Research Paper Title Too Long"
    },
    {
      "code": 6002,
      "name": "paperDescriptionTooLong",
      "msg": "Research Paper Description Too Long"
    },
    {
      "code": 6003,
      "name": "paperLinkInvalid",
      "msg": "Research Paper Link Is Invalid"
    },
    {
      "code": 6004,
      "name": "reviewLinkInvalid",
      "msg": "Review Link Is Invalid"
    }
  ],
  "types": [
    {
      "name": "platformConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "globalFee",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "anchorDiscriminator",
      "type": "u8",
      "value": "8"
    }
  ]
};
