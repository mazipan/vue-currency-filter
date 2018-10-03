module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [ "error", 2 ],
        "linebreak-style": [ "error", "windows" ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "never" ],
        "no-console": "off"
    },
    "overrides": {
        "files": [ "**/*.js", "**/*.vue" ]
    }
};