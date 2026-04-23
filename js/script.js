const GITHUB_USERNAME = "kjmoly";

const appState = {
    repos: [],
    selectedLanguage: localStorage.getItem("selectedLanguage") || "all",
    selectedSort: localStorage.getItem("selectedSort") || "updated",
    searchTerm: localStorage.getItem("repoSearchTerm") || "",
    theme: localStorage.getItem("theme") || "light",
    visitorName: localStorage.getItem("visitorName") || "",
    activeTab: localStorage.getItem("activeTab") || "about",
    timeOnSite: 0
};

document.addEventListener("DOMContentLoaded", function () {
    showGreeting();
    setupTabs();
    setupThemeToggle();
    setupVisitorName();
    setupSiteTimer();
    setupRepoControls();
    setupMessageCounter();
    setupContactForm();
    setCurrentYear();
    fetchRepositories();
});

/* Display a greeting based on the current time */
function showGreeting() {
    const hour = new Date().getHours();
    let message = "";

    if (hour < 12) {
        message = "Good Morning!";
    } else if (hour < 18) {
        message = "Good Afternoon!";
    } else {
        message = "Good Evening!";
    }

    document.getElementById("greeting-message").textContent = message;
}

/* Handle section switching and remember the active tab */
function setupTabs() {
    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const target = button.getAttribute("data-target");
            activateTab(target, true);
        });
    });

    activateTab(appState.activeTab, false);
}

function activateTab(target, shouldScroll) {
    const buttons = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".tab-section");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    sections.forEach(function (section) {
        section.classList.remove("active-section");
    });

    const selectedButton = document.querySelector('.tab-btn[data-target="' + target + '"]');
    const selectedSection = document.getElementById(target);

    if (selectedButton && selectedSection) {
        selectedButton.classList.add("active");
        selectedSection.classList.add("active-section");
        appState.activeTab = target;
        localStorage.setItem("activeTab", target);

        if (shouldScroll) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
}

/* Toggle the theme and store the user preference */
function setupThemeToggle() {
    const themeButton = document.getElementById("theme-toggle");

    if (appState.theme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeButtonText();

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            appState.theme = "dark";
        } else {
            appState.theme = "light";
        }

        localStorage.setItem("theme", appState.theme);
        updateThemeButtonText();
    });
}

function updateThemeButtonText() {
    const themeButton = document.getElementById("theme-toggle");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Switch to Dark Mode";
    }
}

/* Save the visitor name and show a welcome message */
function setupVisitorName() {
    const visitorInput = document.getElementById("visitor-name");
    const saveButton = document.getElementById("save-name-btn");
    const message = document.getElementById("saved-name-message");

    visitorInput.value = appState.visitorName;
    updateVisitorDisplay();

    saveButton.addEventListener("click", function () {
        const name = visitorInput.value.trim();

        message.classList.remove("success", "error");

        if (name === "") {
            message.textContent = "Please enter a name before saving.";
            message.classList.add("error");
            return;
        }

        appState.visitorName = name;
        localStorage.setItem("visitorName", name);

        updateVisitorDisplay();
        message.textContent = "Your name has been saved successfully.";
        message.classList.add("success");
    });
}

function updateVisitorDisplay() {
    const visitorDisplay = document.getElementById("visitor-display");

    if (appState.visitorName) {
        visitorDisplay.textContent = "Welcome back, " + appState.visitorName + "!";
    } else {
        visitorDisplay.textContent = "";
    }
}

/* Track how long the visitor stays on the website */
function setupSiteTimer() {
    const timerElement = document.getElementById("time-on-site");

    setInterval(function () {
        appState.timeOnSite += 1;
        timerElement.textContent = "Time on site: " + appState.timeOnSite + "s";
    }, 1000);
}

/* Set footer year automatically */
function setCurrentYear() {
    document.getElementById("current-year").textContent = new Date().getFullYear();
}

/* Connect search, filter, sorting, and refresh controls */
function setupRepoControls() {
    const searchInput = document.getElementById("repo-search");
    const languageFilter = document.getElementById("language-filter");
    const sortBy = document.getElementById("sort-by");
    const refreshButton = document.getElementById("refresh-repos");

    searchInput.value = appState.searchTerm;
    languageFilter.value = appState.selectedLanguage;
    sortBy.value = appState.selectedSort;

    searchInput.addEventListener("input", function () {
        appState.searchTerm = searchInput.value.trim().toLowerCase();
        localStorage.setItem("repoSearchTerm", appState.searchTerm);
        renderRepositories();
    });

    languageFilter.addEventListener("change", function () {
        appState.selectedLanguage = languageFilter.value;
        localStorage.setItem("selectedLanguage", appState.selectedLanguage);
        renderRepositories();
    });

    sortBy.addEventListener("change", function () {
        appState.selectedSort = sortBy.value;
        localStorage.setItem("selectedSort", appState.selectedSort);
        renderRepositories();
    });

    refreshButton.addEventListener("click", function () {
        fetchRepositories();
    });
}

/* Fetch public repositories from GitHub API */
async function fetchRepositories() {
    const apiStatus = document.getElementById("api-status");
    const repoList = document.getElementById("repo-list");
    const emptyMessage = document.getElementById("empty-message");

    apiStatus.textContent = "Loading GitHub repositories...";
    apiStatus.classList.remove("success", "error");
    repoList.innerHTML = "";
    emptyMessage.classList.add("hidden");

    try {
        const response = await fetch("https://api.github.com/users/" + GITHUB_USERNAME + "/repos?per_page=100&sort=updated");

        if (!response.ok) {
            throw new Error("Failed to load repositories.");
        }

        const data = await response.json();

        appState.repos = data.filter(function (repo) {
            return !repo.fork;
        });

        populateLanguageOptions();
        updateRepositoryStats();
        renderRepositories();

        apiStatus.textContent = "Repositories loaded successfully.";
        apiStatus.classList.add("success");
    } catch (error) {
        apiStatus.textContent = "Unable to load GitHub repositories right now. Please try again later.";
        apiStatus.classList.add("error");
    }
}

/* Fill language filter options dynamically */
function populateLanguageOptions() {
    const languageFilter = document.getElementById("language-filter");
    const languages = [];

    appState.repos.forEach(function (repo) {
        const label = getLanguageLabel(repo.language);

        if (!languages.includes(label)) {
            languages.push(label);
        }
    });

    languages.sort();

    languageFilter.innerHTML = '<option value="all">All</option>';

    languages.forEach(function (language) {
        const option = document.createElement("option");
        option.value = language.toLowerCase();
        option.textContent = language;
        languageFilter.appendChild(option);
    });

    const availableValues = ["all"].concat(languages.map(function (language) {
        return language.toLowerCase();
    }));

    if (!availableValues.includes(appState.selectedLanguage)) {
        appState.selectedLanguage = "all";
        localStorage.setItem("selectedLanguage", "all");
    }

    languageFilter.value = appState.selectedLanguage;
}

/* Update quick statistics in the About section */
function updateRepositoryStats() {
    const totalRepos = appState.repos.length;
    const languages = new Set();
    let totalStars = 0;

    appState.repos.forEach(function (repo) {
        languages.add(getLanguageLabel(repo.language));
        totalStars += repo.stargazers_count;
    });

    document.getElementById("stat-total-repos").textContent = totalRepos;
    document.getElementById("stat-total-languages").textContent = languages.size;
    document.getElementById("stat-total-stars").textContent = totalStars;
}

/* Render repositories after applying search, filter, and sort */
function renderRepositories() {
    const repoList = document.getElementById("repo-list");
    const emptyMessage = document.getElementById("empty-message");

    let filteredRepos = appState.repos.filter(function (repo) {
        const languageMatches = appState.selectedLanguage === "all" ||
            getLanguageLabel(repo.language).toLowerCase() === appState.selectedLanguage;

        const searchSource = (repo.name + " " + (repo.description || "")).toLowerCase();
        const searchMatches = searchSource.includes(appState.searchTerm);

        return languageMatches && searchMatches;
    });

    if (appState.selectedSort === "name") {
        filteredRepos.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    } else if (appState.selectedSort === "stars") {
        filteredRepos.sort(function (a, b) {
            return b.stargazers_count - a.stargazers_count;
        });
    } else {
        filteredRepos.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
    }

    repoList.innerHTML = "";

    if (filteredRepos.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    filteredRepos.forEach(function (repo) {
        const card = document.createElement("article");
        card.className = "repo-card";

        const title = document.createElement("h3");
        title.textContent = repo.name;

        const description = document.createElement("p");
        description.textContent = repo.description || "No description available.";

        const meta = document.createElement("div");
        meta.className = "repo-meta";

        const language = document.createElement("span");
        language.textContent = "Language: " + getLanguageLabel(repo.language);

        const stars = document.createElement("span");
        stars.textContent = "Stars: " + repo.stargazers_count;

        const updated = document.createElement("span");
        updated.textContent = "Updated: " + new Date(repo.updated_at).toLocaleDateString();

        meta.appendChild(language);
        meta.appendChild(stars);
        meta.appendChild(updated);

        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View Repository";

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(meta);
        card.appendChild(link);

        repoList.appendChild(card);
    });
}

function getLanguageLabel(language) {
    if (!language) {
        return "Other";
    }

    return language;
}

/* Count message characters live */
function setupMessageCounter() {
    const messageInput = document.getElementById("message");
    const messageCount = document.getElementById("message-count");

    function updateCount() {
        const length = messageInput.value.length;
        messageCount.textContent = length + " / 200 characters";
    }

    messageInput.addEventListener("input", updateCount);
    updateCount();
}

/* Validate the contact form before showing success */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formMessage = document.getElementById("form-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        formMessage.classList.remove("success", "error");

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.classList.add("error");
            return;
        }

        if (name.length < 2) {
            formMessage.textContent = "Name must be at least 2 characters long.";
            formMessage.classList.add("error");
            return;
        }

        if (!isValidEmail(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.classList.add("error");
            return;
        }

        if (message.length < 10) {
            formMessage.textContent = "Message must be at least 10 characters long.";
            formMessage.classList.add("error");
            return;
        }

        formMessage.textContent = "Your message has been sent successfully.";
        formMessage.classList.add("success");
        form.reset();
        setupMessageCounter();
    });
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
