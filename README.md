## Project: Backbone
This is my agent that will perform EDA (Exploratory Data analysis) for me wherever I go.
This is to help the data members to see the outline of the data before performing the following tasks:
- Data cleaning
- Data-driven decision making
- Predictive Analysis

## The role of this EDA agent:
# 1. By default, when user logs in:
- User will upload a dataset in csv format
- After uploading, number of rows, columns, data type for each column 

# 2. Agent immediately finds the data quality issues (ranking from high to low)
a. data quality issues (confidential data, missing values, duplicate rows, inconsistent categories, wrong data types)
b. statistical issues (skewed distributions, extreme outliers, near-zero variance features)

# 3a. Chatbot capabilities:
- Summary statistics (tool: df.describe, mean, median, skew, Missing values, desc: said the important variables to resolve) 
- Correlation analysis (tool: correlation matrix, desc: said the strong correlations)
- Visualisations (tools: numeric vs numeric, categorical vs categorical, categorical vs numeric, desc: explain if the visualisation helps)
- Suggestions to clean data (tool: to be determined) (maybe joined with agent)

# 3b. Additional chatbot capabilities
- Class Imbalance
- Scaling
- One-hot encoding
- Feature engineering (too advanced: PCA)

# 4. Human capabilities:
- Hypothesis (Does variable X cause variable y?)
- Causal Inference (Causation vs correlation)
- Selecting important features based on context
- Determining whether the choice of data cleaning is correct

## Project tools: 
# Frontend:
Programming/markup Languages to know: HTML, CSS, JavaScript (Optional: Tailwind CSS, TypeScript)
Frameworks: Next.js, React
Authentication: Firebase by Google
Cloud service: Vercel

# Backend:
Programming languages: Python
Libraries: Pandas, FastAPI, Uvicorn
Cloud service: Render

## To set up project:

References:
Next.js documentation: https://nextjs.org/docs/app/getting-started/installation
Firebase console: https://console.firebase.google.com/u/0/

# Note: First 6 steps are for frontend, step 7 onwards is for backend

# ---Frontend---

# 1. Creating frontend folder with next.js
Use command: "npx create-next-app@latest frontend --yes"
Please enable every capability
Use command: "cd frontend"
Use command: "npm run dev" to run the website 

# 2. To set up firebase authentication
Use command: "npm install firebase"
Create a new folder and named "lib"
Inside "lib" folder, create a new file "firebase.js"
Go to firebase console and create a new project 
After setting up your new project, copy and paste the code in firebase.js to set up the app. (Reference code: "frontend/lib/firebase.js" in scaffold-auth branch)
To enable authentication, find and click the authentication tab, click the sign-in method heading.
Click "Add new provider" and enable "Email/Password" and "Google"
Under "Email/Password" authentication, enable "Email link (passwordless sign-in)"

# 3. Firebase project details to enable authentication
In firebase console, click "Settings", click "General", scroll down to find "Firebase configuration"
Please add them to "frontend/lib/firebase.js"
However, to store security of project details, under "frontend" folder, create ".env.local" and ".env" files
".env.local" will be used for development
".env" will be used for Vercel deployment
In ".env.local" and ".env" files, please add project details in there. Please seek to the owner of the project for guidance
After that, in "firebase.js", please use variables with prefix "process.env" to use project details safely.

# 4. Development Origins
Under frontend folder, go to next.config.ts and insert the IP addresses to access the site. (Reference code: "frontend/next.config.ts")

# 5. File management and local development
Under frontend/app folder, please refer to the files in scaffold-auth branch to start on the frontend of this project

# 6. Vercel deployment
Login/Sign up in Vercel
Create a new project
Import git repo
Please select your own branch 
Set application preset to "Next.JS"
Root directory should be "frontend"
Under environment variable, upload ".env" file in there
Click "Deploy" to start deployment for this project

# ---Backend---




