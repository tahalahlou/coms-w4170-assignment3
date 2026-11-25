# Finished — all twelve Parts complete

This is the whole project with every Part done, including Part 12. Use it to compare, not to copy: Part 12 is graded on being your own work, and you must be able to explain every line you submit.

## Final check list, before you submit

Run each in your own project.

1. **Events page.** Three upcoming cards; Past shows the Orientation Mixer. `App.jsx` has no `<article>`. Changing one prop changes one card.
2. **Pills.** Click a pill: Invited becomes Going, the count goes up by one, the status line at the top of the page says so. Click again: back.
3. **Pages.** Click a card: its page opens without a reload, the heading has focus. Back returns to Events with the pills as you left them. `/events/nope` shows Not Found. Events and My Events highlight in the header.
4. **Form.** Empty submit: three messages, focus in Name. A good submit: "Sending…" then "You are going.", focus on it. An `@fail.test` email: the failure message, focus on it, "Try again".
5. **My Events.** Three groups, one empty with a message. Decline from an event's page moves it; "Change your response" moves it back.
6. **Loading.** Reload: "Loading events…" then the cards. `SIMULATE_FAILURE` on: error box, Try again. `SIMULATE_EMPTY` on: the empty message. Both back to `false`.
7. **Search.** "friday" leaves one card, "zzz" shows your message, clearing shows all.
8. **Keyboard.** Tab reaches every control with a visible ring. Space works on the switcher buttons.
9. **The PDF.** Project link (opens logged out), the Part 8 screenshot, the test note for Parts 9 to 11 (one line per Part), the Part 12 note, and an AI process note if one applies.
