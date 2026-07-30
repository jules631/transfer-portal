# Transfer Portal

A confidential internal mobility marketplace for enterprises. Built from a real problem, not a hypothetical: inside most companies, the safest way to change jobs is to quit.

**Live demo:** [transfer-portal-plum.vercel.app](https://transfer-portal-plum.vercel.app)

![Walkthrough: Maya publishes, Derek browses redacted profiles and expresses interest, Maya accepts, her name reveals in Derek's view, Priya sees nothing, June sees suppressed aggregates](docs/walkthrough.gif)

## The problem

Internal mobility fails not because companies lack a job board, but because signaling intent to move is unsafe. The moment an employee tells their manager they want a change, they become a flight risk. So they say nothing, interview externally, and the company finds out at resignation. Hiring managers with open headcount recruit outside because movable internal talent is invisible.

## The insight

Every incumbent talent marketplace assumes the manager sees everything, so the supply never shows up. Transfer Portal is built on the opposite assumption: intent to move stays confidential from your management chain and visible to everyone who could hire you. The product is not the screens. It is the difference between what each person is allowed to see.

## The four visibility rules

1. **The chain is blind.** A listing is invisible to the seeker's entire reporting line, everyone above them and everyone below them, and to their own teammates. Exclusion follows one test: no ability to hire you, plus the context to unmask you. Not a setting. No admin override.
2. **The seeker holds the key.** Everyone else sees an anonymized profile. A name appears only when the seeker accepts a specific manager's interest.
3. **Demand is public, supply is protected.** Hiring managers are always identified. The person with the safe position carries the exposure.
4. **Swaps need consent.** A manager joins a match involving their own report, with a backfill headcount on the table, only after the employee explicitly allows it.

## The demo

One seeded company, four views of the same moment. Walk it in three minutes:

1. **Maya Chen** publishes a listing and sees exactly who can never see it.
2. **Derek Osei**, hiring manager, browses redacted profiles. A listing from his own team is silently excluded, not even counted.
3. Derek expresses interest. Maya accepts, and only then does her name unmask in his view.
4. Maya consents to a swap. **Priya Raman**, her manager, sees her first and only card. Before that consent, Priya's view held zero evidence.
5. **June Park** in People sees aggregates only, suppressed for small counts and for listings that cover most of a small team.

All state lives in the browser and resets on refresh. Meridian Systems and everyone in it are fictional.

## The objections

The hesitations this design has to survive, answered at the altitude an executive would ask them.

**Will listing counts expose people on small teams?**
Suppressing small counts is not enough on its own. The design also requires a headcount floor before a department appears in aggregates at all, shows ranges instead of exact numbers in delayed snapshots, and offers no query interface to run comparisons against over time. The sharpest leak is actually free text: a note that says "payments risk models" names a team no redaction bar can hide, which is why the listing composer should show every seeker how identifying their own words are before they publish.

**Why would anyone not just walk over and ask the hiring manager?**
Because posted openings lag true demand by months. The manager who knows a departure is coming, or has budget landing next quarter, is invisible to a hallway search, and every direct conversation is a leak with no rules attached. One listing reaches every manager with present or future demand, and a failed search costs the seeker nothing, because nobody ever knew who they were.

**What keeps people from chasing roles above their level?**
There is no apply button to abuse. Level and tenure come from the HR system, not self description, and demand approaches supply: a manager sees the level on the anonymized card before expressing interest, so a mismatch dies before a name is ever revealed. Matches default to lateral moves, and whether a listing surfaces one level up is a company policy switch, not a seeker choice.

**Can the seeker's own teammates see the card?**
No. A teammate cannot hire you onto the team you already share, and no one in the company is better equipped to resolve an anonymized card to a name. Zero legitimate demand plus maximum unmasking context means the whole team is excluded, and browsing itself requires demand: supply is visible only to identified hiring managers, never to curious peers.

**If a manager's whole org is blind, how does anyone move inside a big org?**
The exclusion is drawn around each seeker, not around the org. A manager of a sibling team inside the same large org is not in your reporting line, so they see your card and can hire you, which keeps the most common transfer of all, the move one team over, fully alive. The only blocked pairing is a hiring manager who sits directly above you, and that case is served by the public side of the market: every open role shows its manager's name, so a seeker can always choose to reveal themselves to someone in their chain. The portal blocks discovery, never choice.

**Does this not just help managers lose their people?**
It converts resignation surprise into internal transfer. The company keeps the person, and three quiet listings on one team become a coaching signal in aggregate instead of three exit interviews, while every individual stays protected.

**If this is a good idea, why does it not already exist?**
Every incumbent talent marketplace assumes the manager sees everything, because the buyer historically demanded it, so the supply side never shows up and the tools fill with manager nominated project work instead. The pattern is already proven externally: open to work on LinkedIn hides your signal from your own employer. Nobody has turned that assumption inward, because the organization that has to buy this product is the same one it disciplines.

## Honest limits

Anonymity degrades with org size: a level plus a tenure band can identify someone on a small team, which is why anonymized cards show a discipline instead of a team and why aggregates suppress small groups. Some jurisdictions and union environments require manager notification, so deployment is a policy decision, not just a rollout. And the product deliberately hides information from managers about their own teams. The defense: the alternative to confidential internal signaling is not transparency. It is employees signaling to external recruiters, where the company sees nothing and loses everything.

A product concept by Jonathan Jules.
