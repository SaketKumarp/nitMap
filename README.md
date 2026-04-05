# 🚀 NIT Flow – Smart Campus Navigation System

> Navigate your campus like Google Maps 🧭  
> Built for smart institutions with real-time room availability, route optimization & schedule tracking.

---

## 🌐 Live Demo
🔗nit-map-9di8.vercel.app
or try this
https://nit-map-9di8.vercel.app/

---

## ✨ Features

- 🗺️ **Smart Navigation**
  - Real-time campus routing using **Dijkstra Algorithm**
  - Turn-by-turn directions
  - GPS-based location tracking

- 🔥 **Crowd Heatmap**
  - Visualize crowded areas across campus
  - Smart decision-making for movement

- 🏫 **Room Availability**
  - Check **free / occupied rooms**
  - Block-wise filtering

- 📅 **Schedule Manager**
  - Add & manage class schedules
  - Smart reminders

- 🔐 **Authentication**
  - Secure login with Clerk

- ⚡ **Real-time Backend**
  - Powered by Convex (live updates)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, ShadCN UI
- **Backend:** Convex (Realtime DB)
- **Auth:** Clerk
- **Maps:** Mapbox / DropMap
- **Algorithm:** Dijkstra (Shortest Path)
- **Deployment:** Vercel

---

## 🧠 How It Works

1. Campus is modeled as a **graph (nodes + edges)**
2. Each building/block = node
3. Paths = weighted edges
4. **Dijkstra Algorithm** computes shortest path
5. Heatmap overlays crowd density
6. GPS + routing = real-time navigation

---

## 📸 Screenshots

Secure Auth 
<img width="1470" height="956" alt="Screenshot 2026-04-05 at 14 03 40" src="https://github.com/user-attachments/assets/3c6dca4f-b456-46ba-974c-9e904225176e" />




### 🗺️ Navigation + Heatmap 
<img width="1470" height="956" alt="Screenshot 2026-04-05 at 13 44 36" src="https://github.com/user-attachments/assets/74d8cef4-d949-4222-b0e4-5419d84a45cd" />


![Navigation] 

<img width="1470" height="956" alt="Screenshot 2026-04-05 at 13 44 29" src="https://github.com/user-attachments/assets/67f711ca-ff7e-4802-bd7d-55372b05454f" />





### 📍 Route Directions
![Route] 
<img width="325" height="673" alt="Screenshot 2026-04-05 at 13 50 58" src="https://github.com/user-attachments/assets/71af6373-8776-4c89-b2cc-4c8158d25174" />






### 🏫 Room Availability
![Rooms] 
<img width="331" height="720" alt="Screenshot 2026-04-05 at 13 47 41" src="https://github.com/user-attachments/assets/a1d7ad7b-1da6-49cc-b676-0cc6b5ec5768" />


### 📅 Add Schedule
![Schedule] 
<img width="320" height="678" alt="Screenshot 2026-04-05 at 14 05 54" src="https://github.com/user-attachments/assets/5c7449a0-debc-49a4-98d2-a12f0e432fcd" />





### 🏢 Building View
 <img width="288" height="292" alt="Screenshot 2026-04-05 at 13 51 24" src="https://github.com/user-attachments/assets/5013ed04-3a1b-4cdc-8cca-5e3d44d6e36c" />


---

##add shedhule accordinly 
<img width="1470" height="956" alt="Screenshot 2026-04-05 at 13 47 54" src="https://github.com/user-attachments/assets/dcf86300-0a6e-486c-a5dd-6aec0445dd3f" />

##add room availability

<img width="1470" height="956" alt="Screenshot 2026-04-05 at 13 48 27" src="https://github.com/user-attachments/assets/114e00a9-1f5a-4a91-924e-0c1e91ac064b" />



#secure database fetching
<img width="1470" height="956" alt="Screenshot 2026-04-05 at 14 08 09" src="https://github.com/user-attachments/assets/d90ea6ea-00d5-48f7-b5e4-685d91b5610c" />


## ⚙️ Installation

```bash
git clone https://github.com/your-username/nit-flow.git
cd nit-flow
npm install
npm run dev
