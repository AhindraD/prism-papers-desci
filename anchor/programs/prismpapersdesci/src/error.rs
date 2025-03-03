use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCodes {
    #[msg("User name Too Long")]
    UserNameTooLong,

    #[msg("Data field Cannot Be Empty")]
    DataFieldEmpty,

    #[msg("Research Paper Title Too Long")]
    PaperTitleTooLong,

    #[msg("Research Paper Description Too Long")]
    PaperDescriptionTooLong,

    #[msg("Research Paper Link Is Invalid")]
    PaperLinkInvalid,

    #[msg("Research Paper Price Is Invalid")]
    ResearchPriceInvalid,

    #[msg("Review Link Is Invalid")]
    ReviewLinkInvalid,
}
