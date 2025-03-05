use anchor_lang::prelude::*;

use crate::{ErrorCodes, PeerReview, ResearchPaperState, ReviewStatus, ANCHOR_DISCRIMINATOR};

#[derive(Accounts)]
#[instruction(_uuid:u32)]
pub struct ReviewPaper<'info> {
    #[account(mut)]
    pub reviewer: Signer<'info>,

    #[account(
        mut,
        seeds=[
            b"research_paper", 
            reviewed_paper.publisher.key().as_ref(),
            _uuid.to_le_bytes().as_ref(),
            ],
        bump=reviewed_paper.bump
    )]
    pub reviewed_paper: Account<'info, ResearchPaperState>,

    #[account(
        init,
        payer=reviewer,
        seeds=[
            b"peer_review",
            reviewer.key().as_ref(),
            reviewed_paper.key().as_ref(),
        ],
        space= ANCHOR_DISCRIMINATOR as usize + PeerReview::INIT_SPACE,
        bump
    )]
    pub peer_review: Account<'info, PeerReview>,

    pub system_program: Program<'info, System>,
}

impl<'info> ReviewPaper<'info> {
    pub fn peer_review_paper(
        &mut self,
        _uuid: u32,
        review_url: String,
        proposed_reward: u64,
        bumps: &ReviewPaperBumps,
    ) -> Result<()> {
        require!(
            self.peer_review.reviewer.key() != self.reviewed_paper.publisher,
            ErrorCodes::PublisherCantReviewSelf
        );

        self.peer_review.set_inner(PeerReview {
            reviewer: self.reviewer.key(),
            reviewed_paper: self.reviewed_paper.key(),
            review_url,
            status: ReviewStatus::Pending,
            reward: proposed_reward,
            bump: bumps.peer_review,
        });

        Ok(())
    }
}
