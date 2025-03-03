use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Admin {
    pub owner: Pubkey,
    pub bump: u8,
    pub vault_bump: Pubkey,
}
