/* ===== cool features ON: animated meters, ATS toggle, templates, light sample ===== */

let currentResumeData = null;
const LS_KEY = "resume_versions_cool";

/* -------- Data Model -------- */
function getEmptyResumeData() {
  return {
    basics: { name:"", role:"", email:"", phone:"", location:"", links:[], avatar:"", summary:"" },
    skills: [],       // [{name, level}] 0..100
    languages: [],    // [{name, level}] 0..100
    experience: [],   // [{role, company, period, details}]
    projects: [],     // [{name, link, details, image}]
    education: [],    // [{degree, school, year}]
    certifications:[],// [{name, org, year}]
    achievements:[]   // ["..."]
  };
}

/* -------- Utils -------- */
const esc = (s="") => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* -------- Form Rendering -------- */
function renderForm(){
  const b = currentResumeData.basics;

  const html = `
    <!-- Photo & basics -->
    <div class="row g-2 align-items-center mb-2">
      <div class="col-auto">
        <img id="avatarThumb" class="avatar-thumb" src="${b.avatar || ""}" alt="">
      </div>
      <div class="col">
        <label class="form-label">Profile Photo</label>
        <div class="d-flex gap-2">
          <button id="pickAvatar" class="btn btn-outline-secondary btn-sm"><i class="bi bi-image"></i> Choose</button>
          <button id="clearAvatar" class="btn btn-outline-danger btn-sm"><i class="bi bi-x"></i> Remove</button>
          <input id="avatarInput" type="file" accept="image/*" class="d-none" />
        </div>
        <div class="small-muted mt-1">Optional; hidden in ATS mode.</div>
      </div>
    </div>

    <div class="mb-2">
      <label class="form-label">Name</label>
      <input id="f_name" type="text" class="form-control" placeholder="Your full name" value="">
    </div>
    <div class="mb-2">
      <label class="form-label">Role / Title</label>
      <input id="f_role" type="text" class="form-control" placeholder="e.g., Frontend Developer" value="">
    </div>

    <div class="row g-2">
      <div class="col-12 col-md-6">
        <label class="form-label">Email</label>
        <input id="f_email" type="email" class="form-control" placeholder="you@example.com" value="">
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Phone</label>
        <input id="f_phone" type="text" class="form-control" placeholder="+91 9xxxxxxxxx" value="">
      </div>
    </div>

    <div class="mb-2 mt-2">
      <label class="form-label">Location</label>
      <input id="f_location" type="text" class="form-control" placeholder="City, Country" value="">
    </div>

    <div class="mb-2">
      <label class="form-label">Links (label|url, comma separated)</label>
      <textarea id="f_links" class="form-control" rows="2" placeholder="Portfolio|https://..., GitHub|https://..., LinkedIn|https://..."></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Summary <span id="sumCount" class="small-muted"></span></label>
      <textarea id="f_summary" class="form-control" rows="3" placeholder="2–3 line professional summary"></textarea>
    </div>

    <!-- Skills with levels -->
    <div class="mb-3">
      <label class="form-label">Skills (one per line: Name | Level%)</label>
      <textarea id="f_skills" class="form-control" rows="4" placeholder="React | 85%\nJava | 70\nSQL | 65%"></textarea>
      <div class="small-muted mt-1">Use 0–100. % is optional. Bars animate.</div>
    </div>

    <!-- Languages (optional meters) -->
    <div class="mb-3">
      <label class="form-label">Languages (one per line: Language | Proficiency%)</label>
      <textarea id="f_langs" class="form-control" rows="2" placeholder="English | 100%\nHindi | 90%"></textarea>
    </div>

    <!-- Experience -->
    <div class="mb-3">
      <label class="form-label">Experience (one per line: Role @ Company | Period | Details)</label>
      <textarea id="f_exp" class="form-control" rows="4" placeholder="Frontend Intern @ Acme | Jun 2024–Aug 2024 | Built UI components; improved performance..."></textarea>
    </div>

    <!-- Projects (with optional image URL) -->
    <div class="mb-3">
      <label class="form-label">Projects (one per line: Name | Link | Details | ImageURL?)</label>
      <textarea id="f_projects" class="form-control" rows="3" placeholder="Recipe App | https://repo | React + Node app with filters... | https://.../thumb.png"></textarea>
    </div>

    <!-- Education -->
    <div class="mb-3">
      <label class="form-label">Education (one per line: Degree | School | Year)</label>
      <textarea id="f_ed" class="form-control" rows="3" placeholder="B.Tech CSE (AI/ML) | Christ University | 2027"></textarea>
    </div>

    <!-- Certifications -->
    <div class="mb-3">
      <label class="form-label">Certifications (one per line: Name | Org | Year)</label>
      <textarea id="f_certs" class="form-control" rows="2" placeholder="AWS Cloud Practitioner | AWS | 2024"></textarea>
    </div>

    <!-- Achievements -->
    <div>
      <label class="form-label">Achievements (one per line)</label>
      <textarea id="f_ach" class="form-control" rows="2" placeholder="Winner, SDG-7 Hackathon 2025"></textarea>
    </div>

    <button id="applyBtn" class="btn btn-outline-primary mt-3 w-100">
      <i class="bi bi-magic"></i> Apply to Preview
    </button>
  `;
  $("#formSections").html(html);
  bindFormEvents();
}

/* -------- Bind form controls -------- */
function bindFormEvents(){
  $("#pickAvatar").on("click", () => $("#avatarInput").trigger("click"));
  $("#clearAvatar").on("click", () => {
    currentResumeData.basics.avatar = "";
    $("#avatarThumb").attr("src", "");
    renderResumePreview();
  });
  $("#avatarInput").on("change", function(){
    const f = this.files?.[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = e => {
      currentResumeData.basics.avatar = String(e.target.result || "");
      $("#avatarThumb").attr("src", currentResumeData.basics.avatar);
      renderResumePreview();
    };
    r.readAsDataURL(f);
    this.value = "";
  });

  $("#f_summary").on("input", function(){
    const len = (this.value||"").trim().length;
    $("#sumCount").text(len ? `· ${len} chars` : "");
  });

  $("#applyBtn").on("click", () => {
    readFormIntoModel();
    renderResumePreview(true); // animate meters on apply
  });
}

/* -------- Parse helpers -------- */
function parseSkillLines(raw){
  if(!raw) return [];
  return raw.split("\n").map(l=>{
    const [name, levelRaw] = l.split("|").map(x => (x||"").trim());
    if(!name) return null;
    let level = parseInt(String(levelRaw||"").replace("%","").trim(),10);
    if (isNaN(level)) level = 60; // default if not provided
    level = Math.max(0, Math.min(100, level));
    return {name, level};
  }).filter(Boolean);
}
function parseLinkPairs(raw){
  return raw
    ? raw.split(",").map(s => s.trim()).filter(Boolean).map(pair => {
        const [label,url] = pair.split("|").map(x => (x||"").trim());
        return (label||url) ? {label,url} : null;
      }).filter(Boolean)
    : [];
}

/* -------- Model -------- */
function readFormIntoModel(){
  const b = currentResumeData.basics;
  b.name = $("#f_name").val().trim();
  b.role = $("#f_role").val().trim();
  b.email = $("#f_email").val().trim();
  b.phone = $("#f_phone").val().trim();
  b.location = $("#f_location").val().trim();
  b.summary = $("#f_summary").val().trim();
  b.links = parseLinkPairs($("#f_links").val().trim());

  currentResumeData.skills = parseSkillLines($("#f_skills").val().trim());
  currentResumeData.languages = parseSkillLines($("#f_langs").val().trim());

  const expRaw = $("#f_exp").val().trim();
  currentResumeData.experience = expRaw ? expRaw.split("\n").map(l => {
    const [roleCompany, period, details] = l.split("|").map(x => (x||"").trim());
    const [role, company] = (roleCompany||"").split("@").map(x => x.trim());
    return (role||company||period||details) ? { role:(role||"").trim(), company:(company||"").trim(), period:period||"", details:details||"" } : null;
  }).filter(Boolean) : [];

  const projRaw = $("#f_projects").val().trim();
  currentResumeData.projects = projRaw ? projRaw.split("\n").map(l => {
    const [name, link, details, img] = l.split("|").map(x => (x||"").trim());
    return (name||link||details||img) ? { name, link, details, image: img||"" } : null;
  }).filter(Boolean) : [];

  const edRaw = $("#f_ed").val().trim();
  currentResumeData.education = edRaw ? edRaw.split("\n").map(l => {
    const [degree, school, year] = l.split("|").map(x => (x||"").trim());
    return (degree||school||year) ? { degree, school, year } : null;
  }).filter(Boolean) : [];

  const certRaw = $("#f_certs").val().trim();
  currentResumeData.certifications = certRaw ? certRaw.split("\n").map(l => {
    const [name, org, year] = l.split("|").map(x => (x||"").trim());
    return (name||org||year) ? { name, org, year } : null;
  }).filter(Boolean) : [];

  const achRaw = $("#f_ach").val().trim();
  currentResumeData.achievements = achRaw ? achRaw.split("\n").map(s => s.trim()).filter(Boolean) : [];
}

/* -------- Animate helpers -------- */
function animateMeters() {
  // Set all fills to 0% first
  $(".skill-row .meter-fill, .lang-row .meter-fill").each(function(){
    this.style.width = "0%";
  });

  // Force reflow so the browser registers width:0 before we set the target
  // eslint-disable-next-line no-unused-expressions
  void document.body.offsetHeight;

  // Next animation frame: set target widths (guarantees transition)
  requestAnimationFrame(() => {
    $(".skill-row .meter-fill").each(function(i){
      const pct = currentResumeData.skills?.[i]?.level || 0;
      this.style.width = pct + "%";
    });
    $(".lang-row .meter-fill").each(function(i){
      const pct = currentResumeData.languages?.[i]?.level || 0;
      this.style.width = pct + "%";
    });
  });
}

/* -------- Preview Rendering -------- */
function renderResumePreview(animate=false){
  const mount = $("#resumePreview").empty();

  // Template
  const template = $("#templateSelect").val() || "classic";
  mount.removeClass("template-compact template-executive");
  if (template === "compact") mount.addClass("template-compact");
  if (template === "executive") mount.addClass("template-executive");

  // Section visibility
  const selected = Array.from($("#sectionToggles option")).filter(o => o.selected).map(o => o.value);
  const show = key => selected.includes(key);

  const hasAny =
    (currentResumeData.basics.name || currentResumeData.basics.role || currentResumeData.basics.summary ||
     (currentResumeData.skills||[]).length || (currentResumeData.experience||[]).length ||
     (currentResumeData.projects||[]).length || (currentResumeData.education||[]).length ||
     (currentResumeData.certifications||[]).length || (currentResumeData.achievements||[]).length ||
     (currentResumeData.languages||[]).length);

  if(!hasAny){
    mount.append(`<div class="preview-empty-hint">
      (very light sample) Add your details on the left, then click “Apply to Preview”.<br/>
      Tip: try “Skills → React | 85%” to see animated meters.
    </div>`);
  }

  const root = $('<div class="styled-resume"></div>');

  // Header
  const h = $('<div class="resume-header d-flex gap-3 align-items-start"></div>');
  const b = currentResumeData.basics;
  if (b.avatar) {
    h.append(`<img class="resume-avatar" src="${esc(b.avatar)}" alt="Profile">`);
  }
  const hx = $('<div class="flex-grow-1"></div>');
  if (b.name) hx.append(`<div class="resume-name">${esc(b.name)}</div>`);
  if (b.role) hx.append(`<div class="resume-role">${esc(b.role)}</div>`);

  const cl = [];
  if (b.email) cl.push(esc(b.email));
  if (b.phone) cl.push(esc(b.phone));
  if (b.location) cl.push(esc(b.location));
  if (cl.length) hx.append(`<div class="contact-line">${cl.join(" • ")}</div>`);

  if (b.links?.length) {
    const linkLine = b.links.map(l => {
      const label = esc(l.label || l.url || "");
      const url = esc(l.url || "");
      return `<a href="${url}" target="_blank" rel="noopener">${label}</a><span class="link-url d-none"> — ${url}</span>`;
    }).join(" | ");
    hx.append(`<div class="contact-line">${linkLine}</div>`);
  }
  h.append(hx);
  root.append(h);

  // Summary
  if (show("summary") && b.summary) {
    root.append(`<div class="section-title">Summary</div>`);
    root.append(`<div class="section-item">${esc(b.summary)}</div>`);
  }

  // Skills (meters)
  if (show("skills") && currentResumeData.skills?.length) {
    root.append(`<div class="section-title">Skills</div>`);
    const block = $('<div class="section-item"></div>');
    currentResumeData.skills.forEach(s => {
      const row = $(`
        <div class="skill-row">
          <div class="skill-label">${esc(s.name)}</div>
          <div class="meter"><div class="meter-fill"></div></div>
          <div class="skill-val">${s.level||0}%</div>
        </div>
      `);
      block.append(row);
    });
    root.append(block);
  }

  // Experience
  if (show("experience") && currentResumeData.experience?.length) {
    root.append(`<div class="section-title">Experience</div>`);
    currentResumeData.experience.forEach(e => {
      const bullets = bulletize(e.details||"");
      root.append(`
        <div class="section-item">
          <div class="title">${esc(e.role||"")} ${e.company ? ' @ ' + esc(e.company) : ''}</div>
          <div class="meta">${esc(e.period||"")}</div>
          ${bullets}
        </div>
      `);
    });
  }

  // Projects (optional image thumbnail)
  if (show("projects") && currentResumeData.projects?.length) {
    root.append(`<div class="section-title">Projects</div>`);
    currentResumeData.projects.forEach(p => {
      const bullets = bulletize(p.details||"");
      const link = p.link ? `<a href="${esc(p.link)}" target="_blank">Link</a> <span class="link-url d-none">— ${esc(p.link)}</span>` : "";
      const img = p.image ? `<div class="mt-1"><img src="${esc(p.image)}" alt="" style="max-width:120px; max-height:80px; object-fit:cover; border:1px solid var(--border); border-radius:8px;"></div>` : "";
      root.append(`
        <div class="section-item">
          <div class="title">${esc(p.name||"")} ${link ? " — " + link : ""}</div>
          ${bullets}
          ${img}
        </div>
      `);
    });
  }

  // Education
  if (show("education") && currentResumeData.education?.length) {
    root.append(`<div class="section-title">Education</div>`);
    currentResumeData.education.forEach(ed => {
      root.append(`
        <div class="section-item">
          <div class="title">${esc(ed.degree||"")}</div>
          <div class="meta">${esc(ed.school||"")}${ed.year ? " • " + esc(ed.year) : ""}</div>
        </div>
      `);
    });
  }

  // Languages (meters)
  if (show("languages") && currentResumeData.languages?.length) {
    root.append(`<div class="section-title">Languages</div>`);
    const block = $('<div class="section-item"></div>');
    currentResumeData.languages.forEach(s => {
      const row = $(`
        <div class="lang-row">
          <div class="lang-label">${esc(s.name)}</div>
          <div class="meter"><div class="meter-fill"></div></div>
          <div class="lang-val">${s.level||0}%</div>
        </div>
      `);
      block.append(row);
    });
    root.append(block);
  }

  // Certifications
  if (show("certifications") && currentResumeData.certifications?.length) {
    root.append(`<div class="section-title">Certifications</div>`);
    currentResumeData.certifications.forEach(ct => {
      root.append(`
        <div class="section-item">
          <div class="title">${esc(ct.name||"")}</div>
          <div class="meta">${esc(ct.org||"")}${ct.year ? " • " + esc(ct.year) : ""}</div>
        </div>
      `);
    });
  }

  // Achievements
  if (show("achievements") && currentResumeData.achievements?.length) {
    root.append(`<div class="section-title">Achievements</div>`);
    root.append(currentResumeData.achievements.map(a => `<div class="section-item">• ${esc(a)}</div>`).join(""));
  }

  mount.append(root);

  // Animate (robust)
  if (animate) animateMeters(); else {
    // non-animated immediate widths
    $(".skill-row .meter-fill").each(function(i){
      const pct = currentResumeData.skills?.[i]?.level || 0;
      this.style.width = pct + "%";
    });
    $(".lang-row .meter-fill").each(function(i){
      const pct = currentResumeData.languages?.[i]?.level || 0;
      this.style.width = pct + "%";
    });
  }

  updateRecruiterScore();
}

/* bullets from sentences/newlines/dashes */
function bulletize(text){
  const parts = text.split(/[\n•\-–]|(?<=\.)\s+/).map(s => s.trim()).filter(Boolean);
  if (!parts.length) return "";
  return `<ul class="mt-1 mb-2">${parts.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`;
}

/* -------- Theme / Modes -------- */
function bindChrome(){
  $("#templateSelect").on("change", () => renderResumePreview(true)); // animate when template changes too
  $("#sectionToggles").on("change", () => renderResumePreview(true));

  $("#themeToggle").on("click", () => {
    const html = document.documentElement;
    const toDark = html.getAttribute("data-theme") !== "dark";
    html.setAttribute("data-theme", toDark ? "dark" : "light");
    $("#themeToggle i").attr("class", toDark ? "bi bi-brightness-high-fill" : "bi bi-moon-fill");
  });

  $("#accentColor").on("input", function(){
    document.documentElement.style.setProperty("--accent", this.value);
    renderResumePreview(); // color update only
  });

  $("#atsMode").on("change", function(){
    const enable = this.checked;
    document.documentElement.classList.toggle("ats-mode", enable);
    if (enable) $(".link-url").removeClass("d-none");
    else $(".link-url").addClass("d-none");
  });
}

/* -------- Save / Load / Import / Export -------- */
function saveVersion(){
  readFormIntoModel();
  const versions = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  const stamp = new Date().toISOString().replace("T"," ").split(".")[0];
  versions.unshift({ ts: stamp, data: currentResumeData });
  localStorage.setItem(LS_KEY, JSON.stringify(versions.slice(0,30)));
  loadVersionsList();
}
function loadVersionsList(){
  const versions = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  const list = $("#versionsList").empty();
  if(!versions.length){
    list.append('<div class="text-muted">No saved versions.</div>');
    return;
  }
  versions.forEach((v, idx) => {
    const row = $(`
      <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <span>${esc(v.ts)}</span>
        <span class="d-flex gap-2">
          <span class="badge text-bg-primary">Load</span>
          <span class="badge text-bg-danger">Delete</span>
        </span>
      </button>
    `);
    row.on("click", (e) => {
      const del = $(e.target).hasClass("text-bg-danger");
      const versions2 = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      if (del){
        versions2.splice(idx,1);
        localStorage.setItem(LS_KEY, JSON.stringify(versions2));
        loadVersionsList();
        return;
      }
      currentResumeData = v.data;
      renderForm();
      renderResumePreview(true);
    });
    list.append(row);
  });
}
function exportJSON(){
  readFormIntoModel();
  const blob = new Blob([JSON.stringify(currentResumeData, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "resume.json"; a.click();
  URL.revokeObjectURL(url);
}
function importJSONFile(){ $("#importFile").trigger("click"); }
function bindImport(){
  $("#importFile").on("change", function(){
    const f = this.files?.[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = e => {
      try{
        const obj = JSON.parse(String(e.target.result||"{}"));
        currentResumeData = Object.assign(getEmptyResumeData(), obj);
        renderForm();
        renderResumePreview(true);
      }catch(err){ alert("Invalid JSON"); }
    };
    r.readAsText(f);
    this.value = "";
  });
}

/* -------- Score + Analyzer + Bulletize -------- */
function updateRecruiterScore(){
  const b = currentResumeData.basics || {};
  let score = 0;
  if (b.name) score += 10;
  if (b.role) score += 10;
  if (b.summary) score += 10;
  if ((b.links||[]).length) score += 10;
  if ((currentResumeData.skills||[]).length >= 5) score += 15;
  if ((currentResumeData.experience||[]).length) score += 20;
  if ((currentResumeData.projects||[]).length) score += 10;
  if ((currentResumeData.education||[]).length) score += 10;
  if (b.avatar) score += 5;
  score = Math.max(0, Math.min(100, score));
  $("#recruiterScore").text(`${score}/100`);
}
function analyzeKeywords(){
  readFormIntoModel();
  const jd = ($("#jobDescription").val()||"").toLowerCase();
  if(!jd.trim()){
    $("#keywordResults").html('<div class="text-warning">Paste a job description first.</div>');
    return;
  }
  const skillsText = (currentResumeData.skills||[]).map(s=>s.name).join(" ");
  const bag = [
    currentResumeData.basics.role,
    currentResumeData.basics.summary,
    skillsText,
    (currentResumeData.experience||[]).map(e => [e.role,e.company,e.details].join(" ")).join(" "),
    (currentResumeData.projects||[]).map(p => [p.name,p.details].join(" ")).join(" "),
  ].join(" ").toLowerCase();

  const tokens = Array.from(new Set(
    jd.split(/[^a-z0-9+#.]/i).map(t => t.trim()).filter(t => t.length >= 3)
  ));
  const hits = tokens.filter(t => bag.includes(t));
  const pct = Math.round((hits.length / Math.max(1,tokens.length)) * 100);

  $("#keywordResults").html(`
    <div><strong>Match:</strong> ${pct}%</div>
    <div class="mt-1"><strong>Found:</strong> ${esc(hits.slice(0,80).join(", ") || "—")}</div>
  `);

  const cur = Number(($("#recruiterScore").text()||"0/100").split("/")[0]);
  $("#recruiterScore").text(`${Math.max(cur, Math.min(100, cur + Math.floor(pct/10)))}/100`);
}
function autoBulletize(){
  const exp = $("#f_exp").val();
  const proj = $("#f_projects").val();
  const tidy = (txt) => txt.split("\n").map(line => {
    const parts = line.split("|");
    if (parts.length < 3) return line;
    const details = parts[2].trim().split(/[\n•\-–]|(?<=\.)\s+/).map(s => s.trim()).filter(Boolean);
    if (!details.length) return line;
    parts[2] = " " + details.map(x => "• " + x).join("  ");
    return parts.join("|");
  }).join("\n");
  $("#f_exp").val(tidy(exp));
  $("#f_projects").val(tidy(proj));
}

/* -------- Bind actions -------- */
function bindActions(){
  $("#saveBtn").on("click", saveVersion);
  $("#loadBtn").on("click", loadVersionsList);
  $("#clearAllSaves").on("click", () => { localStorage.removeItem(LS_KEY); loadVersionsList(); });
  $("#exportBtn, #exportBtn2").on("click", exportJSON);
  $("#printBtn").on("click", () => window.print());
  $("#importBtn").on("click", importJSONFile);
  bindImport();

  $("#analyzeKeywords").on("click", analyzeKeywords);
  $("#bulletize").on("click", autoBulletize);
}

/* -------- Init -------- */
function initializeApp(){
  currentResumeData = getEmptyResumeData();
  renderForm();
  renderResumePreview();
  bindChrome();
  bindActions();
  console.log("[cool] initialized");
}
$(function(){ initializeApp(); });
