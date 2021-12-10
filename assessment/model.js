
const mongoose = require("mongoose");
const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    symbol: {
        type: String,
    },
    cmc_rank: {
        type: String,
    },
    total_supply: {
        type: String,
    },
    num_market_pairs: {
        type: String,
    },
    circulating_supply: {
        type: String,
    },
    max_supply: {
        type: String,
    },
    last_updated: {
        type: String,
    },
    date_added: {
        type: String,
    },
    slug: {
        type: String,
    },
});

const Crypto = mongoose.model("crypto", cryptoSchema);

module.exports = Crypto;