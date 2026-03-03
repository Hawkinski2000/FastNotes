# FastNotes

<p align="center">
  <a href="https://fastnotes.ink"><img src="images/mug-icon.svg" height="100"></a>
  <h2 align="center"><a href="https://fastnotes.ink">fastnotes.ink</a></h2>
  <p align="center">A backend-first note-taking API and web app focused on low-latency access, efficient queries, and scalable design.<p>
</p>

## Summary

- Engineered a high-performance note-taking API and web app to study database and caching performance under load
- Seeded database with 100k notes and conducted sustained load testing with Locust (20 concurrent users, 5-minute runs)
- Reduced average GET /notes latency from 396ms to 81ms (~5× speedup) and p95 from 560ms to 170ms through database indexing, raw SQL optimization, and Redis caching
