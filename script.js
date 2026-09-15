/* ===========================================================
   Vehicle Service Management — customer data & app logic
   =========================================================== */

const customers = {
  vani: {
    id: "vani",
    name: "Vani Yepparika",
    phone: "+91 7981032719",
    email: "vanivasanthalaxmi1705@gmail.com",
    photo: "assets/image2.jpg",
    vehicle: {
      name: "Hyundai i20",
      reg: "AP39AB1234",
      fuel: "Petrol",
      year: "2020",
      image: "assets/image5.jpg"
    },
    requestCounter: 10046,
    requests: [
      { id: "SR-10045", type: "General Service",  status: "progress", date: "Apr 26, 2025", desc: "Engine making a light knocking noise on start." },
      { id: "SR-10044", type: "Periodic Service",  status: "pending",  date: "Apr 29, 2025", desc: "Routine periodic maintenance check due." }
    ],
    history: [
      { id: "SR-10042", type: "Tire Replacement", date: "Apr 15, 2025", cost: "₹4,500" },
      { id: "SR-10041", type: "Oil Change",        date: "Mar 10, 2025", cost: "₹2,000" },
      { id: "SR-10040", type: "General Service",   date: "Jan 28, 2025", cost: "₹5,800" }
    ]
  },
  mahidar: {
    id: "mahidar",
    name: "Mahidar Angam",
    phone: "+91 86889 62599",
    email: "mahi200534@gmail.com",
    photo: "assets/image3.jpg",
    vehicle: {
      name: "Maruti Suzuki Swift",
      reg: "TS09CD5678",
      fuel: "Petrol",
      year: "2022",
      image: "assets/image6.jpg"
    },
    requestCounter: 20032,
    requests: [
      { id: "SR-20031", type: "Brake Check", status: "pending", date: "May 2, 2025", desc: "Brakes feel spongy, needs inspection." }
    ],
    history: [
      { id: "SR-20030", type: "General Service", date: "Apr 10, 2025", cost: "₹3,600" },
      { id: "SR-20029", type: "Oil Change",       date: "Feb 18, 2025", cost: "₹1,800" }
    ]
  },
  sampath: {
    id: "sampath",
    name: "Sampath Reddy",
    phone: "+91 7036090324",
    email: "sampathmourya05@gmail.com",
    photo: "assets/image1.jpg",
    vehicle: {
      name: "Toyota Innova Crysta",
      reg: "TS07AB4321",
      fuel: "Diesel",
      year: "2021",
      image: "assets/image4.jpg"
    },
    requestCounter: 30013,
    requests: [
      { id: "SR-30012", type: "AC Service", status: "progress", date: "Apr 30, 2025", desc: "AC cooling has become weak." }
    ],
    history: [
      { id: "SR-30011", type: "Brake Check",      date: "Apr 5, 2025",  cost: "₹3,200" },
      { id: "SR-30010", type: "Periodic Service", date: "Jan 15, 2025", cost: "₹6,500" }
    ]
  }
};

let currentId = "vani";

const badgeInfo = {
  pending:   { label: "Pending",     cls: "pending"  },
  progress:  { label: "In Progress", cls: "progress" },
  completed: { label: "Completed",   cls: "completed" }
};

function current() {
  return customers[currentId];
}

/* ===========================================================
   Navigation between pages
   =========================================================== */
function goToPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));

  document.getElementById("page-" + pageId).classList.add("active");
  const navBtn = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navBtn) navBtn.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => goToPage(btn.dataset.page));
});
document.querySelectorAll("[data-goto]").forEach(btn => {
  btn.addEventListener("click", () => goToPage(btn.dataset.goto));
});

/* ===========================================================
   Rendering — everything driven by the current customer
   =========================================================== */
function renderIdentity() {
  const c = current();

  document.getElementById("topAvatar").src = c.photo;
  document.getElementById("topAvatar").alt = c.name;
  document.getElementById("topName").textContent = c.name;

  document.getElementById("welcomeTitle").textContent = "Welcome, " + c.name;
  document.getElementById("heroAvatar").src = c.photo;
  document.getElementById("heroAvatar").alt = c.name;
  document.getElementById("heroName").textContent = c.name;
  document.getElementById("heroPhone").textContent = c.phone;
  document.getElementById("heroEmail").textContent = c.email;
  document.getElementById("heroCarImg").src = c.vehicle.image;
  document.getElementById("heroCarImg").alt = c.vehicle.name;

  document.getElementById("drawerAvatar").src = c.photo;
  document.getElementById("drawerAvatar").alt = c.name;
  document.getElementById("drawerName").textContent = c.name;
  document.getElementById("drawerPhone").textContent = c.phone;
  document.getElementById("drawerEmail").textContent = c.email;

  document.title = c.name + " — Vehicle Service Management";
}

function renderStats() {
  const c = current();
  document.getElementById("statVehicles").textContent = 1;
  document.getElementById("statPending").textContent = c.requests.filter(r => r.status === "pending").length;
  document.getElementById("statProgress").textContent = c.requests.filter(r => r.status === "progress").length;
  document.getElementById("statCompleted").textContent = c.history.length;
}

function renderRecent() {
  const c = current();
  const list = document.getElementById("recentList");
  const combined = [...c.requests.map(r => ({ ...r })), ...c.history.map(h => ({ ...h, status: "completed" }))];
  list.innerHTML = "";
  if (!combined.length) {
    list.innerHTML = `<p class="empty-msg">No service requests yet.</p>`;
    return;
  }
  combined.slice(0, 3).forEach(r => {
    const b = badgeInfo[r.status];
    const row = document.createElement("div");
    row.className = "recent-row";
    row.innerHTML = `
      <div class="recent-main">
        <span class="recent-id">${r.id}</span>
        <span class="recent-sub">${c.vehicle.name} — ${r.type}</span>
      </div>
      <span class="badge ${b.cls}">${b.label}</span>
      <span class="recent-date">${r.date}</span>
    `;
    list.appendChild(row);
  });
}

function renderRequestsTable() {
  const c = current();
  const body = document.getElementById("requestsTableBody");
  const emptyMsg = document.getElementById("requestsEmpty");
  body.innerHTML = "";

  if (!c.requests.length) {
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;
    c.requests.forEach(r => {
      const b = badgeInfo[r.status];
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${c.vehicle.name}</td>
        <td>${r.type}</td>
        <td><span class="badge ${b.cls}">${b.label}</span></td>
        <td>${r.date}</td>
        <td><button class="view-btn" data-id="${r.id}">View</button></td>
      `;
      body.appendChild(tr);
    });
  }

  body.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => showRequestDetails(btn.dataset.id));
  });
}

function renderHistoryTable() {
  const c = current();
  const body = document.getElementById("historyTableBody");
  const emptyMsg = document.getElementById("historyEmpty");
  body.innerHTML = "";

  if (!c.history.length) {
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;
    c.history.forEach(h => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${h.date}</td>
        <td>${h.id}</td>
        <td>${c.vehicle.name}</td>
        <td>${h.type}</td>
        <td>${h.cost}</td>
        <td><span class="badge completed">Completed</span></td>
        <td><button class="view-btn" data-id="${h.id}">View</button></td>
      `;
      body.appendChild(tr);
    });
  }

  body.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => showHistoryDetails(btn.dataset.id));
  });
}

function renderVehicles() {
  const c = current();
  const v = c.vehicle;
  const grid = document.getElementById("vehiclesGrid");
  grid.innerHTML = `
    <div class="vehicle-card">
      <div class="vehicle-img"><img src="${v.image}" alt="${v.name}"></div>
      <div class="vehicle-top">
        <span class="vehicle-name">${v.name}</span>
        <span class="tag-primary">Primary</span>
      </div>
      <div class="vehicle-detail">Registration No: ${v.reg}</div>
      <div class="vehicle-detail">Fuel Type: ${v.fuel}</div>
      <div class="vehicle-detail">Model Year: ${v.year}</div>
      <div class="vehicle-detail">Owner: ${c.name}</div>
      <div class="vehicle-actions">
        <button class="btn primary" id="viewVehicleDetail">View Details</button>
        <button class="btn ghost" id="editVehicle">Edit</button>
      </div>
    </div>
  `;

  document.getElementById("viewVehicleDetail").addEventListener("click", () => {
    showModal(v.name, [
      ["Owner", c.name],
      ["Registration No", v.reg],
      ["Fuel Type", v.fuel],
      ["Model Year", v.year],
      ["Status", "Primary Vehicle"]
    ]);
  });
  document.getElementById("editVehicle").addEventListener("click", () => showToast("Edit vehicle details here."));
}

function renderVehicleSelect() {
  const c = current();
  const sel = document.getElementById("fVehicle");
  sel.innerHTML = `<option value="${c.vehicle.name}">${c.vehicle.name} (${c.vehicle.reg})</option>`;
}

function renderCustomerList() {
  const list = document.getElementById("customerList");
  list.innerHTML = "";
  Object.values(customers).forEach(c => {
    const row = document.createElement("button");
    row.className = "team-row" + (c.id === currentId ? " active" : "");
    row.innerHTML = `
      <img src="${c.photo}" alt="${c.name}" class="team-avatar">
      <div>
        <div class="team-name">${c.name} ${c.id === currentId ? '<span class="current-tag">Current</span>' : ""}</div>
        <div class="team-line">${c.phone}</div>
        <div class="team-line">${c.email}</div>
      </div>
    `;
    row.addEventListener("click", () => {
      if (c.id !== currentId) {
        switchCustomer(c.id);
      }
      closeDrawer();
    });
    list.appendChild(row);
  });
}

function renderAll() {
  renderIdentity();
  renderStats();
  renderRecent();
  renderRequestsTable();
  renderHistoryTable();
  renderVehicles();
  renderVehicleSelect();
  renderCustomerList();
}

function switchCustomer(id) {
  currentId = id;
  renderAll();
  showToast(`Now viewing ${current().name}'s dashboard`);
  goToPage("dashboard");
}

/* ===========================================================
   Modal (View details)
   =========================================================== */
const modal = document.getElementById("detailsModal");
const modalOverlay = document.getElementById("modalOverlay");

function showModal(title, rows) {
  document.getElementById("modalTitle").textContent = title;
  const body = document.getElementById("modalBody");
  body.innerHTML = rows.map(r => `<div class="mrow"><span>${r[0]}</span><span>${r[1]}</span></div>`).join("");
  modal.classList.add("open");
  modalOverlay.classList.add("show");
}
function closeModal() {
  modal.classList.remove("open");
  modalOverlay.classList.remove("show");
}
document.getElementById("closeModal").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

function showRequestDetails(id) {
  const c = current();
  const r = c.requests.find(x => x.id === id);
  if (!r) return;
  const b = badgeInfo[r.status];
  showModal(r.id, [
    ["Customer", c.name],
    ["Vehicle", c.vehicle.name],
    ["Service Type", r.type],
    ["Status", b.label],
    ["Date", r.date],
    ["Description", r.desc || "—"]
  ]);
}

function showHistoryDetails(id) {
  const c = current();
  const h = c.history.find(x => x.id === id);
  if (!h) return;
  showModal(h.id, [
    ["Customer", c.name],
    ["Vehicle", c.vehicle.name],
    ["Service Type", h.type],
    ["Date", h.date],
    ["Cost", h.cost],
    ["Status", "Completed"]
  ]);
}

/* ===========================================================
   Profile Drawer
   =========================================================== */
const drawer = document.getElementById("profileDrawer");
const overlay = document.getElementById("overlay");

function openDrawer() {
  renderCustomerList();
  drawer.classList.add("open");
  overlay.classList.add("show");
}
function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("show");
}
document.getElementById("profileBtn").addEventListener("click", openDrawer);
document.getElementById("switchCustomerBtn").addEventListener("click", openDrawer);
document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

document.getElementById("bellBtn").addEventListener("click", () => {
  showToast("You have 1 new notification.");
});

/* ===========================================================
   Add Customer
   =========================================================== */
const customerFormModal = document.getElementById("customerFormModal");
const customerFormOverlay = document.getElementById("customerFormOverlay");
const customerForm = document.getElementById("customerForm");

let cfPhotoDataUrl = null;
let cfVehiclePhotoDataUrl = null;

function openCustomerForm() {
  closeDrawer();
  customerFormModal.classList.add("open");
  customerFormOverlay.classList.add("show");
}
function closeCustomerForm() {
  customerFormModal.classList.remove("open");
  customerFormOverlay.classList.remove("show");
  customerForm.reset();
  cfPhotoDataUrl = null;
  cfVehiclePhotoDataUrl = null;
  document.getElementById("cfPhotoName").textContent = "No file chosen";
  document.getElementById("cfVehiclePhotoName").textContent = "No file chosen";
}

document.getElementById("addCustomerBtn").addEventListener("click", openCustomerForm);
document.getElementById("closeCustomerForm").addEventListener("click", closeCustomerForm);
document.getElementById("cancelCustomerForm").addEventListener("click", closeCustomerForm);
customerFormOverlay.addEventListener("click", closeCustomerForm);

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.getElementById("cfPhoto").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  document.getElementById("cfPhotoName").textContent = file ? file.name : "No file chosen";
  cfPhotoDataUrl = file ? await fileToDataURL(file) : null;
});

document.getElementById("cfVehiclePhoto").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  document.getElementById("cfVehiclePhotoName").textContent = file ? file.name : "No file chosen";
  cfVehiclePhotoDataUrl = file ? await fileToDataURL(file) : null;
});

// Generates a placeholder avatar (initials) when no photo is uploaded
function initialsAvatar(name, bg, fg) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${bg}"/><text x="50" y="63" font-size="34" text-anchor="middle" fill="${fg}" font-family="sans-serif" font-weight="600">${initials}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Generates a placeholder vehicle image when no photo is uploaded
function vehiclePlaceholder(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 170"><rect width="300" height="170" fill="#dceafd"/><path d="M40 120 L55 75 Q62 60 80 60 L120 60 Q132 42 158 42 L205 42 Q228 42 240 60 L262 68 Q288 72 292 98 L292 120 Z" fill="#3f7dd8"/><rect x="40" y="112" width="252" height="16" fill="#294f8a"/><circle cx="95" cy="128" r="18" fill="#12233f"/><circle cx="235" cy="128" r="18" fill="#12233f"/><text x="150" y="155" font-size="13" text-anchor="middle" fill="#5b6b85" font-family="sans-serif">${label}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

customerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("cfName").value.trim();
  const phone = document.getElementById("cfPhone").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const vName = document.getElementById("cfVehicleName").value.trim();
  const vReg = document.getElementById("cfVehicleReg").value.trim();
  const vFuel = document.getElementById("cfFuel").value;
  const vYear = document.getElementById("cfYear").value.trim();

  // Build a unique id from the name
  let baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "customer";
  let id = baseId;
  let n = 2;
  while (customers[id]) { id = baseId + "-" + n; n++; }

  const photo = cfPhotoDataUrl || initialsAvatar(name, "#dbe6f7", "#335f9c");
  const vehicleImage = cfVehiclePhotoDataUrl || vehiclePlaceholder(vName);

  customers[id] = {
    id,
    name,
    phone,
    email,
    photo,
    vehicle: { name: vName, reg: vReg, fuel: vFuel, year: vYear, image: vehicleImage },
    requestCounter: 40001,
    requests: [],
    history: []
  };

  closeCustomerForm();
  switchCustomer(id);
  showToast(`${name} added as a new customer!`);
});

/* ===========================================================
   Toast
   =========================================================== */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ===========================================================
   New Service Request form
   =========================================================== */
document.getElementById("fPhoto").addEventListener("change", (e) => {
  const name = e.target.files.length ? e.target.files[0].name : "No file chosen";
  document.getElementById("fPhotoName").textContent = name;
});

document.getElementById("cancelRequest").addEventListener("click", () => {
  document.getElementById("requestForm").reset();
  document.getElementById("fPhotoName").textContent = "No file chosen";
  goToPage("dashboard");
});

document.getElementById("requestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const c = current();

  const type = document.getElementById("fType").value;
  const dateRaw = document.getElementById("fDate").value;
  const desc = document.getElementById("fDesc").value;

  const dateObj = dateRaw ? new Date(dateRaw + "T00:00:00") : new Date();
  const dateFormatted = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const newRequest = {
    id: "SR-" + c.requestCounter++,
    type: type,
    status: "pending",
    date: dateFormatted,
    desc: desc
  };

  c.requests.unshift(newRequest);

  renderStats();
  renderRecent();
  renderRequestsTable();

  e.target.reset();
  document.getElementById("fPhotoName").textContent = "No file chosen";

  showToast(`Request ${newRequest.id} submitted successfully!`);
  goToPage("my-requests");
});

document.getElementById("addVehicleBtn").addEventListener("click", () => {
  showToast("Add-vehicle form goes here.");
});

/* ===========================================================
   Init
   =========================================================== */
renderAll();
goToPage("dashboard");
