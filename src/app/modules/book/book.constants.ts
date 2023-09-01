export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookFilterableFields = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'category',
];

export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};

export function generateNumericFilterCondition(
  key: string,
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
