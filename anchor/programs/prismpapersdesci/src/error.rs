use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("User name Too Long")]
    UserNameTooLong,

    #[msg("Research Paper Title Too Long")]
    PaperTitleTooLong,

    #[msg("Research Paper Description Too Long")]
    PaperDescriptionTooLong,

    #[msg("Research Paper Link Is Invalid")]
    PaperLinkInvalid,

    #[msg("Review Link Is Invalid")]
    ReviewLinkInvalid,
}
