const merchItems = [
  { id: 1, name: "Logo Tee - Black", price: "$35", stock: 142, image: "👕" },
  { id: 2, name: "Vinyl - Electric Pulse", price: "$28", stock: 56, image: "💿" },
  { id: 3, name: "Poster - Neon Lights Tour", price: "$15", stock: 230, image: "🖼️" },
  { id: 4, name: "Hoodie - Midnight Edition", price: "$55", stock: 89, image: "🧥" },
  { id: 5, name: "Sticker Pack", price: "$8", stock: 500, image: "✨" },
  { id: 6, name: "Cap - DistroKid Logo", price: "$22", stock: 178, image: "🧢" },
];

const events = [
  { id: 1, name: "Neon Lights Tour - NYC", date: "Mar 15, 2026", venue: "Madison Square Garden", ticketsSold: 18500, capacity: 20000, status: "On Sale" },
  { id: 2, name: "Electric Pulse Release Party", date: "Apr 2, 2026", venue: "The Roxy, LA", ticketsSold: 800, capacity: 800, status: "Sold Out" },
  { id: 3, name: "Summer Festival Set", date: "Jun 20, 2026", venue: "Coachella Valley", ticketsSold: 0, capacity: 50000, status: "Upcoming" },
  { id: 4, name: "Acoustic Session - London", date: "Jul 8, 2026", venue: "Royal Albert Hall", ticketsSold: 3200, capacity: 5000, status: "On Sale" },
];

export default function MerchAndEvents() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Merch & Events</h1>
        <p className="text-gray-400 mt-2">Sell merchandise and manage your upcoming events</p>
      </div>

      {/* Events Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <button className="rounded-full bg-[#5227FF] px-5 py-2 text-sm font-medium hover:bg-[#6B3FFF] transition-colors">
            + Add Event
          </button>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-lg bg-gray-800 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs text-gray-500 uppercase">{event.date.split(" ")[0]}</span>
                  <span className="text-xl font-bold">{event.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-gray-400">{event.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium">{event.ticketsSold.toLocaleString()} / {event.capacity.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">tickets</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  event.status === "Sold Out" ? "bg-red-900/40 text-red-400" :
                  event.status === "On Sale" ? "bg-green-900/40 text-green-400" :
                  "bg-yellow-900/40 text-yellow-400"
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Merch Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Merchandise</h2>
          <button className="rounded-full bg-[#5227FF] px-5 py-2 text-sm font-medium hover:bg-[#6B3FFF] transition-colors">
            + Add Item
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {merchItems.map((item) => (
            <div key={item.id} className="group rounded-xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-[#5227FF] transition-all cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:from-gray-700 group-hover:to-gray-800 transition-colors">
                <span className="text-5xl">{item.image}</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-[#5227FF]">{item.price}</span>
                  <span className="text-xs text-gray-500">{item.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}