# Transfer Portal

A product concept demo: a confidential internal mobility marketplace for enterprises.

**Live demo:** [transfer-portal-plum.vercel.app](https://transfer-portal-plum.vercel.app)

## The problem

Internal mobility fails not because companies lack a job board, but because signaling intent to move is unsafe. The moment an employee tells their manager they want a change, they become a flight risk. So they say nothing, interview externally, and the company finds out at resignation. Hiring managers with open headcount recruit outside because movable internal talent is invisible.

## The insight

Every incumbent talent marketplace assumes the manager sees everything, so the supply never shows up. Transfer Portal is built on the opposite assumption: intent to move stays confidential from your management chain and visible to everyone who could hire you. The product is not the screens. It is the difference between what each person is allowed to see.

## The four visibility rules

1. **The chain is blind.** A listing is invisible to the seeker's entire management chain, all the way up. Not a setting. No admin override.
2. **The seeker holds the key.** Everyone else sees an anonymized profile. A name appears only when the seeker accepts a specific manager's interest.
3. **Demand is public, supply is protected.** Hiring managers are always identified. The person with the safe position carries the exposure.
4. **Swaps need consent.** A manager joins a match involving their own report, with a backfill headcount on the table, only after the employee explicitly allows it.

## The demo

One seeded company, four views of the same moment. Walk it in three minutes:

1. **Maya Chen** publishes a listing and sees exactly who can never see it.
2. **Derek Osei**, hiring manager, browses redacted profiles. A listing from his own team is silently excluded, not even counted.
3. Derek expresses interest. Maya accepts, and only then does her name unmask in his view.
4. Maya consents to a swap. **Priya Raman**, her manager, sees her first and only card. Before that consent, Priya's view held zero evidence.
5. **June Park** in People sees aggregates only, suppressed below three per group.

All state lives in the browser and resets on refresh. Meridian Systems and everyone in it are fictional.

## Honest limits

Anonymity degrades with org size: a level plus a tenure band can identify someone on a small team, which is why anonymized cards show a discipline instead of a team and why aggregates suppress small groups. Some jurisdictions and union environments require manager notification, so deployment is a policy decision, not just a rollout. And the product deliberately hides information from managers about their own teams. The defense: the alternative to confidential internal signaling is not transparency. It is employees signaling to external recruiters, where the company sees nothing and loses everything.

A product concept by Jonathan Jules.
