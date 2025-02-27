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

  it('Initialize Prismpapersdesci', async () => {
    await program.methods
      .initialize()
      .accounts({
        prismpapersdesci: prismpapersdesciKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([prismpapersdesciKeypair])
      .rpc()

    const currentCount = await program.account.prismpapersdesci.fetch(prismpapersdesciKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Prismpapersdesci', async () => {
    await program.methods.increment().accounts({ prismpapersdesci: prismpapersdesciKeypair.publicKey }).rpc()

    const currentCount = await program.account.prismpapersdesci.fetch(prismpapersdesciKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Prismpapersdesci Again', async () => {
    await program.methods.increment().accounts({ prismpapersdesci: prismpapersdesciKeypair.publicKey }).rpc()

    const currentCount = await program.account.prismpapersdesci.fetch(prismpapersdesciKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Prismpapersdesci', async () => {
    await program.methods.decrement().accounts({ prismpapersdesci: prismpapersdesciKeypair.publicKey }).rpc()

    const currentCount = await program.account.prismpapersdesci.fetch(prismpapersdesciKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set prismpapersdesci value', async () => {
    await program.methods.set(42).accounts({ prismpapersdesci: prismpapersdesciKeypair.publicKey }).rpc()

    const currentCount = await program.account.prismpapersdesci.fetch(prismpapersdesciKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the prismpapersdesci account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        prismpapersdesci: prismpapersdesciKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.prismpapersdesci.fetchNullable(prismpapersdesciKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
