// Part 11: the Events page shows one of four things, depending on loadState:
// a loading message, an empty message, an error with Try again, or the list.

import EventList from "../components/EventList.jsx";
import ViewSwitch from "../components/ViewSwitch.jsx";

export default function EventsPage(props) {
  const { events, view, onViewChange, onStatusChange, loadState, onRetry, query, onQueryChange } = props;

  return (
    <main id="events-main" className="events-main">
      <div className="events-title-row">
        <h1>Events</h1>
        <ViewSwitch selected={view} onSelect={onViewChange} />
      </div>

      {/* Part 12b: a controlled input, like the form fields. App owns the text. */}
      <div className="field search-field">
        <label htmlFor="event-search">Search events</label>
        <input id="event-search" type="search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Type part of a title" />
      </div>
      {loadState === "loading" && (
        <p className="load-state" role="status">Loading events…</p>
      )}
      {loadState === "empty" && (
        <p className="empty-state">No events yet. When someone invites you, the event shows up here.</p>
      )}
      {loadState === "error" && (
        <div className="load-error" role="alert">
          <p>We couldn’t load the events. Check your connection and try again.</p>
          <button type="button" className="secondary-button" onClick={onRetry}>Try again</button>
        </div>
      )}
      {/* Part 12c: an empty state for a search with no matches, reusing the Part 8 pattern. */}
      {loadState === "ready" && events.length === 0 && (
        <p className="empty-state">No {view} events match “{query}”. Try fewer letters.</p>
      )}
      {loadState === "ready" && events.length > 0 && <EventList events={events} view={view} onStatusChange={onStatusChange} />}
    </main>
  );
}
