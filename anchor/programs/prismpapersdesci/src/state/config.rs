use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub admin: Pubkey,
    pub fee: u8,
    pub bump: u8,
    pub vault_bump: u8,
}
