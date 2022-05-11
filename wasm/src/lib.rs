use wasm_bindgen::prelude::*;
use pulldown_cmark::{Parser, Options, html};

#[wasm_bindgen]
pub fn parse_markdown(markdown_input: &str) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);

    let unicode_emoji_text = replace_emojis_unicode(markdown_input);
    let parser = Parser::new_ext(&unicode_emoji_text, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);

    html_output
}

fn replace_emojis_unicode(input_text: &str) -> String {
    let replacer = gh_emoji::Replacer::new();
    let emojified = replacer.replace_all(input_text).to_string();

    emojified
}