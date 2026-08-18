# Blue Pear Tree

Vendor-neutral AI advising website for healthcare organizations.

## Deploy to Netlify (drag and drop)

1. Unzip this folder.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Deploy manually**.
3. Drop the unzipped folder (the one that contains `index.html`).
4. After the first deploy: **Site configuration → Forms** and confirm a form named `contact`.
5. **Forms → Form notifications** → add `bluepeartreellc@gmail.com`.

## Deploy from GitHub

1. Create a new GitHub repository (public or private).
2. Upload these files to the **root** of the repo (`index.html` must be at the root).
3. In Netlify: **Add new site → Import an existing project → GitHub**.
4. Select the repo. Publish directory: leave blank / `.`
5. Deploy. Then set form notifications to `bluepeartreellc@gmail.com`.

## After go-live

- Optional custom domain under **Domain management**.
- Update the canonical / Open Graph URLs in `index.html` if you switch domains.
- Send a test message from the contact form and confirm it arrives.

## Contact form

The form uses Netlify Forms (`name="contact"`). It will not email you until the site is hosted on Netlify and notifications are enabled.
