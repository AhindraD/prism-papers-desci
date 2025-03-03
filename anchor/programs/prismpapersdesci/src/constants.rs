use anchor_lang::prelude::*;

#[constant]
pub const ANCHOR_DISCRIMINATOR: u8 = 8;

#[constant]
pub const GLOBAL_FEE: u8 = 5; // a 5% platform fee on all transactions, to be collected by the admin
