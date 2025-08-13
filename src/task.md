# 🚀 React Hook Form + Zod Multi-Step Form Challenge
 
## 📌 Objective
Build a **3-step onboarding form** for a trading platform using **React Hook Form** and **Zod** for validation.  
Your solution should demonstrate:
- Correct integration of RHF with Zod
- Conditional fields & validation
- Async validation
- Good UX practices
 
---
 
## 📋 Requirements
 
### **Step 1 – Personal Info**
- **Full Name** → string, min 3 characters
- **Email** → must be valid email + async uniqueness check (reject `"test@example.com"`)
- **Date of Birth** → must be at least 18 years old
 
### **Step 2 – Trading Preferences**
- **Account Type** → dropdown: `"Demo"` or `"Live"`
- **Risk Tolerance** → `"Low"`, `"Medium"`, `"High"`
- **PAN Number** → required **only if Account Type = "Live"**  
  - 10 characters, uppercase alphanumeric (A-Z, 0-9)
 
### **Step 3 – Security Setup**
- **Password** → min 8 characters, must contain:
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character
- **Confirm Password** → must match Password
- **Agree to Terms** → checkbox, required
 
---
 
## ✅ Validation Rules (Zod)
- Use **Zod** for all validation.
- Conditional PAN validation based on Account Type.
- Show errors **only** after a field is touched.
- Prevent moving to the next step unless current step is valid.
 
---
 
## 🔄 Form Behavior
- State should persist when navigating between steps.
- Final form should only submit when **all steps** are valid.
- On successful submit, `console.log()` the final validated data.
 
---
 
## 🧩 Tech Stack
- **React Hook Form** for form state management
- **Zod** with `zodResolver` for validation
- Tailwind CSS for styling (optional, plain CSS allowed)
 
---
 
## 🎯 Bonus Points
- Show loading indicator during async email validation.
- Disable "Next" button while validating.
- Make UX smooth and clean (professional-looking form).