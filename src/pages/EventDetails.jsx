// Part 10: one event's page, with focus moved on purpose. Read and test.
// A ref is a handle on a real element on the page, so code can call .focus() on it.

import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RsvpForm from "../components/RsvpForm.jsx";
import NotFound from "./NotFound.jsx";

export default function EventDetails(props) {
  const { events, onStatusChange, loadState } = props;

  // useParams reads the :id part of the route. The name matches the Route path in App.
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  // Two handles: one on the heading, one on the confirmation message.
  const headingRef = useRef(null);
  const confirmationRef = useRef(null);
  const [justConfirmed, setJustConfirmed] = useState(false);

  // After navigation (and again once the events have loaded): put keyboard focus on the heading,
  // so a keyboard or screen-reader user starts at the top of the new page, not where they were.
  // useEffect runs code after the render. Part 11 explains it fully.
  useEffect(() => {
    headingRef.current?.focus();
  }, [id, loadState]);

  // After confirmation: when the "You are going" message appears, focus it.
  useEffect(() => {
    if (justConfirmed) {
      confirmationRef.current?.focus();
    }
  }, [justConfirmed]);

  // While the events are still loading there is nothing to find yet. Say so instead of "not found".
  if (loadState === "loading") {
    return (
      <main id="events-main" className="events-main">
        <p className="load-state" role="status">Loading…</p>
      </main>
    );
  }

  if (!event) {
    return <NotFound />;
  }

  function handleRsvpSubmit(rsvp) {
    console.log("RSVP for", event.id, rsvp);
    onStatusChange(event.id, "Going");
    setJustConfirmed(true);
  }

  function handleDecline() {
    onStatusChange(event.id, "Declined");
  }

  const statusClass =
    event.status === "Going" ? "invitation-status is-going" : event.status === "Declined" ? "invitation-status is-declined" : "invitation-status";

  return (
    <main id="events-main" className="events-main event-details">
      <header className="invitation-toolbar">
        <Link className="panel-close" to="/" data-tooltip="Close" aria-label="Close event details">
          <img src="https://raw.githubusercontent.com/silka-co/ui-design-course-assets/main/icons/chevrons-right.svg" alt="" />
        </Link>
      </header>
      <img className="invitation-hero" src={event.image} alt={event.imageAlt} />

      <div className="invitation-heading">
        <h1 className="invitation-title" ref={headingRef} tabIndex={-1}>{event.title}</h1>
        <p className="type-body">
          <span className="host-avatar"><img src={event.hostAvatar} alt="" /></span>
          By {event.host}
        </p>
      </div>

      <div className="invitation-facts">
        <div className="invitation-fact">
          <time className="invitation-date-tile" dateTime={event.dateTime}>
            <span>{event.month}</span>
            <strong>{event.day}</strong>
          </time>
          <p>
            <strong className="type-medium">{event.dateLabel}</strong>
            <span className="type-body-small">{event.time}</span>
          </p>
        </div>
        <div className="invitation-fact">
          <img src="https://raw.githubusercontent.com/silka-co/ui-design-course-assets/main/icons/map-pin.svg" alt="" />
          <p>
            <strong className="type-medium">{event.location}</strong>
            <span className="type-body-small">{event.address}</span>
          </p>
        </div>
      </div>

      <section className="invitation-registration" aria-labelledby="registration-heading">
        <h2 className="invitation-section-label type-semibold" id="registration-heading">Registration</h2>
        <p className="registration-status">
          <span className={statusClass}>{event.status}</span>
        </p>
        {event.status === "Going" && (
          <p className="rsvp-card" ref={confirmationRef} tabIndex={-1}>
            You are going. See you there.
          </p>
        )}
        {event.status === "Declined" && (
          <p className="rsvp-card">
            You declined this invitation. Changed your mind?{" "}
            <button type="button" className="secondary-button" onClick={() => onStatusChange(event.id, "Invited")}>
              Change your response
            </button>
          </p>
        )}
        {event.status === "Invited" && (
          <RsvpForm event={event} onSubmit={handleRsvpSubmit} onCancel={handleDecline} cancelLabel="Decline" />
        )}
      </section>

      <section className="invitation-about" aria-labelledby="about-heading">
        <h2 className="invitation-section-label type-semibold" id="about-heading">About Event</h2>
        <p className="type-body">{event.description}</p>
      </section>
    </main>
  );
}
