# Full Stack Project: Contacts Management Application

## Overview
This project is designed to create a Contacts Management Application that allows users to manage their contacts efficiently.

## Technologies Used
- Framework: NextJS in Typescript
- Database: Firebase Firestore
- Storage: Firebase Storage
- Deployment: Vercel
- Version Control: Git and GitHub
- Additional Libraries and Tools: TailwindCSS, shadcn/ui

## Getting Started
```bash
git clone https://github.com/weedeej/fe-assessment
cd fe-assessment
# Install all necessary modules
npm i
# For development server, run "npm run dev" for build testing:
npm run build
npm start
```

## Decision Rationale
1. NextJS: Next.js is an open-source React front-end development web framework that enables functionalities such as server-side rendering and generating static websites for React-based web applications.
3. Firebase Suite: Chosen for it's well-documented knowledgebase, High compatibility with Web applications and scalability for future proofing.
5. TailwindCSS, shadcn/ui: Chosen for it's flexibility and easier integration

## Keypoints to improve:
- Implement Single Responsibility Principle across the whole project for cleaner codebase.
- Add linting to prevent other devs from straying off the codebase standard.
- Add github workflow to run all checks and prevent pre-production errors.
- Use Redux Toolkit for client-side data storing to reduce loading time on bigger data and reduce repeated data fetch
- Create hooks for repeated actions

## Deployment
The project is deployed at vercel. This project has been configured to be setup in one click import

## Developer's Note:
For Project Hand-off, Please send me an email at: work.deeej@gmail.com for ownership transfer
The following in Keypoints to improve are not implemented due to limited time.