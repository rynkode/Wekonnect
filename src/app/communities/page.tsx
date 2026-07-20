import { getCommunities } from "@/lib/queries/communities";
import { CommunityCard } from "@/components/CommunityCard";

export const metadata = {
  title: "Communities — WeKonnect",
  description:
    "Find your tribe. Join creative communities by city and discipline on WeKonnect.",
};

export default async function CommunitiesPage() {
  const communities = await getCommunities();

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sage">
            Find your tribe
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Communities
          </h1>
          <p className="mt-4 text-lg text-muted">
            Groups where creatives belong — by city, craft, and shared ambition. Join one
            and meet people who create like you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </div>
  );
}
