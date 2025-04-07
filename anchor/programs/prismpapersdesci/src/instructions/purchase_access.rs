use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

use crate::{
    ErrorCodes, PlatformConfig, PurchasedPaper, ResearchPaperState, UserAccount,
    ANCHOR_DISCRIMINATOR,
};

#[derive(Accounts)]
#[instruction(_uuid:u32)]
pub struct PurchaseAccess<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        mut,
        seeds=[
            b"user_account",
            buyer.key().as_ref(),
        ],
        bump=buyer_user_account.bump
    )]
    pub buyer_user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        seeds=[
            b"research_paper",
            research_paper.publisher.key().as_ref(),
            _uuid.to_le_bytes().as_ref(),
        ],
        bump=research_paper.bump
    )]
    pub research_paper: Account<'info, ResearchPaperState>,

    #[account(
        mut,
        seeds=[
            b"user_account",
            research_paper.publisher.key().as_ref(),
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
        init,
        payer = buyer,
        seeds=[
            b"purchased_paper",
            buyer.key().as_ref(),
            research_paper.key().as_ref(),
        ],
        space=ANCHOR_DISCRIMINATOR as usize + PurchasedPaper::INIT_SPACE,
        bump,
    )]
    pub purchased_paper_access: Account<'info, PurchasedPaper>,

    pub system_program: Program<'info, System>,
}

impl<'info> PurchaseAccess<'info> {
    pub fn purchase_paper_access(&mut self, _uuid: u32, bumps: &PurchaseAccessBumps) -> Result<()> {
        require!(
            self.purchased_paper_access.buyer.key() != self.research_paper.publisher.key(),
            ErrorCodes::PublisherCantBuySelfResearchPaper
        );

        //setting the purchased paper access state
        self.purchased_paper_access.set_inner(PurchasedPaper {
            buyer: self.buyer.key(),
            purchased_paper: self.research_paper.key(),
            bump: bumps.purchased_paper_access,
        });

        //calculating the platform fee and publisher amount
        let total_amount = self.research_paper.price;

        let platform_fee = total_amount
            .checked_mul((self.platform_config.global_fee / 100) as u64)
            .ok_or(error!(ErrorCodes::MathOverflow))?;

        let publisher_amount = total_amount
            .checked_sub(platform_fee)
            .ok_or(error!(ErrorCodes::MathOverflow))?;

        //transferring the publisher amount to the publisher vault
        let cpi_program = self.system_program.to_account_info();
        let cpi_account_options_publisher = Transfer {
            from: self.buyer.to_account_info(),
            to: self.publisher_user_vault.to_account_info(),
        };
        let cpi_ctx_publisher = CpiContext::new(cpi_program, cpi_account_options_publisher);
        transfer(cpi_ctx_publisher, publisher_amount)?;

        //transferring the platform fee to the admin vault
        let cpi_program = self.system_program.to_account_info();
        let cpi_account_options_admin = Transfer {
            from: self.buyer.to_account_info(),
            to: self.admin_vault.to_account_info(),
        };
        let cpi_ctx_admin = CpiContext::new(cpi_program, cpi_account_options_admin);
        transfer(cpi_ctx_admin, platform_fee)?;

        //updating all states
        self.research_paper.sales += 1u64;
        self.buyer_user_account.purchased += 1u16;
        self.publisher_user_account
            .earning
            .checked_add(publisher_amount as i64)
            .ok_or(error!(ErrorCodes::MathOverflow))?;

        Ok(())
    }
}
