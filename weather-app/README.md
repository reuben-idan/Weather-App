# Weatherly - Modern Weather App 🌤️

A sleek, modern weather application built with React featuring a beautiful glassmorphism UI design. Get real-time weather information with an intuitive and engaging user experience.

## ✨ Features

### 🎨 Modern Glassy UI

- **Glassmorphism Design**: Beautiful frosted glass effects with backdrop blur
- **Dynamic Backgrounds**: Automatically changes based on time of day (day/sunset/night)
- **Floating Particles**: Animated background elements for a lively feel
- **Smooth Animations**: Elegant transitions and hover effects throughout

### 🌍 Weather Features

- **Current Weather**: Real-time temperature, humidity, wind speed, and precipitation
- **5-Day Forecast**: Extended weather outlook with visual temperature bars
- **Multi-City Tracking**: Monitor weather across multiple cities simultaneously
- **Smart Weather Icons**: Dynamic weather icons based on actual conditions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🔧 Technical Features

- **Real-time Data**: Fetches live weather data from Open-Meteo API
- **Intelligent Caching**: Optimized performance with smart data caching
- **Error Handling**: Graceful error states with user-friendly messages
- **Loading States**: Beautiful loading animations and feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.7+ (for backend)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Python dependencies**

   ```bash
   pip install flask flask-cors
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the React frontend (port 3000) and Python backend (port 5000) concurrently.

## 🎯 Usage

1. **Search for a City**: Enter any city name in the search bar
2. **View Current Weather**: See detailed current weather information
3. **Check Forecast**: View 5-day weather forecast below current conditions
4. **Track Multiple Cities**: Add cities to the global weather tracker
5. **Remove Cities**: Click the × button to remove cities from tracking

## 🛠️ Technology Stack

### Frontend

- **React 17**: Modern React with hooks
- **CSS3**: Custom glassmorphism styling with CSS Grid and Flexbox
- **Google Fonts**: Inter font family for clean typography
- **Responsive Design**: Mobile-first approach

### Backend

- **Flask**: Lightweight Python web framework
- **Flask-CORS**: Cross-origin resource sharing support
- **Open-Meteo API**: Free weather data API

### APIs Used

- **Open-Meteo**: Primary weather data source
- **Geocoding API**: City to coordinates conversion

## 🎨 Design System

### Color Palette

- **Primary**: Gradient blues and purples
- **Glass Effects**: Semi-transparent whites with backdrop blur
- **Text**: White with varying opacity levels
- **Accents**: Cyan, pink, and orange highlights

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300-900 (Light to Black)
- **Hierarchy**: Clear visual hierarchy with size and weight variations

### Components

- **Glass Cards**: All major components use glassmorphism effects
- **Hover States**: Subtle animations on interaction
- **Loading States**: Consistent loading spinners and messages
- **Error States**: User-friendly error handling

## 📱 Responsive Design

The app is fully responsive and optimized for:

- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined interface for small screens

## 🔧 Customization

### Styling

All styles are modular and can be easily customized:

- Component-specific CSS files
- CSS custom properties (variables) for easy theming
- Consistent design tokens

### Adding Features

The modular architecture makes it easy to add new features:

- New weather data points
- Additional forecast periods
- Custom weather alerts
- Location-based features

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **Heroku**: Use the buildpack for React apps
- **AWS S3**: Host the static files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Open-Meteo**: For providing free weather data
- **Inter Font**: Beautiful typography by Google Fonts
- **Glassmorphism Design**: Modern UI trend inspiration

---

**Weatherly** - Your weather companion with a beautiful, modern interface! 🌤️✨
