![Screenshot 2025-01-08 153657](https://github.com/user-attachments/assets/a711cf94-86c1-44e4-8a34-85f46cf8ac5a)
 ### Proof Of Work During My Time In TURBIN3 Builders Cohort Q1 2025 :  [Q1_25_Builder_AhindraD](https://github.com/solana-turbin3/Q1_25_Builder_AhindraD)
 
# CAPSTONE - PrismPapers: The Transparent Research Publishing and Reviewing Platform. [DeSci]
## Deployed on DevNet: [5MRvAZkDQK1u27EEzrdpKS6uUKsGqEPRkztZVapcTcLv](https://explorer.solana.com/address/5MRvAZkDQK1u27EEzrdpKS6uUKsGqEPRkztZVapcTcLv?cluster=devnet)

- ## [PrismPapers - Architectural Diagram](https://app.eraser.io/workspace/srtYuk9xciXjH6IUKwJs)
 
  ![image](https://github.com/user-attachments/assets/bdf852ab-567b-4bfa-98ea-fa09a5025e67)

  ![image](https://github.com/user-attachments/assets/549e15a7-e074-4a51-80a7-4c1e13b580e4)
![prism-tests](https://github.com/user-attachments/assets/5e66b9b3-1e1d-43b4-b21d-13aab6afc9ae)


- ## Project Overview: [PrismPapers - Teaser](https://ai.invideo.io/watch/eWg44dhBM4n)

  PrismPapers is a blockchain-based platform designed to shake things up in academic publishing.
  Traditional academic publishing takes forever, costs too much, and is often opaque.
  PrismPapers is my way of fixing this mess. With blockchain, we can make the whole process speedy, transparent, and rewarding for everyone involved. Plus, I’m a tech geek who loves using blockchain to solve real-world problems.

- ### Project Setup Pre-requisites:

  - [rustup 1.27.1 stable](https://www.rust-lang.org/tools/install)
    ```bash
    rustup default stable
    ```
  - [solana-cli 2.1.5 (client : Agave)](https://docs.solana.com/cli/install-solana-cli-tools)

    ```bash
    agave-install init 2.1.5
    ```

  - [anchor-cli 0.30.1](https://www.anchor-lang.com/docs/installation)

    ```bash
    avm use 0.30.1
    ```

  <br>

- ## Run Anchor Program and Tests Locally:
  - ### [Anchor Program Files](https://github.com/AhindraD/prism-papers-desci/tree/main/anchor/programs/prismpapersdesci/src)
  - ### [Test File](https://github.com/AhindraD/prism-papers-desci/blob/main/anchor/tests/prismpapersdesci.spec.ts)
  1. Clone the repository:

  ```bash
  git clone https://github.com/AhindraD/prism-papers-desci.git
  ```

  2. Change the directory to the "notesols" folder of the cloned repository:

  ```bash
  cd prism-papers-desci
  ```

  3. Install dependencies:

  ```bash
  npm install
  ```

  4. Change the directory to the anchor folder:

  ```bash
  cd anchor
  ```

  5. Build the program:

  ```bash
  anchor build
  ```

  6. Test the program:

  ```rs
   anchor test
   anchor test --skip-local-validator  //if a local validator is already running
  ```

  <br>
  <br>
  <br>
