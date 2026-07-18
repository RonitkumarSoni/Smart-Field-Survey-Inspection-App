# Smart Field Survey & Inspection App 📱📍

A comprehensive and modern **React Native** application built with **Expo**, designed for field agents and surveyors to easily collect data, capture images, record locations, and manage inspection surveys efficiently. 

---

## 🌟 Key Features

### 1. 📊 Dashboard
- Welcome screen with user details.
- Real-time today's survey count.
- Quick action cards to easily navigate to new surveys, camera, contacts, and location.
- Summary of recent surveys.

### 2. 📝 Create Survey
- Simple and intuitive form to collect: Site Name, Client Name, Description, Priority (High/Medium/Low), and Date.
- Built-in validation for required fields.

### 3. 📸 Camera Module
- Integrated `expo-camera` to capture site photos.
- Flash toggle, camera flip (front/back), and permission handling.
- Live timestamp overlay on captured photos.
- Options to retake or delete photos with a confirmation alert.

### 4. 🗺️ Location Module
- Integrated `expo-location` to fetch real-time GPS coordinates.
- Displays exact Latitude, Longitude, and Accuracy.
- Embedded map view for visual location tracking.
- One-tap copy to clipboard for easy sharing.

### 5. 👥 Contacts Module
- Integrated `expo-contacts` to fetch and view device contacts.
- Quick search functionality.
- Tap a contact to copy their phone number to the clipboard.
- Pull-to-refresh functionality and neat contact avatars.

### 6. 📋 Clipboard Utilities
- Integrated `expo-clipboard` to copy Survey IDs, Contact Numbers, and Locations easily.
- Test pasting functionality and an option to clear clipboard data.

### 7. 🔍 Survey History & Preview
- Comprehensive list of all created surveys.
- Search surveys by Site or Client Name (Case-insensitive).
- **Filter by Priority** (All, High, Medium, Low).
- Detailed preview screen showing all survey data including Map and Photo.
- Edit or delete surveys with safety confirmation alerts.

### 8. 🧭 Navigation
- Seamless navigation powered by **Expo Router**.
- **Bottom Tabs**: Dashboard, New Survey, History, Profile.
- **Drawer Navigation**: Access to modules like Camera, Location, Contacts, Clipboard, and Settings.

---

## 🛠️ Tech Stack & APIs Used

- **Framework:** React Native, Expo
- **Navigation:** Expo Router, React Navigation (Drawer & Tabs)
- **State Management:** React Context API
- **Expo APIs:**
  - `expo-camera`
  - `expo-location`
  - `expo-contacts`
  - `expo-clipboard`
- **UI Components:** React Native standard components (`View`, `Text`, `FlatList`, `ScrollView`, etc.)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with the Expo CLI.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RonitkumarSoni/Smart-Field-Survey-Inspection-App.git
   cd Smart-Field-Survey-Inspection-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo server:**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run the app:**
   - Scan the generated QR code using the **Expo Go** app on your physical device (Android/iOS).
   - Alternatively, press `a` for Android Emulator, `i` for iOS Simulator, or `w` to run on the web.

---

## 🤝 Contribution

Feel free to fork the repository, make your enhancements, and submit a pull request! Any contributions to improve the UI/UX or add features (like backend sync or local database storage) are highly appreciated.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
