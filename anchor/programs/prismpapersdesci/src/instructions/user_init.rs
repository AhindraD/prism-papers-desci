use anchor_lang::prelude::*;

use crate::{ErrorCodes, UserAccount, ANCHOR_DISCRIMINATOR, INIT_STAT};

#[derive(Accounts)]
pub struct UserInit<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,   
        seeds=[
            b"user_account",
            owner.key().as_ref(),
        ],
        space=ANCHOR_DISCRIMINATOR as usize + UserAccount::INIT_SPACE,
        bump
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        seeds=[
            b"user_vault",
            user_account.key().as_ref(),
        ],
        bump
    )]
    pub user_vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}


impl <'info> UserInit<'info> {
    pub fn user_signup(&mut self,name:String,bumps:&UserInitBumps) -> Result<()> {

        require!(!name.is_empty(),ErrorCodes::DataFieldEmpty);
        require!(name.len() <= 32, ErrorCodes::UserNameTooLong);

        self.user_account.set_inner(UserAccount { 
            owner:self.owner.key(), 
            name, 
            published:0u8, 
            purchased: INIT_STAT, 
            reviewed: INIT_STAT, 
            earning: 0u64, 
            bump: bumps.user_account, 
            vault_bump: bumps.user_vault
        });
        Ok(())
    }
}