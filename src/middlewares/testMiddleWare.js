// eslint-disable-next-line func-names
const myLogger = () => {
    return (req, res, next) => {
        console.log('LOGGED dddddddd================>>>>');
        next();
    };
};

module.exports = myLogger;
