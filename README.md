# Gunaseelan V - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, JavaScript, and Node.js.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive UI**: Smooth animations and click effects
- **Certificate Gallery**: Showcase your achievements
- **Contact Form**: Integrated with Google Sheets
- **Modern UI/UX**: Beautiful gradient designs and smooth transitions

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd My_Portfolio
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running Locally

### Development Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

### Using Node.js HTTP Server
```bash
npx http-server -p 8080
```

## 🌐 Deploying to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production:
```bash
vercel --prod
```

### Method 2: Using GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect the Node.js setup
5. Click "Deploy"

## 📁 Project Structure

```
My_Portfolio/
├── api/
│   └── index.js          # Vercel serverless function
├── files/
│   ├── certificates/     # Certificate images
│   └── portfolio/        # Profile images
├── index.html           # Main HTML file
├── server.js            # Express server (local dev)
├── package.json         # Dependencies
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables

No environment variables required for basic setup.

### API Endpoints

- `GET /api/portfolio` - Get portfolio information
- `GET /api/health` - Health check endpoint

## 📝 Customization

1. **Update Profile**: Edit `index.html` to change your information
2. **Add Certificates**: Place images in `files/certificates/` and update HTML
3. **Change Colors**: Modify CSS variables in the `<style>` section
4. **Contact Form**: Update Google Sheets script URL in the form handler

## 🛠️ Technologies Used

- HTML5
- CSS3 (with animations)
- JavaScript (ES6+)
- Node.js
- Express.js
- Vercel (for deployment)

## 📧 Contact

- **Email**: gunaseelanvinothv@gmail.com
- **GitHub**: [gunaseelanvinoth](https://github.com/gunaseelanvinoth)
- **LinkedIn**: [Gunaseelan V](https://www.linkedin.com/in/gunaseelan-v-a68731293/)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Made with ❤️ by Gunaseelan V

