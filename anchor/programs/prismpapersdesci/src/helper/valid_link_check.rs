// use url::Url;
// pub fn is_valid_https_url(article_url: &str) -> bool {
//     match Url::parse(article_url) {
//         Ok(url) => {
//             url.scheme() == "https" // Must use HTTPS
//                 && url.has_host() // Must have a valid host (domain or IP)
//                 && url.cannot_be_a_base() == false // Should be a full URL, not just a fragment
//         }
//         Err(_) => false, // Invalid URL format
//     }
// }