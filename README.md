# 🏋️ FitGenie AI

<p align="center">

<img src="https://img.shields.io/badge/Status-Completed-brightgreen"/>

<img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-blue"/>

<img src="https://img.shields.io/badge/Backend-Firebase-orange"/>

<img src="https://img.shields.io/badge/Authentication-Google%20%7C%20Apple-red"/>

<img src="https://img.shields.io/badge/Deployment-Netlify-success"/>

<img src="https://img.shields.io/badge/License-MIT-green"/>

</p>

---

# 📌 Project Overview

FitGenie AI is an intelligent AI-powered Fitness and Nutrition web application designed to deliver personalized health guidance based on user goals, fitness level, and lifestyle.

The platform combines modern web technologies with AI-driven recommendations to help users create customized workout routines, meal plans, recovery guidance, grocery lists, and overall fitness tracking.

Unlike conventional fitness applications that provide generic plans, FitGenie AI focuses on personalization through interactive dashboards, AI-assisted coaching, authentication, and subscription-based premium features.

The application was designed following modern UI/UX principles with scalability and responsiveness in mind, making it suitable for deployment as a real-world SaaS fitness platform.

---

# 🎯 Problem Statement

Most fitness applications suffer from one or more of the following limitations:

- Generic workout plans
- Non-personalized diet recommendations
- Lack of AI assistance
- Poor progress visualization
- Limited injury management support
- No centralized dashboard
- Poor user engagement
- No premium personalization

Users often switch between multiple applications for workouts, nutrition, grocery planning, and progress tracking.

This creates a fragmented user experience.

---

# 💡 Proposed Solution

FitGenie AI solves this problem by integrating multiple fitness services into one intelligent platform.

The application provides:

- AI-powered workout generation
- Personalized meal planning
- Progress tracking dashboard
- AI fitness coach
- Grocery planning
- Injury recovery assistance
- Secure authentication
- Premium membership plans

This enables users to manage their complete fitness journey from a single platform.

---

# 🚀 Key Features

## 🔐 Authentication

- Google Sign-In
- Apple Sign-In
- Secure Firebase Authentication
- Persistent User Sessions
- Logout Support

---

## 🤖 AI Workout Planner

Generates personalized workout routines according to

- Fitness Goal
- Experience Level
- Available Equipment
- Workout Duration
- Muscle Group Preference

---

## 🥗 AI Nutrition Planner

Provides personalized meal recommendations including

- Breakfast
- Lunch
- Dinner
- Snacks
- Daily Calories
- Protein Intake

---

## 📈 Progress Dashboard

Allows users to monitor

- Daily Workouts
- Calories Burned
- Weight Progress
- Weekly Activity
- Goal Completion

---

## 🩹 Injury Recovery Module

Suggests

- Safe Exercises
- Recovery Recommendations
- Muscle-Specific Guidance
- Injury Precautions

---

## 🛒 Grocery Planner

Automatically prepares shopping lists based on

- Selected Meal Plan
- Weekly Nutrition Goals
- Required Ingredients

---

## 💬 AI Coach

An interactive assistant capable of helping users with

- Exercise Guidance
- Nutrition Advice
- Motivation
- Daily Fitness Tips
- General Health Recommendations

---

## 💎 Premium Subscription

Supports premium membership plans including

- Genie Pro
- Genie Plus

Premium users receive

- Advanced AI Recommendations
- Detailed Analytics
- Exclusive Workout Plans
- Premium Nutrition Plans

---

# 🏗️ System Architecture

```
                    User

                      │

                      ▼

         Authentication Module

      Google Login / Apple Login

                      │

                      ▼

            User Dashboard

       ┌──────────┬───────────┬──────────┐

       ▼          ▼           ▼

 Workout      Nutrition     AI Coach

       │          │           │

       └──────────┼───────────┘

                  ▼

          Firebase Firestore

                  │

                  ▼

        Progress Tracking Engine

                  │

                  ▼

         Premium Subscription

                  │

                  ▼

          Stripe Integration

```

---

# 🛠 Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Firebase Authentication
- Firebase Firestore

## Payment

- Stripe Checkout

## Deployment

- Netlify

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
FitGenie-AI/

│

├── Documentation/

│ ├── Project Report

│

├── index.html

├── style.css

├── app.js

├── verify-build.js

├── assets/

├── screenshots/

├── README.md

```

---

# 🌟 Why FitGenie AI?

Unlike conventional fitness applications, FitGenie AI integrates intelligent recommendations, AI coaching, personalized nutrition, workout planning, secure authentication, and premium subscription services into one unified platform.

The project demonstrates the practical implementation of modern frontend development, Firebase services, AI-assisted user interaction, responsive UI design, and cloud deployment in a real-world fitness application.
