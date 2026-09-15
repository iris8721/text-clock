# Text Clock

A word clock in the browser. The current time is spelled out as an English
phrase — "it is half past ten" — with the active words lit up in red neon.
Inactive words sit dim in the background. Lit words flicker at random
intervals like a failing neon sign.

Vanilla HTML/CSS/JS, no dependencies, no build step.

## Run

Open `index.html` in a browser, or serve the directory:

```
python3 -m http.server
```

## How it works

- The page is a fixed grid of `<span>` words (`it is`, `half`, `quarter`,
  `twenty`, `five`, `minutes`, `to`, `past`, the hours, `o'clock`).
- Once per second, `updateClock()` floors the current minute to a multiple
  of 5 and looks the result up in a phrase table (`minuteMap`): 15 →
  "quarter past", 35 → "twenty five minutes to", etc. For "to" phrases
  (minute ≥ 35) the displayed hour is advanced by one.
- The 0–4 leftover minutes are shown as dots under the text, so the exact
  minute is still readable: 3 lit dots at "half past ten" means 10:33.
- The neon effect is a CSS `text-shadow` stack on `.active` spans. A
  scheduler fires every 3–10 s, picks a random lit word, and runs one of
  two flicker animations (a few quick blinks, or a slow-to-fast sputter)
  by toggling inline color/shadow.

## Known limitations

- Minutes are truncated, not rounded: the phrase can read up to ~5 minutes
  behind the real time (the dots carry the remainder).
- 12-hour clock only; no AM/PM indicator.
- Flicker animations mutate inline styles, so a word mid-flicker when the
  minute rolls over keeps its inline color until the next flicker.
