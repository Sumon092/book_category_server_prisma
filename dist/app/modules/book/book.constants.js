"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumericFilterCondition = exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookFilterableFields = [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'category',
];
function generateNumericFilterCondition(_key, filterValue, operator) {
    const numericValue = parseFloat(filterValue);
    if (!isNaN(numericValue)) {
        return {
            price: {
                [operator]: numericValue,
            },
        };
    }
    return null;
}
exports.generateNumericFilterCondition = generateNumericFilterCondition;
