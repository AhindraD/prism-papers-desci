use anchor_lang::prelude::*;

use crate::{ErrorCodes, ResearchPaperState, UserAccount};

#[derive(Accounts)]
#[instruction(_uuid:u32)]
pub struct UpdateResearch<'info> {
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
        mut,
        seeds=[
            b"research_paper",
            publisher.key().as_ref(),
            _uuid.to_le_bytes().as_ref(),
        ],
        bump=research_paper.bump
    )]
    pub research_paper: Account<'info, ResearchPaperState>,

    pub system_program: Program<'info, System>,
}

impl<'info> UpdateResearch<'info> {
    pub fn update_research_paper(
        &mut self,
        _uuid: u32,
        title: String,
        description: String,
        price: u64,
        article_url: String,
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

        self.research_paper.title = title;
        self.research_paper.description = description;
        self.research_paper.price = price;
        self.research_paper.article_url = article_url;
        Ok(())
    }
}
