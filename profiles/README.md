# Adding a profile

1. Get a clear **yes** from the person (keep the email/DM where they said it).
2. Save their screenshot or image here as `profiles/<id>.jpg` (optional).
3. Add an entry to `profiles.json`:

```json
{
  "id": "firstname-city",
  "name": "Firstname",
  "instagram": "handle",
  "post_url": "https://www.instagram.com/p/XXXX/",
  "image": "profiles/firstname-city.jpg",
  "text": "Their own words from the post.",
  "seeking": "woman",
  "city": "Berlin",
  "country": "Germany",
  "added": "2026-10-14",
  "consent": "email 2026-10-14"
}
```

- `seeking` is `"woman"` or `"man"`.
- `consent` records how and when they said yes. It is not shown on the site.
- To remove someone, delete their entry and image. Do it the same day they ask.
- Delete the two `"example": true` entries once real profiles exist.
