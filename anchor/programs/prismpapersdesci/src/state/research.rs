use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct ResearchPaperState {
    pub publisher: Pubkey,
    #[max_len(32)]
    pub title: String,
    #[max_len(256)]
    pub description: String,
    pub price: u64,
    pub sales: u64,
    pub reviews: u64,
    #[max_len(256)]
    pub article_url: String,
    pub bump: u8,
}
