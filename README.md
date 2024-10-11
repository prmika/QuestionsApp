# QuestionsApp

Made for fun to my graduation party. The app is made "quick and dirty" just to do the job. In the future when I have motivation plan is to refactor the code and maybe to add API / database so that user can create questions from the UI. Also the styling should be more reactive and cleaner.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
  ```sh
  git clone https://github.com/prmika/QuestionsApp.git
  cd questions-app/my-react-app
  ```

2. **Install dependencies:**
  ```sh
  npm install
  ```

3. **Run the development server:**
  ```sh
  npm run dev
  ```

## Add questions 

Add questions.js file to src/.
questions format is
```plaintext
  export const questionsPack = [
    {
      category: "example",
      questions: [
        {
          id: 1,
          question: "Example question",
          answer: "Example",
          points: 1000,
          show: true,
          isCorrect: false,
          isStarQuestion: false,
        },
      ] 
    },
    ...more categories
  ]
```