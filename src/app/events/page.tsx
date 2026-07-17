import { getEvents } from "@/lib/queries/events";
import { EventsPageContent } from "./EventsPageContent";

export const metadata = {
  title: "Events — WeKonnect",
  description: "Discover and join creative events on WeKonnect.",
};

export default async function EventsPage() {
  const events = await getEvents();
  return <EventsPageContent events={events} />;
}
