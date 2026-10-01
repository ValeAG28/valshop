# VAL SHOP — Customer Journey Map
**Full funnel: Discovery → Post-Purchase | Digital licenses, global, instant delivery**

---

## JOURNEY STAGES OVERVIEW

| Stage | Buyer Mindset | Key Question | VAL Touchpoints |
|-------|---------------|--------------|-----------------|
| **Awareness** | "I need [Netflix/Adobe/VPN] but official price is high / payment blocked" | Where can I get this cheaper/working? | Google Ads, SEO, Reddit, YouTube reviews, word-of-mouth |
| **Consideration** | "Is this legit? Will it work in my country? How fast?" | Can I trust this reseller? | Product page, FAQ, WhatsApp chat, competitor comparison |
| **Decision** | "Okay, but what if code fails? No refund on digital?" | What's my risk? | Cart, checkout, payment method choice, guarantee visibility |
| **Delivery** | "Where is my code? Is it working?" | Did it actually arrive? | WhatsApp + email delivery, activation guide, support |
| **Activation** | "How do I set this up? It's not working." | Help me make it work. | Setup guides, WhatsApp support, replacement guarantee |
| **Retention** | "That worked. What else do I need? Renewal coming up." | Should I buy again / refer? | Renewal reminders, cross-sell, loyalty, referral |

---

## DETAILED STAGE MAP

### 1. AWARENESS
**Buyer State:** Problem-aware, solution-searching, price-sensitive, region-constrained

| Touchpoint | Buyer Action | Friction Points | Emotional Triggers | Optimization |
|------------|--------------|-----------------|-------------------|--------------|
| Google Search "Netflix Premium 4K cheap" | Clicks ad/organic | Ad looks generic, no trust signals | Hope + skepticism | RSA headlines with "instant delivery", "100% guarantee", VAL10 |
| YouTube "Best Netflix reseller 2024" | Watches review | Reviewer doesn't show delivery proof | Curiosity + doubt | Sponsor creators with demo codes + affiliate |
| Reddit r/Piracy / r/NetflixViaVPN | Reads comments | "Don't buy resellers, get banned" | Fear + defiance | Transparent FAQ: "Why we're different from shady resellers" |
| Word-of-mouth (WhatsApp forward) | Gets referral | No tracking, no incentive for referrer | Trust + reciprocity | Referral program: $5 credit each side |
| SEO "ChatGPT Plus Argentina price" | Lands on blog/category | Content too thin, no local pricing | Frustration + relief | Geo-specific landing pages with local payment methods |

**Metrics:** Impressions, CTR, CPC, Bounce Rate, Time on Page
**Automation:** UTM tracking → segment by source → dynamic headline personalization

---

### 2. CONSIDERATION
**Buyer State:** Evaluating VAL vs. official vs. other resellers. High skepticism.

| Touchpoint | Buyer Action | Friction Points | Emotional Triggers | Optimization |
|------------|--------------|-----------------|-------------------|--------------|
| Product Page (Netflix 4K) | Reads description, checks price | No social proof visible, vague delivery claim | Desire + doubt | **Add:** Live delivery counter, recent buyer map, WhatsApp chat widget |
| Category Page (Streaming) | Compares Netflix vs. Disney+ vs. Prime | No side-by-side comparison | Confusion | Comparison table: price, screens, quality, delivery time |
| FAQ Page | Searches "instant delivery real?" | Answer buried, no proof | Skepticism | **Add:** Video demo of delivery flow, timestamped screenshots |
| WhatsApp Chat (pre-sale) | Asks "works in Colombia?" | Slow reply, generic answer | Anxiety + test | **Add:** Auto-reply with country-specific confirmation + screenshot |
| Competitor Comparison (mental) | Weighs VAL vs. G2G vs. Official | Can't differentiate easily | Analysis paralysis | **Add:** "Why not G2G/Official" section on product page |

**Metrics:** Product page CVR, FAQ engagement, WhatsApp conversations started, Comparison table clicks
**Automation:** Exit-intent → "Still unsure? WhatsApp us — 47 sec avg reply" | Retargeting: "You viewed Netflix 4K — delivery in 3 min avg"

---

### 3. DECISION
**Buyer State:** Ready to buy. Final hesitation: risk, payment method, coupon validity.

| Touchpoint | Buyer Action | Friction Points | Emotional Triggers | Optimization |
|------------|--------------|-----------------|-------------------|--------------|
| Cart Drawer | Reviews items, applies VAL10 | Coupon fails silently, no error clarity | Frustration + distrust | **Fix:** Real-time coupon validation, clear error: "VAL10 = 10% off, max 1 use" |
| Payment Method Select | Chooses Transfer / MP / PayPal / Stripe | Transfer instructions unclear, MP redirects confusing | Confusion + abandonment | **Add:** Step-by-step per method, "Transfer = send comprobante to WhatsApp for instant approval" |
| Checkout → WhatsApp Link | Clicks "Continuar compra" | WhatsApp opens with pre-filled message but buyer edits it | Friction + error risk | **Fix:** Deep link with `text=` parameter locked, buyer only hits send |
| Guarantee Visibility | Sees "100% guarantee" | Doesn't believe it, no details | Skepticism | **Expand:** "Code fails → replacement in 5 min → or full refund. 2,800+ replacements honored." |

**Metrics:** Cart → Checkout rate, Payment method distribution, Coupon redemption, WhatsApp link click-through
**Automation:** Abandoned cart → Email 1h: "Your Netflix 4K is waiting — VAL10 still works" + WhatsApp deep link

---

### 4. DELIVERY (The Moment of Truth)
**Buyer State:** Paid. Waiting. High anxiety. "Did I get scammed?"

| Touchpoint | Buyer Action | Friction Points | Emotional Triggers | Optimization |
|------------|--------------|-----------------|-------------------|--------------|
| WhatsApp Delivery | Receives message with credentials | Message delayed, formatted poorly, missing info | Relief → Anger if slow | **SLA:** <5 min avg. Auto-retry if not delivered in 3 min. Format: Service | Email | Password | Link |
| Email Delivery | Checks inbox/spam | Email in spam, missing, generic subject | Anxiety | **Fix:** Transactional email domain (licenses@valdigital.com), DKIM/SPF, subject: "Your Netflix 4K — Order #VAL-847291" |
| Order Status Page | Checks "My Orders" | No order history without account | Frustration | **Add:** Guest order lookup by email + order ID |
| Support (if delayed) | Messages WhatsApp "where is it?" | Bot reply, no human, slow | Panic | **Escalation:** Auto-alert if >10 min → human paged. Template: "Checking now — 2 min" |

**Metrics:** Delivery time (P50, P90, P99), WhatsApp delivery open rate, Support tickets "where is order", Spam complaint rate
**Automation:** Delivery confirmation → "Working? Reply 👍 or 👎" → 👎 triggers instant support ticket

---

### 5. ACTIVATION
**Buyer State:** Has credentials. Trying to activate. Technical friction.

| Touchpoint | Buyer Action | Friction Points | Emotional Triggers | Optimization |
|------------|--------------|-----------------|-------------------|--------------|
| Activation Guide (in delivery msg) | Follows steps | Steps outdated, device-specific issues | Confidence → Frustration | **Per-product guides:** Netflix on Smart TV / Phone / Browser. Screenshots. Video links. |
| WhatsApp Support | Sends "not working" | Generic "try again" reply, no device context | Helplessness | **Template:** "Send: Device + Error screenshot + Country" → Agent diagnoses in 1 reply |
| Replacement Request | Asks for new code | Slow process, blame-shifting | Betrayal | **Policy:** "Reply 'replace' → new code in 2 min. No questions. Logged for supplier audit." |
| Success Confirmation | Activates, watches/works | No feedback loop, no "welcome" | Silent satisfaction | **Trigger:** On 👍 reply → "Enjoy! Need anything else? VAL10 works on renewal too." |

**Metrics:** First-time activation rate, Support tickets per 100 orders, Replacement rate, Time to resolution
**Automation:** Activation success → Tag "activated" → Day 7: "How's it working? Need anything else?"

---

### 6. RETENTION
**Buyer State:** Success. Trust built. Ready for more / renewal.

| Touchpoint | Buyer Action | Friction Points | Emotional Triggers | Optimization |
|------------|--------------|-----------------|-------------------|--------------|
| Renewal Reminder (Day 330) | Gets email "Netflix renewing soon" | Generic, no one-click renew | Annoyance + intent | **Personalized:** "Your Netflix 4K expires in 30 days. Renew now with VAL10 — same 3-min delivery." |
| Cross-Sell (Post-activation) | Sees "Also bought: NordVPN" | Irrelevant recommendations | Indifference | **Smart:** "Netflix buyers also get NordVPN for 4K streaming abroad — 10% off with VAL10" |
| Loyalty Program | Checks points/tier | Complicated, low value | Apathy | **Simple:** $1 spent = 1 point. 500 pts = $5 credit. Tier: Silver (5 orders) = priority support. Gold (15 orders) = 15% lifetime discount. |
| Referral Program | Shares link | No incentive, hard to share | Missed opportunity | **Viral:** "Give $5, get $5. Share WhatsApp link. Tracked automatically." |
| Feedback Request | Gets NPS survey | Long, no action visible | Survey fatigue | **Micro:** 1 question: "What nearly stopped you buying?" → Reply goes to founder Slack. |

**Metrics:** Renewal rate, Cross-sell attachment rate, LTV, Referral rate, NPS, Repeat purchase interval
**Automation:** 
- Renewal sequence: Day 330, 340, 350, 360 (auto-renew option)
- Cross-sell: Day 7, 30, 90 (category-based)
- Loyalty: Monthly points statement + tier progress
- Referral: Post-activation Day 3 (peak satisfaction)

---

## FRICTION HEATMAP (Priority Fixes)

| Priority | Friction Point | Stage | Impact | Effort | Owner |
|----------|----------------|-------|--------|--------|-------|
| 1 | Delivery speed variance (P99 > 15 min) | Delivery | High | Medium | Ops/Dev |
| 2 | Coupon validation errors in cart | Decision | High | Low | Dev |
| 3 | No guest order lookup | Delivery | Medium | Low | Dev |
| 4 | WhatsApp pre-sale reply > 2 min | Consideration | High | Medium | Support |
| 5 | Activation guides outdated | Activation | High | Low | Content |
| 6 | No referral tracking | Retention | Medium | Medium | Dev/Marketing |
| 7 | Payment method confusion (Transfer) | Decision | Medium | Low | Content/UX |
| 8 | Guarantee details hidden | Consideration/Decision | Medium | Low | Content |

---

## AUTOMATION MATRIX

| Trigger | Channel | Template | Delay | Condition |
|---------|---------|----------|-------|-----------|
| Signup | Email | Welcome 1 (Guide + VAL10) | Immediate | — |
| Signup | Email | Welcome 2 (Delivery Proof) | 24h | No purchase |
| Signup | Email | Welcome 3 (Social Proof) | 48h | No purchase |
| Product View | WhatsApp | "Seen Netflix 4K — 3 min delivery. Questions?" | 30 min | No cart add |
| Cart Abandon | Email | "Your Netflix 4K waiting — VAL10 valid 24h" | 1h | Cart value > $15 |
| Cart Abandon | WhatsApp | Deep link to cart with VAL10 applied | 4h | Mobile user |
| Purchase | WhatsApp | Delivery message (auto) | <5 min | Payment confirmed |
| Delivery | WhatsApp | "Working? 👍/👎" | 10 min | Delivered |
| 👎 Reply | WhatsApp | Support ticket + "Replacing now" | Immediate | — |
| Activation | Email | "Enjoy! Need anything else?" | Day 7 | 👍 replied |
| Renewal Due | Email | Personalized renew + VAL10 | Day 330 | Active license |
| Renewal Due | WhatsApp | "Renew in 1 click — same 3 min" | Day 340 | No renew |
| Cross-sell | Email | Category-based recommendation | Day 7, 30, 90 | Activated |
| Referral Ask | WhatsApp | "Give $5, get $5 — share link" | Day 3 | Activated |

---

## MEASUREMENT DASHBOARD (Weekly Review)

| Metric | Target | Current | Trend | Action if Off |
|--------|--------|---------|-------|---------------|
| **Awareness** | | | | |
| Blended CAC | <$8 | — | — | Optimize ad creative / SEO |
| Organic traffic (license keywords) | +20% MoM | — | — | Content velocity |
| **Consideration** | | | | |
| Product page CVR | >3.5% | — | — | Add trust elements, video demo |
| WhatsApp pre-sale conversations | >50/week | — | — | Promote WhatsApp CTA |
| **Decision** | | | | |
| Cart → Checkout | >65% | — | — | Fix coupon, payment UX |
| Coupon redemption (VAL10) | >25% of orders | — | — | Promote earlier in funnel |
| **Delivery** | | | | |
| P50 Delivery Time | <3 min | — | — | Distributor API health |
| P99 Delivery Time | <10 min | — | — | Alerting + fallback |
| **Activation** | | | | |
| First-try activation rate | >95% | — | — | Improve guides |
| Replacement rate | <2% | — | — | Supplier quality audit |
| **Retention** | | | | |
| 90-day repeat purchase rate | >30% | — | — | Loyalty + cross-sell |
| Referral revenue % | >10% | — | — | Simplify referral flow |
| LTV (12-month) | >$120 | — | — | Bundle / subscription upsell |

---

## NEXT ACTIONS

1. **This Week:** Implement Delivery SLA monitoring (P50/P90/P99 alerts)
2. **This Week:** Fix coupon validation UX in cart drawer
3. **This Week:** Create per-product activation guides (Netflix, ChatGPT, Adobe, NordVPN)
4. **Next Week:** Build referral tracking + "Give $5 Get $5" flow
5. **Next Week:** Launch renewal reminder sequence (Day 330/340/350/360)
6. **Month 1:** Geo-specific landing pages for top 5 countries by traffic
7. **Month 1:** Competitor comparison section on product pages
8. **Month 2:** Loyalty program (points + tiers) implementation