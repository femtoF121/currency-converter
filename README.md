# 💸 GreenExchange — Currency Converter & Analytics

A professional-grade web application for real-time currency conversion and market trend analysis. Built with a focus on high performance, strict type safety, and a seamless user experience.

## 🚀 Key Features

- **Real-time Conversion:** Powered by the Frankfurter API to provide accurate, up-to-the-minute exchange rates.
- **Interactive Analytics:** Visualized historical data using Recharts with support for multiple timeframes (7 days, 1 month, 3 months, and 1 year).
- **Transaction History:** Robust history management using Redux Toolkit to track and manage past conversions.
- **Advanced Error Handling:** Implemented Next.js Error Boundaries (`error.tsx`) and Loading Skeletons for a resilient UI.
- **Network Awareness:** Smart revalidation logic that automatically refreshes data when the device switches from Offline to Online mode.
- **Optimized Performance:** Fully leveraged Next.js 15 Server Components for faster initial page loads and better SEO.

## 🛠 Tech Stack

| Category             | Technology                                 |
| :------------------- | :----------------------------------------- |
| **Framework**        | Next.js 15 (App Router, Server Components) |
| **Language**         | TypeScript (Strictly typed)                |
| **State Management** | Redux Toolkit                              |
| **Styling**          | Tailwind CSS + Shadcn UI                   |
| **Charts**           | Recharts                                   |
| **Icons**            | Lucide React                               |

## 📦 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- **Node.js** (v18.17.0 or higher)
- **pnpm** (recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/femtoF121/currency-converter
   cd currency-converter
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the App

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🔗 Live Demo

You can explore the fully functional version of **GreenExchange** live on Vercel:  
🚀 **[View Live Demo](https://currency-converter-three-rho.vercel.app/)**

The application is deployed using Vercel's automated CI/CD pipeline, ensuring high availability and seamless performance for a smooth user experience.

---

_This project was developed as a portfolio piece to demonstrate proficiency in modern React architecture and financial data visualization._
