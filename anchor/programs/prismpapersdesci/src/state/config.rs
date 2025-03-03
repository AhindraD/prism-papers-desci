use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PlatformConfig {
    pub admin: Pubkey,
    pub global_fee: u8, // a global platform fee for Buy, Sell and Review - every txn
    pub bump: u8,
    pub vault_bump: u8,
}
