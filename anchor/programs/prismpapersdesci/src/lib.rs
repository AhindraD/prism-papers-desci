#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

pub mod state;
pub use state::*;

pub mod instructions;
pub use instructions::*;

pub mod constants;
pub use constants::*;

pub mod error;
pub use error::*;

// pub mod helper;
// pub use helper::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod prismpapersdesci {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize_platform(GLOBAL_FEE, &ctx.bumps)
    }

    pub fn user_signup(ctx: Context<UserInit>, name: String) -> Result<()> {
        ctx.accounts.user_signup(name, &ctx.bumps)
    }

    pub fn publish_research(
        ctx: Context<ResearchInit>,
        title: String,
        description: String,
        price: u64,
        article_url: String,
        _uuid: u32,
    ) -> Result<()> {
        ctx.accounts
            .publish_research(title, description, price, article_url, _uuid, &ctx.bumps)
    }

    pub fn buy_research(ctx: Context<PurchaseAccess>, _uuid: u32) -> Result<()> {
        ctx.accounts.purchase_paper_access(_uuid, &ctx.bumps)
    }

    pub fn review_paper(
        ctx: Context<ReviewPaper>,
        _uuid: u32,
        review_url: String,
        proposed_reward: u64,
    ) -> Result<()> {
        ctx.accounts
            .peer_review_paper(_uuid, review_url, proposed_reward, &ctx.bumps)
    }

    pub fn verify_review(
        ctx: Context<VerifyPeerReview>,
        _uuid: u32,
        accept_proposed_review: bool,
    ) -> Result<()> {
        ctx.accounts
            .validate_peer_review(_uuid, accept_proposed_review)
    }

    pub fn update_paper(
        ctx: Context<UpdateResearch>,
        _uuid: u32,
        title: String,
        description: String,
        price: u64,
        article_url: String,
    ) -> Result<()> {
        ctx.accounts
            .update_research_paper(_uuid, title, description, price, article_url)
    }
}
