// Centralized projects data. Edit this file to add/remove/update your projects.
// The Projects UI will not change; it just reads from this array.

const projects = [
  {
    image: "/todoapp.png", // optional: add a screenshot in public/ and set path like "/todo-app.png"
    title: "To-Do App",
    type: "Web App",
  tags: ["React", "JavaScript"],
    collaborative: false,
    inProgress: false,
    live: "https://to-do-hl3je3rfc-shivam-roys-projects.vercel.app", // add if you deploy it (e.g., Vercel/Netlify URL)
    repo: "https://github.com/RoyDev72/To-Do-App-"
  },
  {
    // making url shorter for display; can be full URL
    image: "/urlimage.png",
    title: "URL Shortener",
    type: "Web App",
    tags: ["React", "JavaScript", "Supabase"],
    collaborative: false,
    inProgress: false,// when this true disables the live/repo buttons
    live: "https://frontend-smoky-six-48.vercel.app/", // add if you deploy it (e.g., Vercel/Netlify URL)
    repo: "https://github.com/RoyDev72/URL_Shortener" // add repo URL if public
    
  },
];

export default projects;
