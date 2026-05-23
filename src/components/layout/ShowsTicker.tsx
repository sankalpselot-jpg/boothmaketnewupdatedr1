'use client'

const shows = [
  { flag: '🇩🇪', name: 'Hannover Messe',                 dates: '22–26 Jun · Hannover' },
  { flag: '🇬🇧', name: 'London Tech Week',               dates: '9–13 Jun · ExCeL London' },
  { flag: '🇮🇳', name: 'India International Trade Fair', dates: '14–27 Nov · Pragati Maidan' },
  { flag: '🇳🇱', name: 'Interpack Düsseldorf',           dates: '7–13 Aug · Düsseldorf' },
  { flag: '🇬🇧', name: 'The Meetings Show',              dates: '19–20 Jun · ExCeL London' },
  { flag: '🇮🇳', name: 'Auto Expo',                      dates: '17–22 Jan · Greater Noida' },
  { flag: '🇫🇷', name: 'Viva Technology',                dates: '11–14 Jun · Paris' },
  { flag: '🇮🇳', name: 'ELECRAMA',                       dates: '14–18 Feb · BIEC Bengaluru' },
  { flag: '🇪🇸', name: 'Mobile World Congress',          dates: '2–5 Mar · Barcelona' },
  { flag: '🇬🇧', name: 'UK Construction Week',           dates: 'Oct · NEC Birmingham' },
]

const doubled = [...shows, ...shows]

export default function ShowsTicker() {
  return (
    <div className="bg-[#F0ECE4] border-b border-[#DDD8CF] py-2.5 overflow-hidden relative">
      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[0.1em] text-[#6B6B6B] bg-[#F0ECE4] pr-3 z-10 uppercase pointer-events-none">
        Upcoming Shows
      </div>
      <div
        className="flex w-max pl-[190px] bm-ticker"
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {doubled.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 px-7 border-r border-[#DDD8CF] whitespace-nowrap text-[12.5px]">
            <span className="text-sm">{s.flag}</span>
            <strong className="text-[#0D1B2A] font-medium">{s.name}</strong>
            <span className="text-[#6B6B6B]">{s.dates}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
