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
      "name": "buyResearch",
      "discriminator": [
        253,
        42,
        243,
        67,
        68,
        216,
        249,
        34
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "buyerUserAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "researchPaper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  97,
                  114,
                  99,
                  104,
                  95,
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "research_paper.publisher",
                "account": "researchPaperState"
              },
              {
                "kind": "arg",
                "path": "uuid"
              }
            ]
          }
        },
        {
          "name": "publisherUserAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "research_paper.publisher",
                "account": "researchPaperState"
              }
            ]
          }
        },
        {
          "name": "publisherUserVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
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
                "path": "publisherUserAccount"
              }
            ]
          }
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
              },
              {
                "kind": "account",
                "path": "platform_config.admin",
                "account": "platformConfig"
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true,
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
          "name": "purchasedPaperAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  117,
                  114,
                  99,
                  104,
                  97,
                  115,
                  101,
                  100,
                  95,
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "account",
                "path": "researchPaper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uuid",
          "type": "u32"
        }
      ]
    },
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
              },
              {
                "kind": "account",
                "path": "admin"
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
    },
    {
      "name": "publishResearch",
      "discriminator": [
        114,
        230,
        148,
        143,
        77,
        35,
        142,
        107
      ],
      "accounts": [
        {
          "name": "publisher",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "publisher"
              }
            ]
          }
        },
        {
          "name": "researchPaper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  97,
                  114,
                  99,
                  104,
                  95,
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "publisher"
              },
              {
                "kind": "arg",
                "path": "uuid"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "articleUrl",
          "type": "string"
        },
        {
          "name": "uuid",
          "type": "u32"
        }
      ]
    },
    {
      "name": "reviewPaper",
      "discriminator": [
        143,
        66,
        152,
        52,
        94,
        165,
        129,
        123
      ],
      "accounts": [
        {
          "name": "reviewer",
          "writable": true,
          "signer": true
        },
        {
          "name": "reviewedPaper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  97,
                  114,
                  99,
                  104,
                  95,
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "reviewedPaper"
              },
              {
                "kind": "arg",
                "path": "uuid"
              }
            ]
          }
        },
        {
          "name": "peerReview",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  101,
                  101,
                  114,
                  95,
                  114,
                  101,
                  118,
                  105,
                  101,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "reviewer"
              },
              {
                "kind": "account",
                "path": "reviewedPaper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uuid",
          "type": "u32"
        },
        {
          "name": "reviewUrl",
          "type": "string"
        },
        {
          "name": "proposedReward",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updatePaper",
      "discriminator": [
        194,
        186,
        148,
        8,
        108,
        44,
        158,
        137
      ],
      "accounts": [
        {
          "name": "publisher",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "publisher"
              }
            ]
          }
        },
        {
          "name": "researchPaper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  97,
                  114,
                  99,
                  104,
                  95,
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "publisher"
              },
              {
                "kind": "arg",
                "path": "uuid"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uuid",
          "type": "u32"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "articleUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "userSignup",
      "discriminator": [
        93,
        177,
        67,
        45,
        218,
        3,
        84,
        85
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "userVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
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
                "path": "userAccount"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "verifyReview",
      "discriminator": [
        97,
        251,
        145,
        202,
        132,
        80,
        96,
        15
      ],
      "accounts": [
        {
          "name": "publisher",
          "writable": true,
          "signer": true
        },
        {
          "name": "publisherUserAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "publisher"
              }
            ]
          }
        },
        {
          "name": "publisherUserVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
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
                "path": "publisherUserAccount"
              }
            ]
          }
        },
        {
          "name": "reviewerUserAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "peer_review.reviewer",
                "account": "peerReview"
              }
            ]
          }
        },
        {
          "name": "reviewerUserVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
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
                "path": "reviewerUserAccount"
              }
            ]
          }
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
              },
              {
                "kind": "account",
                "path": "platform_config.admin",
                "account": "platformConfig"
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true,
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
          "name": "researchPaper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  101,
                  97,
                  114,
                  99,
                  104,
                  95,
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "publisher"
              },
              {
                "kind": "arg",
                "path": "uuid"
              }
            ]
          }
        },
        {
          "name": "peerReview",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  101,
                  101,
                  114,
                  95,
                  114,
                  101,
                  118,
                  105,
                  101,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "peer_review.reviewer",
                "account": "peerReview"
              },
              {
                "kind": "account",
                "path": "peer_review.reviewed_paper",
                "account": "peerReview"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uuid",
          "type": "u32"
        },
        {
          "name": "acceptProposedReview",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "peerReview",
      "discriminator": [
        13,
        168,
        128,
        102,
        214,
        123,
        208,
        229
      ]
    },
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
    },
    {
      "name": "purchasedPaper",
      "discriminator": [
        185,
        213,
        94,
        167,
        215,
        43,
        69,
        115
      ]
    },
    {
      "name": "researchPaperState",
      "discriminator": [
        240,
        252,
        170,
        88,
        64,
        210,
        171,
        69
      ]
    },
    {
      "name": "userAccount",
      "discriminator": [
        211,
        33,
        136,
        16,
        186,
        110,
        242,
        127
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
      "name": "dataFieldEmpty",
      "msg": "Data field Cannot Be Empty"
    },
    {
      "code": 6002,
      "name": "paperTitleTooLong",
      "msg": "Research Paper Title Too Long"
    },
    {
      "code": 6003,
      "name": "paperDescriptionTooLong",
      "msg": "Research Paper Description Too Long"
    },
    {
      "code": 6004,
      "name": "paperLinkInvalid",
      "msg": "Research Paper Link Is Invalid"
    },
    {
      "code": 6005,
      "name": "researchPriceInvalid",
      "msg": "Research Paper Price Is Invalid"
    },
    {
      "code": 6006,
      "name": "publisherCantBuySelfResearchPaper",
      "msg": "Publisher Can't Buy Their Own Paper"
    },
    {
      "code": 6007,
      "name": "mathOverflow",
      "msg": "Mathematical Operation Overflow"
    },
    {
      "code": 6008,
      "name": "publisherCantReviewSelf",
      "msg": "Publisher Can't Review Their Own Paper"
    },
    {
      "code": 6009,
      "name": "reviewLinkInvalid",
      "msg": "Review Link Is Invalid"
    },
    {
      "code": 6010,
      "name": "invalidPeerReviewStatus",
      "msg": "Peer Review Status Is Not Pending Anymore"
    }
  ],
  "types": [
    {
      "name": "peerReview",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reviewer",
            "type": "pubkey"
          },
          {
            "name": "reviewedPaper",
            "type": "pubkey"
          },
          {
            "name": "reviewUrl",
            "type": "string"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "reviewStatus"
              }
            }
          },
          {
            "name": "reward",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
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
    },
    {
      "name": "purchasedPaper",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "purchasedPaper",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "researchPaperState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "publisher",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "sales",
            "type": "u64"
          },
          {
            "name": "reviews",
            "type": "u64"
          },
          {
            "name": "articleUrl",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "reviewStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "accepted"
          },
          {
            "name": "rejected"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "published",
            "type": "u8"
          },
          {
            "name": "purchased",
            "type": "u16"
          },
          {
            "name": "reviewed",
            "type": "u16"
          },
          {
            "name": "earning",
            "type": "u64"
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
