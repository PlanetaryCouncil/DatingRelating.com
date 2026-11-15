# DatingRelating.com

Single people from Instagram, sorted by where they are right now, plus protocols for the relating part.

- `/` Dating: profiles from `profiles.json` (see `profiles/README.md` to add one)
- `/relating/` Resentment Dismantlement Protocol, Mars Crew Pairing Protocol, Mars-144
- `/co-founder-co-lover/` Co-founder & Co-lover

- `/people/<id>/` Personal pages, generated for every profile that has a `"bio"`
- Profiles with `"hidden": true` stay out of the public list but open via a direct link (`/#id`), with a "Waiting for approval" notice.

Static site. After editing `profiles.json`, run `python3 build.py` to (re)generate the personal pages, then commit.
Preview locally with `python3 -m http.server`.

Dating is just 1st step, relating is what happens afterwards.

Current status: research, test driving idea. Book a ☎️ to chat more details: https://calendly.com/marsxr/basex

Inspired by https://www.jamesnorris.org/wife/ and the entire catalogue https://dateme.directory/browse

Related to 42: https://github.com/marsrobertson/one-life-true-self/issues/42 From my own personal perspective, a moment of reflection, genuine question: to what extent athletic physique matters? I've been doing sports for a while and my latest lady is a circus artist with unique physique... Add to the mix the Instagram algorightm and unrealistic standard of beauty? I may as well become a content creator myself, trying various approaches, including Only Fans account: https://onlyfans.com/marshavingfun

> 🇬🇧 London. Computer nerd.
> Decent connection with my body, clearly above the average. Enjoys flirting (you've been warned) with fit / strong / athletic ladies, sweat is sexy. At least 1 pull-up as a bar of entry to my club 💪
> Sensual consensual sapiosexual - attracted to intelligence and loads of other things, not necessarily nudity, tease my 🧠 please.
> You can also share your business secrets with me, what happens in bed stays in bed.

## Solana Breakpoint membership

The homepage presents a **1 SOL lifetime membership**. Set the owner's public
Solana mainnet receiving address in `membership-config.js` to enable Solana Pay
transfer requests. Until then, checkout shows an honest “payments aren't open”
state and an email contact. No example address receives payments.

Payment links request exactly 1 native SOL, with an order memo. The customer
approves the transfer in their own compatible wallet, pays the network fee, and
emails the transaction signature and their profile link. Fulfilment is manual:
verify a successful, finalized mainnet transfer to the configured recipient for
1 SOL; record its signature and order before activating membership, and never
reuse a signature for another membership. No keys, wallet signing, or automatic
membership activation are handled by this static site.

Homepage auctions are explicitly marked **coming soon**. Launching actual
real-time bidding needs a shared backend, an agreed auction duration and spot
allocation, server-enforced bid ordering and payment verification. The current
page does not simulate bids, collect auction payments, or claim auction wins.

### Current MVP recipient

The owner supplied `2rP2kKynGDgdfGyrgKYpSb1RdEFi4NB84s9TzzzVcGno` as
his personal Phantom receiving address. Checkout discloses this and explicitly
says that payment does not mint an NFT. This is a real mainnet payment flow,
not a devnet test. No NFT entitlement or smart-contract integration is implied.

To switch to a multisig, update `recipient` and `recipientNote` in
`membership-config.js` using the owner-confirmed vault receiving address (not
the multisig configuration account), and publish. Previously issued payment
links still point to the old wallet. Keep verifying earlier payments against
their original recipient; email receipts include that address for reconciliation.
Changing this configuration does not move previously received funds.

## In-person mobile offer

The Breakpoint price is advertised as an in-person-only offer. Mars must confirm
both the meeting and payment before recording lifetime membership and the
permanent “Verified in person by Mars” badge. A payment is not proof of a meeting.
Specific extra privileges are not yet defined. There is no fabricated countdown,
automatic verification, or automatic badge issuance in this static MVP.

Checkout offers a 1 SOL Solana Pay link, copyable raw receiving address, and an
address-only QR. Scanning the QR requires the payer to enter 1 SOL. The QR is
created locally from the same configured address using vendored MIT-licensed
qrcode-generator 2.0.4; no external QR service or runtime CDN is used. Changing
the recipient also changes the QR. Desktop and mobile share the same flow.
