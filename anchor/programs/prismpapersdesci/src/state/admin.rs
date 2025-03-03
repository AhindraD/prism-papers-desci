use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PlatformAdmin {
    pub owner: Pubkey,
    pub bump: u8,
    pub vault_bump: Pubkey,
}
