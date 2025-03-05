import * as anchor from '@coral-xyz/anchor'
import { Program, BN } from '@coral-xyz/anchor'
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from '@solana/web3.js'
import {
  confirmTransaction,
  getLogs,
  makeKeypairs,
  getExplorerLink
} from '@solana-developers/helpers';
import { Prismpapersdesci } from '../target/types/prismpapersdesci';
import assert from 'assert';
// import { before, beforeEach, it } from 'mocha';
// import { assert, expect } from 'chai';

describe('prismpapersdesci', () => {
  // Configure the client to use the local cluster.
  const cluster_for_explorerLink = 'localnet';
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const connection = provider.connection;
  const programId = new PublicKey('5MRvAZkDQK1u27EEzrdpKS6uUKsGqEPRkztZVapcTcLv');
  const program = anchor.workspace.Prismpapersdesci as Program<Prismpapersdesci>;
  // const payer = provider.wallet as anchor.Wallet;
  // const prismpapersdesciKeypair = Keypair.generate();

  //Create Admin keypair
  const admin = Keypair.generate();
  //Create User (Publisher) keypair
  const walter = Keypair.generate();
  //Create User (Reviewer #1) keypair;
  const jimmy = Keypair.generate();
  //Create User (Reviewer #2) keypair;
  const jesse = Keypair.generate();
  //Create User (Buyer) keypair
  const mike = Keypair.generate();

  beforeAll(async () => {
    console.log(`airdroping...`);
    const all_wallets = [admin, walter, jimmy, jesse, mike];
    for (const wallet of all_wallets) {
      const tx = await provider.connection.requestAirdrop(
        wallet.publicKey,
        5 * LAMPORTS_PER_SOL
      );
      await confirmTransaction(connection, tx, 'confirmed');
      // console.log(`Airdropped ${5} SOL to ${wallet.publicKey}.`);
    }
    console.log(`airdrop complete ---> funded all wallets.`);
  });


  it(`Admin Initialized PrismPapers Platform Successfully.`, async () => {
    // console.log(`<----------- Initializing PrismPapers Platform ------------>`);
    try {
      const initilialize = await program.methods
        .initialize()
        .accountsPartial({
          admin: admin.publicKey,
        })
        .instruction();

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const txn = new anchor.web3.Transaction({
        feePayer: admin.publicKey,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
      }).add(initilialize);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        txn,
        [admin]
      );
      // console.log(`Platform initialized!:  ${getExplorerLink("tx", signature, cluster_for_explorerLink)}`);
    } catch (err) {
      console.log(`Failed to initialize Platform: ${err}`);
    }

    //Check Platform Config PDA address
    const [configAccountAdress, bump] = await PublicKey.findProgramAddressSync(
      [Buffer.from("platform_config"), admin.publicKey.toBuffer()],
      programId
    );
    // console.log(
    //   `
    //     Platform Config PDA: ${configAccountAdress.toString()}
    //     Bump: ${bump}
    //   `
    // );
    // Fetch the config PDA
    const configAccount = await program.account.platformConfig.fetch(
      configAccountAdress
    );

    // Convert admin.publicKey and configAccount.admins to strings for comparison
    const adminPubKey = admin.publicKey.toString();
    const configAdminPubKey = configAccount.admin.toString();

    // Check if the admin's public key is in the config admins list
    assert.equal(
      adminPubKey,
      configAdminPubKey,
      "Admin public key not found in PrismPapers Platform admins list!"
    );
  });

  it(`Admin CANNOT RE-Initialize Platform and Vault.`, async () => {
    // console.log(`<----------- REInitializing PrismPapers Platform ------------>`);
    try {
      const initilialize = await program.methods
        .initialize()
        .accountsPartial({
          admin: admin.publicKey,
        })
        .instruction();

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const txn = new anchor.web3.Transaction({
        feePayer: admin.publicKey,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
      }).add(initilialize);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        txn,
        [admin]
      );
      // console.log(`Platform reinitialized!:  ${getExplorerLink("tx", signature, cluster_for_explorerLink)}`);
      assert.fail("Platform and admin vault reinitialized! Should not be possible.");
    } catch (err) {
      // console.log(`Failed to reinitialize Platform: ${err}`);
      assert.ok("Platform and Vault did not reinitialize! Safe to proceed.");
    }
  });
})
