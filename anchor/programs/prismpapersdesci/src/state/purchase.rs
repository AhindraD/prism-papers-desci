use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PurchasedPaper {
    pub buyer: Pubkey,
    pub purchased_paper: Pubkey,
    pub bump: u8,
}
