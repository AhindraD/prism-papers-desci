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

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod prismpapersdesci {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize_platform(GLOBAL_FEE, &ctx.bumps)
    }

    pub fn user_register(ctx: Context<UserInit>, name: String) -> Result<()> {
        ctx.accounts.user_signup(name, &ctx.bumps)
    }
}
