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

    #[msg("Publisher Can't Buy Their Own Paper")]
    PublisherCantBuySelfResearchPaper,

    #[msg("Mathematical Operation Overflow")]
    MathOverflow,

    #[msg("Publisher Can't Review Their Own Paper")]
    PublisherCantReviewSelf,

    #[msg("Review Link Is Invalid")]
    ReviewLinkInvalid,

    #[msg("Peer Review Status Is Not Pending Anymore")]
    InvalidPeerReviewStatus,

    #[msg("Insufficient Balance in Vault")]
    InsufficientBalanceInVault,
}
