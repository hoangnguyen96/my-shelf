import { DEFAULT_LIMIT, TYPE_SEARCH } from "@app/constants";
import { BookType } from "@app/interface";

export const filterBooksOnShelf = (
  allBooks: BookType[],
  shelfBooks: string[]
) => allBooks.filter((item) => shelfBooks.includes(item.id));

export const filterBooksOnShelfByParams = (
  booksOnShelf: BookType[],
  type: string,
  value: string
) =>
  booksOnShelf.filter((item) =>
    type === TYPE_SEARCH.TITLE && value
      ? item.title.toLowerCase().includes(value.toLowerCase())
      : type === TYPE_SEARCH.AUTHOR && value
        ? item.author.toLowerCase().includes(value.toLowerCase())
        : item
  );

export const filterBooksFavorite = (
  allBooks: BookType[],
  favorites: string[]
) => allBooks.filter((item) => favorites.includes(item.id));

export const filterBooksFavoriteByParams = (
  booksFavorites: BookType[],
  type: string,
  value: string
) =>
  booksFavorites.filter((item) =>
    type === TYPE_SEARCH.TITLE && value
      ? item.title.toLowerCase().includes(value.toLowerCase())
      : type === TYPE_SEARCH.AUTHOR && value
        ? item.author.toLowerCase().includes(value.toLowerCase())
        : item
  );

export const dividePaginationBooks = (list: BookType[], limit?: number) => {
  return list.reduce((acc: BookType[][], _, i, self) => {
    if (!(i % (limit || DEFAULT_LIMIT))) {
      return [...acc, self.slice(i, i + (limit || DEFAULT_LIMIT))];
    }
    return acc;
  }, []);
};
