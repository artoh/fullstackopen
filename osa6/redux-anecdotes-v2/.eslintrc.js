module.exports = {
    "env": {
        "browser": true,
        "es6": true,
		"jest/globals": true
    },
    "extends": [
		"eslint:recommended",
		"plugin:react/recommended"
		],
	"parser" : "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
		"ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
		"jest"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0,				
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error"
    }
};
