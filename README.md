# Bob Whisky Recommender UI

Bob Whisky Recommender UI is a React-based frontend application designed to provide personalized whisky bottle recommendations to users within the BAXUS ecosystem. Bob, the AI agent at the core of this application, analyzes users' virtual bars and provides tailored suggestions to enhance their collections.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Core Components](#core-components)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Overview

Bob is an AI-powered whisky expert that helps users discover new bottles to add to their collections. By analyzing a user's bar data, Bob provides recommendations based on preferences such as price range, flavor profile, and complementary bottles. This application serves as the user interface for interacting with Bob's recommendations.

## Features

- **Collection Analysis**: Parses and analyzes a user's existing bar data to identify patterns in preferences.
- **Recommendation Engine**:
  - Suggests new bottles based on collection analysis.
  - Provides recommendations within similar price ranges.
  - Recommends bottles with similar profiles to the existing collection.
  - Suggests complementary bottles to diversify a collection.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: Displays user-friendly error messages for API failures or invalid inputs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bob-whisky-recommender-ui.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bob-whisky-recommender-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Enter your username to fetch personalized recommendations.
3. Use the sidebar to explore different recommendation categories:
   - Bob's Picks
   - Similar Price Range
   - Similar Profile
   - Complementary Selection

## Environment Variables

The application requires the following environment variables to be set in a `.env` file:

```env
REACT_APP_API_BASE_URL=<API_BASE_URL>
REACT_APP_DEFAULT_USERNAME=<DEFAULT_USERNAME>
```

- `REACT_APP_API_BASE_URL`: Base URL for the API endpoints.
- `REACT_APP_DEFAULT_USERNAME`: Default username for testing purposes.

## Core Components

### `App.jsx`

- **State Management**:

  - `username`: Stores the user's input.
  - `hasSubmittedUsername`: Tracks whether the username has been submitted.
  - `recommendations`: Stores the fetched recommendations.
  - `loading`: Indicates whether data is being fetched.
  - `error`: Stores error messages.
  - `activeEndpoint`: Tracks the currently selected recommendation category.
  - `sidebarOpen`: Manages the state of the sidebar.

- **Key Functions**:

  - `fetchRecommendations`: Fetches recommendations from the API based on the selected endpoint.
  - `handleEndpointChange`: Updates the active endpoint and triggers data fetching.
  - `handleUsernameSubmit`: Validates and submits the username.

- **Components**:
  - `Navbar`: Handles username input and submission.
  - `Sidebar`: Displays recommendation categories and allows switching between them.
  - `BottleGrid` and `BottleCard`: Render the list of recommended bottles.
  - `LoadingSpinner`: Displays a loading indicator during data fetching.

## API Endpoints

The application interacts with the following API endpoints:

- **Direct Recommendations**:
  ```
  GET /direct-recommendations/{username}
  ```
- **Similar Price Range**:
  ```
  GET /recommendations/{username}/similar-price
  ```
- **Similar Profile**:
  ```
  GET /recommendations/{username}/similar-profile
  ```
- **Complementary Selection**:
  ```
  GET /recommendations/{username}/complementary
  ```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Running Tests

To run tests, use the following command:

```bash
npm test
```

### Linting

To check for linting issues, run:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
