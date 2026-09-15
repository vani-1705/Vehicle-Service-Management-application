# 🚗 Vehicle Service Management

A responsive, multi-customer vehicle service management dashboard built with plain HTML, CSS and JavaScript. Customers can view their vehicle, raise new service requests, track request status, and browse their complete service history — all from a clean, card-based dashboard UI.

- **Live Demo:** https://vehicle-service-management-applicat.vercel.app/
- **GitHub Repo:** https://github.com/vani-1705/Vehicle-Service-Management-application

---

## 📌 About the Project

Vehicle Service Management is a front-end simulation of a real-world vehicle service booking platform (similar to what a car service center or dealership might offer its customers). Each customer has their own vehicle, their own service requests, and their own service history — and the entire dashboard re-renders based on whoever is currently "logged in," making it easy to demo multiple customer journeys from a single app.

The project was built as a static front-end app — no backend/database is required. All data lives in a JavaScript data model in the browser and updates live as you interact with the UI (submitting requests, adding customers, etc.).

---

## ✨ Features

### 1. Dashboard
- Personalized welcome header with the current customer's name
- Profile card showing photo, phone number, and email
- Vehicle photo card with a motivational quote
- Live stat cards: **Total Vehicles**, **Pending Requests**, **In Progress**, **Completed**
- "Recent Service Requests" preview list
- Quick action buttons to jump straight to raising a request or viewing all requests

### 2. New Service Request
- Form to raise a new request: vehicle (auto-filled from the logged-in customer), service type, preferred date, problem description
- Optional photo upload for the issue
- On submit, the request is instantly added with **Pending** status, dashboard stats update live, and the user is redirected to "My Requests"

### 3. My Requests
- Full table of all requests raised by the current customer
- Status badges: **Pending** / **In Progress** / **Completed**
- "View" button opens a detail modal with the full request description

### 4. Vehicles
- Shows the customer's registered vehicle with photo, registration number, fuel type, model year, and owner
- "View Details" modal and an "Add Vehicle" entry point

### 5. Service History
- Table of completed services with date, request ID, service type, and cost
- "View" button opens a detail modal per record

### 6. Multi-Customer Profile System
- Profile icon (top-right) and a **"Switch Customer"** button in the sidebar open a drawer listing all customers
- Clicking any customer instantly switches the **entire dashboard** — profile info, vehicle, stats, requests, and history — to that person's data
- The currently active customer is tagged **"Current"** in the list

### 7. Add Customer
- "+ Add Customer" button inside the drawer opens a form to register a brand-new customer on the fly
- Captures name, phone, email, optional photo, and their vehicle's details (name, registration number, fuel type, year, optional photo)
- If no photo is uploaded, the app auto-generates an initials avatar (for the person) and a placeholder illustration (for the vehicle)
- The new customer is added to the switcher list and the dashboard instantly switches to their (empty) profile, ready to raise their first request

### 8. General UX
- Toast notifications for actions (request submitted, customer added, switched customer, etc.)
- Modal-based detail views instead of page reloads
- Fully responsive layout — collapses to an icon-only sidebar on tablets and stacks to a single column on mobile
- No page reloads — the whole app is a single HTML page with JS-driven view switching

---

## 🧑‍🤝‍🧑 Demo Customers Included

| Customer | Vehicle | Sample Requests |
|---|---|---|
| Vani Yepparika | Hyundai i20 (Petrol, 2020) | General Service (In Progress), Periodic Service (Pending), plus 3 completed history records |
| Mahidar Angam | Maruti Suzuki Swift (Petrol, 2022) | Brake Check (Pending), plus 2 completed history records |
| Sampath Reddy | Toyota Innova Crysta (Diesel, 2021) | AC Service (In Progress), plus 2 completed history records |

More customers can be added live from the UI using the **Add Customer** feature.

---

## 🛠️ Tech Stack

- **HTML5** — semantic page structure
- **CSS3** — custom design system (CSS variables for color/spacing), CSS Grid & Flexbox layout, responsive breakpoints, no framework
- **Vanilla JavaScript (ES6+)** — DOM rendering, state management, event handling, FileReader API for image uploads — no external JS framework or library
- **Vercel** — static hosting / deployment

No build tools, no npm dependencies — the entire app runs directly in the browser from static files.

---

## 📂 Project Structure

```
Vehicle-Service-Management-application/
├── index.html          # App shell: sidebar, topbar, all page sections, drawer, modals
├── style.css            # Full design system + responsive layout
├── script.js             # Customer data model + rendering + event logic
├── assets/
│   ├── vani.jpg           # Vani Yepparika's photo
│   ├── mahidar.jpg         # Mahidar Angam's photo
│   ├── sampath.jpg          # Sampath Reddy's photo
│   ├── hyundai-i20.jpg       # Vani's vehicle photo
│   ├── maruti-swift.jpg       # Mahidar's vehicle photo
│   └── innova-crysta.jpg       # Sampath's vehicle photo
└── README.md
```

---

## ⚙️ How It Works (Under the Hood)

- All customers live in a single JavaScript object (`customers`) in `script.js`, keyed by an id. Each customer holds their own `name`, `phone`, `email`, `photo`, `vehicle`, `requests[]`, and `history[]`.
- A `currentId` variable tracks who is "logged in." Every render function (`renderIdentity`, `renderStats`, `renderRecent`, `renderRequestsTable`, `renderHistoryTable`, `renderVehicles`, `renderCustomerList`) reads from `customers[currentId]`, so switching `currentId` and calling `renderAll()` refreshes the whole UI in one go.
- Page navigation (Dashboard / New Service Request / My Requests / Vehicles / Service History) is handled by toggling an `active` CSS class on the relevant `<section>` — there's no real routing or page reload.
- New service requests and new customers are pushed straight into the in-memory data model, so the UI updates instantly without any network call.
- Uploaded photos (for a new customer or their vehicle) are read via the `FileReader` API and stored as base64 data URLs, so everything works fully client-side.

---

## ▶️ Running Locally

1. Clone the repo:
   ```
   git clone https://github.com/vani-1705/Vehicle-Service-Management-application.git
   ```
2. Open the folder and make sure `index.html`, `style.css`, `script.js`, and the `assets/` folder are all in the same directory.
3. Open `index.html` directly in a browser, or serve it locally for best results:
   ```
   npx serve .
   ```
   or
   ```
   python3 -m http.server 8000
   ```
4. Visit the local URL shown in your terminal.

---

## 🚀 Deployment

The project is deployed on **Vercel** as a static site (no build step required — Vercel serves the HTML/CSS/JS/assets directly):

🔗 **Live:** https://vehicle-service-management-applicat.vercel.app/

---

## 🔮 Possible Future Improvements

- Persist data with a real backend/database instead of in-memory JS state
- Authentication/login instead of a demo customer switcher
- Edit/delete for existing requests and vehicles
- Multiple vehicles per customer
- Admin view to manage all customers' requests from one screen
- Email/SMS notifications when a request status changes

---

## 👩‍💻 Author

**Vani Yepparika**
GitHub: [@vani-1705](https://github.com/vani-1705)
