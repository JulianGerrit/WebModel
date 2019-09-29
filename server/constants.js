const CONSTANTS = { devServer: {
    allowedHosts: [
     'steen01.steenhq.com'
    ]
}};

CONSTANTS.PORT = process.env.PORT || "3001";

module.exports = CONSTANTS;
