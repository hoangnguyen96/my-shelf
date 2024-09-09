"use client";

import { SearchBar } from "@app/components/common";
import { ROUTES } from "@app/constants";
import { getFirstPath, getTwoPath } from "@app/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBarBase = () => {
  const [prevPath, setPrevPath] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearch = () => {
    let part = "";
    if (pathname?.includes(ROUTES.MY_BOOK_SHELF_FAVORITES)) {
      part = getTwoPath(pathname);
    } else {
      part = getFirstPath(pathname);
    }

    if (!searchTerm && !searchType) {
      return router.replace(part);
    }

    const newPath = `${part}${
      searchType && searchTerm ? `/${searchType}/${searchTerm}` : ""
    }`;

    setPrevPath(part);
    return router.replace(newPath);
  };

  useEffect(() => {
    if (!pathname?.includes(prevPath)) {
      setSearchType("");
      setSearchTerm("");
    }
  }, [pathname]);

  return (
    <SearchBar
      typeSearch={searchType}
      valueSearch={searchTerm}
      onInputChange={handleSearchChange}
      onSelectChange={handleTypeChange}
      onSubmitSearch={handleSearch}
    />
  );
};

export default SearchBarBase;
