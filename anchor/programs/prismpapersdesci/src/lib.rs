#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod prismpapersdesci {
    use super::*;

  pub fn close(_ctx: Context<ClosePrismpapersdesci>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.prismpapersdesci.count = ctx.accounts.prismpapersdesci.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.prismpapersdesci.count = ctx.accounts.prismpapersdesci.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializePrismpapersdesci>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.prismpapersdesci.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializePrismpapersdesci<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Prismpapersdesci::INIT_SPACE,
  payer = payer
  )]
  pub prismpapersdesci: Account<'info, Prismpapersdesci>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct ClosePrismpapersdesci<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub prismpapersdesci: Account<'info, Prismpapersdesci>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub prismpapersdesci: Account<'info, Prismpapersdesci>,
}

#[account]
#[derive(InitSpace)]
pub struct Prismpapersdesci {
  count: u8,
}
