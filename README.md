# FT-WEB-Team-22-67f7f1ee
# 🗳️ Local Democracy Engagement Platform


A modern, responsive web application designed to facilitate community voting, logistics management, news updates, and user profiles. Built with React, Vite, Firebase Realtime Database, and Chart.js, this platform ensures seamless interaction for both voters and administrators.

[Netlify link](https://neighbourgov.netlify.app/)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Setup](#firebase-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🌟 Features

- **Voting System**:
  - Users can vote on community initiatives.
  - Real-time results displayed using pie charts (powered by Chart.js).

- **Logistics Management**:
  - View and manage logistics data in a clean grid layout.

- **News Updates**:
  - Display community news and updates dynamically.

- **User Authentication**:
  - Secure login and signup functionality.
  - Protected routes for private pages like voting and profile management.

- **Admin Dashboard**:
  - Admins can manage elections, view results, and oversee logistics.

- **Theme Toggle**:
  - Switch between light and dark themes for better accessibility.

---

## 💻 Tech Stack

- **Frontend**: React, Vite, React Router, Chart.js
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Styling**: CSS Modules, Global Styles
- **Deployment**: Netlify
- **Version Control**: Git, GitHub

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sanju-Burman/FT-WEB-Team-22-67f7f1ee
   cd FT-WEB-Team-22-67f7f1ee
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory and add your Firebase configuration:
     ```env
       apiKey: "AIzaSyC0CH5zAgx8K34bQPf3KEHqD8UcilcFCNQ",
       authDomain: "neighbourgov.firebaseapp.com",
       databaseURL: "https://neighbourgov-default-rtdb.firebaseio.com",
      projectId: "neighbourgov",
      storageBucket: "neighbourgov.firebasestorage.app",
      messagingSenderId: "348825259497",
      appId: "1:348825259497:web:26f46d22939ac8844ccf78"
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🧰 Usage

### Public Routes

- `/`: Home page with an overview of the platform.
- `/login`: User login page.
- `/signup`: User registration page.
- `/news`: News updates about the community.
- `/initiative`: Details about ongoing initiatives.

### Protected Routes

- `/voting`: Vote on community initiatives (requires authentication).
- `/logistics`: View and manage logistics data (requires authentication).
- `/profile`: Manage user profile settings (requires authentication).

### Admin Routes

- `/admin`: Admin dashboard for managing elections and results.

---

## 🔥 Firebase Setup

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Enable Authentication**:
   - Enable Email/Password authentication in the Firebase console.

3. **Set Up Realtime Database**:
   - Create a Realtime Database and configure security rules:
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```

4. **Add Firebase SDK**:
   - Copy the Firebase configuration and paste it into your `.env` file.

---

## 🌐 Deployment

### Deploy to Netlify

1. Push your code to GitHub.
2. Log in to [Netlify](https://www.netlify.com/) and connect your repository.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Deploy the site.

### Deploy to Vercel

1. Push your code to GitHub.
2. Log in to [Vercel](https://vercel.com/) and import your project.
3. Set the output directory to `dist`.
4. Deploy the site.

---

## 🤝 Contributing

We welcome contributions from the community! Here’s how you can contribute:

1. **Fork the Repository**:
   - Click the "Fork" button on the top-right corner of this repository.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/Sanju-Burman/FT-WEB-Team-22-67f7f1ee
   cd FT-WEB-Team-22-67f7f1ee
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

4. **Make Changes**:
   - Add your changes and commit them:
     ```bash
     git add .
     git commit -m "Add new feature"
     ```

5. **Push to GitHub**:
   ```bash
   git push origin feature/new-feature
   ```

6. **Open a Pull Request**:
   - Go to the original repository and open a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For questions, feedback, or collaboration opportunities, feel free to reach out:

**Team member 1 (Leader)**
- **GitHub**: [@Sanju-Burman](https://github.com/Sanju-Burman)
- **Email**: aashusondhiya8@gmail.com
- **LinkedIn**: [sanju-burman](https://www.linkedin.com/in/sanju-burman)
- 
**Team member 2**
- **GitHub**: [@Sanju-Burman](https://github.com/Sanju-Burman)
- **Email**: aashusondhiya8@gmail.com
- **LinkedIn**: [sanju-burman](https://www.linkedin.com/in/sanju-burman)
- 
**Team member 3**
- **GitHub**: [@Sanju-Burman](https://github.com/Sanju-Burman)
- **Email**: aashusondhiya8@gmail.com
- **LinkedIn**: [sanju-burman](https://www.linkedin.com/in/sanju-burman)

---

## 🙏 Acknowledgments

- Thanks to the Firebase team for their excellent documentation and tools.
- Special thanks to the open-source community for their contributions and support.

---
