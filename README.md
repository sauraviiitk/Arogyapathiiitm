## **Arogyapath** ##
Arogyapath is a holistic mental health platform focused on patient care, offering features like an AI-powered depression test, a guided 10-day recovery plan, spiritual healing through mantras, bhajans, and yoga, mood check AI, Gemini-powered thought reframing, a relaxing canvas drawing tool, and Letter to Future Me journaling.

Patients can also use an Emotional Time Machine, get medicine reminders via email, and join our real-time community chat – Together We Rise. On the doctor side, professionals can manage their profiles, view connected patients, access shared history, and use a built-in prescription analyzer.

Arogyapath blends technology and tradition to create a safe, inclusive, and personalized healing experience.

# 🌿 Arogyapath – Personalized Mental Wellness & Healing Platform

## 📑 **Table of Contents**

1. [📌 **Project Overview**](#-Project-Overview)  
2. [✨ **Key Features**](#-Key-Features)  
   - [👥 **Patient Panel Features**](#-Patient-Panel-Features)  
   - [🩺 **Doctor Panel Features**](#-Doctor-Panel-Features)  
3. [🧰 **Tech Stack Used**](#-Tech-Stack-Used)  
4. [📁 **Project Structure**](#-Project-Structure)  
5. [⚙️ **Getting Started – Run Locally**](#-getting-started--run-locally)  
9. [🔮 **Future Scope**](#-future-scope)
6. [👩‍💻 **Contributors**](#-contributors) 
7. [🧩 **Conclusion**](#-conclusion)

---

## 📌 **Project Overview**
 ## Problem Statement ##
According to the **NCRB 2021** report, over **1.64 lakh people** in India die by suicide annually — with **70–92%** due to lack of access to mental health care caused by professional shortages, stigma, and cultural gaps.

### 🚧 Challenges:
- ❌ **Generic solutions**, not personalized care  
- 🌍 **Low accessibility** to professionals in rural areas  
- 🗣️ **Language & cultural barriers**  
- 🧘 **Neglect of spiritual practices** (e.g., yoga, mantras)

 ## Our Solution ##

**Arogyapath** is a personalized mental wellness platform that combines **AI tools**, **spiritual healing**, and **community support** to address the root causes of mental health challenges.

## 🎯 Target Audience

- 🧑‍🎓 Students & working professionals dealing with stress or burnout  
- 🧘 Individuals facing depression or emotional struggles  
- 👩‍⚕️ Mental health professionals seeking better patient tools  
- 🌐 Users in rural or underserved areas with limited care access  
- 🌍 People who value spiritual healing (yoga, mantras, bhajans)

---

## ✨ **Key Features**

Arogyapath is divided into two core panels – **Patient Panel** and **Doctor Panel**, each offering powerful tools for personalized mental health support.

### 👥 **Patient Panel Features**

- 🧠 **AI-Powered Depression Test** with instant evaluation  
- 📅 **10-Day Recovery Plan** with daily tasks and mood tracking  
- 🕉️ **Spiritual Support** via bhajans, mantras, and yoga asanas  
- 😊 **Mood Check AI** for emotional monitoring  
- 🔁 **Reframe Negative Thoughts** using Gemini AI  
- 💌 **Letter to Future Me** for emotional journaling  
- ⏳ **Emotional Time Machine** to reflect past moods  
- 🎨 **Canvas Drawing Tool** with background music  
- 💊 **Medicine Reminder** with email alerts (via Nodemailer)  
- 💬 **Together We Rise** – Real-time community support via WebSocket  
- 📊 **Health Tracker** for daily mental wellness stats

### 🩺 **Doctor Panel Features**

- 🧑‍⚕️ **Profile Management** – Doctors can publish their info for patient discovery.
- 📅 **Appointment Management** – Accept, view, or reschedule appointments.
- 📁 **Connected Patients View** – Access shared health reports and past data.
- 💊 **Prescription Analyzer** – Helps patients understand prescriptions.

---

## 🧰 **Tech Stack Used**
- **Frontend:** React.js,Tailwind CSS,Vite,HTML,CSS,JavaScript
- **Backend:** Node.js, Express.js ,WebSocket ,Firebase ,LLM
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Real-time Chat:** WebSocket  
- **Email Service:** Nodemailer  
- **AI Integration:** Gemini API  
- **Animations:** Framer Motion  
- **Icons:** Lucide React  

---

## 📁 Project Structure

```bash
Arogyapathiiitm/
├── Backend/
│   ├── node_modules/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── Context/
│   │   ├── depression/
│   │   ├── locales/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md

```

## ⚙️ **Getting Started – Run Locally**
### 🔧 Clone the Repository
```bash

git clone https://github.com/sauraviiitk/Arogyapathiiitm.git
cd Arogyapathiiitm
cd frontend
npm install
npm run dev


cd Backened
## Backend Dependencies
npm install axios cors express install node-cron node-fetch nodemailer npm openai ws 
node server.js
```
---

## 🔮 Future Scope

- 📱 Launch a mobile app version for broader accessibility  
- 🌐 Add support for more Indian regional languages  
- 🤖 Integrate advanced emotion-aware AI for better interaction  
- 🏥 Connect with certified mental health NGOs and institutions  
- 🎥 Include video therapy or meditation sessions  
- 📊 Use AI to generate weekly wellness reports and suggestions  
- 🧠 Develop a self-help recommendation engine based on user mood history  
- 🔒 Strengthen data privacy and encryption for mental health records

---
## 👩‍💻 **Contributors**

- **Saurav Kumar** – Developer  
- **Muskan Agrawal** – UI/UX Designer, Project Manager
- **Akshita Kumari** –Developer

---

## 🧩 Conclusion

Mental health is one of the most pressing challenges of our generation, yet remains underserved in terms of personalized, accessible, and holistic care. **Arogyapath** bridges this gap by blending **modern technology** (like AI and real-time systems) with **traditional healing practices** (like mantras, yoga, and community storytelling).

By providing patients with tools to express, reflect, track, and heal—and offering doctors structured access to patient histories and intelligent insights—we aim to **empower healing from both ends**.

Arogyapath isn't just a platform; it's a movement toward making mental health care **inclusive, affordable, and truly transformative** for all.

Together, we rise. 🌱
