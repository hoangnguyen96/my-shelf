import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://my-shelf-nine.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/login",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/register",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/home",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/search",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/my-book-shelf",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/my-book-shelf/favorites",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/contribute",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/contribute-list",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/contribute/complete",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/preview",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-nine.vercel.app/profile",
      lastModified: new Date(),
    },
  ];
}
