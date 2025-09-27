// Holiday Planner JS with animations

const STORAGE_KEY = "holidayPlanner.trips";

function getTrips() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTrips(trips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function addTrip(trip) {
  const trips = getTrips();
  trips.push(trip);
  saveTrips(trips);
  renderTrips();
}

function renderTrips() {
  const trips = getTrips();
  const container = document.getElementById("tripsList");
  container.innerHTML = "";
  trips.forEach((t,i) => {
    const card = document.createElement("div");
    card.className = "card p-3 mb-3 saved-card";
    card.innerHTML = `
      <h5>${t.destination}</h5>
      <p>Planned Budget: ${t.plannedBudget}, Spent: ${t.amountSpent}, Balance: ${t.balance}</p>
      <p>Members: ${t.members.join(", ")}</p>
      <p class="text-muted">${t.note || ""}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderTrips);

document.getElementById("tripForm").addEventListener("submit", e => {
  e.preventDefault();
  const trip = {
    destination: document.getElementById("destination").value,
    plannedBudget: parseFloat(document.getElementById("plannedBudget").value),
    amountSpent: parseFloat(document.getElementById("amountSpent").value) || 0,
    balance: parseFloat(document.getElementById("plannedBudget").value) - (parseFloat(document.getElementById("amountSpent").value)||0),
    members: document.getElementById("members").value.split(",").map(m=>m.trim()),
    note: document.getElementById("note").value
  };
  addTrip(trip);
  e.target.reset();
});
