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
import { randomBytes } from 'crypto';

describe('PrismPapers Test Suite', () => {
  // Configure the client to use the local cluster.
  const cluster_for_explorerLink = 'localnet';
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const connection = provider.connection;
  const program = anchor.workspace.Prismpapersdesci as Program<Prismpapersdesci>;
  const programId = program.programId;

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
          systemProgram: anchor.web3.SystemProgram.programId
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
    const [vaultAccountAdress, vaultBump] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), configAccountAdress.toBuffer()],
      programId
    );

    const configAccount = await program.account.platformConfig.fetch(
      configAccountAdress
    );


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
      assert.fail("Platform and admin vault reinitialized! Should not be possible.");
    } catch (err) {
      assert.ok("Platform and Vault did not reinitialize! Safe to proceed.");
    }
  });

  it("Walter White Signs Up for PrismPapers Platform.", async () => {
    // console.log(`<----------- User Signs Up for PrismPapers Platform ------------>`);
    try {
      const [userAccountAdress, userAccountBump] = await PublicKey.findProgramAddressSync(
        [Buffer.from("user_account"), walter.publicKey.toBuffer()],
        programId
      )
      const [userVaultAdress, userVaultBump] = await PublicKey.findProgramAddressSync(
        [Buffer.from("user_vault"), userAccountAdress.toBuffer()],
        programId
      )
      const user_name = "Walter White";
      const signup = await program.methods
        .userSignup(user_name)
        .accountsPartial({
          owner: walter.publicKey,
          userAccount: userAccountAdress,
          userVault: userVaultAdress,
          systemProgram: anchor.web3.SystemProgram.programId
        })
        .instruction();
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      const txn = new anchor.web3.Transaction({
        feePayer: walter.publicKey,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
      }).add(signup);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        txn,
        [walter]
      );

      const userAccount = await program.account.userAccount.fetch(userAccountAdress);
      assert.equal(userAccount.owner.toString(), walter.publicKey.toString());
      assert.equal(userAccount.name, "Walter White");
    } catch (err) {
      assert.fail(`User signup failed! ${err}`);
    }
  });

  it("Walter White Publishes a Research Paper.", async () => {
    // console.log(`<----------- Walter White Publishes a Research Paper ------------>`);
    try {
      const uuid = new BN(randomBytes(4));
      // console.log(`uuid: ${uuid}`);
      // console.log(uuid.toBuffer('le', 4));
      // console.log(walter.publicKey.toString());

      const [userAccountAdress, userAccountBump] = await PublicKey.findProgramAddressSync(
        [Buffer.from("user_account"), walter.publicKey.toBuffer()],
        programId
      )

      const [researchPaperAdress, researchPaperBump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from("research_paper"),
          walter.publicKey.toBuffer(),
          uuid.toBuffer('le', 4),
        ],
        programId
      )
      const title = "Decentralized Auto. Org.";
      const description = "DAO is a self-governing organization that is governed by its members, rather than by a central authority.";
      const price = new BN(1_000_111_000);
      const article_url = "https://gist.github.com/AhindraD/94157617728449783aed06ec876b8969";

      const publish = await program.methods
        .publishResearch(uuid.toNumber(), title, description, price, article_url)
        .accountsPartial({
          publisher: walter.publicKey,
          userAccount: userAccountAdress,
          researchPaper: researchPaperAdress,
          systemProgram: anchor.web3.SystemProgram.programId
        })
        .instruction();
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      const txn = new anchor.web3.Transaction({
        feePayer: walter.publicKey,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
      }).add(publish);
      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        txn,
        [walter]
      );

      const researchPaper = await program.account.researchPaperState.fetch(researchPaperAdress);
      assert.equal(researchPaper.publisher.toString(), walter.publicKey.toString());
      assert.equal(researchPaper.title, title);
      assert.equal(researchPaper.description, description);
      assert.equal(researchPaper.price.toNumber(), price.toNumber());
    } catch (err) {
      assert.fail(`Failed To Publish Research Paper! ${err}`);
    }
  });
})