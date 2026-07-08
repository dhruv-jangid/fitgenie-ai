/* ==========================================================================
   FITGENIE AI - HEALTH OPERATING SYSTEM CONTROLLER & CORE SCHEDULER
   ========================================================================== */

// ==================== METADATA & DATA MODULES ====================

const WORKOUT_DB = {
  Strength: [
    {
      day: 1, name: "Upper Body Push Split", time: 45, muscle: "Chest & Triceps",
      exercises: [
        { name: "Barbell Bench Press", target: "Chest", sets: 4, reps: "8-10", rest: "90s", tips: "Keep elbows at 45 degrees, plant feet." },
        { name: "Overhead Dumbbell Press", target: "Shoulders", sets: 3, reps: "10-12", rest: "75s", tips: "Core tight, press overhead without arching back." },
        { name: "Incline Dumbbell Flys", target: "Chest", sets: 3, reps: "12", rest: "60s", tips: "Squeeze chest at top, control descent." },
        { name: "Triceps Overhead Extension", target: "Triceps", sets: 3, reps: "12-15", rest: "60s", tips: "Keep elbows locked close to your ears." }
      ]
    },
    {
      day: 2, name: "Lower Body Push Split", time: 45, muscle: "Quads & Calves",
      exercises: [
        { name: "Barbell Back Squat", target: "Quads", sets: 4, reps: "8-10", rest: "90s", tips: "Drive hips back, keep chest upright." },
        { name: "Dumbbell Bulgarian Split Squat", target: "Quads", sets: 3, reps: "10 each", rest: "75s", tips: "Focus weight on front heel." },
        { name: "Leg Press Machine", target: "Quads", sets: 3, reps: "12", rest: "60s", tips: "Don't lock knees at the top." },
        { name: "Standing Calf Raises", target: "Calves", sets: 4, reps: "15", rest: "45s", tips: "Hold contraction at peak elevation." }
      ]
    },
    {
      day: 3, name: "Upper Body Pull Split", time: 45, muscle: "Back & Biceps",
      exercises: [
        { name: "Lat Pulldown (Wide Grip)", target: "Back", sets: 4, reps: "10-12", rest: "75s", tips: "Pull with elbows, squeeze shoulder blades." },
        { name: "Bent Over Dumbbell Row", target: "Back", sets: 3, reps: "10 each", rest: "75s", tips: "Keep back flat, pull towards waist." },
        { name: "Dumbbell Hammer Curls", target: "Biceps", sets: 3, reps: "12", rest: "60s", tips: "Control negative, avoid swinging torso." },
        { name: "Incline Bicep Curls", target: "Biceps", sets: 3, reps: "12-15", rest: "60s", tips: "Keep elbows back behind torso." }
      ]
    }
  ],
  HIIT: [
    {
      day: 1, name: "Aerobic Burner Focus", time: 30, muscle: "Full Body Cardiorespiratory",
      exercises: [
        { name: "Burpees", target: "Full Body", sets: 4, reps: "45s Work", rest: "30s", tips: "Jump explosively, land softly." },
        { name: "Mountain Climbers", target: "Core", sets: 4, reps: "45s Work", rest: "30s", tips: "Keep shoulders over hands, drive knees." },
        { name: "Jumping Jacks", target: "Cardio", sets: 4, reps: "45s Work", rest: "30s", tips: "Maintain high pace consistently." }
      ]
    }
  ],
  Calisthenics: [
    {
      day: 1, name: "Bodyweight Pushing Split", time: 45, muscle: "Chest & Shoulders",
      exercises: [
        { name: "Standard Push-ups", target: "Chest", sets: 4, reps: "12-15", rest: "60s", tips: "Flat back, chest touches floor." },
        { name: "Pike Push-ups", target: "Shoulders", sets: 3, reps: "8-10", rest: "75s", tips: "Look at feet, press up at angle." }
      ]
    }
  ],
  "Yoga-Pilates": [
    {
      day: 1, name: "Flexibility Vinyasa Flow", time: 45, muscle: "Hips & Spine Mobility",
      exercises: [
        { name: "Sun Salutations", target: "Full Body", sets: 3, reps: "5 Cycles", rest: "30s", tips: "Sync breath with movement." },
        { name: "Downward Facing Dog", target: "Hamstrings", sets: 3, reps: "60s Hold", rest: "30s", tips: "Push heels down, press shoulders flat." }
      ]
    }
  ]
};

const EXERCISE_ALTERNATIVES = {
  "Barbell Bench Press": [
    { name: "Dumbbell Chest Press", tips: "Dumbbells allow deep stretch, press straight." },
    { name: "Push-ups (Weighted)", tips: "Add plate or band resistance." }
  ],
  "Barbell Back Squat": [
    { name: "Goblet Squat (Dumbbell)", tips: "Hold weight at chest, sit deep." },
    { name: "Leg Press Machine", tips: "Saves spine alignment, isolates quads." }
  ],
  "Lat Pulldown (Wide Grip)": [
    { name: "Pull-ups (Assisted)", tips: "Focus on pulling shoulders down." },
    { name: "Bent Over Barbell Row", tips: "Pull barbell to bellybutton." }
  ],
  "Sun Salutations": [
    { name: "Cat-Cow Flow", tips: "Arch spine up, curl chin down sequentially." }
  ]
};

const REHAB_DB = {
  Head: { restrict: [], swaps: {}, recovery: [{ name: "Neck isometric press", reps: "3 sets x 10s", tips: "Place palm on forehead, resist pressure." }] },
  Neck: { restrict: ["Overhead Dumbbell Press"], swaps: { "Overhead Dumbbell Press": "Dumbbell Shoulder Press (Light)" }, recovery: [{ name: "Cervical Retractions (Tucks)", reps: "3 sets x 10", tips: "Pull chin straight back, stand tall." }] },
  Chest: { restrict: ["Barbell Bench Press"], swaps: { "Barbell Bench Press": "Dumbbell Floor Press" }, recovery: [{ name: "Pectoral Doorway Stretch", reps: "3 sets x 30s", tips: "Step forward through doorway." }] },
  Shoulders: { restrict: ["Overhead Dumbbell Press"], swaps: { "Overhead Dumbbell Press": "Dumbbell Lateral Raises" }, recovery: [{ name: "Band Pull Aparts", reps: "3 sets x 15", tips: "Squeeze upper back, control return." }] },
  Back: { restrict: ["Barbell Back Squat"], swaps: { "Barbell Back Squat": "Leg Press Machine" }, recovery: [{ name: "Bird Dogs", reps: "3 sets x 12 each", tips: "Keep hips square, extend arm/leg." }] },
  Elbows: { restrict: ["Triceps Overhead Extension"], swaps: { "Triceps Overhead Extension": "Cable Pushdowns" }, recovery: [{ name: "Forearm Eccentric extensions", reps: "3 sets x 15", tips: "Lower weight slowly with wrist." }] },
  Knees: { restrict: ["Barbell Back Squat"], swaps: { "Barbell Back Squat": "Glute Bridges" }, recovery: [{ name: "Wall Sits", reps: "3 sets x 30s", tips: "Knees at 90 degrees." }] },
  Ankles: { restrict: ["Burpees"], swaps: { "Burpees": "Kettlebell Deadlifts" }, recovery: [{ name: "Single Leg balances", reps: "3 sets x 30s", tips: "Balance on flat floor." }] }
};

const NUTRITION_DB = {
  "Standard/Balanced": [
    { meal: "Breakfast", name: "High-Fiber Berry Avocado Toast", calories: 420, protein: 18, carbs: 45, fat: 16, ingredients: ["Whole Wheat Toast", "Avocado", "Poached Eggs"], recipe: "Toast bread. Spread avocado, top with egg." },
    { meal: "Lunch", name: "Mediterranean Quinoa Bowl with Feta", calories: 580, protein: 26, carbs: 65, fat: 22, ingredients: ["Quinoa", "Chicken Breast", "Feta Cheese"], recipe: "Mix ingredients, drizzle olive oil." },
    { meal: "Dinner", name: "Garlic Teriyaki Glazed Salmon", calories: 650, protein: 42, carbs: 55, fat: 24, ingredients: ["Salmon Fillet", "Jasmine Rice", "Asparagus"], recipe: "Bake salmon. Serve with hot rice." },
    { meal: "Snack", name: "Nuts & Greek Yogurt Cup", calories: 250, protein: 22, carbs: 12, fat: 10, ingredients: ["Greek Yogurt", "Raw Almonds"], recipe: "Mix nuts into yogurt cup." }
  ],
  "High Protein": [
    { meal: "Breakfast", name: "Egg White Veggie Scramble", calories: 380, protein: 32, carbs: 18, fat: 12, ingredients: ["Egg Whites", "Spinach", "Turkey Bacon"], recipe: "Scramble whites with spinach." },
    { meal: "Lunch", name: "Double Chicken Sweet Potato Plate", calories: 620, protein: 55, carbs: 48, fat: 14, ingredients: ["Chicken Breast", "Sweet Potato", "Steamed Broccoli"], recipe: "Bake sweet potato, reheat chicken." },
    { meal: "Dinner", name: "Lean Sirloin Steak Stir-Fry", calories: 680, protein: 48, carbs: 50, fat: 18, ingredients: ["Sirloin Steak", "Basmati Rice", "Bell Peppers"], recipe: "Stir-fry steak with peppers, serve with rice." },
    { meal: "Snack", name: "Protein Shake & Oats", calories: 300, protein: 30, carbs: 32, fat: 4, ingredients: ["Whey Protein", "Rolled Oats"], recipe: "Blend oats with protein powder." }
  ],
  "Keto/Low Carb": [
    { meal: "Breakfast", name: "Bacon, Egg & Cheese Scramble", calories: 510, protein: 28, carbs: 4, fat: 42, ingredients: ["Eggs", "Smoked Bacon", "Cheddar Cheese"], recipe: "Fry bacon. Scramble eggs in fat." }
  ]
};

const RECIPE_ALTERNATIVES = {
  Breakfast: { name: "Chia Almond Pudding Bowl", calories: 390, protein: 12, carbs: 24, fat: 22, ingredients: ["Chia Seeds", "Almond Milk", "Blueberries"], recipe: "Soak chia seeds, top with berries." },
  Lunch: { name: "Zesty Tuna Salad Bowl", calories: 540, protein: 38, carbs: 10, fat: 34, ingredients: ["Canned Tuna", "Light Mayo", "Mixed Greens"], recipe: "Mix tuna with mayo, serve over greens." },
  Dinner: { name: "Baked Turkey Burger Patties", calories: 610, protein: 44, carbs: 16, fat: 28, ingredients: ["Ground Turkey", "Asparagus", "Olive Oil"], recipe: "Grill turkey patties, serve with asparagus." },
  Snack: { name: "Hardboiled Eggs & Walnuts", calories: 230, protein: 14, carbs: 4, fat: 18, ingredients: ["2 Hardboiled Eggs", "Walnuts"], recipe: "Serve eggs sliced alongside raw walnuts." }
};

const TIMELINE_DATA = [
  { time: "Today, 14:09", type: "Wearable Sync", text: "Successfully synchronized Garmin smartwatch data logs. Active heartrate normal." },
  { time: "Yesterday, 08:30", type: "Nutrition Logged", text: "Logged Precision Meal Breakfast. Accuracy rating at 96%." },
  { time: "July 5, 18:00", type: "Workout Completed", text: "Completed Upper Body Push Split daily session. Max load parameters recorded." }
];

const ACHIEVEMENTS_LIST = [
  { id: "checkin_1", name: "Habit Builder", desc: "Complete your first daily biometric check-in.", icon: "check-circle" },
  { id: "water_3", name: "Hydration Master", desc: "Hit your daily water target of 3.0L in a single day.", icon: "droplet" },
  { id: "workout_1", name: "First Session Done", desc: "Start and complete your first workout session.", icon: "dumbbell" },
  { id: "streak_3", name: "On a Roll", desc: "Maintain a 3-day health logging streak.", icon: "flame" }
];


// ==================== SEARCH INDEX DATABASE ====================

const SEARCH_DATABASE = [
  { name: "Dashboard Hub", category: "Page", action: () => showView("dashboard") },
  { name: "Workout Plan Schedule", category: "Page", action: () => showView("workout") },
  { name: "Nutrition Diet Plans", category: "Page", action: () => showView("nutrition") },
  { name: "Grocery Shopping Checklist", category: "Page", action: () => showView("grocery") },
  { name: "Smartwatch Telemetry Hub", category: "Page", action: () => showView("wearables") },
  { name: "AI Coach Chatbot", category: "Page", action: () => showView("chat") },
  { name: "Analytics & Projections", category: "Page", action: () => showView("progress") },
  { name: "Injury Rehab Body Selector", category: "Page", action: () => showView("injury") },
  { name: "Badges & Milestones", category: "Page", action: () => showView("achievements") },
  { name: "Profile Settings", category: "Page", action: () => showView("profile") },

  // Exercises
  { name: "Barbell Bench Press", category: "Exercise", action: () => { showView("workout"); swapExercise(0); } },
  { name: "Barbell Back Squat", category: "Exercise", action: () => { showView("workout"); switchWorkoutDay(2); } },
  { name: "Overhead Dumbbell Press", category: "Exercise", action: () => { showView("workout"); } },
  { name: "Downward Facing Dog", category: "Exercise", action: () => { showView("workout"); } },

  // Meals
  { name: "Berry Avocado Toast", category: "Meal", action: () => showView("nutrition") },
  { name: "Mediterranean Quinoa Bowl", category: "Meal", action: () => showView("nutrition") },
  { name: "Teriyaki Glazed Salmon", category: "Meal", action: () => showView("nutrition") }
];


// ==================== CORE STATE ====================

const AppState = {
  authenticated: false,
  user: { name: "Alex Mercer", email: "alex@fitgenie.com" },
  profile: null,
  dailyLogs: {
    waterConsumed: 0.0,
    checkInDone: false,
    workoutDone: false,
    caloriesLogged: 0,
    proteinLogged: 0,
    carbsLogged: 0,
    fatsLogged: 0,
    streakCount: 3,
    weightHistory: [73.5, 73.2, 72.8, 72.5, 72.3, 72.0],
    calorieHistory: [2100, 2300, 1950, 2200, 2400, 1800, 2000],
    workoutHistory: [1, 1, 0, 1, 1, 1, 1]
  },
  notifications: [
    { id: 1, type: "Sync Alert", text: "Wearables data synced successfully." },
    { id: 2, type: "Habit Score", text: "Hydration levels are matching the targets." }
  ],
  workouts: [],
  selectedDayTab: 1,
  activeSession: { inProgress: false, dayIndex: 0, exerciseIndex: 0, timerSeconds: 0, timerInterval: null },
  meals: [],
  groceryList: [],
  chatHistory: [
    { sender: "bot", text: "Hello! I am your personalized FitGenie Coach. How can I help you optimize your training, diet, or rehabilitation today?" }
  ],
  injuries: [],
  achievements: ["checkin_1", "water_3"],
  wearables: {
    Apple: false,
    Garmin: false,
    Fitbit: false,
    Samsung: false,
    GooglePixel: false,
    Amazfit: false
  },
  theme: "light",
  isRecording: false,
  voiceOutputActive: false
};

// ==================== TOAST NOTIFICATION ENGINE ====================

function showToast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const t = document.createElement("div");
  t.className = `toast ${type}`;

  let icon = "check-circle";
  if (type === "error") icon = "alert-triangle";
  if (type === "info") icon = "info";
  if (type === "warning") icon = "alert-circle";

  t.innerHTML = `<i data-lucide="${icon}"></i> <span>${msg}</span>`;
  container.appendChild(t);
  lucide.createIcons();

  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateX(50px)";
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

// ==================== SPA ROUTING SYSTEM ====================

let currentLayout = null; // Can be 'public', 'onboarding', or 'protected'
let clockInterval = null;

function startLiveClock() {
  if (clockInterval) clearInterval(clockInterval);
  const update = () => {
    const el = document.getElementById("hero-clock");
    if (el) {
      el.innerText = new Date().toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  };
  update();
  clockInterval = setInterval(update, 10000);
}

function mountLayout(layoutName) {
  if (currentLayout === layoutName) return;

  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  appContainer.innerHTML = "";

  const template = document.getElementById(`layout-${layoutName}`);
  if (template) {
    const clone = template.content.cloneNode(true);
    appContainer.appendChild(clone);
    currentLayout = layoutName;

    // Run layout specific initializations
    if (layoutName === 'public') {
      lucide.createIcons();
    } else if (layoutName === 'onboarding') {
      initChoiceCards();
      lucide.createIcons();
    } else if (layoutName === 'protected') {
      startLiveClock();
      lucide.createIcons();
    }
    applyTheme();
  }
}

const PUBLIC_ROUTES = [
  '#home',
  '#features',
  '#how-it-works',
  '#testimonials',
  '#pricing',
  '#faq',
  '#login',
  '#signup',
  '#forgot',
  ''
];

const PROTECTED_ROUTES = [
  '#dashboard',
  '#workout',
  '#nutrition',
  '#grocery',
  '#wearables',
  '#chat',
  '#progress',
  '#injury',
  '#achievements',
  '#profile',
  '#checkin',
  '#onboarding'
];

function getCurrentRoute() {
  const hash = window.location.hash;
  if (hash) return hash;
  
  const path = window.location.pathname;
  const pathMapping = {
    '/dashboard': '#dashboard',
    '/workout': '#workout',
    '/nutrition': '#nutrition',
    '/grocery': '#grocery',
    '/wearables': '#wearables',
    '/chat': '#chat',
    '/progress': '#progress',
    '/injury': '#injury',
    '/achievements': '#achievements',
    '/profile': '#profile',
    '/checkin': '#checkin',
    '/login': '#login',
    '/signup': '#signup',
    '/forgot': '#forgot',
    '/onboarding': '#onboarding'
  };
  return pathMapping[path] || '#home';
}

function handleRouting() {
  const route = getCurrentRoute();

  // 1. Unauthenticated checks
  if (!AppState.authenticated) {
    if (!PUBLIC_ROUTES.includes(route)) {
      window.location.hash = '#login';
      showToast("Please sign in to access FitGenie AI.", "warning");
      return;
    }
  }

  // 2. Authenticated checks
  if (AppState.authenticated) {
    if (!AppState.profile) {
      if (route !== '#onboarding') {
        window.location.hash = '#onboarding';
        return;
      }
    } else {
      if (route === '#onboarding') {
        window.location.hash = '#dashboard';
        return;
      }
    }

    if (['#login', '#signup', '#forgot'].includes(route)) {
      window.location.hash = '#dashboard';
      return;
    }
  }

  // 3. Render layout viewports
  if (['#login', '#signup', '#forgot'].includes(route)) {
    mountLayout('public');
    document.getElementById("screen-landing").classList.remove("active");
    document.getElementById("screen-auth").classList.add("active");
    const mode = route === '#login' ? 'login' : (route === '#signup' ? 'signup' : 'forgot');
    switchAuthView(mode);
  } else if (route === '#onboarding') {
    mountLayout('onboarding');
    updateOnboardingStepVisibility();
  } else if (PUBLIC_ROUTES.includes(route) && !['#login', '#signup', '#forgot'].includes(route)) {
    mountLayout('public');
    document.getElementById("screen-landing").classList.add("active");
    document.getElementById("screen-auth").classList.remove("active");
    if (route && route !== '#home') {
      const section = document.querySelector(route);
      if (section) {
        setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  } else {
    mountLayout('protected');
    
    // Ensure sidebar session state is updated
    enterAppShell();

    const viewName = route.replace('#', '');
    showView(viewName);
  }
}

// ==================== APP CONTROLLER ENGINE ====================

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();

  // Run initial routing check
  handleRouting();

  // Bind history and load route listeners
  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('load', handleRouting);

  applyTheme();

  // Document Click handler to close notifications dropdowns
  document.addEventListener("click", () => {
    const modal = document.getElementById("notifications-modal");
    if (modal) modal.classList.add("hidden");
    
    const searchDropdown = document.getElementById("global-search-dropdown");
    if (searchDropdown) searchDropdown.classList.add("hidden");

    document.querySelectorAll(".custom-select-options").forEach(opt => opt.classList.add("hidden"));
  });

  // Global command palette triggers
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });
});

function startLiveClock() {
  const update = () => {
    const el = document.getElementById("hero-clock");
    if (el) {
      el.innerText = new Date().toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  };
  update();
  setInterval(update, 10000);
}

function showView(viewName) {
  if (window.location.hash !== '#' + viewName) {
    window.location.hash = '#' + viewName;
    return;
  }

  document.querySelectorAll(".app-view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => item.classList.remove("active"));

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add("active");
  }

  updatePageHeroDetails(viewName);

  const navItem = document.querySelector(`.sidebar-nav .nav-item[onclick*="${viewName}"]`);
  if (navItem) navItem.classList.add("active");

  const main = document.querySelector(".app-main");
  if (main) main.scrollTop = 0;

  if (viewName === "dashboard") {
    renderDashboardPreviews();
    updateDashboardMeters();
    updateDigitalTwinVisualState();
  } else if (viewName === "workout") {
    renderWorkoutPlanView();
  } else if (viewName === "nutrition") {
    renderNutritionView();
  } else if (viewName === "grocery") {
    renderGroceryListView();
  } else if (viewName === "wearables") {
    renderWearablesHubView();
  } else if (viewName === "chat") {
    renderChatMessages();
    renderChatSuggestions();
  } else if (viewName === "progress") {
    renderProgressAnalyticsCharts();
    renderTimelineFeed();
  } else if (viewName === "achievements") {
    renderAchievementsGallery();
  } else if (viewName === "injury") {
    renderInjuryRehabView();
  } else if (viewName === "profile") {
    loadProfileIntoSettings();
  }
}

// Router controllers
function showLanding() {
  window.location.hash = '#home';
}

function showAuth(view) {
  window.location.hash = '#' + view;
}

function switchAuthView(view) {
  if (window.location.hash !== '#' + view) {
    window.location.hash = '#' + view;
    return;
  }
  
  document.getElementById("auth-login-card").classList.add("hidden");
  document.getElementById("auth-signup-card").classList.add("hidden");
  document.getElementById("auth-forgot-card").classList.add("hidden");

  if (view === "login") document.getElementById("auth-login-card").classList.remove("hidden");
  if (view === "signup") document.getElementById("auth-signup-card").classList.remove("hidden");
  if (view === "forgot") document.getElementById("auth-forgot-card").classList.remove("hidden");
}

function showOnboarding() {
  window.location.hash = '#onboarding';
}

function navigate(viewName) {
  if (!AppState.authenticated) {
    window.location.hash = '#login';
    return;
  }
  if (!AppState.profile) {
    window.location.hash = '#onboarding';
    return;
  }
  window.location.hash = '#' + viewName;
}

// ==================== FORM VALIDATION ====================

function validateEmailField(input) {
  const wrapper = input.parentNode;
  const errorMsg = wrapper.querySelector(".field-error-msg");
  const succIcon = wrapper.querySelector(".success-icon");
  const errIcon = wrapper.querySelector(".error-icon");
  const val = input.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!val) {
    wrapper.classList.remove("error-state");
    if (errorMsg) errorMsg.style.display = "none";
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return false;
  }

  if (pattern.test(val)) {
    wrapper.classList.remove("error-state");
    if (errorMsg) errorMsg.style.display = "none";
    if (succIcon) succIcon.classList.remove("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return true;
  } else {
    wrapper.classList.add("error-state");
    if (errorMsg) {
      errorMsg.innerText = "Please enter a valid email address.";
      errorMsg.style.display = "block";
    }
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.remove("hidden");
    return false;
  }
}

function validatePasswordField(input) {
  const wrapper = input.parentNode;
  const errorMsg = wrapper.querySelector(".field-error-msg");
  const succIcon = wrapper.querySelector(".success-icon");
  const errIcon = wrapper.querySelector(".error-icon");
  const val = input.value;

  if (!val) {
    wrapper.classList.remove("error-state");
    if (errorMsg) errorMsg.style.display = "none";
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return false;
  }

  if (val.length >= 6) {
    wrapper.classList.remove("error-state");
    if (errorMsg) errorMsg.style.display = "none";
    if (succIcon) succIcon.classList.remove("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return true;
  } else {
    wrapper.classList.add("error-state");
    if (errorMsg) {
      errorMsg.innerText = "Password must be at least 6 characters.";
      errorMsg.style.display = "block";
    }
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.remove("hidden");
    return false;
  }
}

function validateNameField(input) {
  const wrapper = input.parentNode;
  const succIcon = wrapper.querySelector(".success-icon");
  const errIcon = wrapper.querySelector(".error-icon");

  if (input.value.trim().length > 1) {
    if (succIcon) succIcon.classList.remove("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return true;
  } else {
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.remove("hidden");
    return false;
  }
}

function validateNumericField(input, min, max) {
  const wrapper = input.parentNode;
  const errorMsg = wrapper.querySelector(".field-error-msg");
  const succIcon = wrapper.querySelector(".success-icon");
  const errIcon = wrapper.querySelector(".error-icon");
  const val = parseFloat(input.value);

  if (isNaN(val)) {
    wrapper.classList.remove("error-state");
    if (errorMsg) errorMsg.style.display = "none";
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return false;
  }

  if (val >= min && val <= max) {
    wrapper.classList.remove("error-state");
    if (errorMsg) errorMsg.style.display = "none";
    if (succIcon) succIcon.classList.remove("hidden");
    if (errIcon) errIcon.classList.add("hidden");
    return true;
  } else {
    wrapper.classList.add("error-state");
    if (errorMsg) {
      errorMsg.innerText = `Must be between ${min} and ${max}.`;
      errorMsg.style.display = "block";
    }
    if (succIcon) succIcon.classList.add("hidden");
    if (errIcon) errIcon.classList.remove("hidden");
    return false;
  }
}

function togglePasswordVisibilityInside(inputId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(`eye-icon-${inputId}`);
  if (input) {
    if (input.type === "password") {
      input.type = "text";
      if (icon) icon.setAttribute("data-lucide", "eye-off");
    } else {
      input.type = "password";
      if (icon) icon.setAttribute("data-lucide", "eye");
    }
    lucide.createIcons();
  }
}

// ==================== SEARCHABLE SELECT CUSTOM ====================

function toggleCustomSelect(selectId, event) {
  if (event) event.stopPropagation();

  document.querySelectorAll(".custom-select-options").forEach(opt => {
    if (opt.parentNode.id !== selectId) {
      opt.classList.add("hidden");
    }
  });

  const wrapper = document.getElementById(selectId);
  const options = wrapper.querySelector(".custom-select-options");
  options.classList.toggle("hidden");

  if (!options.classList.contains("hidden")) {
    const input = options.querySelector("input");
    if (input) {
      input.value = "";
      input.focus();
      filterCustomSelect(selectId, "");
    }
  }
}

function selectCustomOption(selectId, value, text) {
  const wrapper = document.getElementById(selectId);
  const triggerText = wrapper.querySelector(".selected-text");
  const hiddenInputId = selectId.replace("select-", "");
  const hiddenInput = document.getElementById(hiddenInputId);

  triggerText.innerText = text;
  if (hiddenInput) {
    hiddenInput.value = value;
    const event = new Event('change');
    hiddenInput.dispatchEvent(event);
  }

  wrapper.querySelectorAll(".select-option").forEach(opt => {
    opt.classList.toggle("selected", opt.getAttribute("data-value") === value);
  });

  wrapper.querySelector(".custom-select-options").classList.add("hidden");
}

function filterCustomSelect(selectId, query) {
  const wrapper = document.getElementById(selectId);
  const optionsList = wrapper.querySelector(".options-list");
  const q = query.toLowerCase();

  optionsList.querySelectorAll(".select-option").forEach(opt => {
    const txt = opt.innerText.toLowerCase();
    opt.classList.toggle("hidden", !txt.includes(q));
  });
}

// ==================== GLOBAL TOP SEARCH SUGGESTIONS ====================

function handleGlobalSearch(query) {
  const dropdown = document.getElementById("global-search-dropdown");
  const q = query.trim().toLowerCase();

  if (!q) {
    dropdown.classList.add("hidden");
    return;
  }

  const results = SEARCH_DATABASE.filter(item => item.name.toLowerCase().includes(q));
  dropdown.classList.remove("hidden");

  if (results.length === 0) {
    dropdown.innerHTML = `<p class="small-label p-2 text-center">No results match "${query}"</p>`;
    return;
  }

  dropdown.innerHTML = results.map(item => `
    <div class="search-result-row" onclick="triggerSearchResultAction(${SEARCH_DATABASE.indexOf(item)})">
      <span>${item.name}</span>
      <span class="category">${item.category}</span>
    </div>
  `).join("");
}

function triggerSearchResultAction(index) {
  const item = SEARCH_DATABASE[index];
  if (item) {
    item.action();
    document.getElementById("global-search-input").value = "";
    document.getElementById("global-search-dropdown").classList.add("hidden");
    showToast(`Navigated to ${item.name}`, "info");
  }
}

// ==================== DYNAMIC HERO HEADERS ====================

function updatePageHeroDetails(view) {
  const header = document.getElementById("app-page-header");
  if (header) {
    header.classList.remove("animate-hero");
    void header.offsetWidth;
    header.classList.add("animate-hero");
  }

  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-desc");
  const breadcrumbEl = document.getElementById("hero-breadcrumbs");
  const insightEl = document.getElementById("hero-insight-text");
  const actionContainer = document.getElementById("hero-actions-container");

  document.getElementById("hero-user-avatar").innerText = AppState.user.name.substring(0, 2).toUpperCase();
  renderNotificationsList();

  const matrix = {
    dashboard: {
      title: "Dashboard Hub",
      desc: "Your daily AI fitness metrics, macros progress, and digital twin avatar.",
      breadcrumbs: "FitGenie > Dashboard",
      actions: `
        <button class="btn btn-outline btn-sm glass" onclick="incrementWater()"><i data-lucide="plus"></i> Log Water</button>
        <button class="btn btn-primary btn-sm" onclick="navigate('checkin')"><i data-lucide="check-square"></i> Log Daily metrics</button>
      `
    },
    workout: {
      title: "Custom Workout Schedule",
      desc: "Your weekly training schedules and exercise loading structures.",
      breadcrumbs: "FitGenie > Training > Workouts",
      actions: `
        <button class="btn btn-primary btn-sm" onclick="startActiveWorkoutSession()"><i data-lucide="play"></i> Start Workout</button>
      `
    },
    session: {
      title: "Active Workout Session",
      desc: "Real-time guide tracking sets and load variables.",
      breadcrumbs: "FitGenie > Training > Session",
      actions: `
        <button class="btn btn-danger btn-sm" onclick="if(confirm('Quit workout session?')) showView('workout')"><i data-lucide="x-circle"></i> Quit Session</button>
      `
    },
    nutrition: {
      title: "Dietetics & Nutrition Plan",
      desc: "Customize meals, upload food photos, or swap recipes dynamically.",
      breadcrumbs: "FitGenie > Fuel > Dietetics",
      actions: `
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('meal-scanner-file').click()"><i data-lucide="camera"></i> Meal Scan</button>
      `
    },
    grocery: {
      title: "Optimized Grocery Checklist",
      desc: "Structured list of ingredients filtered within budget constraints.",
      breadcrumbs: "FitGenie > Fuel > Groceries",
      actions: `
        <button class="btn btn-outline btn-sm glass" onclick="clearCheckedGroceries()"><i data-lucide="trash-2"></i> Clear Checked</button>
      `
    },
    wearables: {
      title: "Smartwatch Telemetry Hub",
      desc: "Connect Apple Watch, Garmin, Fitbit, or Galaxy Watch devices.",
      breadcrumbs: "FitGenie > Systems > Wearables",
      actions: `
        <button class="btn btn-accent btn-sm" onclick="syncWearablesTelemetry()"><i data-lucide="refresh-cw"></i> Sync Telemetry</button>
      `
    },
    chat: {
      title: "AI Coaching Assistant",
      desc: "Ask fitness, recovery, recipe swap, or joint pain questions.",
      breadcrumbs: "FitGenie > Coach > Chat",
      actions: `
        <button class="btn btn-primary btn-sm" onclick="toggleVoiceInput()"><i data-lucide="mic"></i> Voice Coach</button>
      `
    },
    checkin: {
      title: "Daily Biometric Check-In",
      desc: "Update weight, sleep metrics, and logging parameters.",
      breadcrumbs: "FitGenie > Core > Check-In",
      actions: `
        <button class="btn btn-outline btn-sm glass" onclick="showView('dashboard')"><i data-lucide="arrow-left"></i> Cancel</button>
      `
    },
    progress: {
      title: "Biometric Analytics",
      desc: "Wellness radar index, calorie balance charts, and weight projection lines.",
      breadcrumbs: "FitGenie > Performance > Analytics",
      actions: `
        <button class="btn btn-primary btn-sm" onclick="triggerWeeklyReportMock()"><i data-lucide="file-text"></i> Performance Card</button>
      `
    },
    achievements: {
      title: "Consistency Badges",
      desc: "Trophy cabinet celebrating consistency milestones.",
      breadcrumbs: "FitGenie > Performance > Badges",
      actions: `
        <button class="btn btn-primary btn-sm" onclick="shareBadges()"><i data-lucide="share-2"></i> Share Badges</button>
      `
    },
    profile: {
      title: "Profile Configurations",
      desc: "Calibrate target calories, goals, and dark/light modes.",
      breadcrumbs: "FitGenie > Config > Settings",
      actions: `
        <button class="btn btn-primary btn-sm" onclick="toggleTheme()"><i data-lucide="sun-moon"></i> Toggle Theme</button>
      `
    }
  };

  const currentView = matrix[view] || matrix.dashboard;
  titleEl.innerText = currentView.title;
  descEl.innerText = currentView.desc;
  breadcrumbEl.innerText = currentView.breadcrumbs;
  actionContainer.innerHTML = currentView.actions;

  let insightText = "Hydration metrics optimal. Maintain 3L average today.";
  if (AppState.injuries.length > 0) {
    insightText = `Active pain reported: ${AppState.injuries.join(", ")}. Swapping loaded extensions.`;
  } else if (AppState.dailyLogs.waterConsumed < 1.0) {
    insightText = "Dehydration warning: Daily logs show low water intake. Drink a glass of water.";
  }
  insightEl.innerText = insightText;

  lucide.createIcons();
}

// Notification dropdowns
function toggleNotificationsModal(event) {
  event.stopPropagation();
  document.getElementById("notifications-modal").classList.toggle("hidden");
}

function renderNotificationsList() {
  const badge = document.getElementById("hero-notif-badge");
  const list = document.getElementById("hero-notif-list");

  if (AppState.notifications.length === 0) {
    badge.classList.add("hidden");
    list.innerHTML = `<p class="small-label p-3 text-center">No notifications found.</p>`;
    return;
  }

  badge.classList.remove("hidden");
  badge.innerText = AppState.notifications.length;
  list.innerHTML = AppState.notifications.map(n => `
    <div class="notification-item">
      <div class="flex justify-between items-center">
        <span class="badge primary">${n.type}</span>
        <button class="btn-text btn-sm" onclick="deleteNotification(${n.id})" style="font-size:0.75rem;">×</button>
      </div>
      <p class="mt-1">${n.text}</p>
    </div>
  `).join("");
}

function deleteNotification(id) {
  AppState.notifications = AppState.notifications.filter(n => n.id !== id);
  renderNotificationsList();
  showToast("Notification deleted", "info");
  saveToLocalStorage();
}

function clearNotifications() {
  AppState.notifications = [];
  renderNotificationsList();
  showToast("All notifications cleared", "success");
  saveToLocalStorage();
}

// ==================== GLOBAL COMMAND PALETTE ====================

const PALETTE_COMMANDS = [
  { name: "Go to Dashboard Hub", icon: "layout-dashboard", shortcut: "⌘D", action: () => showView("dashboard") },
  { name: "Go to Workout Plan", icon: "dumbbell", shortcut: "⌘W", action: () => showView("workout") },
  { name: "Go to Nutrition Plan", icon: "salad", shortcut: "⌘N", action: () => showView("nutrition") },
  { name: "Go to Grocery Compiler", icon: "shopping-basket", shortcut: "⌘G", action: () => showView("grocery") },
  { name: "Go to Smartwatch Telemetry Hub", icon: "watch", shortcut: "⌘S", action: () => showView("wearables") },
  { name: "Go to AI Coach Chatbot", icon: "messages-square", shortcut: "⌘C", action: () => showView("chat") },
  { name: "Go to Analytics & Projections", icon: "trending-up", shortcut: "⌘A", action: () => showView("progress") },
  { name: "Go to Injury Rehab Dynamics", icon: "heart-pulse", shortcut: "⌘I", action: () => showView("injury") },
  { name: "Go to Badges & Achievements", icon: "trophy", shortcut: "⌘H", action: () => showView("achievements") },
  { name: "Go to Settings Profile", icon: "user-cog", shortcut: "⌘P", action: () => showView("profile") }
];

function openCommandPalette() {
  const modal = document.getElementById("command-palette-modal");
  const input = document.getElementById("command-palette-input");

  modal.classList.remove("hidden");
  input.value = "";
  input.focus();
  filterCommandPalette();
}

function closeCommandPalette(e) {
  if (e) {
    const card = document.querySelector(".command-palette-card");
    if (card && card.contains(e.target)) return;
  }
  document.getElementById("command-palette-modal").classList.add("hidden");
}

function filterCommandPalette() {
  const q = document.getElementById("command-palette-input").value.toLowerCase();
  const resultsBox = document.getElementById("command-palette-results");
  const filtered = PALETTE_COMMANDS.filter(cmd => cmd.name.toLowerCase().includes(q));

  if (filtered.length === 0) {
    resultsBox.innerHTML = `<p class="small-label p-3 text-center">No commands matching "${q}" found.</p>`;
    return;
  }

  resultsBox.innerHTML = filtered.map((cmd, idx) => `
    <div class="command-item" onclick="triggerPaletteAction('${cmd.name}')">
      <div class="command-item-left">
        <i data-lucide="${cmd.icon}"></i>
        <span>${cmd.name}</span>
      </div>
      <span class="command-shortcut">${cmd.shortcut}</span>
    </div>
  `).join("");

  lucide.createIcons();
}

function triggerPaletteAction(name) {
  const cmd = PALETTE_COMMANDS.find(c => c.name === name);
  if (cmd) {
    cmd.action();
    closeCommandPalette();
  }
}

// ==================== VISUAL CHOICE CARDS ====================

function initChoiceCards() {
  document.querySelectorAll(".choice-cards-grid").forEach(grid => {
    const inputId = grid.getAttribute("data-input-id");
    const hiddenInput = document.getElementById(inputId);

    grid.querySelectorAll(".choice-card").forEach(card => {
      card.addEventListener("click", () => {
        const val = card.getAttribute("data-value");
        if (hiddenInput) {
          hiddenInput.value = val;
          const event = new Event('change');
          hiddenInput.dispatchEvent(event);
        }

        grid.querySelectorAll(".choice-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
      });
    });
  });
}

function syncVisualChoiceCardValues() {
  document.querySelectorAll(".choice-cards-grid").forEach(grid => {
    const inputId = grid.getAttribute("data-input-id");
    const hiddenInput = document.getElementById(inputId);
    if (hiddenInput && hiddenInput.value) {
      grid.querySelectorAll(".choice-card").forEach(card => {
        card.classList.toggle("selected", card.getAttribute("data-value") === hiddenInput.value);
      });
    }
  });
}

// ==================== AUTH SUBMISSIONS ====================

function handleLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById("login-email");
  const pwdInput = document.getElementById("login-password");

  if (!validateEmailField(emailInput) || !validatePasswordField(pwdInput)) return;

  const submitBtn = document.getElementById("btn-login-submit");
  submitBtn.disabled = true;
  submitBtn.querySelector(".btn-text-label").classList.add("hidden");
  submitBtn.querySelector(".btn-loading-spinner").classList.remove("hidden");

  setTimeout(() => {
    AppState.authenticated = true;
    AppState.user.name = emailInput.value.split("@")[0].toUpperCase();
    AppState.user.email = emailInput.value;

    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text-label").classList.remove("hidden");
    submitBtn.querySelector(".btn-loading-spinner").classList.add("hidden");

    showToast(`Logged in as ${AppState.user.name}`, "success");
    saveToLocalStorage();

    if (AppState.profile) {
      window.location.hash = '#dashboard';
    } else {
      window.location.hash = '#onboarding';
    }
  }, 1000);
}

function handleSignup(e) {
  e.preventDefault();
  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const pwdInput = document.getElementById("signup-password");

  if (!validateNameField(nameInput) || !validateEmailField(emailInput) || !validatePasswordField(pwdInput)) return;

  const submitBtn = document.getElementById("btn-signup-submit");
  submitBtn.disabled = true;
  submitBtn.querySelector(".btn-text-label").classList.add("hidden");
  submitBtn.querySelector(".btn-loading-spinner").classList.remove("hidden");

  setTimeout(() => {
    AppState.authenticated = true;
    AppState.user.name = nameInput.value;
    AppState.user.email = emailInput.value;

    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text-label").classList.remove("hidden");
    submitBtn.querySelector(".btn-loading-spinner").classList.add("hidden");

    showToast("Account successfully compiled", "success");
    saveToLocalStorage();
    window.location.hash = '#onboarding';
  }, 1000);
}

function handleForgot(e) {
  e.preventDefault();
  const emailInput = document.getElementById("forgot-email");
  if (!validateEmailField(emailInput)) return;

  const submitBtn = document.getElementById("btn-forgot-submit");
  submitBtn.disabled = true;
  submitBtn.querySelector(".btn-text-label").classList.add("hidden");
  submitBtn.querySelector(".btn-loading-spinner").classList.remove("hidden");

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text-label").classList.remove("hidden");
    submitBtn.querySelector(".btn-loading-spinner").classList.add("hidden");

    showToast("Recovery instructions successfully dispatched", "info");
    switchAuthView("login");
  }, 1000);
}

function handleSocialMock(service) {
  const overlay = document.getElementById("onboarding-loading-overlay");
  overlay.classList.remove("hidden");
  document.getElementById("loader-title").innerText = `Connecting with ${service}...`;

  setTimeout(() => {
    overlay.classList.add("hidden");
    AppState.authenticated = true;
    AppState.user.name = `${service} Genie`;
    AppState.user.email = `social-${service.toLowerCase()}@fitgenie-mock.com`;
    saveToLocalStorage();

    showToast(`Synced successfully with ${service}`, "success");
    if (AppState.profile) {
      window.location.hash = '#dashboard';
    } else {
      window.location.hash = '#onboarding';
    }
  }, 900);
}

function handleLogout() {
  AppState.authenticated = false;
  AppState.profile = null;
  localStorage.removeItem("fitgenie_state");
  showToast("Logged out successfully", "info");
  window.location.hash = '#home';
}

function enterAppShell() {
  const nameEl = document.getElementById("app-user-name");
  const avatarEl = document.getElementById("app-user-avatar");
  if (nameEl) nameEl.innerText = AppState.user.name;
  if (avatarEl) avatarEl.innerText = AppState.user.name.substring(0, 2).toUpperCase();
}

// ==================== MULTI-STEP ONBOARDING ====================

let onboardingStep = 1;

function updateOnboardingStepVisibility() {
  document.querySelectorAll(".onboarding-step-view").forEach(step => step.classList.remove("active"));
  document.getElementById(`onboard-step${onboardingStep}`).classList.add("active");

  const percentages = { 1: "25%", 2: "50%", 3: "75%", 4: "100%" };
  document.getElementById("onboarding-pct-text").innerText = percentages[onboardingStep];

  for (let n = 1; n <= 4; n++) {
    const node = document.getElementById(`prog-node-${n}`);
    if (n < onboardingStep) {
      node.className = "progress-step-node completed";
    } else if (n === onboardingStep) {
      node.className = "progress-step-node active";
    } else {
      node.className = "progress-step-node";
    }
  }

  for (let l = 1; l <= 3; l++) {
    const line = document.getElementById(`prog-line-${l}`);
    line.style.setProperty("--line-fill", l < onboardingStep ? "100%" : "0%");
  }

  document.getElementById("onboarding-prev-btn").style.visibility = onboardingStep === 1 ? "hidden" : "visible";

  if (onboardingStep === 4) {
    document.getElementById("onboarding-next-btn").classList.add("hidden");
    document.getElementById("onboarding-submit-btn").classList.remove("hidden");
    buildOnboardingSummaryReviewFields();
  } else {
    document.getElementById("onboarding-next-btn").classList.remove("hidden");
    document.getElementById("onboarding-submit-btn").classList.add("hidden");
  }

  syncVisualChoiceCardValues();
  syncLiveBmrCalculator();
}

function onboardingNext() {
  if (validateOnboardingSubstep(onboardingStep)) {
    onboardingStep++;
    updateOnboardingStepVisibility();
  } else {
    showToast("Please enter all required metrics", "error");
  }
}

function onboardingBack() {
  if (onboardingStep > 1) {
    onboardingStep--;
    updateOnboardingStepVisibility();
  }
}

function jumpToOnboardingStep(stepNum) {
  if (stepNum < onboardingStep) {
    onboardingStep = stepNum;
    updateOnboardingStepVisibility();
  }
}

function validateOnboardingSubstep(step) {
  let valid = true;
  if (step === 1) {
    const isAge = validateNumericField(document.getElementById("ob-age"), 12, 100);
    const isHeight = validateNumericField(document.getElementById("ob-height"), 100, 250);
    const isWeight = validateNumericField(document.getElementById("ob-weight"), 30, 250);
    const isGender = !!document.getElementById("ob-gender").value;
    valid = isAge && isHeight && isWeight && isGender;
  } else if (step === 2) {
    const inputs = ["ob-goal", "ob-level", "ob-pref", "ob-equip", "ob-days"];
    inputs.forEach(id => {
      if (!document.getElementById(id).value) valid = false;
    });
  } else if (step === 3) {
    const isDiet = !!document.getElementById("ob-diet").value;
    const isActivity = !!document.getElementById("ob-activity").value;
    valid = isDiet && isActivity;
  }
  return valid;
}

function updateRangeBubble(id, val, unit) {
  document.getElementById(`bubble-${id}`).innerText = `${val} ${unit}`;
}

function syncLiveBmrCalculator() {
  const age = parseInt(document.getElementById("ob-age").value);
  const height = parseInt(document.getElementById("ob-height").value);
  const weight = parseFloat(document.getElementById("ob-weight").value);
  const gender = document.getElementById("ob-gender").value || "Male";
  const goal = document.getElementById("ob-goal").value || "Lose Weight";
  const activity = document.getElementById("ob-activity").value || "Lightly Active";

  if (age && height && weight) {
    let bmr = gender === "Male" ?
      (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) :
      (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));

    let mults = { "Sedentary": 1.2, "Lightly Active": 1.375, "Moderately Active": 1.55, "Very Active": 1.725 };
    let tdee = Math.round(bmr * (mults[activity] || 1.375));
    let target = tdee;

    if (goal === "Lose Weight") target -= 450;
    if (goal === "Build Muscle") target += 300;

    document.getElementById("calc-bmr").innerHTML = `${Math.round(bmr)} <span class="calc-unit">kcal</span>`;
    document.getElementById("calc-tdee").innerHTML = `${tdee} <span class="calc-unit">kcal</span>`;
    document.getElementById("calc-target").innerHTML = `${target} <span class="calc-unit">kcal</span>`;
  }
}

function buildOnboardingSummaryReviewFields() {
  const age = document.getElementById("ob-age").value;
  const gender = document.getElementById("ob-gender").value;
  const height = document.getElementById("ob-height").value;
  const weight = document.getElementById("ob-weight").value;
  const goal = document.getElementById("ob-goal").value;

  document.getElementById("sum-stats").innerText = `Age: ${age} | ${gender} | ${height}cm | ${weight}kg`;
  document.getElementById("sum-goals").innerText = `Goal: ${goal} | Gym Split`;
  document.getElementById("sum-diet").innerText = `Diet: ${document.getElementById("ob-diet").value}`;
}

function handleOnboardingSubmit(e) {
  e.preventDefault();
  if (!validateOnboardingSubstep(4)) return;

  const submitBtn = document.getElementById("onboarding-submit-btn");
  submitBtn.disabled = true;
  submitBtn.querySelector(".btn-text-label").classList.add("hidden");
  submitBtn.querySelector(".btn-loading-spinner").classList.remove("hidden");

  AppState.profile = {
    age: parseInt(document.getElementById("ob-age").value) || 28,
    gender: document.getElementById("ob-gender").value || "Male",
    height: parseInt(document.getElementById("ob-height").value) || 175,
    weight: parseFloat(document.getElementById("ob-weight").value) || 72,
    bodyfat: parseFloat(document.getElementById("ob-bodyfat").value) || 18,
    goal: document.getElementById("ob-goal").value || "Lose Weight",
    level: document.getElementById("ob-level").value || "Beginner",
    workoutPref: document.getElementById("ob-pref").value || "Strength",
    equipment: document.getElementById("ob-equip").value || "Full Gym",
    workoutDays: parseInt(document.getElementById("ob-days").value) || 3,
    workoutDuration: parseInt(document.getElementById("ob-duration").value) || 45,
    diet: document.getElementById("ob-diet").value || "Standard/Balanced",
    sleep: parseInt(document.getElementById("ob-sleep").value) || 7,
    water: parseFloat(document.getElementById("ob-water").value) || 3.0,
    activity: document.getElementById("ob-activity").value || "Lightly Active",
    calorieTarget: 2000,
    proteinTarget: 140,
    carbTarget: 200,
    fatTarget: 70
  };

  generatePlanBasedOnProfile();

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text-label").classList.remove("hidden");
    submitBtn.querySelector(".btn-loading-spinner").classList.add("hidden");
    showOnboardingLoaderSimulator();
  }, 1000);
}

function showOnboardingLoaderSimulator() {
  const overlay = document.getElementById("onboarding-loading-overlay");
  overlay.classList.remove("hidden");

  const titles = [
    "Analyzing physical metrics...",
    "Computing optimal TDEE indices...",
    "Compiling grocery checklist zones...",
    "Preparing dashboard widgets..."
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < 4) {
      document.getElementById("loader-title").innerText = titles[i];
      document.querySelectorAll(".step-bullets .bullet").forEach((b, idx) => {
        b.classList.toggle("active", idx === i);
      });
      i++;
    } else {
      clearInterval(interval);
      overlay.classList.add("hidden");

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      showToast("Personalized AI Health Plan generated!", "success");
      window.location.hash = '#dashboard';
    }
  }, 800);
}

function generatePlanBasedOnProfile() {
  const pref = AppState.profile.workoutPref;
  const baseWorkouts = WORKOUT_DB[pref] || WORKOUT_DB["Strength"];
  AppState.workouts = JSON.parse(JSON.stringify(baseWorkouts));

  let mult = 1.375;
  let genderVal = AppState.profile.gender;
  let weightVal = AppState.profile.weight;
  let heightVal = AppState.profile.height;
  let ageVal = AppState.profile.age;

  let bmr = genderVal === "Male" ?
    (88.362 + (13.397 * weightVal) + (4.799 * heightVal) - (5.677 * ageVal)) :
    (447.593 + (9.247 * weightVal) + (3.098 * heightVal) - (4.330 * ageVal));

  let tdee = Math.round(bmr * mult);
  let target = tdee;
  if (AppState.profile.goal === "Lose Weight") target -= 450;
  if (AppState.profile.goal === "Build Muscle") target += 300;

  AppState.profile.calorieTarget = target;
  AppState.profile.proteinTarget = Math.round(weightVal * 2.0);
  AppState.profile.carbTarget = Math.round((target * 0.45) / 4);
  AppState.profile.fatTarget = Math.round((target * 0.25) / 9);

  const dietKey = AppState.profile.diet;
  const baseMeals = NUTRITION_DB[dietKey] || NUTRITION_DB["Standard/Balanced"];
  AppState.meals = JSON.parse(JSON.stringify(baseMeals));

  compileGroceryListFromMeals();
  saveToLocalStorage();
}

// ==================== DASHBOARD MANAGEMENT ====================

function updateDashboardMeters() {
  const curCal = AppState.dailyLogs.caloriesLogged;
  const tarCal = AppState.profile.calorieTarget || 2000;
  const pct = Math.min((curCal / tarCal) * 100, 100);

  const path = document.getElementById("calorie-progress-path");
  if (path) path.style.strokeDasharray = `${pct}, 100`;

  document.getElementById("dash-calories-text").innerText = `${curCal} / ${tarCal} kcal`;

  const curP = AppState.dailyLogs.proteinLogged;
  const tarP = AppState.profile.proteinTarget || 140;
  const pctP = Math.min((curP / tarP) * 100, 100);
  document.getElementById("protein-progress-fill").style.width = `${pctP}%`;
  document.getElementById("dash-protein-text").innerText = `${curP}g / ${tarP}g`;
  document.getElementById("dash-protein-pct").innerText = `${Math.round(pctP)}%`;

  document.getElementById("dash-water-text").innerText = `${AppState.dailyLogs.waterConsumed.toFixed(1)}L / ${AppState.profile.water.toFixed(1)}L`;
  document.getElementById("dash-weight-val").innerText = `${AppState.profile.weight.toFixed(1)} kg`;

  const heightM = AppState.profile.height / 100;
  const bmi = (AppState.profile.weight / (heightM * heightM)).toFixed(1);
  document.getElementById("dash-bmi-val").innerText = bmi;
}

function renderDashboardPreviews() {
  const hour = new Date().getHours();
  let greet = "Good morning";
  if (hour >= 12 && hour < 17) greet = "Good afternoon";
  if (hour >= 17) greet = "Good evening";

  document.getElementById("welcome-text").innerText = `${greet}, ${AppState.user.name}`;

  const workoutBox = document.getElementById("dash-workout-preview-box");
  const todayWorkout = AppState.workouts[0];

  if (todayWorkout) {
    document.getElementById("dash-workout-muscle").innerText = todayWorkout.muscle;
    workoutBox.innerHTML = todayWorkout.exercises.slice(0, 3).map(ex => `
      <div class="workout-preview-item">
        <div class="item-meta">
          <h5>${ex.name}</h5>
          <p>${ex.sets} Sets x ${ex.reps} | Rest: ${ex.rest}</p>
        </div>
        <span class="badge accent">${ex.target}</span>
      </div>
    `).join("");
  }

  const mealBox = document.getElementById("dash-meals-preview-box");
  document.getElementById("dash-diet-style").innerText = AppState.profile.diet;
  mealBox.innerHTML = AppState.meals.slice(0, 3).map(m => `
    <div class="meal-preview-item">
      <div class="item-meta">
        <h5>${m.meal}: ${m.name}</h5>
        <p>${m.calories} kcal | Protein: ${m.protein}g</p>
      </div>
      <span class="badge primary">${m.protein}g P</span>
    </div>
  `).join("");
}

function incrementWater() {
  AppState.dailyLogs.waterConsumed += 0.25;
  showToast("Water glass logged (+250ml)", "success");
  if (AppState.dailyLogs.waterConsumed >= AppState.profile.water) {
    unlockBadge("water_3");
  }
  saveToLocalStorage();
  updateDashboardMeters();
}

function updateDigitalTwinVisualState() {
  document.querySelectorAll(".digital-twin-svg .twin-part").forEach(el => el.classList.remove("sore"));
  AppState.injuries.forEach(injury => {
    const mapping = {
      Head: "twin-head",
      Neck: "twin-neck",
      Chest: "twin-chest",
      Shoulders: ["twin-shoulder-l", "twin-shoulder-r"],
      Back: "twin-back",
      Elbows: ["twin-elbow-l", "twin-elbow-r"],
      Knees: ["twin-knee-l", "twin-knee-r"],
      Ankles: ["twin-ankle-l", "twin-ankle-r"]
    };
    const target = mapping[injury];
    if (Array.isArray(target)) {
      target.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("sore");
      });
    } else {
      const el = document.getElementById(target);
      if (el) el.classList.add("sore");
    }
  });

  const heightM = AppState.profile.height / 100;
  const bmi = (AppState.profile.weight / (heightM * heightM)).toFixed(1);
  const ind = document.getElementById("twin-bmi-val");
  if (ind) ind.innerText = bmi;
}

// ==================== WORKOUT PLANS ====================

function renderWorkoutPlanView() {
  const tabs = document.getElementById("workout-days-tabs");
  tabs.innerHTML = AppState.workouts.map((wk, idx) => `
    <button class="day-tab ${AppState.selectedDayTab === idx + 1 ? 'active' : ''}" onclick="switchWorkoutDay(${idx + 1})">
      Day ${idx + 1}
    </button>
  `).join("");

  const activeWorkout = AppState.workouts[AppState.selectedDayTab - 1] || AppState.workouts[0];
  if (!activeWorkout) return;

  document.getElementById("workout-day-title").innerText = activeWorkout.name;
  document.getElementById("workout-day-muscle").innerText = `Target focus: ${activeWorkout.muscle}`;
  document.getElementById("workout-total-time").innerText = `${activeWorkout.time} mins`;

  const container = document.getElementById("workout-exercises-container");
  container.innerHTML = activeWorkout.exercises.map((ex, idx) => `
    <div class="ex-row">
      <div class="ex-img-placeholder"><i data-lucide="dumbbell"></i></div>
      <div class="ex-name-box">
        <h4>${ex.name}</h4>
        <p>Target: ${ex.target}</p>
      </div>
      <div class="ex-sets-col text-center"><strong>${ex.sets}</strong><br><span class="small-label">Sets</span></div>
      <div class="ex-reps-col text-center"><strong>${ex.reps}</strong><br><span class="small-label">Reps</span></div>
      <div class="ex-rest-col text-center"><strong>${ex.rest}</strong><br><span class="small-label">Rest</span></div>
      <div class="ex-tips-col">${ex.tips}</div>
      <div class="ex-actions flex gap-2">
        <button class="btn btn-outline btn-sm glass" onclick="swapExercise(${idx})"><i data-lucide="refresh-cw"></i> Swap</button>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

function switchWorkoutDay(day) {
  AppState.selectedDayTab = day;
  renderWorkoutPlanView();
  showToast(`Switched to Workout Day ${day}`, "info");
}

function swapExercise(index) {
  const activeWorkout = AppState.workouts[AppState.selectedDayTab - 1];
  const ex = activeWorkout.exercises[index];
  const alts = EXERCISE_ALTERNATIVES[ex.name];

  if (alts && alts.length > 0) {
    const currentAlt = alts[0];
    ex.name = currentAlt.name;
    ex.tips = currentAlt.tips;
    showToast(`Swapped exercise with ${ex.name}`, "success");
    renderWorkoutPlanView();
  } else {
    showToast("No AI recommended swaps for this category", "warning");
  }
}

// ==================== WORKOUT SESSIONS (REDESIGNED CALIBRATION) ====================

function startActiveWorkoutSession() {
  const activeWorkout = AppState.workouts[AppState.selectedDayTab - 1] || AppState.workouts[0];
  if (!activeWorkout) return;

  AppState.activeSession.inProgress = true;
  AppState.activeSession.dayIndex = AppState.selectedDayTab - 1;
  AppState.activeSession.exerciseIndex = 0;
  AppState.activeSession.timerSeconds = 0;

  showView("session");

  // Launch the 3-second Calibration Countdown overlay
  const overlay = document.getElementById("session-prep-overlay");
  const countNum = document.getElementById("prep-countdown-num");
  const loaderText = document.getElementById("prep-loader-text");

  overlay.classList.remove("hidden");
  countNum.innerText = "3";
  loaderText.innerText = "Calibrating biomechanics load variables...";

  let timer = 3;
  const interval = setInterval(() => {
    timer--;
    countNum.innerText = timer;
    if (timer === 1) {
      loaderText.innerText = "Syncing heartrate timers...";
    }
    if (timer <= 0) {
      clearInterval(interval);
      overlay.classList.add("hidden");

      loadSessionExerciseData();
      resetSessionTimer();
      toggleSessionTimer(true);
      showToast("Workout session active!", "success");
    }
  }, 1000);
}

function loadSessionExerciseData() {
  const activeWorkout = AppState.workouts[AppState.activeSession.dayIndex];
  const idx = AppState.activeSession.exerciseIndex;
  const ex = activeWorkout.exercises[idx];

  document.getElementById("session-ex-index").innerText = `Exercise ${idx + 1} of ${activeWorkout.exercises.length}`;
  document.getElementById("session-target-muscle").innerText = `Target: ${ex.target}`;
  document.getElementById("session-ex-name").innerText = ex.name;
  document.getElementById("session-ex-tips").innerText = ex.tips;

  const tbody = document.getElementById("session-sets-rows");
  let rows = "";
  for (let s = 1; s <= ex.sets; s++) {
    rows += `
      <div class="table-body-row">
        <span>Set ${s}</span>
        <span>${ex.reps} reps</span>
        <input type="number" class="set-weight-input" value="20" style="background:var(--bg-app); border:1px solid var(--border-card); color:var(--text-primary); text-align:center;">
        <input type="number" class="set-reps-input" value="10" style="background:var(--bg-app); border:1px solid var(--border-card); color:var(--text-primary); text-align:center;">
        <button class="btn-set-log" onclick="logIndividualSet(this)">Log</button>
      </div>
    `;
  }
  tbody.innerHTML = rows;

  document.getElementById("session-prev-btn").style.visibility = idx === 0 ? "hidden" : "visible";

  const isLast = idx === activeWorkout.exercises.length - 1;
  document.getElementById("session-next-btn").classList.toggle("hidden", isLast);
  document.getElementById("session-finish-btn").classList.toggle("hidden", !isLast);
}

function logIndividualSet(btn) {
  btn.classList.add("logged");
  btn.innerText = "Logged ✓";
  showToast("Set logged successfully", "success");
  confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
}

function nextSessionExercise() {
  AppState.activeSession.exerciseIndex++;
  loadSessionExerciseData();
  triggerRestModal();
}

function prevSessionExercise() {
  if (AppState.activeSession.exerciseIndex > 0) {
    AppState.activeSession.exerciseIndex--;
    loadSessionExerciseData();
  }
}

function skipSessionExercise() {
  const activeWorkout = AppState.workouts[AppState.activeSession.dayIndex];
  const idx = AppState.activeSession.exerciseIndex;

  if (idx < activeWorkout.exercises.length - 1) {
    showToast("Exercise skipped.", "warning");
    nextSessionExercise();
  } else {
    finishSessionWorkout();
  }
}

function toggleSessionTimer(forcePlay = false) {
  const btn = document.getElementById("btn-timer-toggle");
  if (AppState.activeSession.timerInterval && !forcePlay) {
    clearInterval(AppState.activeSession.timerInterval);
    AppState.activeSession.timerInterval = null;
    btn.innerHTML = `<i data-lucide="play"></i> Resume`;
    showToast("Workout timer paused", "info");
  } else {
    clearInterval(AppState.activeSession.timerInterval);
    AppState.activeSession.timerInterval = setInterval(() => {
      AppState.activeSession.timerSeconds++;
      const m = Math.floor(AppState.activeSession.timerSeconds / 60).toString().padStart(2, "0");
      const s = (AppState.activeSession.timerSeconds % 60).toString().padStart(2, "0");
      document.getElementById("session-timer-val").innerText = `${m}:${s}`;
    }, 1000);
    btn.innerHTML = `<i data-lucide="pause"></i> Pause`;
  }
  lucide.createIcons();
}

function resetSessionTimer() {
  AppState.activeSession.timerSeconds = 0;
  document.getElementById("session-timer-val").innerText = "00:00";
}

let restTimerVal = 90;
let restInterval = null;

function triggerRestModal() {
  restTimerVal = 90;
  document.getElementById("rest-timer-val").innerText = restTimerVal;
  document.getElementById("rest-timer-modal").classList.remove("hidden");

  clearInterval(restInterval);
  restInterval = setInterval(() => {
    restTimerVal--;
    document.getElementById("rest-timer-val").innerText = restTimerVal;
    if (restTimerVal <= 0) closeRestModal();
  }, 1000);
}

function adjustRestTimer(amount) {
  restTimerVal = Math.max(restTimerVal + amount, 0);
  document.getElementById("rest-timer-val").innerText = restTimerVal;
}

function closeRestModal() {
  clearInterval(restInterval);
  document.getElementById("rest-timer-modal").classList.add("hidden");
}

function finishSessionWorkout() {
  clearInterval(AppState.activeSession.timerInterval);
  AppState.activeSession.inProgress = false;

  unlockBadge("workout_1");
  AppState.dailyLogs.streakCount += 1;
  AppState.dailyLogs.workoutDone = true;
  AppState.dailyLogs.weightHistory.push(AppState.profile.weight - 0.1);
  AppState.dailyLogs.calorieHistory.push(2200);

  // Send workout summary report directly to Coach Chatbot history
  const activeWorkout = AppState.workouts[AppState.activeSession.dayIndex];
  AppState.chatHistory.push({
    sender: "bot",
    text: `Excellent job completing your **${activeWorkout.name}** today! Daily energy was high. I adjusted next cycle's target load settings up by 5%.`
  });

  saveToLocalStorage();
  confetti({ particleCount: 200, spread: 80, origin: { y: 0.5 } });
  showToast("Workout finished successfully!", "success");
  showView("dashboard");
}

// ==================== NUTRITION & RECIPES ====================

function renderNutritionView() {
  let curCal = 0, curP = 0, curC = 0, curF = 0;
  const completed = (document.getElementById("check-meal-b").checked ? 1 : 0) +
    (document.getElementById("check-meal-l").checked ? 1 : 0) +
    (document.getElementById("check-meal-d").checked ? 1 : 0) +
    (document.getElementById("check-meal-s").checked ? 1 : 0);

  if (completed > 0) {
    AppState.meals.slice(0, completed).forEach(m => {
      curCal += m.calories;
      curP += m.protein;
      curC += m.carbs;
      curF += m.fat;
    });
  }

  AppState.dailyLogs.caloriesLogged = curCal;
  AppState.dailyLogs.proteinLogged = curP;
  AppState.dailyLogs.carbsLogged = curC;
  AppState.dailyLogs.fatsLogged = curF;

  const targetCal = AppState.profile.calorieTarget || 2000;
  const targetP = AppState.profile.proteinTarget || 140;
  const targetC = AppState.profile.carbTarget || 200;
  const targetF = AppState.profile.fatTarget || 70;

  document.getElementById("nut-cal-text").innerText = `${curCal} / ${targetCal} kcal`;
  document.getElementById("nut-cal-fill").style.width = `${Math.min((curCal / targetCal) * 100, 100)}%`;

  document.getElementById("nut-prot-text").innerText = `${curP} / ${targetP}g`;
  document.getElementById("nut-prot-fill").style.width = `${Math.min((curP / targetP) * 100, 100)}%`;

  document.getElementById("nut-carb-text").innerText = `${curC} / ${targetC}g`;
  document.getElementById("nut-carb-fill").style.width = `${Math.min((curC / targetC) * 100, 100)}%`;

  document.getElementById("nut-fat-text").innerText = `${curF} / ${targetF}g`;
  document.getElementById("nut-fat-fill").style.width = `${Math.min((curF / targetF) * 100, 100)}%`;

  const grid = document.getElementById("nutrition-meals-grid");
  grid.innerHTML = AppState.meals.map((m, idx) => `
    <div class="meal-card glass" id="meal-card-${idx}">
      <div class="meal-details-row">
        <span class="badge primary">${m.meal}</span>
        <span class="small-label">${m.calories} kcal</span>
      </div>
      <h4>${m.name}</h4>
      <div class="meal-macros-mini">
        <span>P: ${m.protein}g</span>
        <span>C: ${m.carbs}g</span>
        <span>F: ${m.fat}g</span>
      </div>
      <div class="recipe-drawer mt-2">
        <h5>Ingredients:</h5>
        <ul>${m.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
        <h5>Instructions:</h5>
        <p class="small-label">${m.recipe}</p>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-outline btn-sm w-full glass" onclick="toggleRecipeDrawer(${idx})"><i data-lucide="book-open"></i> Recipe</button>
        <button class="btn btn-outline btn-sm glass" onclick="swapMealCard(${idx})"><i data-lucide="refresh-cw"></i> Swap</button>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

function toggleRecipeDrawer(idx) {
  document.getElementById(`meal-card-${idx}`).classList.toggle("active-recipe");
}

function swapMealCard(index) {
  const meal = AppState.meals[index];
  const alternates = RECIPE_ALTERNATIVES[meal.meal];

  if (alternates) {
    AppState.meals[index] = {
      meal: meal.meal,
      name: alternates.name,
      calories: alternates.calories,
      protein: alternates.protein,
      carbs: alternates.carbs,
      fat: alternates.fat,
      ingredients: alternates.ingredients,
      recipe: alternates.recipe
    };
    showToast(`Meal swapped with ${alternates.name}`, "success");
    compileGroceryListFromMeals();
    renderNutritionView();
  }
}

function simulateMealScan(event) {
  const file = event.target.files[0];
  if (!file) return;

  const results = document.getElementById("meal-scanner-results");
  results.classList.remove("hidden");
  results.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div> Analyzing image...`;

  setTimeout(() => {
    results.innerHTML = `
      <h4 class="text-success"><i data-lucide="check-circle" class="inline-icon"></i> Food Scanned Successfully</h4>
      <p class="small-label mt-1">Est. Recipe: <strong>Avocado Salad Bowl</strong></p>
      <div class="meal-macros-mini mt-2">
        <span>Calories: 380 kcal</span>
        <span>Protein: 12g</span>
        <span>Carbs: 22g</span>
        <span>Fat: 28g</span>
      </div>
    `;
    showToast("AI Meal Scanner completed scan successfully", "success");
    lucide.createIcons();
  }, 1500);
}

// ==================== GROCERY LISTS ====================

function compileGroceryListFromMeals() {
  const items = [];
  AppState.meals.forEach(m => {
    m.ingredients.forEach(ing => items.push(ing));
  });

  AppState.groceryList = items.map((name, idx) => {
    let cat = "Pantry";
    const lower = name.toLowerCase();
    if (lower.includes("chicken") || lower.includes("salmon") || lower.includes("bacon") || lower.includes("cheese") || lower.includes("egg")) {
      cat = "Protein & Dairy";
    } else if (lower.includes("avocado") || lower.includes("spinach") || lower.includes("asparagus")) {
      cat = "Fresh Produce";
    } else if (lower.includes("toast") || lower.includes("rice") || lower.includes("quinoa")) {
      cat = "Grains & Carbs";
    }
    return { id: idx, name, category: cat, checked: false, cost: Math.floor(Math.random() * 15) + 5 };
  });
}

function renderGroceryListView() {
  const limitVal = parseInt(document.getElementById("grocery-budget-slider").value);
  const sectionsBox = document.getElementById("grocery-sections-box");

  let currentSum = 0;
  const filteredList = AppState.groceryList.filter(item => {
    if (currentSum + item.cost <= limitVal) {
      currentSum += item.cost;
      return true;
    }
    return false;
  });

  const grid = {};
  filteredList.forEach(item => {
    if (!grid[item.category]) grid[item.category] = [];
    grid[item.category].push(item);
  });

  let html = "";
  for (const cat in grid) {
    html += `
      <div class="grocery-section">
        <h4>${cat}</h4>
        <div class="grocery-items-list">
          ${grid[cat].map(item => `
            <label class="custom-checkbox-wrapper ${item.checked ? 'checked' : ''}">
              <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleGroceryCheck(${item.id})">
              <span class="custom-checkbox-box"><i data-lucide="check"></i></span>
              <span class="custom-checkbox-label">${item.name} ($${item.cost})</span>
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }
  sectionsBox.innerHTML = html;
  lucide.createIcons();
}

function toggleGroceryCheck(id) {
  const item = AppState.groceryList.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    showToast(item.checked ? `Checked ${item.name}` : `Unchecked ${item.name}`, "info");
    renderGroceryListView();
    saveToLocalStorage();
  }
}

function updateGroceryBudgetLimit(val) {
  document.getElementById("bubble-grocery-budget").innerText = `$${val} Limit`;
  renderGroceryListView();
}

function addCustomGroceryItem() {
  const input = document.getElementById("grocery-new-item");
  const val = input.value.trim();
  if (val) {
    AppState.groceryList.push({
      id: AppState.groceryList.length,
      name: val,
      category: "Pantry",
      checked: false,
      cost: 10
    });
    input.value = "";
    showToast("Grocery item added", "success");
    renderGroceryListView();
    saveToLocalStorage();
  }
}

function clearCheckedGroceries() {
  AppState.groceryList = AppState.groceryList.filter(i => !i.checked);
  showToast("Cleared checked items", "success");
  renderGroceryListView();
  saveToLocalStorage();
}

// ==================== SMARTWATCH HUB ====================

function renderWearablesHubView() {
  const panel = document.getElementById("wearables-telemetry-panel");
  let anyConnected = false;

  const brandsList = ["Apple", "Garmin", "Fitbit", "Samsung", "GooglePixel", "Amazfit"];

  brandsList.forEach(brand => {
    const isConnected = AppState.wearables[brand];
    const card = document.getElementById(`wear-card-${brand}`);
    if (!card) return;

    const status = document.getElementById(`wear-status-${brand}`);
    const btn = card.querySelector("button");

    if (isConnected) {
      anyConnected = true;
      card.classList.add("connected-active");
      status.innerText = "Connected";
      btn.innerText = "Disconnect";
      btn.className = "btn btn-danger btn-sm w-full mt-4";
    } else {
      card.classList.remove("connected-active");
      status.innerText = "Disconnected";
      btn.innerText = "Connect Device";
      btn.className = "btn btn-outline btn-sm w-full mt-4";
    }
  });

  panel.classList.toggle("hidden", !anyConnected);
}

function toggleWearableConnection(brand) {
  const isConnected = AppState.wearables[brand];

  if (!isConnected) {
    const status = document.getElementById(`wear-status-${brand}`);
    if (status) status.innerText = "Connecting...";
    showToast(`Calibrating sync with ${brand} device`, "info");

    setTimeout(() => {
      AppState.wearables[brand] = true;
      showToast(`Successfully connected with ${brand}`, "success");
      renderWearablesHubView();
      syncWearablesTelemetry();
      saveToLocalStorage();
    }, 1200);
  } else {
    AppState.wearables[brand] = false;
    showToast(`Disconnected ${brand}`, "warning");
    renderWearablesHubView();
    saveToLocalStorage();
  }
}

function syncWearablesTelemetry() {
  const btn = document.getElementById("btn-sync-telemetry");
  if (!btn) return;

  btn.disabled = true;
  btn.innerHTML = `<div class="btn-loading-spinner" style="margin: 0;"></div>`;

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="refresh-cw"></i> Sync Now`;
    lucide.createIcons();

    document.getElementById("tele-heart").innerHTML = `${Math.floor(Math.random() * 20) + 65} <span class="calc-unit">bpm</span>`;
    document.getElementById("tele-hrv").innerHTML = `${Math.floor(Math.random() * 15) + 50} <span class="calc-unit">ms</span>`;
    document.getElementById("tele-spo2").innerText = `${Math.floor(Math.random() * 3) + 97}%`;
    document.getElementById("tele-calories").innerHTML = `${Math.floor(Math.random() * 100) + 350} <span class="calc-unit">kcal</span>`;
    document.getElementById("tele-sleep").innerHTML = `${(Math.random() * 2 + 6.5).toFixed(1)} <span class="calc-unit">hrs</span>`;
    document.getElementById("tele-battery").innerText = `${Math.floor(Math.random() * 30) + 70}%`;

    showToast("Smartwatch biometric datasets synchronized", "success");
    confetti({ particleCount: 50, angle: 90, spread: 60, origin: { y: 0.7 } });
  }, 1000);
}

// ==================== AI COACH CHAT & FLOATING POPUP ASSISTANT ====================

function renderChatMessages() {
  const container = document.getElementById("chat-messages-container");
  container.innerHTML = AppState.chatHistory.map(msg => `
    <div class="chat-bubble ${msg.sender}">
      <p>${msg.text}</p>
      ${msg.htmlCard || ""}
    </div>
  `).join("");
  container.scrollTop = container.scrollHeight;
}

function renderChatSuggestions() {
  const box = document.getElementById("chat-suggestions-box");
  const suggestions = [
    "Swap my bench press workout split",
    "Est. my 90 days weight projection",
    "Identify knee soreness rehabilitation guides"
  ];
  box.innerHTML = suggestions.map(s => `
    <span class="suggestion-pill" onclick="submitSuggestedChat('${s}')">${s}</span>
  `).join("");
}

function submitSuggestedChat(text) {
  document.getElementById("chat-user-input").value = text;
  sendChatMessage();
}

function handleChatKeyDown(e) {
  if (e.key === "Enter") sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById("chat-user-input");
  const val = input.value.trim();
  if (!val) return;

  AppState.chatHistory.push({ sender: "user", text: val });
  input.value = "";
  renderChatMessages();

  AppState.chatHistory.push({ sender: "bot", text: `<div class="typing-indicator"><span></span><span></span><span></span></div>` });
  renderChatMessages();

  setTimeout(() => {
    AppState.chatHistory.pop();
    let reply = "Processing metrics inputs. Try asking about 'weight forecast', 'macros' or 'knee soreness'.";
    let card = null;

    const lower = val.toLowerCase();
    if (lower.includes("swap") || lower.includes("bench")) {
      reply = "Recomputing workout structures. I have swapped Barbell Bench Press with Dumbbell Chest Press splits.";
      swapExercise(0);
    } else if (lower.includes("forecast") || lower.includes("projection") || lower.includes("90 days")) {
      const target = (AppState.profile.weight - 4.5).toFixed(1);
      reply = `Under consistent caloric logs, your predicted weight after 90 days is calculated at **${target} kg**.`;
    } else if (lower.includes("knee") || lower.includes("soreness")) {
      reply = "Sore knee joints modifiers registered. Workout parameters adapted. Prescribing wall sits guide:";
      togglePainArea("Knees", false);
      card = `
        <div class="rehab-movement-card mt-2">
          <h5>Wall Sits</h5>
          <p>3 sets x 30 seconds. Plant back firmly against wall.</p>
        </div>
      `;
    }

    AppState.chatHistory.push({ sender: "bot", text: reply, htmlCard: card });
    renderChatMessages();
    saveToLocalStorage();

    if (AppState.voiceOutputActive) speakBotReply(reply);
  }, 1000);
}

function toggleVoiceInput() {
  const btn = document.getElementById("btn-voice-input");
  if (AppState.isRecording) {
    AppState.isRecording = false;
    btn.classList.remove("recording");
  } else {
    AppState.isRecording = true;
    btn.classList.add("recording");
    showToast("Listening for speech metrics...", "info");
    setTimeout(() => {
      if (AppState.isRecording) {
        document.getElementById("chat-user-input").value = "Est. my 90 days weight projection";
        btn.classList.remove("recording");
        AppState.isRecording = false;
        sendChatMessage();
      }
    }, 2000);
  }
}

function toggleVoiceOutput() {
  const btn = document.getElementById("btn-voice-coach-toggle");
  AppState.voiceOutputActive = !AppState.voiceOutputActive;
  btn.classList.toggle("active", AppState.voiceOutputActive);
  btn.innerText = AppState.voiceOutputActive ? "Voice On" : "Voice Off";
  showToast(AppState.voiceOutputActive ? "Voice responses active" : "Voice responses muted", "info");
}

function speakBotReply(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
}

// Floating AI assistant Popup modal operations
function toggleQuickCoachModal(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById("quick-coach-modal");
  modal.classList.toggle("hidden");
}

function handleQuickCoachKeyDown(e) {
  if (e.key === "Enter") sendQuickCoachMessage();
}

function sendQuickCoachMessage() {
  const input = document.getElementById("quick-coach-input");
  const history = document.getElementById("quick-coach-chat-history");
  const val = input.value.trim();
  if (!val) return;

  history.innerHTML += `<div class="chat-bubble user"><p>${val}</p></div>`;
  input.value = "";
  history.scrollTop = history.scrollHeight;

  history.innerHTML += `<div class="chat-bubble bot" id="quick-coach-typing"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  history.scrollTop = history.scrollHeight;

  setTimeout(() => {
    const loader = document.getElementById("quick-coach-typing");
    if (loader) loader.remove();

    let reply = "I am tracking your logs. Daily metrics look optimal.";
    if (val.toLowerCase().includes("water") || val.toLowerCase().includes("drink")) {
      reply = `You have completed ${AppState.dailyLogs.waterConsumed}L of your ${AppState.profile.water}L daily target.`;
    } else if (val.toLowerCase().includes("macros") || val.toLowerCase().includes("calorie")) {
      reply = `Today's macro limit splits: ${AppState.profile.calorieTarget} kcal target.`;
    }

    history.innerHTML += `<div class="chat-bubble bot"><p>${reply}</p></div>`;
    history.scrollTop = history.scrollHeight;
  }, 1000);
}

// ==================== BIOMETRIC CHECK-IN SUBMISSIONS ====================

function handleCheckinSubmit(e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("check-weight").value);
  if (weight) {
    AppState.profile.weight = weight;
    AppState.dailyLogs.weightHistory.push(weight);
  }

  unlockBadge("checkin_1");
  AppState.dailyLogs.checkInDone = true;
  showToast("Biometric indicators recorded", "success");
  saveToLocalStorage();
  showView("dashboard");
}

// ==================== INJURY DIAGRAM MODIFIERS ====================

function togglePainArea(area, alertUser = true) {
  const idx = AppState.injuries.indexOf(area);
  if (idx > -1) {
    AppState.injuries.splice(idx, 1);
    showToast(`Pain point for ${area} resolved`, "success");
  } else {
    AppState.injuries.push(area);
    showToast(`Registered soreness at ${area}. Calibrating exercises...`, "warning");
  }

  const mapping = {
    Head: "part-head",
    Neck: "part-neck",
    Chest: "part-chest",
    Shoulders: ["part-shoulder-l", "part-shoulder-r"],
    Back: "part-back",
    Elbows: ["part-elbow-l", "part-elbow-r"],
    Knees: ["part-knee-l", "part-knee-r"],
    Ankles: ["part-ankle-l", "part-ankle-r"]
  };

  const idOrIds = mapping[area];
  if (idOrIds) {
    const isSore = AppState.injuries.includes(area);
    if (Array.isArray(idOrIds)) {
      idOrIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("sore", isSore);
      });
    } else {
      const el = document.getElementById(idOrIds);
      if (el) el.classList.toggle("sore", isSore);
    }
  }

  adaptWorkoutsForInjuries();
  renderInjuryRehabView();
  updatePageHeroDetails("injury");
  saveToLocalStorage();
}

function adaptWorkoutsForInjuries() {
  const style = AppState.profile.workoutPref;
  const original = JSON.parse(JSON.stringify(WORKOUT_DB[style] || WORKOUT_DB["Strength"]));
  AppState.workouts = original;

  AppState.injuries.forEach(injury => {
    const rules = REHAB_DB[injury];
    if (rules && rules.swaps) {
      AppState.workouts.forEach(wk => {
        wk.exercises.forEach(ex => {
          if (rules.restrict.includes(ex.name)) {
            const alt = rules.swaps[ex.name];
            if (alt) {
              ex.name = `[Mod] ${alt}`;
              ex.tips = `Joint sparing rehabilitation movement active.`;
            }
          }
        });
      });
    }
  });
}

function renderInjuryRehabView() {
  const active = document.getElementById("injury-active-list");
  const rehab = document.getElementById("injury-rehab-box");

  if (AppState.injuries.length === 0) {
    active.innerHTML = `<p class="small-label">No active sore regions reported.</p>`;
    rehab.innerHTML = "";
    return;
  }

  active.innerHTML = AppState.injuries.map(injury => `
    <div class="pain-badge-row">
      <h5>Sore ${injury}</h5>
      <span onclick="togglePainArea('${injury}')" style="cursor:pointer; text-decoration:underline;">Resolve x</span>
    </div>
  `).join("");

  let html = "<h4>Prescribed Rehab Program</h4>";
  AppState.injuries.forEach(injury => {
    const rules = REHAB_DB[injury];
    if (rules) {
      rules.recovery.forEach(rec => {
        html += `
          <div class="rehab-movement-card">
            <h5>${rec.name}</h5>
            <p><strong>Reps:</strong> ${rec.reps}</p>
            <p><strong>Tips:</strong> ${rec.tips}</p>
          </div>
        `;
      });
    }
  });
  rehab.innerHTML = html;
}

// ==================== FUTURE SIMULATORS & CHART TIMELINES ====================

let radarChartInstance = null;
let weightChartInstance = null;
let calorieChartInstance = null;
let macrosChartInstance = null;

function switchSimulatorProjections(days, btn) {
  document.querySelectorAll("#simulator-day-tabs .day-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const w = AppState.profile.weight;
  const factor = days === 30 ? 1 : days === 60 ? 2 : 3;

  const simW = (w - 1.5 * factor).toFixed(1);
  const simF = (-1.5 * factor).toFixed(1);
  const simM = (+0.2 * factor).toFixed(1);

  const heightM = AppState.profile.height / 100;
  const simBMI = (simW / (heightM * heightM)).toFixed(1);

  document.getElementById("sim-weight").innerHTML = `${simW} <span class="calc-unit">kg</span>`;
  document.getElementById("sim-fat").innerHTML = `${simF} <span class="calc-unit">kg</span>`;
  document.getElementById("sim-muscle").innerHTML = `${simM} <span class="calc-unit">kg</span>`;
  document.getElementById("sim-bmi").innerText = simBMI;

  showToast(`Simulated weight curves for ${days} days`, "info");
}

function switchChartTimeline(period, btn) {
  document.querySelectorAll(".chart-time-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  showToast(`Switched analytics view to ${period} metrics`, "info");

  // Re-map dataset values based on time duration filters
  if (weightChartInstance && calorieChartInstance) {
    if (period === "week") {
      weightChartInstance.data.labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"];
      weightChartInstance.data.datasets[0].data = AppState.dailyLogs.weightHistory.slice(-7);
      calorieChartInstance.data.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      calorieChartInstance.data.datasets[0].data = AppState.dailyLogs.calorieHistory.slice(-7);
    } else if (period === "month") {
      weightChartInstance.data.labels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];
      weightChartInstance.data.datasets[0].data = [74.2, 73.5, 72.8, 72.0];
      calorieChartInstance.data.labels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];
      calorieChartInstance.data.datasets[0].data = [2100, 2050, 2200, 2000];
    } else {
      weightChartInstance.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      weightChartInstance.data.datasets[0].data = [78.0, 76.5, 75.2, 74.0, 73.1, 72.5, 72.0];
      calorieChartInstance.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      calorieChartInstance.data.datasets[0].data = [2300, 2200, 2150, 2250, 2000, 2100, 2000];
    }
    weightChartInstance.update();
    calorieChartInstance.update();
  }
}

function renderProgressAnalyticsCharts() {
  const canvas = document.getElementById("chart-wellness-radar");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (radarChartInstance) radarChartInstance.destroy();

  radarChartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Strength", "Recovery", "Nutrition", "Hydration", "Mobility", "Sleep", "Consistency"],
      datasets: [{
        label: "AI Wellness Score",
        data: [85, 78, 92, 80, 85, 75, 90],
        backgroundColor: "rgba(0, 200, 150, 0.2)",
        borderColor: "rgba(0, 200, 150, 1)",
        pointBackgroundColor: "rgba(0, 200, 150, 1)"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const wCtx = document.getElementById("chart-weight").getContext("2d");
  if (weightChartInstance) weightChartInstance.destroy();
  weightChartInstance = new Chart(wCtx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"],
      datasets: [{
        label: "Weight (kg)",
        data: AppState.dailyLogs.weightHistory.slice(-7),
        borderColor: "#4F8CFF",
        backgroundColor: "rgba(79, 140, 255, 0.1)",
        fill: true
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const cCtx = document.getElementById("chart-calories").getContext("2d");
  if (calorieChartInstance) calorieChartInstance.destroy();
  calorieChartInstance = new Chart(cCtx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Calories (kcal)",
        data: AppState.dailyLogs.calorieHistory.slice(-7),
        backgroundColor: "#FF9D42"
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const mCtx = document.getElementById("chart-macros-split").getContext("2d");
  if (macrosChartInstance) macrosChartInstance.destroy();
  macrosChartInstance = new Chart(mCtx, {
    type: "doughnut",
    data: {
      labels: ["Protein", "Carbs", "Fats"],
      datasets: [{
        data: [AppState.profile.proteinTarget, AppState.profile.carbTarget, AppState.profile.fatTarget],
        backgroundColor: ["#00C896", "#4F8CFF", "#FACC15"]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderTimelineFeed() {
  const container = document.getElementById("timeline-feed-container");
  container.innerHTML = TIMELINE_DATA.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <span class="timeline-time">${item.time}</span>
      <div class="timeline-card">
        <strong>${item.type}</strong>
        <p>${item.text}</p>
      </div>
    </div>
  `).join("");
}

// ==================== REPORT AND ACHS ====================

function triggerWeeklyReportMock() {
  document.getElementById("rep-user-name").innerText = AppState.user.name;
  document.getElementById("rep-date").innerText = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById("rep-streak").innerText = `${AppState.dailyLogs.streakCount} Days`;
  document.getElementById("weekly-report-modal").classList.remove("hidden");
  showToast("AI Performance Card successfully compiled", "success");
}

function closeWeeklyReportModal() {
  document.getElementById("weekly-report-modal").classList.add("hidden");
}

function renderAchievementsGallery() {
  const container = document.getElementById("badges-container");
  container.innerHTML = ACHIEVEMENTS_LIST.map(b => {
    const active = AppState.achievements.includes(b.id);
    return `
      <div class="badge-card glass ${active ? 'unlocked' : ''}">
        <div class="badge-trophy-icon"><i data-lucide="trophy"></i></div>
        <h4>${b.name}</h4>
        <p class="small-label">${b.desc}</p>
        <span class="badge ${active ? 'primary' : ''}">${active ? 'Unlocked' : 'Locked'}</span>
      </div>
    `;
  }).join("");
  lucide.createIcons();
}

function unlockBadge(id) {
  if (!AppState.achievements.includes(id)) {
    AppState.achievements.push(id);
    const b = ACHIEVEMENTS_LIST.find(x => x.id === id);
    if (b) {
      showToast(`Badge Unlocked: ${b.name}!`, "success");
      // Add timeline log entry
      TIMELINE_DATA.unshift({
        time: "Just Now",
        type: "Milestone Reached",
        text: `Unlocked the Consistency Badge: '${b.name}'.`
      });
    }
    saveToLocalStorage();
  }
}

function shareBadges() {
  showToast("Trophy Cabinet shared link copied!", "success");
}

// ==================== PROFILE SETTINGS MODULE ====================

function loadProfileIntoSettings() {
  document.getElementById("prof-name").value = AppState.user.name;
  document.getElementById("prof-age").value = AppState.profile.age;
  document.getElementById("prof-height").value = AppState.profile.height;
  document.getElementById("prof-weight").value = AppState.profile.weight;

  selectCustomOption('select-prof-goal', AppState.profile.goal, AppState.profile.goal);
  selectCustomOption('select-prof-diet', AppState.profile.diet, AppState.profile.diet);
  document.getElementById("settings-dark-mode-chk").checked = AppState.theme === "dark";
  document.getElementById("profile-avatar-large").innerText = AppState.user.name.substring(0, 2).toUpperCase();
}

function handleProfileEdit(e) {
  e.preventDefault();
  AppState.user.name = document.getElementById("prof-name").value;
  AppState.profile.age = parseInt(document.getElementById("prof-age").value);
  AppState.profile.height = parseInt(document.getElementById("prof-height").value);
  AppState.profile.weight = parseFloat(document.getElementById("prof-weight").value);

  AppState.profile.goal = document.getElementById("prof-goal").value;
  AppState.profile.diet = document.getElementById("prof-diet").value;

  generatePlanBasedOnProfile();
  saveToLocalStorage();
  showToast("Profile biometrics successfully compiled", "success");
  showView("dashboard");
}

function cancelProfileChanges() {
  loadProfileIntoSettings();
  showToast("Profile modifications reverted", "info");
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    showToast("Profile photo uploaded successfully", "success");
  }
}

function exportProfileData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `fitgenie-profile-${AppState.user.name.toLowerCase()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Exported configuration files", "success");
}

function toggleTheme() {
  AppState.theme = AppState.theme === "light" ? "dark" : "light";
  applyTheme();
  saveToLocalStorage();
  showToast(`Switched theme to ${AppState.theme} mode`, "info");
}

function applyTheme() {
  const isDark = AppState.theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("light-mode", !isDark);

  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}"></i>`;
  });

  const chk = document.getElementById("settings-dark-mode-chk");
  if (chk) chk.checked = isDark;
  lucide.createIcons();
}

function clearSystemData() {
  if (confirm("Are you sure you want to clear the FitGenie database?")) {
    localStorage.removeItem("fitgenie_state");
    AppState.authenticated = false;
    AppState.profile = null;
    AppState.dailyLogs.waterConsumed = 0;
    AppState.dailyLogs.checkInDone = false;
    AppState.dailyLogs.workoutDone = false;
    AppState.dailyLogs.caloriesLogged = 0;
    AppState.dailyLogs.streakCount = 3;
    AppState.injuries = [];
    AppState.achievements = ["checkin_1", "water_3"];
    AppState.chatHistory = [{ sender: "bot", text: "Hello! I am your personalized FitGenie Coach." }];

    saveToLocalStorage();
    showToast("Database successfully cleared", "success");
    window.location.hash = '#home';
  }
}

// Landing View controllers
function toggleMobileLandingNav() {
  document.getElementById("mobile-landing-menu").classList.toggle("active");
}

function toggleMobileSidebar() {
  document.querySelector(".app-sidebar").classList.toggle("active");
}

let activeTestimonialIndex = 0;
function slideTestimonial(dir) {
  const track = document.getElementById("testimonial-track");
  const slides = document.querySelectorAll(".testimonial-slide");

  activeTestimonialIndex += dir;
  if (activeTestimonialIndex < 0) activeTestimonialIndex = slides.length - 1;
  if (activeTestimonialIndex >= slides.length) activeTestimonialIndex = 0;

  track.style.transform = `translateX(${activeTestimonialIndex * -100}%)`;
}

function togglePricingPeriod() {
  const isChecked = document.getElementById("pricing-checkbox").checked;
  const period = isChecked ? "yr" : "mo";

  document.getElementById("price-toggle-monthly").classList.toggle("active", !isChecked);
  document.getElementById("price-toggle-annual").classList.toggle("active", isChecked);

  document.getElementById("premium-price").innerText = isChecked ? "$134.99" : "$14.99";
  document.getElementById("plus-price").innerText = isChecked ? "$224.99" : "$24.99";
  document.querySelectorAll(".price-period").forEach(p => p.innerText = `/${period}`);
}

function toggleFaq(btn) {
  const item = btn.parentNode;
  const active = item.classList.contains("active");
  document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
  if (!active) item.classList.add("active");
}

// ==================== LOCALSTORAGE SYNC ====================

function saveToLocalStorage() {
  localStorage.setItem("fitgenie_state", JSON.stringify(AppState));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("fitgenie_state");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      Object.assign(AppState, data);
    } catch (e) {
      console.error(e);
    }
  }
}
