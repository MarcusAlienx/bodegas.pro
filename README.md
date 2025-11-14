# Bodegas.pro

Bodegas.pro is a web application designed to streamline the process of finding and listing commercial warehouse spaces. It provides a user-friendly interface for searching available properties and tools for brokers to publish their listings across major real estate platforms.

## Functionalities

### Implemented

*   **Landing Page:** A complete and visually appealing landing page that serves as the main entry point for users.
*   **Search Interface:** A prominent search bar that allows users to describe their warehouse needs in natural language.
*   **Example Searches:** Pre-defined search queries to guide users and showcase the platform's capabilities.
*   **Listing Actions:** Buttons for creating a new listing or importing an existing one.
*   **Partner Showcase:** A section displaying the logos of partner real estate portals where listings are cross-posted.
*   **Firebase Integration:** The project is connected to Firebase for backend services.
*   **Server-Side Rendering (SSR):** The Next.js application is hosted on Firebase Functions, enabling server-side rendering for improved performance and SEO.

### Pending

*   **User Authentication:** Implement user accounts for brokers and clients.
*   **Search Functionality:** Develop the backend logic to process natural language search queries and return relevant results.
*   **Listing Creation/Import:** Build the forms and workflows for users to create or import property listings.
*   **Database Integration:** Connect the application to a database (e.g., Firestore) to store user data, listings, and other relevant information.
*   **API Endpoints:** Create the necessary API endpoints to support the frontend application.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 16.0.1
*   **UI Library:** [React](https://react.dev/) 19.2.0
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4.0
*   **Backend:** [Firebase](https://firebase.google.com/)
    *   [Firebase Functions](https://firebase.google.com/docs/functions)
    *   [Firebase Hosting](https://firebase.google.com/docs/hosting)
    *   [Firebase Emulators](https://firebase.google.com/docs/emulator-suite)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) 5.0
*   **Linting:** [ESLint](https://eslint.org/) 9.0

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20 or higher)
*   npm or yarn
*   Firebase CLI (`npm install -g firebase-tools`)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/MarcusAlienx/bodegas.pro.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up Firebase
    *   Log in to your Firebase account:
        ```sh
        firebase login
        ```
    *   Initialize Firebase in the project directory (follow the on-screen instructions):
        ```sh
        firebase init
        ```

### Running the Application

1.  Start the development server and Firebase emulators:
    ```sh
    npm run dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production-ready build, run:
```sh
npm run build
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request