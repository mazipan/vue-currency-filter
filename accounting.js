import utils from './utils'

/*
 * accounting.js v0.4.2, Copyright 2014 Open Exchange Rates, Docs: http://openexchangerates.github.io/accounting.js/
 * --0-- Moderate and maintain by Irfan Maulana <github.com/mazipan> for Vue-Currency-Filter needed --0--
 */
// Create the local library object, to be exported or referenced globally later
var lib = {};
/* --- Exposed settings --- */

// The library's settings configuration object. Contains default parameters for
// currency and number formatting
lib.settings = {
	currency: {
		symbol: "$", // default currency symbol is '$'
		format: "%s%v", // controls output: %s = symbol, %v = value (can be object, see docs)
		decimal: ".", // decimal point separator
		thousand: ",", // thousands separator
		precision: 2, // decimal places
		grouping: 3 // digit grouping (not implemented yet)
	},
	number: {
		precision: 0, // default precision on numbers is 0
		grouping: 3, // digit grouping (not implemented yet)
		thousand: ",",
		decimal: "."
	}
};

/**
 * Check and normalise the value of precision (must be positive integer)
 */
function checkPrecision(val, base) {
	val = Math.round(Math.abs(val));
	return isNaN(val) ? base : val;
}


/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */
function checkCurrencyFormat(format) {
	var defaults = lib.settings.currency.format;

	// Allow function as format parameter (should return string or object):
	if (typeof format === "function") format = format();

	// Format can be a string, in which case `value` ("%v") must be present:
	if (utils.__isString(format) && format.match("%v")) {

		// Create and return positive, negative and zero formats:
		return {
			pos: format,
			neg: format.replace("-", "").replace("%v", "-%v"),
			zero: format
		};

		// If no format, or object is missing valid positive value, use defaults:
	} else if (!format || !format.pos || !format.pos.match("%v")) {

		// If defaults is a string, casts it to an object for faster checking next time:
		return (!utils.__isString(defaults)) ? defaults : lib.settings.currency.format = {
			pos: defaults,
			neg: defaults.replace("%v", "-%v"),
			zero: defaults
		};

	}
	// Otherwise, assume format was fine:
	return format;
}


/* --- API Methods --- */

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
 * Alias: `accounting.parse(string)`
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
 * separator, provide it as the second argument.
 *
 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
 *
 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
 */
var unformat = lib.unformat = lib.parse = function (value, decimal) {
	// Recursively unformat arrays:
	if (utils.__isArray(value)) {
		return utils.__map(value, function (val) {
			return unformat(val, decimal);
		});
	}

	// Fails silently (need decent errors):
	value = value || 0;

	// Return the value as-is if it's already a number:
	if (typeof value === "number") return value;

	// Default decimal point comes from settings, but could be set to eg. "," in opts:
	decimal = decimal || lib.settings.number.decimal;

	// Build regex to strip out everything except digits, decimal point and minus sign:
	var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
		unformatted = parseFloat(
			("" + value)
			.replace(/\((?=\d+)(.*)\)/, "-$1") // replace bracketed values with negatives
			.replace(regex, '') // strip out any cruft
			.replace(decimal, '.') // make sure decimal point is standard
		);

	// This will fail silently which may cause trouble, let's wait and see:
	return !isNaN(unformatted) ? unformatted : 0;
};


/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
var toFixed = lib.toFixed = function (value, precision) {
	precision = checkPrecision(precision, lib.settings.number.precision);

	var exponentialForm = Number(lib.unformat(value) + 'e' + precision);
	var rounded = Math.round(exponentialForm);
	var finalResult = Number(rounded + 'e-' + precision).toFixed(precision);
	return finalResult;
};


/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
 */
var formatNumber = lib.formatNumber = lib.format = function (number, precision, thousand, decimal) {
	// Resursively format arrays:
	if (utils.__isArray(number)) {
		return utils.__map(number, function (val) {
			return formatNumber(val, precision, thousand, decimal);
		});
	}

	// Clean up number:
	number = unformat(number);

	// Build options object from second param (if object) or all params, extending defaults:
	var opts = utils.__defaults(
			(utils.__isObject(precision) ? precision : {
				precision: precision,
				thousand: thousand,
				decimal: decimal
			}),
			lib.settings.number
		),

		// Clean up precision
		usePrecision = checkPrecision(opts.precision),

		// Do some calc:
		negative = number < 0 ? "-" : "",
		base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
		mod = base.length > 3 ? base.length % 3 : 0;

	// Format the number:
	return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
};


/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 */
var formatMoney = lib.formatMoney = function (number, symbol, precision, thousand, decimal, format) {
	// Resursively format arrays:
	if (utils.__isArray(number)) {
		return utils.__map(number, function (val) {
			return formatMoney(val, symbol, precision, thousand, decimal, format);
		});
	}

	// Clean up number:
	number = unformat(number);

	// Build options object from second param (if object) or all params, extending defaults:
	var opts = utils.__defaults(
			(utils.__isObject(symbol) ? symbol : {
				symbol: symbol,
				precision: precision,
				thousand: thousand,
				decimal: decimal,
				format: format
			}),
			lib.settings.currency
		),

		// Check format (returns object with pos, neg and zero):
		formats = checkCurrencyFormat(opts.format),

		// Choose which format to use for this value:
		useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

	// Return with currency symbol added:
	return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
};


/**
 * Format a list of numbers into an accounting column, padding with whitespace
 * to line up currency symbols, thousand separators and decimals places
 *
 * List should be an array of numbers
 * Second parameter can be an object containing keys that match the params
 *
 * Returns array of accouting-formatted number strings of same length
 *
 * NB: `white-space:pre` CSS rule is required on the list container to prevent
 * browsers from collapsing the whitespace in the output strings.
 */

// DECIDE TO REMOVE THIS METHODS -- UNUSED FOR NOW - by Irfan Maulana

// lib.formatColumn = function (list, symbol, precision, thousand, decimal, format) {
// 	if (!list || !utils.__isArray(list)) return [];

// 	// Build options object from second param (if object) or all params, extending defaults:
// 	var opts = utils.__defaults(
// 			(utils.__isObject(symbol) ? symbol : {
// 				symbol: symbol,
// 				precision: precision,
// 				thousand: thousand,
// 				decimal: decimal,
// 				format: format
// 			}),
// 			lib.settings.currency
// 		),

// 		// Check format (returns object with pos, neg and zero), only need pos for now:
// 		formats = checkCurrencyFormat(opts.format),

// 		// Whether to pad at start of string or after currency symbol:
// 		padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

// 		// Store value for the length of the longest string in the column:
// 		maxLength = 0,

// 		// Format the list according to options, store the length of the longest string:
// 		formatted = utils.__map(list, function (val, i) {
// 			if (utils.__isArray(val)) {
// 				// Recursively format columns if list is a multi-dimensional array:
// 				return lib.formatColumn(val, opts);
// 			} else {
// 				// Clean up the value
// 				val = unformat(val);

// 				// Choose which format to use for this value (pos, neg or zero):
// 				var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

// 					// Format this value, push into formatted list and save the length:
// 					fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

// 				if (fVal.length > maxLength) maxLength = fVal.length;
// 				return fVal;
// 			}
// 		});

// 	// Pad each number in the list and send back the column of numbers:
// 	return utils.__map(formatted, function (val, i) {
// 		// Only if this is a string (not a nested array, which would have already been padded):
// 		if (utils.__isString(val) && val.length < maxLength) {
// 			// Depending on symbol position, pad after symbol or at index 0:
// 			return padAfterSymbol ? val.replace(opts.symbol, opts.symbol + (new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
// 		}
// 		return val;
// 	});
// };

export default lib;