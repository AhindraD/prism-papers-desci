use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

use crate::{ErrorCodes, PlatformConfig};

#[derive(Accounts)]
pub struct AdminWithdraw<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        seeds = [
            b"platform_config", 
            admin.key().as_ref()
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
    pub system_program: Program<'info, System>,
}

impl<'info> AdminWithdraw<'info> {
    pub fn admin_withdraw_vault(&mut self) -> Result<()> {
        let vault_balance = self.admin_vault.get_lamports();
        require!(vault_balance > 0, ErrorCodes::InsufficientBalanceInVault);

        let cpi_program = self.system_program.to_account_info();
        let cpi_accounts = Transfer {
            from: self.admin_vault.to_account_info(),
            to: self.admin.to_account_info(),
        };

        let platform_config_key = self.platform_config.key();
        let seeds = &[
            b"admin_vault",
            platform_config_key.as_ref(),
            &[self.platform_config.vault_bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        transfer(cpi_ctx, vault_balance)?;
        Ok(())
    }
}
