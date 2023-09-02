export type IOrderedBook = {
  bookId: string;
  quantity: number;
};

export type IOrderData = {
  userId: string;
  orderedBooks: IOrderedBook[];
};
