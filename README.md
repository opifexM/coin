[![Node CI](https://github.com/opifexM/coin/actions/workflows/check.yml/badge.svg)](https://github.com/opifexM/coin/actions/workflows/check.yml)

# Coin

Coin is a modern web application for cryptocurrency operations within a banking system. As part of an MVP, it bridges traditional banking and cryptocurrencies, enabling users to manage accounts, perform transactions, and track exchange rates through an intuitive interface.

## Description

Coin provides a complete suite of features for users to manage their cryptocurrency accounts and interact with the system seamlessly. The application is developed to ensure security, usability, and scalability. It includes features such as account management, transaction history, currency exchange, and ATM location mapping. The design adheres to industry standards, ensuring a professional and user-friendly experience.

## Features

- **User Authentication**: Secure login with validation for credentials.
- **Account Management**:
  - Display a list of user accounts with balances and transaction history.
  - Create new accounts with a single click.
  - Sort accounts by number, balance, or last transaction date.
- **Transaction Management**:
  -   Perform transfers between accounts with input validation.
  -   Autocomplete recipient accounts using localStorage for previously used accounts.
  -   Display transfer history with color-coded entries for incoming (green) and outgoing (red) transactions.
- **Currency Exchange**:
  -   Monitor exchange rates in real-time with visual indicators for trends.
  -   Perform currency exchanges with validation for balance sufficiency.
- **Balance and Transaction Analytics**:
  -   Bar charts for account balance over the last 6 and 12 months.
  -   Visual representation of income vs. expense ratios.
  -   Interactive charts with detailed drill-down capabilities.
- **ATM Locator**: Display bank ATM locations on an interactive map using Yandex or Google Maps.
- **Advanced UX/UI**:
  -   Loader and skeleton screens for smooth data loading.
  -   Customizable layout for users to rearrange sections to their preferences.

## Technologies Used

- **TypeScript**: Strongly typed programming for better maintainability.
- **Vite**: High-performance build tool optimized for modern web projects.
- **Chart.js**: Library for rendering dynamic charts.
- **Leaflet**: Library for interactive maps.
- **Zod**: Data validation for secure and reliable forms.
- **Prettier**: Code formatting tool to maintain consistent style.
- **ESLint**: Linter for identifying and fixing code quality issues.

### Testing

- **Cypress**: End-to-end testing tool for web applications.

## Complexity

The application combines sophisticated features and robust architecture to provide an efficient and secure user experience:

- **Dynamic Charts**: Visualize account data and transactions interactively.
- **Real-Time Updates**: Display live exchange rates and auto-update account balances.
- **Error Handling**: Gracefully handle backend errors with clear feedback to users.
- **Skeleton Screens**: Enhance user experience during data loading.

## License

Coin is licensed under the ISC license.
