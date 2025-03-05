# PrismPapers: The Transparent Research Publishing and Reviewing Platform. [DeSci]

# [PrismPapers - Architectural Diagram](https://app.eraser.io/workspace/srtYuk9xciXjH6IUKwJs)

<br>

##  Project Overview

- **PrismPapers:**\
  The Transparent Research Publishing and Reviewing Platform.
  
  ## [PrismPapers - Teaser](https://ai.invideo.io/watch/eWg44dhBM4n)

  Traditional academic publishing takes forever, costs too much, and is often opaque. PrismPapers is my way of fixing this mess. With blockchain, we can make the whole process speedy, transparent, and rewarding for everyone involved. Plus, I’m a tech geek who loves using blockchain to solve real-world problems


## Project Setup

### Environment Setup

For this Task you need:

- [Rust installed](https://www.rust-lang.org/tools/install)
  - Make sure to use a stable version:
  ```bash
  rustup default stable
  ```
- [Solana installed](https://docs.solana.com/cli/install-solana-cli-tools)

  - Use v2.1.5
  - After you have Solana-CLI installed, you can switch between versions using:

  ```bash
  agave-install init 2.1.5
  ```

- [Anchor installed](https://www.anchor-lang.com/docs/installation)

  - Use v0.30.1
  - After you have Anchor installed, you can switch between versions using:

  ```bash
  avm use 0.30.1
  ```

  <br>
  <br>
  <br>

### 01. Anchor Program with Tests

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
 anchor test --skip-local-validator  //if local validator is already running
```

  <br>
  <br>
  <br>


![image](https://github.com/user-attachments/assets/e510f506-e8ea-4dbf-b009-d0bcf11ffbf4)

[View on Eraser](https://app.eraser.io/workspace/srtYuk9xciXjH6IUKwJs)
