export default function MockupPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(135deg,#060816_0%,#0f172a_100%)] text-slate-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-blue-950/40 backdrop-blur">
          <div className="grid gap-10 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
                Mockup preview
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Turn your hotel growth engine into a premium digital experience.
                </h1>
                <p className="max-w-2xl text-lg text-slate-300">
                  A simple preview of the direction for your services page, combining paid search, SEO, AI concierge, and direct booking growth in one clear story.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
                >
                  Book a strategy call
                </a>
                <a
                  href="/services"
                  className="rounded-full border border-white/15 px-5 py-3 font-medium text-slate-100 transition hover:bg-white/10"
                >
                  View services
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Growth snapshot</p>
                  <p className="text-2xl font-semibold">+42% direct bookings</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                  Live
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ["Google & Bing Ads", "+28% qualified traffic"],
                  ["SEO & Global Search", "+19% organic visibility"],
                  ["Direct Booking AI", "+14% conversion uplift"],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{title}</span>
                      <span className="text-sm text-slate-400">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Digital concierge",
              text: "Automate guest communication, upsells, and support around the clock.",
            },
            {
              title: "CEO command center",
              text: "A live operating layer for reporting, action plans, and performance visibility.",
            },
            {
              title: "Premium positioning",
              text: "Bring every growth channel together under one elegant, measurable strategy.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30">
              <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
              <p className="text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
