use anchor_lang::prelude::*;

use crate::{ErrorCodes, ResearchPaperState, UserAccount, ANCHOR_DISCRIMINATOR};

#[derive(Accounts)]
#[instruction(_uuid:u32)] //Base64 (22 bytes) uuid: Ej5FZ+iZEtOkVkJmFBdAA==
pub struct ResearchInit<'info> {
    #[account(mut)]
    pub publisher: Signer<'info>,

    #[account(
        mut,
        seeds=[
            b"user_account",
            publisher.key().as_ref(),
        ],
        bump=user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        init,
        payer=publisher,
        space=ANCHOR_DISCRIMINATOR as usize + ResearchPaperState::INIT_SPACE,
        seeds=[
            b"research_paper",
            publisher.key().as_ref(),
            _uuid.to_le_bytes().as_ref(),
        ],
        bump
    )]
    pub research_paper: Account<'info, ResearchPaperState>,

    pub system_program: Program<'info, System>,
}

impl<'info> ResearchInit<'info> {
    pub fn publish_research(
        &mut self,
        title: String,
        description: String,
        price: u64,
        article_url: String,
        _uuid: u32,
        bumps: &ResearchInitBumps,
    ) -> Result<()> {
        require!(!title.is_empty(), ErrorCodes::DataFieldEmpty);
        require!(!description.is_empty(), ErrorCodes::DataFieldEmpty);
        require!(!article_url.is_empty(), ErrorCodes::DataFieldEmpty);
        require!(price > 0, ErrorCodes::ResearchPriceInvalid);
        require!(title.len() < 32, ErrorCodes::PaperTitleTooLong);
        require!(description.len() < 256, ErrorCodes::PaperDescriptionTooLong);
        require!(
            article_url.len() < 256 && article_url.starts_with("https://"),
            ErrorCodes::PaperLinkInvalid
        );

        self.research_paper.set_inner(ResearchPaperState {
            publisher: self.publisher.key(),
            title,
            description,
            price,
            sales: 0u64,
            reviews: 0u64,
            article_url,
            bump: bumps.research_paper,
        });

        self.user_account.published += 1u8;
        Ok(())
    }
}
