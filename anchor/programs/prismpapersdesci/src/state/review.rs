use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PeerReview {
    pub reviewer: Pubkey,
    pub reviewed_paper: Pubkey,
    #[max_len(256)]
    pub review_url: String,
    pub status: ReviewStatus,
    pub reward: u64,
    pub bump: u8,
}

//A enum to represent the status of a submitted peer review
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum ReviewStatus {
    Pending,
    Accepted,
    Rejected,
}
impl Space for ReviewStatus {
    const INIT_SPACE: usize = 1;
}
