// Part 8: My Events. One page, built from the same events state as the Events page.
// Three groups by status. A group with nothing in it says so instead of showing nothing.

import EventList from "../components/EventList.jsx";

export default function MyEvents(props) {
  const { events, onStatusChange, loadState } = props;

  // Three lists worked out from the one shared list. Not state: it follows events automatically.
  const groups = [
    { status: "Going", events: events.filter((event) => event.status === "Going") },
    { status: "Invited", events: events.filter((event) => event.status === "Invited") },
    { status: "Declined", events: events.filter((event) => event.status === "Declined") },
  ];

  return (
    <main id="events-main" className="events-main">
      <div className="events-title-row">
        <h1>My Events</h1>
      </div>

      {loadState === "loading" && <p className="load-state" role="status">Loading…</p>}
      {loadState === "error" && <p className="load-error">We couldn’t load your events. Go back to Events and try again.</p>}
      {(loadState === "ready" || loadState === "empty") && groups.map((group) => (
        <section className="my-events-group" key={group.status} aria-labelledby={"group-" + group.status.toLowerCase()}>
          <h2 id={"group-" + group.status.toLowerCase()}>{group.status}</h2>
          {group.events.length === 0 ? (
            <p className="empty-state">Nothing here yet. Events you mark as {group.status.toLowerCase()} will show up here.</p>
          ) : (
            <EventList events={group.events} view={group.status.toLowerCase()} onStatusChange={onStatusChange} />
          )}
        </section>
      ))}
    </main>
  );
}
