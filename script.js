// ====== Habit Logic ======
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Render habits
function renderHabits() {
  if (!habitList) return; // skip if on garden/index page

  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.name;
    li.className = habit.completed ? "completed" : "";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = habit.completed ? "✔ Done" : "Done";
    doneBtn.style.backgroundColor = habit.completed ? "#a6e6a0" : "#2b7a0b";
    doneBtn.onclick = () => {
      habit.completed = !habit.completed;
      localStorage.setItem("habits", JSON.stringify(habits));
      updateProgress();
      renderHabits();
    };

    li.appendChild(doneBtn);
    habitList.appendChild(li);
  });
}

// Add habit
if (addHabitBtn) {
  addHabitBtn.addEventListener("click", () => {
    const name = habitInput.value.trim();
    if (name === "") return alert("Enter a habit!");
    habits.push({ name, completed: false });
    habitInput.value = "";
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
    updateProgress();
  });
}

// ====== Garden Logic ======
function updateProgress() {
  // Load habits from localStorage in case of garden page
  if (!habitList) {
    habits = JSON.parse(localStorage.getItem("habits")) || [];
  }

  const plant = document.getElementById("plant");
  const progressText = document.getElementById("progressText");

  let completedCount = habits.filter(h => h.completed).length;
  let total = habits.length;
  let progress = total === 0 ? 0 : (completedCount / total) * 100;

  // Growth level (0-5)
  let level = Math.min(5, Math.ceil(progress / 20));

  if (plant) {
    plant.className = "plant"; // reset
    if (level > 0) plant.classList.add(`grow-${level}`);

    if (total > 0 && habits.every(h => h.completed)) {
      plant.classList.add("grow-5"); // flower fully blooms
      progressText.textContent = `🌸 Bloomed! Growth: 100%`;
    } else {
      progressText.textContent = `Growth: ${Math.round(progress)}%`;
    }
  }
}

// Clear habits when going back from Garden or Home
const homeBtns = document.querySelectorAll('.nav-buttons a[href="index.html"], .nav-buttons a[href="habits.html"]');
homeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.removeItem("habits");
    habits = [];
  });
});

// Initial rendering
renderHabits();
updateProgress();
