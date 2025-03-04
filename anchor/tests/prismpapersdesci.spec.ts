import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Prismpapersdesci} from '../target/types/prismpapersdesci'

describe('prismpapersdesci', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Prismpapersdesci as Program<Prismpapersdesci>

  const prismpapersdesciKeypair = Keypair.generate()


})
