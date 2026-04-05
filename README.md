# Finance Dashboard UI

Live Demo:  
https://finance-dashboard-orpin-omega.vercel.app/

GitHub Repository:  
https://github.com/shaikabzal9676/finance-dashboard

---

## About the Project

This is a simple finance dashboard built as part of a frontend assignment.  
The goal was to design a clean and interactive interface where users can track their income, expenses, and understand basic spending patterns.

The focus was on UI design, component structure, and frontend state management rather than backend integration.

---

## Features

### Dashboard
- Displays total balance, income, and expenses
- Line chart showing balance trend over time
- Pie chart showing spending distribution by category

---

### Transactions
- Shows list of transactions with:
  - Date
  - Category
  - Type (income / expense)
  - Amount
- Search by category
- Filter by type
- Sort transactions
- Handles empty state

---

### Role-Based UI
- Viewer:
  - Can only view data
- Admin:
  - Can add transactions
  - Can delete transactions
- Role switching using dropdown (frontend only)

---

### Insights
- Total expenses calculation
- Top spending category

---

## Tech Stack

- React (JavaScript)
- Tailwind CSS
- Zustand (state management)
- Recharts (charts)
- Lucide React (icons)

---

## Approach

I kept the structure simple and modular so that each part of the UI is easy to understand and maintain.

Zustand was used for managing global state because it is lightweight and easy to work with.  
Tailwind CSS helped in building a consistent and responsive UI quickly.

Mock data and localStorage are used to simulate real-world usage without needing a backend.

---

## How to Run

```bash
npm install
npm run dev
