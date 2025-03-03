use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct UserAccount {
    pub owner: Pubkey,
    #[max_len(32)]
    pub name: String,
    pub published: u8,
    pub purchased: u16,
    pub reviewed: u16,
    pub earning: u64,
    pub bump: u8,
    pub vault_bump: u8,
}
