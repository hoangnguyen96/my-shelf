# MY BOOK SHELF MANAGEMENT

My book shelf management is an online book reading application that helps users conveniently borrow books.

Author: Hoang Nguyen Van <[hoang.nguyenvan@asnet.com.vn](hoang.nguyenvan@asnet.com.vn)>

### Design

- [Figma](https://www.figma.com/design/OKKHcZgG8Qk4z7urpvelxw/My-Book-Shelf-Management?node-id=1-2&t=QZ6pL06tIF6DRRJO-0)

### APIs

- Mock API: [my_book_shelf](https://66bda7bd74dfc195586d2953.mockapi.io/api/v1/user)

### Requirements

- Analyze requirements in this [DOC](https://docs.google.com/document/d/1LwSNOT8mT0-9S_T1idvNG6NptS4YTUrwcH0GD83MjHc/edit#heading=h.6fwacknootp1)

## HOW TO RUN

#### Prerequisites

1. Make sure you install packages with correct version below:

- [node v20.10.0](https://nodejs.org/en/)
- [pnpm 7.32.3](https://pnpm.io/)

2. Create a `.env` file and follow the `.env.sample` file.

3. Install all dependencies packages with command at root:

```
pnpm install
```

4. Run app:

```
pnpm dev
```

Then open [http://localhost:3000/](http://localhost:3000/) to view it in the browser

5. Run Storybook:

```
pnpm run storybook
```

Then open [http://localhost:6006/](http://localhost:6006/) to view it in the browser

6. Run Unit test:

```
pnpm run test
```

## TECH STACKS

### Frameworks & Libraries

- [NextJS](https://nextjs.org/): Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.

- [ReactJS](https://reactjs.org/): A JavaScript library for building user interfaces.

- [ChakraUI](https://v2.chakra-ui.com/): ​​Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

- [react-hook-form](https://react-hook-form.com/): React Hooks for form state management and validation

### Authentication

- [NextAuth.js](https://next-auth.js.org/): NextAuth.js is a complete open-source authentication solution for Next.js applications. It is designed from the ground up to support Next.js and Serverless.

### Developer Tools

- [Typescript](https://www.typescriptlang.org/): TypeScript is an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions.

- [Storybook](https://storybook.js.org/): Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

### Testing

- [Jest](https://jestjs.io/): A new testing framework for end-to-end testing with WebDriver (or others). It abstracts browser interaction to simple steps that are written from a user perspective

- [React Testing Library](https://testing-library.com/): Simple and complete testing utilities that encourage good testing practices. Is a light-weight solution for testing web pages by querying and interacting with DOM nodes.
