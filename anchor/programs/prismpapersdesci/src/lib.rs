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
}
