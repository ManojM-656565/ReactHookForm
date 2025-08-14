# Freelancer Profile Creation Form (Validation-Only)

A React + TypeScript project using **react-hook-form** and **Zod** to demonstrate comprehensive form validation across all major HTML form input types — including advanced file upload validation.

---

## 📌 Project Goals
1. Showcase validation for **all major HTML input types**.
2. Use **Zod** schema validation with type inference.
3. Provide **real-time error feedback** to the user.
4. Focus on **file upload validation** (type, size, required).
5. No API calls — validation happens fully on the client side.

---

## 🛠 Tech Stack
- **React** + **TypeScript**
- **react-hook-form**
- **zod**
- **@hookform/resolvers/zod**
- Optional:
  - `react-datepicker` for date inputs
  - `react-select` for multi-select

---

## 📋 Form Sections & Fields

### 1. Basic Information
- **Full Name** → text input  
  - Required, minimum 3 characters.
- **Email** → email input  
  - Required, must be valid email.
- **Password** → password input  
  - Required, minimum 8 characters.
- **Age** → number input  
  - Required, must be ≥ 18.

### 2. Professional Details
- **Role** → single select dropdown (Developer, Designer, Writer, Other)  
  - Required.
- **Skills** → multi-select dropdown (React, Node.js, UI Design, etc.)  
  - Required, at least 1 skill.
- **Experience Level** → radio group (Junior, Mid, Senior)  
  - Required.
- **Available for Remote Work** → checkbox  
  - Boolean value.

### 3. Availability
- **Start Date** → date picker  
  - Required.
- **Available Hours Per Week** → slider input (1–60)  
  - Required.

### 4. Portfolio
- **Bio** → textarea  
  - Required, minimum 10 characters.
- **Profile Image** → file upload  
  - Required.
  - Must be an image file (`image/jpeg` or `image/png`).
  - Max file size: **2MB**.

### 5. Preferences
- **Subscribe to Newsletter** → toggle switch  
  - Boolean value.

---

## ✅ Validation Rules (Zod)
- **Full Name:** `min(3)`
- **Email:** must be a valid email format
- **Password:** `min(8)`
- **Age:** `min(18)`
- **Role:** non-empty string
- **Skills:** array of strings, `min(1)`
- **Experience Level:** enum `["junior", "mid", "senior"]`
- **Available for Remote:** boolean
- **Start Date:** must be a valid date
- **Available Hours Per Week:** number between 1–60
- **Bio:** `min(10)`
- **Profile Image:**
  - Must be a `File`
  - `.refine(file => file.size <= 2MB)`
  - `.refine(file => file.type === "image/jpeg" || file.type === "image/png")`
- **Newsletter:** boolean

---

## 🎯 Final Goals
- Form UI with **all listed input types**.
- Instant error messages below each field.
- File upload validation with:
  - **Required check**
  - **File type check**
  - **Max size check**
- On successful submission:
  - Log the form data to console.
  - Reset form to defaults.

---

## 📂 Deliverables
- `src/components/FreelancerForm.tsx` → Full form component
- `src/schema/freelancerSchema.ts` → Zod schema
- `src/App.tsx` → Renders the form
- `README.md` → Instructions to run the project

---

## 🧪 Stretch Goals (Optional)
- Multiple file uploads with validation on each file.
- Image preview before submit.
- Multi-step form.
- Field-level validation (e.g., password strength meter).
 