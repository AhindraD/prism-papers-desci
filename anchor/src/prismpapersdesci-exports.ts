// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import PrismpapersdesciIDL from '../target/idl/prismpapersdesci.json'
import type { Prismpapersdesci } from '../target/types/prismpapersdesci'

// Re-export the generated IDL and type
export { Prismpapersdesci, PrismpapersdesciIDL }

// The programId is imported from the program IDL.
export const PRISMPAPERSDESCI_PROGRAM_ID = new PublicKey(PrismpapersdesciIDL.address)

// This is a helper function to get the Prismpapersdesci Anchor program.
export function getPrismpapersdesciProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...PrismpapersdesciIDL, address: address ? address.toBase58() : PrismpapersdesciIDL.address } as Prismpapersdesci, provider)
}

// This is a helper function to get the program ID for the Prismpapersdesci program depending on the cluster.
export function getPrismpapersdesciProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Prismpapersdesci program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return PRISMPAPERSDESCI_PROGRAM_ID
  }
}
