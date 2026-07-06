import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import "./NightDeskHome.css";

const initialMessageSteps = [
  { step: 1, text: "Hi — do you have parking? We land past midnight.", cls: "guest" },
  { step: 2, text: "Yes! Valet parking is $38/night, and our night entrance stays open — just buzz on arrival. What dates are you looking at?", cls: "ai" },
  { step: 3, text: "This Friday to Sunday. King room if possible.", cls: "guest" },
  { step: 4, text: "Great — I'll have the team confirm a king for Fri–Sun and hold your request. Best number or email to reach you?", cls: "ai" },
];

const qa = {
  pets: {
    q: "Are pets allowed?",
    a: "Yes — well-behaved dogs are welcome for a $30/night fee. We even keep treats at the desk. 🐾 Anything else I can help with?",
  },
  breakfast: {
    q: "Is breakfast included?",
    a: "It is! Breakfast is served 7:00–10:30 AM in the garden room, included with every rate.",
  },
  cancel: {
    q: "What's your cancellation policy?",
    a: "Free cancellation up to 48 hours before arrival. Inside 48 hours, the first night is charged. Want me to note your dates for the team?",
  },
} as const;

type QaKey = keyof typeof qa;

type ExtraMessage = {
  id: string;
  text: string;
  cls: "guest" | "ai";
};

function NightDeskHome() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [extraMessages, setExtraMessages] = useState<ExtraMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [disabledChips, setDisabledChips] = useState<Record<QaKey, boolean>>({
    pets: false,
    breakfast: false,
    cancel: false,
  });
  const [navOpen, setNavOpen] = useState(false);
  const timeouts = useRef<number[]>([]);
  const reduced = useRef(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const stepMessages = useMemo(
    () =>
      initialMessageSteps.map((message) => (
        <div
          key={message.step}
          className={`msg ${message.cls} ${visibleSteps.includes(message.step) ? "show" : ""}`}
          data-step={message.step}
        >
          {message.text}
        </div>
      )),
    [visibleSteps]
  );

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced.current) {
      setVisibleSteps([1, 2, 3, 4, 5]);
      return;
    }

    let sequenceDelay = 600;
    const sequence = [
      { step: 1, delay: 900 },
      { typing: true, delay: 1000 },
      { step: 2, delay: 2100 },
      { step: 3, delay: 1800 },
      { typing: true, delay: 950 },
      { step: 4, delay: 2000 },
      { step: 5, delay: 1300 },
    ];

    sequence.forEach((item) => {
      const timeout = window.setTimeout(() => {
        if (item.typing) {
          setShowTyping(true);
        } else if (item.step) {
          setShowTyping(false);
          setVisibleSteps((current) => Array.from(new Set([...current, item.step!])));
        }
      }, sequenceDelay);
      timeouts.current.push(timeout);
      sequenceDelay += item.delay;
    });

    return () => {
      timeouts.current.forEach((timer) => window.clearTimeout(timer));
      timeouts.current = [];
    };
  }, []);

  useEffect(() => {
    if (reduced.current || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChipClick = (key: QaKey) => {
    const selected = qa[key];
    timeouts.current.forEach((timer) => window.clearTimeout(timer));
    timeouts.current = [];

    setVisibleSteps([1, 2, 3, 4]);
    setShowTyping(true);
    setDisabledChips((current) => ({ ...current, [key]: true }));
    setExtraMessages((current) => [
      ...current,
      { id: `guest-${key}`, text: selected.q, cls: "guest" },
    ]);

    if (reduced.current) {
      setExtraMessages((current) => [
        ...current,
        { id: `ai-${key}`, text: selected.a, cls: "ai" },
      ]);
      setShowTyping(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowTyping(false);
      setExtraMessages((current) => [
        ...current,
        { id: `ai-${key}`, text: selected.a, cls: "ai" },
      ]);
    }, 950);
    timeouts.current.push(timeout);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = `Name: ${formData.get("name")}\\nEmail: ${formData.get("email")}\\nHotel website: ${formData.get("website")}\\nBiggest headache: ${formData.get("pain")}`;
    window.location.href = `mailto:hello@nightdesk.agency?subject=Demo%20request%20—%20${encodeURIComponent(
      String(formData.get("name"))
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>

      <header>
        <div className="wrap">
          <nav>
            <a className="brand" href="#top" onClick={() => setNavOpen(false)}>
              <span className="mark" aria-hidden="true" />Night Desk
            </a>
            <button
              type="button"
              className={`nav-toggle${navOpen ? " open" : ""}`}
              aria-expanded={navOpen}
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setNavOpen((current) => !current)}
            >
              <span className="bar" />
            </button>
            <div className={`navlinks${navOpen ? " open" : ""}`}>
              <a href="#problem" onClick={() => setNavOpen(false)}>The problem</a>
              <a href="#services" onClick={() => setNavOpen(false)}>Services</a>
              <a href="#how" onClick={() => setNavOpen(false)}>How it works</a>
              <a href="#pricing" onClick={() => setNavOpen(false)}>Pricing</a>
              <a href="#pilot" onClick={() => setNavOpen(false)}>Pilot</a>
              <a href="#faq" onClick={() => setNavOpen(false)}>FAQ</a>
            </div>
            <a className="btn primary cta-desktop" href="#pilot">
              Get your demo
            </a>
          </nav>
        </div>
      </header>
      <a className="floating-cta" href="#pilot">
        Get your demo
      </a>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">
                <span className="pulse" aria-hidden="true" />
                <span className="mono">2:47 AM · A guest is asking about a king room</span>
              </div>
              <h1>
                Answered at 2 AM.
                <br />
                <em className="lamp">Booked by 9.</em>
              </h1>
              <p className="lead">
                Night Desk is a done-for-you AI front desk for independent hotels. It answers guest questions 24/7, texts back every missed call,
                and drops hot booking leads straight to your phone — no PMS, no tech skills, live in 7 days.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#pilot">
                  Start the 21-day pilot
                </a>
                <a className="btn ghost" href="#night">
                  See one night on duty
                </a>
              </div>
              <div className="trust">
                <span>
                  <b>No PMS</b> required
                </span>
                <span>
                  <b>Live in 7 days</b>
                </span>
                <span>
                  <b>Cancel anytime</b>, month-to-month
                </span>
              </div>
            </div>

            <div className="phone" aria-label="Interactive demo of Night Desk answering a guest">
              <div className="phone-head">
                <div className="phone-hotel">
                  <span className="avatar">🏨</span>Your Hotel · Web chat
                </div>
                <span className="demo-tag">Live demo</span>
                <div className="phone-time">2:47 AM</div>
              </div>
              <div className="chat" id="chat" ref={chatRef}>
                {stepMessages}
                {extraMessages.map((message) => (
                  <div key={message.id} className={`msg ${message.cls} show`}>
                    {message.text}
                  </div>
                ))}
                <div className={`typing${showTyping ? " show" : ""}`} id="typing" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="chips" id="chips">
                <span>Try it yourself — tap a question:</span>
                <button className="chip" type="button" data-q="pets" disabled={disabledChips.pets} onClick={() => handleChipClick("pets")}>Are pets allowed?</button>
                <button className="chip" type="button" data-q="breakfast" disabled={disabledChips.breakfast} onClick={() => handleChipClick("breakfast")}>Is breakfast included?</button>
                <button className="chip" type="button" data-q="cancel" disabled={disabledChips.cancel} onClick={() => handleChipClick("cancel")}>Cancellation policy?</button>
              </div>
              <div className={`lead-ping${visibleSteps.includes(5) ? " show" : ""}`} data-step="5">
                <span className="bell" aria-hidden="true">
                  🔔
                </span>
                <div>
                  <p>Hot lead → owner's phone · 2:49 AM</p>
                  <p>King room, Fri–Sun, 2 guests, late arrival. Contact captured.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="strip">
          <div className="wrap">
            <span className="label">Works with your site &amp; channels</span>
            <b>WordPress</b>
            <b>Wix</b>
            <b>Squarespace</b>
            <b>Webflow</b>
            <b>Custom sites</b>
            <b>SMS</b>
            <b>WhatsApp</b>
          </div>
        </div>

        <section id="problem">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="mono">The 2 AM problem</span>
              <h2>Running an independent hotel means the questions never stop. Your day does.</h2>
            </div>
            <div className="prob-grid">
              <div className="prob reveal">
                <div className="big">After 6 PM</div>
                <h3>Inquiries keep coming. Answers don't.</h3>
                <p>A large share of booking questions arrive after hours — when your desk is dark. Guests who wait don't wait long.</p>
              </div>
              <div className="prob reveal">
                <div className="big">The same 20</div>
                <h3>Questions, every single day.</h3>
                <p>Check-in time, parking, pets, breakfast. Hours of skilled staff time spent typing the same answers instead of hosting guests.</p>
              </div>
              <div className="prob reveal">
                <div className="big">15–25%</div>
                <h3>Silence sends guests to the OTAs.</h3>
                <p>Every guest who gives up on your site and books on Booking.com or Expedia costs you the commission — on that stay and often every stay after.</p>
              </div>
              <div className="prob reveal">
                <div className="big">Ring… ring…</div>
                <h3>Missed calls are missed bookings.</h3>
                <p>The caller who hits voicemail doesn't leave a message. They dial the next hotel on the list.</p>
              </div>
              <div className="prob anchor reveal">
                <div>
                  <h3 className="anchor-title">A night receptionist costs $2,000–4,000/month.</h3>
                  <p>Night Desk does the night shift — answering, capturing, alerting — for a fraction of one part-time salary. And it never calls in sick.</p>
                </div>
                <div className="big">From $650/mo</div>
              </div>
            </div>
          </div>
        </section>

        <section id="night" className="section-tight">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="mono">One night on duty</span>
              <h2>What happens at your hotel while you sleep.</h2>
              <p>This is a real shift, not a feature list. Every hour below is revenue that either gets caught — or quietly walks to Booking.com.</p>
            </div>
            <div className="timeline">
              <div className="tl-row reveal">
                <div className="tl-time">
                  10:52 PM<span>Front desk empty</span>
                </div>
                <div className="tl-spine">
                  <div className="tl-dot" />
                </div>
                <div className="tl-card">
                  <h3>A call rings out. Nobody picks up.</h3>
                  <p>Within 30 seconds the caller gets a text: "Sorry we missed you — how can we help?" The conversation continues by SMS instead of ending at voicemail.</p>
                  <span className="result">Missed call becomes a captured conversation</span>
                </div>
              </div>
              <div className="tl-row reveal">
                <div className="tl-time">
                  2:47 AM<span>Guest on your website</span>
                </div>
                <div className="tl-spine">
                  <div className="tl-dot" />
                </div>
                <div className="tl-card">
                  <h3>Someone asks about a king room this weekend.</h3>
                  <p>Night Desk answers your policies instantly — in the guest's own language — captures dates, room preference, and contact info, then pings your phone.</p>
                  <span className="result">Booking intent lands in your pocket, not your competitor's</span>
                </div>
              </div>
              <div className="tl-row reveal">
                <div className="tl-time">
                  7:30 AM<span>You wake up</span>
                </div>
                <div className="tl-spine">
                  <div className="tl-dot" />
                </div>
                <div className="tl-card">
                  <h3>One message. The whole night, summarized.</h3>
                  <p>Your flash report: inquiries answered, calls recovered, hot leads waiting, new reviews overnight. Coffee first, then two calls that are already half-closed.</p>
                  <span className="result">Zero apps to open. One message to read.</span>
                </div>
              </div>
              <div className="tl-row reveal">
                <div className="tl-time">
                  9:15 AM<span>Yesterday's checkouts</span>
                </div>
                <div className="tl-spine">
                  <div className="tl-dot" />
                </div>
                <div className="tl-card">
                  <h3>Happy guests get a review request. A rough stay gets a lifeline.</h3>
                  <p>Guests who loved it are invited to say so on Google. A guest with a problem gets a private message to management — so you fix it before it becomes a public one-star.</p>
                  <span className="result">More five-stars in. Fewer surprises on TripAdvisor.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="mono">What we install</span>
              <h2>Five services. Zero software for you to learn.</h2>
              <p>Every card below shows exactly what lands on your phone. We build it, train it, and maintain it — you approve and collect the leads.</p>
            </div>

            <div className="svc flag reveal">
              <div className="txt">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 12a9 9 0 1 1-9-9c0 5 4 9 9 9z" />
                    <path d="M8 13h5M8 9.5h8" />
                  </svg>
                </div>
                <span className="mono">Flagship · included in Core Desk</span>
                <h3 className="big">The Night Desk — your 24/7 AI receptionist</h3>
                <p>A friendly assistant on your website and SMS that knows your hotel inside out — trained only on your info, nothing invented.</p>
                <span className="getlabel">What you get</span>
                <ul className="getlist">
                  <li>A chat bubble on your website that answers guests instantly, day and night</li>
                  <li>The same assistant on SMS — WhatsApp added once approved</li>
                  <li>Speaks your guest's language automatically</li>
                  <li>Every booking question becomes a text to <b>your</b> phone with the guest's details</li>
                  <li>It never guesses rates or availability — real revenue questions go to you</li>
                </ul>
              </div>
              <div className="mini" aria-hidden="true">
                <div className="cap">
                  <span>Your website · 2:47 AM</span>
                  <span>Guest view</span>
                </div>
                <div className="m-bubble g">Est-ce que le petit-déjeuner est inclus ?</div>
                <div className="m-bubble a">Oui ! Le petit-déjeuner est servi de 7h à 10h30, inclus dans votre tarif. 🥐</div>
                <div className="m-notif spaced-top">
                  <div className="app">
                    <b>Night Desk</b>
                    <span>your phone · now</span>
                  </div>
                  <p>🔔 Hot lead: French-speaking guest, 2 nights, asking about family room. Contact captured.</p>
                </div>
              </div>
            </div>

            <div className="svc reveal">
              <div className="txt">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
                  </svg>
                </div>
                <span className="mono">Included free with Core Desk</span>
                <h3 className="big">Missed-Call Text-Back</h3>
                <p>Your phone still drives bookings. Now no call ends at voicemail.</p>
                <span className="getlabel">What you get</span>
                <ul className="getlist">
                  <li>Every call your desk can't answer gets a friendly text within 30 seconds</li>
                  <li>The guest replies by text — the conversation is saved, not lost</li>
                  <li>Serious booking interest triggers an instant alert to your phone</li>
                  <li>Works with your existing phone number — nothing changes for guests</li>
                </ul>
              </div>
              <div className="mini" aria-hidden="true">
                <div className="cap">
                  <span>Guest's phone · 10:52 PM</span>
                  <span>SMS</span>
                </div>
                <div className="m-notif">
                  <div className="app">
                    <b>Your Hotel</b>
                    <span>30 sec after the missed call</span>
                  </div>
                  <p>Sorry we missed your call! This is the team at Your Hotel — how can we help? Reply here anytime. 🌙</p>
                </div>
                <div className="m-bubble g spaced-top">
                  Was calling to ask if you have rooms this Saturday
                </div>
                <div className="m-bubble a">We'd love to have you! How many guests, and how many nights?</div>
              </div>
            </div>

            <div className="svc reveal">
              <div className="txt">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9 9.1 8z" />
                  </svg>
                </div>
                <span className="mono">Add-on · in Pro &amp; Max</span>
                <h3 className="big">Feedback &amp; Recovery</h3>
                <p>More five-star reviews in. Problems fixed in private, before they go public.</p>
                <span className="getlabel">What you get</span>
                <ul className="getlist">
                  <li>Happy guests get a review invite at the perfect moment after checkout</li>
                  <li>Every new review gets a reply drafted for you — approve with one tap</li>
                  <li>Unhappy guests get a private line to you first — fix it before TripAdvisor sees it</li>
                  <li>Nothing is ever posted without your OK. No gating, no fakes — ever</li>
                </ul>
              </div>
              <div className="mini" aria-hidden="true">
                <div className="cap">
                  <span>Your phone · 11:04 AM</span>
                  <span>One-tap approve</span>
                </div>
                <div className="m-notif">
                  <div className="app">
                    <b>New Google review</b>
                    <span>reply drafted</span>
                  </div>
                  <div className="m-stars">★★★★★</div>
                  <p>"Beautiful room, and someone answered our questions at midnight!"</p>
                  <p className="aside-note">
                    Draft reply: "Thank you, Sarah! Our night desk never sleeps — we'd love to welcome you back."
                  </p>
                  <div className="m-approve">
                    <span className="ok">Approve ✓</span>
                    <span className="edit">Edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="svc reveal">
              <div className="txt">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </svg>
                </div>
                <span className="mono">Included lite in Core Desk</span>
                <h3 className="big">Owner Flash Report</h3>
                <p>The whole night, in one message, before your first coffee.</p>
                <span className="getlabel">What you get</span>
                <ul className="getlist">
                  <li>One message every morning at 7:30 AM — no dashboard, no login</li>
                  <li>Last night in 10 seconds: questions answered, calls recovered, leads waiting, new reviews</li>
                  <li>Built only from what the system genuinely tracks — we never invent numbers</li>
                  <li>Occupancy &amp; pickup added once a data source exists (booking engine, shared sheet, or light PMS API)</li>
                </ul>
              </div>
              <div className="mini" aria-hidden="true">
                <div className="cap">
                  <span>Your phone · 7:30 AM</span>
                  <span>Daily</span>
                </div>
                <div className="m-notif">
                  <div className="app">
                    <b>Night Desk · Flash Report</b>
                    <span>Tue</span>
                  </div>
                  <div className="m-row">
                    <span>Inquiries answered overnight</span>
                    <b>6</b>
                  </div>
                  <div className="m-row">
                    <span>Missed calls recovered</span>
                    <b>1</b>
                  </div>
                  <div className="m-row">
                    <span>Hot leads waiting for you</span>
                    <b>2</b>
                  </div>
                  <div className="m-row">
                    <span>New reviews</span>
                    <b>1 ★★★★★</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="svc reveal">
              <div className="txt">
                <div className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 7l9 6 9-6" />
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                  </svg>
                </div>
                <span className="mono">Month 2+ · qualifying hotels</span>
                <h3 className="big">Direct Booking Recovery</h3>
                <p>The direct attack on OTA commissions — added once we've scoped your booking flow.</p>
                <span className="getlabel">What you get</span>
                <ul className="getlist">
                  <li>Guests who start booking on your site but stop get a gentle nudge to finish</li>
                  <li>OTA guests get a "book direct next time" offer after their stay</li>
                  <li>An alert the moment an OTA undercuts your own website's rate</li>
                </ul>
                <p className="note">Honest note: this one depends on your booking engine and data. We scope it with you in month 2 — we don't promise it cold.</p>
              </div>
              <div className="mini" aria-hidden="true">
                <div className="cap">
                  <span>Guest's inbox · next morning</span>
                  <span>Recovery</span>
                </div>
                <div className="m-notif">
                  <div className="app">
                    <b>Your Hotel</b>
                    <span>email</span>
                  </div>
                  <p>
                    <b className="subtle">Still thinking it over?</b>
                  </p>
                  <p className="tight-top">
                    Your dates for the Garden King are still open. Book direct and late checkout is on us. →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="section-tight">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="mono">How it works</span>
              <h2>From "interested" to live in 7 days.</h2>
              <p>You spend about 20 minutes total. We do everything else.</p>
            </div>
            <div className="steps">
              <div className="step reveal">
                <span className="day">Day 1</span>
                <h3>You tell us about your hotel</h3>
                <p>A 15-minute form: your FAQs, policies, room types, booking link. That's your entire workload.</p>
              </div>
              <div className="step reveal">
                <span className="day">Days 2–4</span>
                <h3>We train your AI</h3>
                <p>Built on your property's information only — your tone, your rules. It won't answer what you haven't approved.</p>
              </div>
              <div className="step reveal">
                <span className="day">Days 5–6</span>
                <h3>We install it</h3>
                <p>Website widget on any platform, text-back on your existing number. You never touch code.</p>
              </div>
              <div className="step reveal">
                <span className="day">Day 7</span>
                <h3>It's live. You relax.</h3>
                <p>Alerts on. Morning report on. Your night shift is covered from tonight.</p>
              </div>
            </div>
            <div className="reveal">
              <div className="guarantee">
                ⏱ <span><b>7-day setup guarantee.</b> If your Night Desk isn't live in 7 days, setup is free.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="math">
          <div className="wrap math-grid">
            <div className="reveal">
              <span className="mono">The napkin math</span>
              <h2>It pays for itself at two bookings.</h2>
              <p>OTAs take 15–25% of every reservation they touch. Night Desk exists to catch the guests who were already on <em className="lamp">your</em> website and <em className="lamp">your</em> phone line — and were about to leave because nobody answered.</p>
            </div>
            <div className="math-card reveal">
              <div className="math-line"><span>Average boutique stay</span><b>$350</b></div>
              <div className="math-line"><span>Direct bookings recovered / month</span><b>× 2</b></div>
              <div className="math-line total"><span>Recovered revenue</span><b>$700</b></div>
              <div className="math-line"><span>Core Desk monthly</span><b>$650</b></div>
              <div className="math-foot">Two recovered bookings covers the retainer. Everything after that — and every OTA commission avoided — is yours.</div>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="mono">Pricing</span>
              <h2>Three ways in. Most hotels start in the middle.</h2>
              <p>Setup covers training the system on your property. Monthly covers hosting, monitoring, updates — and a human who answers when something needs changing.</p>
            </div>
            <div className="tiers">
              <div className="tier reveal">
                <h3>Lifeline</h3>
                <p className="who">For hotels that mainly bleed on missed calls and reviews.</p>
                <div className="price">$300<small>/mo</small></div>
                <div className="setup">+ $500 setup</div>
                <ul>
                  <li>Missed-Call Text-Back</li>
                  <li>Feedback &amp; Recovery</li>
                  <li>Review replies, owner-approved</li>
                  <li>Monthly summary report</li>
                </ul>
                <a className="btn ghost" href="#pilot">Ask about Lifeline</a>
              </div>
              <div className="tier feat reveal">
                <span className="tag">Best fit</span>
                <h3>Core Desk</h3>
                <p className="who">The flagship. Your night shift, fully covered.</p>
                <div className="price">$650<small>/mo</small></div>
                <div className="setup">+ $1,000 setup</div>
                <ul>
                  <li>Night Desk AI messaging — 24/7</li>
                  <li>Missed-Call Text-Back <b className="highlight">included</b></li>
                  <li>Owner Flash Report (lite)</li>
                  <li>Up to 50 FAQs · 3 languages</li>
                  <li>Web chat + SMS (WhatsApp on approval)</li>
                  <li>Hot-lead alerts to your phone</li>
                </ul>
                <a className="btn primary" href="#pilot">Start the 21-day pilot</a>
              </div>
              <div className="tier reveal">
                <h3>Max Revenue</h3>
                <p className="who">For hotels ready to attack OTA leakage directly.</p>
                <div className="price">$950<small>/mo</small></div>
                <div className="setup">+ $1,500 setup · month 2+</div>
                <ul>
                  <li>Everything in Core Desk</li>
                  <li>Feedback &amp; Recovery</li>
                  <li>Direct Booking Recovery</li>
                  <li className="dim">Rate-parity alerts where supported</li>
                  <li className="dim">Full flash report once data source exists</li>
                </ul>
                <a className="btn ghost" href="#pilot">Qualify for Max Revenue</a>
              </div>
            </div>
            <p className="pricing-foot reveal"><b>Month-to-month. Cancel anytime with 30 days' notice.</b> No long contracts, no per-conversation surprise fees.</p>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap">
            <div className="founding reveal">
              <div className="fmark">10</div>
              <div>
                <span className="mono">Founding properties</span>
                <h2 className="section-offset">No fake testimonials. Just founding-client terms.</h2>
                <p>We're a new studio, and we won't show you stock-photo "clients" from Lisbon. Instead: we're onboarding our first 10 properties in the New York area at founding terms — direct access to the founder, input on what we build next, and your pricing locked for 12 months. When the results are in, this section will show real numbers from real hotels, with their permission.</p>
                <div className="perks">
                  <span className="perk">Founder-direct support</span>
                  <span className="perk">Pricing locked 12 months</span>
                  <span className="perk">Shape the roadmap</span>
                  <span className="perk">First case-study spotlight</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pilot" className="section-tight">
          <div className="wrap">
            <div className="pilot-box reveal">
              <div>
                <span className="mono">The 21-day pilot</span>
                <h2>See it work on your hotel before you commit.</h2>
                <p>We install Core Desk on one channel and measure from day one. At the end of 21 days you see exactly what the system caught — in your numbers, not ours.</p>
                <ul className="pilot-metrics">
                  <li>% of inquiries answered in under 5 minutes</li>
                  <li>Booking intents captured, with contact info</li>
                  <li>After-hours calls recovered by text-back</li>
                </ul>
                <div className="pilot-quote">
                  <blockquote>"Send me your hotel's website. I'll build a working demo trained on your property — test it yourself, ask it about your own parking policy."</blockquote>
                  <div className="founder">
                    <span className="fmark">R</span>
                    <span>Reda · Founder, Night Desk<br />You deal with me directly. No account managers.</span>
                  </div>
                </div>
              </div>
              <form className="lead-form" id="leadform" onSubmit={handleSubmit}>
                <span className="mono">Get your free demo</span>
                <label>
                  Your name
                  <input type="text" name="name" placeholder="Maria" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="you@yourhotel.com" required />
                </label>
                <label>
                  Hotel website
                  <input type="url" name="website" placeholder="https://yourhotel.com" required />
                </label>
                <label>
                  Biggest headache
                  <select name="pain">
                    <option>After-hours inquiries</option>
                    <option>Missed phone calls</option>
                    <option>Reviews &amp; reputation</option>
                    <option>OTA commissions</option>
                    <option>All of the above</option>
                  </select>
                </label>
                <button className="btn primary" type="submit">Build my hotel's demo →</button>
                <p className="fine">No spam. No commitment. A working demo of your hotel, usually within 48 hours.</p>
                <p className="alt">Prefer to talk? <a href="https://calendly.com/hello-nightdesk/30min" target="_blank" rel="noreferrer noopener">Book a 30-minute call</a></p>
              </form>
            </div>
          </div>
        </section>

        <section id="faq" className="section-tight">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="mono">Straight answers</span>
              <h2>The questions you should ask any "AI for hotels" vendor.</h2>
            </div>
            <div className="faq reveal">
              <details open>
                <summary>Can the AI confirm real-time availability?</summary>
                <p>Not unless your booking engine supports it — and we won't pretend otherwise. By default, Night Desk answers everything else instantly, captures the dates, room preference, and contact info, and alerts your team in real time. No booking lead dies overnight, and no guest gets told a room exists when it doesn't.</p>
              </details>
              <details>
                <summary>Do you need access to our PMS?</summary>
                <p>No. Core Desk launches with your website content, policies, and approved answers. If you later want occupancy-based reporting or booking recovery, we work with your booking engine via a simple webhook, a shared sheet you update daily, or a lightweight PMS API — your choice.</p>
              </details>
              <details>
                <summary>Will it work on my website platform?</summary>
                <p>Yes — WordPress, Wix, Squarespace, Webflow, or custom-built sites. Installation takes under 30 minutes and you never touch code. Missed-Call Text-Back works with your existing phone number.</p>
              </details>
              <details>
                <summary>What if it gives a guest a wrong answer?</summary>
                <p>It only answers from content you've approved. Anything outside that scope — rates it isn't sure of, requests it can't handle — gets escalated to a human instead of guessed. That boundary is the whole design.</p>
              </details>
              <details>
                <summary>Will it post review responses automatically?</summary>
                <p>Never. AI drafts every reply; you approve with one tap before anything is published. We follow Google's and TripAdvisor's rules — no review gating, no fake responses, ever.</p>
              </details>
              <details>
                <summary>Is guest messaging even legal? SMS rules, opt-ins?</summary>
                <p>We handle it: opt-in touchpoints (booking form, check-in QR, or website consent), compliant message templates, and respectful send windows — so you stay on the right side of SMS and WhatsApp rules without thinking about it.</p>
              </details>
              <details>
                <summary>Is this software we have to learn?</summary>
                <p>No. It's platform-grade automation delivered as a service. We build it, train it, monitor it, and update it. Your job is to answer hot-lead pings and approve review replies from your phone.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <span className="mark" aria-hidden="true" />Night Desk
              </div>
              <p>The AI front desk for independent hotels. Built to catch the bookings that walk away at night — without adding payroll, and without touching your PMS.</p>
            </div>
            <div className="foot-links">
              <a href="#services">Services</a>
              <a href="#pricing">Pricing</a>
              <a href="#pilot">21-day pilot</a>
              <a href="mailto:hello@nightdesk.agency">hello@nightdesk.agency</a>
            </div>
          </div>
          <div className="compliance">
            Night Desk is a trading name of Cleopargan LLC, New York, NY. Guest messaging runs on opt-in consent with compliant templates and send windows. Review responses are always owner-approved before publishing; we do not gate, filter, or fabricate reviews — and we don't fabricate testimonials either. © 2026 Night Desk · nightdesk.agency
          </div>
        </div>
      </footer>
    </>
  );
}

export default NightDeskHome;
