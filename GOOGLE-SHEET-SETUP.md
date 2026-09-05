# Google Sheet me leads record karna — setup (5 min)

Website ka form ab kisi database me nahi, seedha **Google Sheet** me row add karta hai,
aur user ko turant **WhatsApp** pe bhej deta hai. Razorpay / payment site se hat gaya hai.

Script khud sheet ko professional bana deta hai: RJ Fitness logo + brand banner upar,
styled headers, Status dropdown (rang ke saath), zebra rows, aur ek **Summary** tab
(total / aaj / is hafte / is mahine ke leads, status-wise count, top countries, top sources).

## Step 1 — Sheet banao
1. https://sheets.new kholo → naam do, e.g. `RJ Fitness Leads`.
2. Kuch bhi likhne ki zaroorat nahi — script khud sab bana dega.

## Step 2 — Apps Script daalo
1. Sheet me **Extensions → Apps Script** kholo.
2. Jo default code hai use poora hata do, aur `google-apps-script/Code.gs` ka **poora code** paste karo.
3. (Optional) `NOTIFY_EMAIL = ""` me email daalo to har nayi lead ka email bhi aayega.
4. (Optional) `SECRET = ""` me koi random string daalo, e.g. `rj-2026-xyz` —
   wahi string server `.env` me `GOOGLE_SHEET_SECRET` me daalni hai.
5. Save (Ctrl+S).

## Step 3 — Sheet ko format karo (ek baar)
1. Upar dropdown me function **`setupSheet`** choose karo → **Run ▶** dabao.
2. Permission maange to **Review permissions → apna Google account → Advanced → Go to … (unsafe) → Allow**.
3. Sheet pe wapas jao — `Leads` tab logo/banner/headers ke saath aur `Summary` tab ban chuke honge.
4. Sheet reload karoge to upar ek **"RJ Fitness"** menu bhi dikhega:
   *Set up / re-format sheet*, *Add a test lead*, *Refresh summary*.

## Step 4 — Web App deploy karo
1. Apps Script me upar right **Deploy → New deployment**.
2. Type (gear icon): **Web app**.
3. Execute as: **Me** · Who has access: **Anyone**  ← dono zaroori hain.
4. **Deploy** → jo URL mile (`https://script.google.com/macros/s/…/exec`) use copy karo.
   Browser me khologe to `{"ok":true,"brand":"RJ FITNESS","sheet":"Leads"}` dikhna chahiye.

## Step 5 — Website `.env` me daalo (local + VPS dono)
```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/……/exec
GOOGLE_SHEET_SECRET=rj-2026-xyz        # sirf tab jab Code.gs me SECRET set kiya ho
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```
Phir `npm run build` + restart (VPS pe `pm2 restart fitness`).

## Check karo
- `/api/health` kholo → `"sheet": true` dikhna chahiye.
- Site pe form bharo → `Leads` tab me nayi row (Status = New) + WhatsApp khulna chahiye.
- Ya sheet ke **RJ Fitness → Add a test lead** se ek dummy row daal kar dekho.

## Columns (Leads tab)
Date & Time · Status · Name · Contact Number · Country · Age · Height · Weight · Profession ·
Medical History · Major Concern · Expected Outcome · Ready to Invest? · Preferred Time · Team Notes ·
Form · UTM Source · UTM Medium · UTM Campaign · UTM Content · UTM Term · FB Click ID · Page URL · IP

- **Status** dropdown: New → Contacted → Call booked → Joined / Follow up / Not interested (har status ka apna rang).
- **Team Notes** khali column hai, team apne comments likhe.
- Tracking columns (UTM Medium/Content/Term, FB Click ID, IP) default me hidden hain — View → Hidden columns se dikhao.
- Same phone se 24 ghante ke andar dobara submit ho to duplicate row nahi banti.
- Indian 10-digit number apne aap `+91 98765 43210` format me save hota hai.

## Code change karo to
`Code.gs` me kuch badlo to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**
karna padta hai, warna purana code hi chalta rahega. URL same rehta hai.
Column ka naam badalna ho to sirf `label` badlo, `key` mat chhedo (website wahi key bhejti hai).
