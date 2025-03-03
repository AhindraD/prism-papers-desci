use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

use crate::{ErrorCodes, UserAccount};

#[derive(Accounts)]
pub struct UserWithdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        seeds=[
            b"user_account",
            user.key().as_ref(),
        ],
        bump=user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        seeds=[
            b"user_vault",
            user_account.key().as_ref(),
        ],
        bump
    )]
    pub user_vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> UserWithdraw<'info> {
    pub fn admin_withdraw_vault(&mut self) -> Result<()> {
        let vault_balance = self.user_vault.get_lamports();
        require!(vault_balance > 0, ErrorCodes::InsufficientBalanceInVault);

        let cpi_program = self.system_program.to_account_info();
        let cpi_accounts = Transfer {
            from: self.user_vault.to_account_info(),
            to: self.user.to_account_info(),
        };

        let user_account_key = self.user_account.key();
        let seeds = &[
            b"user_vault",
            user_account_key.as_ref(),
            &[self.user_account.vault_bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        transfer(cpi_ctx, vault_balance)?;
        Ok(())
    }
}
