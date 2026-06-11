const cards = [{"label": "Model accuracy", "value": "98.4%", "delta": "+2.1%"}, {"label": "API requests", "value": "128K", "delta": "+18%"}, {"label": "Avg latency", "value": "142ms", "delta": "-24ms"}, {"label": "Cost saved", "value": "$4.8K", "delta": "+11%"}];
const rows = [{"title": "Summarization pipeline", "status": "Healthy", "detail": "Batch summaries processed with stable latency."}, {"title": "Embedding cache", "status": "Optimized", "detail": "Cache hit rate improved across high-traffic routes."}, {"title": "Safety filter", "status": "Active", "detail": "Policy checks running on every generated response."}, {"title": "Prompt library", "status": "Updated", "detail": "New templates added for support and sales teams."}];
const insights = ["Forecasting suggests a 14% request increase next week.", "Top model usage shifted toward reasoning tasks.", "Cache optimization reduced repeat embedding cost."];
const storageKey = 'vizvasanlya-ai-dashboard-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
