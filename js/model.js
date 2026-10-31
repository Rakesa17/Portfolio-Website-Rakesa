/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "Rakesa17",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "rakesaa17@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured Project (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "WebBox Tools",
      tag: "IOT", color: "#f1e05a",
      url: "https://github.com/Omicron69/DownloadGuard", cta: "",
      img: "assets/projects/downloadguard.png",
      desc: "An ESP32-based portable tool designed for wireless penetration testing, remote signal analysis, and IoT device management via a custom WebUI.",
    },
    {
      title: "ESP32 Artificial Intelligence Assistant",
      tag: "Assisten AI", color: "#3178c6",
      url: "https://github.com/Omicron69/organsmnist-cnn-classification", cta: "",
      img: "assets/projects/medcnn.png",
      desc: "An intelligent AI assistant project based on an ESP32 microcontroller, featuring a display to show response text and real-time facial expression animations.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "BritishFingerSpellingAI",
    "Granular-Sentiment-Pipeline-Class-Weighted-Transformers-for-Steam-Reviews",
    "DownloadGuard",
    "organsmnist-cnn-classification",
    "Website-Portfolio-Rakesaa",
  ],

  // Repos we always want shown regardless of GitHub API (hand-curated)
  pinnedRepos: [
    {
      name: "Jadwal-Harian", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/Rakesa17/Jadwal-Harian",
      description: "A minimalist productivity web application featuring a focus timer and task manager to enhance daily workflow efficiency and time management.",
    },
    {
      name: "mini-project-website-e-commerce-beauty", language: "HTML", stargazers_count: 0,
      html_url: "https://github.com/Rakesa17/mini-project-website-e-commerce-beauty",
      description: "A responsive e-commerce frontend for a beauty and skincare store, complete with a product catalog, an interactive shopping cart, and a clean interface.",
    },
    {
      name: "CodingCamp-12Oktober-Rakesa", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/Rakesa17/CodingCamp-12Oktober-Rakesa",
      description: "A productivity web application—featuring a focus timer and a to-do list—developed during the RevoU Coding Camp course, with a focus on a clean interface and efficient task management.",
    },
  ],

  // Shown ONLY if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "crime-analysis-montgomery-county", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/crime-analysis-montgomery-county",
      description: "Ten years of Montgomery County crime data, taken from a messy 90 MB government CSV to ten answered analytical questions, geospatial hotspot maps and a district safety ranking.",
    },
    {
      name: "asthma-worsening-prediction", language: "MATLAB", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/asthma-worsening-prediction",
      description: "Predicting worsening asthma symptoms from NHS primary-care data with SQL and MATLAB, following CRISP-DM. Compares four models on a heavily imbalanced clinical dataset.",
    },
    {
      name: "Chronic-Kideney-Disease-Analyzer", language: "PHP", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/Chronic-Kideney-Disease-Analyzer",
      description: "A healthcare tracking web app. I led the front-end and requirements analysis in a multidisciplinary team, and our solution improved patient diagnostics by 25%.",
    },
    {
      name: "MSc-Washington-Crime-Analysis-with-Pandas", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/MSc-Washington-Crime-Analysis-with-Pandas",
      description: "Crime trend analysis of Washington D.C. public data. Reproducible Pandas notebooks with visual summaries written for people who do not code.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  // Override descriptions for repos that have missing/different descriptions on GitHub
  descOverrides: {
    "Jadwal-Harian": "A minimalist productivity web application featuring a focus timer and task manager to enhance daily workflow efficiency and time management.",
    "mini-project-website-e-commerce-beauty": "A responsive e-commerce frontend for a beauty and skincare store, complete with a product catalog, an interactive shopping cart, and a clean interface.",
    "CodingCamp-12Oktober-Rakesa": "A productivity web application—featuring a focus timer and a to-do list—developed during the RevoU Coding Camp course, with a focus on a clean interface and efficient task management.",
    "Rakesa17-Website-Portfolio-Rakesaa": "An anime-themed personal portfolio website designed with an interactive interface, striking visuals, and a stylish flair. It is fully responsive, showcasing projects, technical skills, and a professional profile with a unique, distinctive vibe.",
  },

  // Override the displayed title for repos whose GitHub name isn't how you want it shown
  titleOverrides: {
    "Rakesa17-Website-Portfolio-Rakesaa": "Portofolio Website Rakesa",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "User Interface & Frontend", items: [
      ["JavaScript / TypeScript", 86], ["React.js / Next.js", 84],
      ["HTML5 / CSS3 / Tailwind", 85], ["State Management", 80],
      ["UI/UX Design & Figma", 82],
    ]},
    { group: "Cloud & Engineering", items: [
      ["Git & GitHub", 88], ["AWS · Azure · GCP", 74],
      ["Docker · Firebase", 76], ["Agile · PRINCE2 Agile", 80],
      ["Tableau · Power BI", 72], ["Bash · PowerShell", 75],
    ]},
    { group: "Spoken Language", items: [
      ["Indonesia", 100], ["Inggris", 70],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    const pinned = this.pinnedRepos.filter(r => !skip.has(r.name));
    const pinnedNames = new Set(pinned.map(r => r.name));

    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);

      const apiRepos = (await res.json())
        .filter(r => !r.fork && !skip.has(r.name) && !pinnedNames.has(r.name))
        .map(r => ({
          ...r,
          description: this.descOverrides[r.name] || r.description,
        }));

      // pinned entries always first, then the rest from GitHub
      return { repos: [...pinned, ...apiRepos], live: true };
    } catch {
      // API down: pinned + old fallback entries
      const fallback = this.fallbackRepos.filter(r => !skip.has(r.name) && !pinnedNames.has(r.name));
      return { repos: [...pinned, ...fallback], live: false };
    }
  },
};
