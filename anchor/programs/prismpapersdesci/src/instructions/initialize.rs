use anchor_lang::prelude::*;

use crate::{PlatformConfig, ANCHOR_DISCRIMINATOR};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space=ANCHOR_DISCRIMINATOR as usize + PlatformConfig::INIT_SPACE,
        seeds = [
            b"platform_config", 
            admin.key().as_ref()
            ],
        bump
    )]
    pub platform_config: Account<'info, PlatformConfig>,

    #[account(
        seeds = [
            b"admin_vault", 
            platform_config.key().as_ref()
            ], 
        bump)]
    pub admin_vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initialize_platform(&mut self, fee: u8, bumps: &InitializeBumps) -> Result<()> {
        self.platform_config.set_inner(PlatformConfig {
            admin: self.admin.key(),
            global_fee: fee,
            bump: bumps.platform_config,
            vault_bump: bumps.admin_vault,
        });
        Ok(())
    }
}
