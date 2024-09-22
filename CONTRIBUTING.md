# Contributing to EZ Cart

Thank you for your interest in contributing to EZ Cart! This guide will help you get started with contributing to our project.

## Project Structure

EZ Cart is built using Next.js and follows its conventional structure:

- `src/app`: Main application pages and layouts
- `src/components`: Reusable React components
- `src/helpers`: Helper functions and utilities
- `src/styles`: Global styles and CSS modules

## Key Components

### Home Page
The main landing page of the application is located in [Home.tsx](https://github.com/vys69/ez-cart/blob/master/src/app/Home.tsx). It includes several sections:

1. Header with logo and navigation
2. Hero section with a call-to-action
3. Features section
4. About section explaining the tax calculation feature
5. Installation guide section
6. Footer with links

### Cart Functionality
The cart functionality is managed by a custom hook `useCart` and the main cart page component.

#### useCart Hook
Located in [useCart.ts](https://github.com/vys69/ez-cart/blob/master/src/app/cart/src/hooks/useCart.ts), this hook manages the cart state and provides various functions for cart operations. It uses utility functions from [cartUtils.ts](https://github.com/vys69/ez-cart/blob/master/src/app/cart/src/hooks/cartUtils.ts) for calculations and data handling.

#### Cart Page
The cart page component is defined in [page.tsx](https://github.com/vys69/ez-cart/blob/master/src/app/cart/page.tsx). It includes:

1. A list of cart items
2. Subtotal, tax, and total calculations
3. Form for adding new items
4. Buttons for sharing and clearing the cart

### UI Components
EZ Cart uses several reusable UI components located in the [ui](https://github.com/vys69/ez-cart/tree/master/src/components/ui) directory, including Button, Card, Input, and Toast.

### Navigation and Routing
The application uses Next.js routing, with the main layout defined in [layout.tsx](https://github.com/vys69/ez-cart/blob/master/src/app/layout.tsx).

### Tax Calculation
Tax rates and country/state information are managed in [taxes.ts](https://github.com/vys69/ez-cart/blob/master/src/helpers/taxes.ts).

## Development Workflow

1. Fork the repository and clone it locally.
2. Install dependencies using `npm install` or `yarn install`.
3. Create a new branch for your feature or bug fix.
4. Make your changes, ensuring they follow the existing code style.
5. Test your changes thoroughly.
6. Commit your changes with a clear and descriptive commit message.
7. Push your changes to your fork and submit a pull request.

## Code Style and Best Practices

- Use TypeScript for type safety.
- Follow the existing code structure and naming conventions.
- Write clear and concise comments for complex logic.
- Use functional components and hooks for React components.
- Optimize performance where possible, especially in frequently used components.

## Testing

- Write unit tests for new functionality.
- Ensure all existing tests pass before submitting a pull request.

## Documentation

- Update the README.md file if you're adding new features or changing existing functionality.
- Include inline documentation for complex functions or components.

## Submitting Pull Requests

- Provide a clear description of the changes in your pull request.
- Reference any related issues in your pull request description.
- Ensure your code passes all tests and linting checks.

## Key Interfaces

The project uses TypeScript for type safety. Key interfaces include:
```typescript
export interface GroceryItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface SharedData {
    items: GroceryItem[];
    countryCode: string | null;
    region: string | null;
  }
  
  export interface Country {
    code: string;
    name: string;
    regions: TaxRegion[];
  }
  
  export interface TaxRegion {
    name: string;
    rate: number;
  }
```

These interfaces are used throughout the application to ensure type consistency.

## Progressive Web App (PWA) Functionality

EZ Cart is set up as a PWA, with the manifest file located at [manifest.ts](https://github.com/vys69/ez-cart/blob/master/src/app/manifest.ts). The PWA functionality is handled by [PWAHandler.tsx](https://github.com/vys69/ez-cart/blob/master/src/components/PWAHandler.tsx), which manages the app's behavior when installed as a standalone application.

Thank you for contributing to EZ Cart! Your efforts help make our project better for everyone.
