export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookFilterableFields = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'category',
];

export function generateNumericFilterCondition(
  _key: string,
  filterValue: string,
  operator: 'gte' | 'lte'
): { price: { [x: string]: number } } | null {
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
