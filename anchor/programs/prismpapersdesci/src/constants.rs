use anchor_lang::prelude::*;

#[constant]
pub const ANCHOR_DISCRIMINATOR: u8 = 8;

pub const GLOBAL_FEE: u8 = 5; // a 5% platform fee on all transactions, to be collected by the admin

pub const INIT_STAT: usize = 0; //initial sale, review, and purchase etc
