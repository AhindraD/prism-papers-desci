use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

use crate::{
    ErrorCodes, PeerReview, PlatformConfig, ResearchPaperState, ReviewStatus, UserAccount,
};

#[derive(Accounts)]
#[instruction(_uuid:u32)]
pub struct VerifyPeerReview<'info> {
    #[account(mut)]
    pub publisher: Signer<'info>,

    #[account(
        mut,
        seeds=[
            b"user_account",
            publisher.key().as_ref(),
        ],
        bump=publisher_user_account.bump
    )]
    pub publisher_user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        seeds=[
            b"user_vault",
            publisher_user_account.key().as_ref(),
        ],
        bump=publisher_user_account.vault_bump
    )]
    pub publisher_user_vault: SystemAccount<'info>,

    #[account(
        mut,
        seeds=[
            b"user_account",
            peer_review.reviewer.key().as_ref(),
        ],
        bump=reviewer_user_account.bump
    )]
    pub reviewer_user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        seeds=[
            b"user_vault",
            reviewer_user_account.key().as_ref(),
        ],
        bump=reviewer_user_account.vault_bump
    )]
    pub reviewer_user_vault: SystemAccount<'info>,

    #[account(
        seeds = [
            b"platform_config", 
            platform_config.admin.key().as_ref()
            ],
        bump=platform_config.bump
    )]
    pub platform_config: Account<'info, PlatformConfig>,

    #[account(
        mut,
        seeds = [
            b"admin_vault", 
            platform_config.key().as_ref()
            ],
        bump=platform_config.vault_bump
    )]
    pub admin_vault: SystemAccount<'info>,

    #[account(
        mut,
        seeds=[
            b"research_paper",
            publisher.key().as_ref(),
            _uuid.to_le_bytes().as_ref(),
        ],
        bump=research_paper.bump
    )]
    pub research_paper: Account<'info, ResearchPaperState>,

    #[account(
        mut,
        seeds=[
            b"peer_review",
            peer_review.reviewer.key().as_ref(),
            peer_review.reviewed_paper.key().as_ref(),
        ],
        bump=peer_review.bump
    )]
    pub peer_review: Account<'info, PeerReview>,

    pub system_program: Program<'info, System>,
}

impl<'info> VerifyPeerReview<'info> {
    pub fn validate_peer_review(&mut self, _uuid: u32, accept_proposed_review: bool) -> Result<()> {
        require!(
            self.peer_review.status == ReviewStatus::Pending,
            ErrorCodes::InvalidPeerReviewStatus
        );
        if accept_proposed_review {
            //01.transferring the reward to the reviewer vault
            let total_amount = self.peer_review.reward;
            let platform_fee = total_amount
                .checked_mul((self.platform_config.global_fee / 100) as u64)
                .ok_or(error!(ErrorCodes::MathOverflow))?;
            let reviewer_reward = total_amount
                .checked_sub(platform_fee)
                .ok_or(error!(ErrorCodes::MathOverflow))?;

            let cpi_program = self.system_program.to_account_info();
            let cpi_account_options_reviewer = Transfer {
                from: self.publisher.to_account_info(),
                to: self.reviewer_user_vault.to_account_info(),
            };
            let cpi_context_reviewer = CpiContext::new(cpi_program, cpi_account_options_reviewer);
            transfer(cpi_context_reviewer, reviewer_reward)?;

            //02.transferring the platform fee to the platform admin vault
            let cpi_program = self.system_program.to_account_info();
            let cpi_account_options_admin = Transfer {
                from: self.publisher.to_account_info(),
                to: self.admin_vault.to_account_info(),
            };
            let cpi_context_admin = CpiContext::new(cpi_program, cpi_account_options_admin);
            transfer(cpi_context_admin, platform_fee)?;

            //03.change the status of the peer review to accepted
            self.peer_review.status = ReviewStatus::Accepted;

            //04.update the user account of the reviewer
            self.reviewer_user_account.reviewed += 1u16;
            self.reviewer_user_account
                .earning
                .checked_add(reviewer_reward)
                .ok_or(error!(ErrorCodes::MathOverflow))?;

            //05.update the user account of the publisher
            self.publisher_user_account
                .earning
                .checked_sub(total_amount)
                .ok_or(error!(ErrorCodes::MathOverflow))?;

            //06.update the research paper state
            self.research_paper.reviews += 1u64;
        } else {
            //X.change the status of the peer review to rejected
            self.peer_review.status = ReviewStatus::Rejected;
        }
        Ok(())
    }
}
