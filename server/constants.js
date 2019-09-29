const CONSTANTS = { devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3000
}};

CONSTANTS.PORT = process.env.PORT || "3001";

module.exports = CONSTANTS;
