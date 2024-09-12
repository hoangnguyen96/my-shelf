import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://my-shelf-theta.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/login",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/register",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/home",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/search",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/my-book-shelf",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/my-book-shelf/favorites",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/contribute",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/contribute-list",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/contribute/complete",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/preview",
      lastModified: new Date(),
    },
    {
      url: "https://my-shelf-theta.vercel.app/profile",
      lastModified: new Date(),
    },
  ];
}
