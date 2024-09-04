// Libs
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fonts = {
  heading: inter.style.fontFamily,
  body: inter.style.fontFamily,
};

export const fontSizes = {
  xs: "10px",
  sm: "12px",
  md: "15px",
  lg: "16px",
  xl: "20px",
  xxl: "25px",
  xxxl: "35px",
};

export const lineHeights = {
  10: "10px",
  12: "12px",
  16: "16px",
  18: "18px",
  20: "20px",
  22: "22px",
  24: "24px",
  26: "26px",
  36: "36px",
};

export const radius = {
  sm: "5px",
  md: "8px",
  lg: "10px",
  xl: "33px",
  xxl: "40px",
};
