import { Zap, ArrowRight, Music, Play, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface HeroProps {
  onStartListening: () => void
}

export default function Hero({ onStartListening }: HeroProps) {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#fffbeb]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Stats Column */}
          <div className="hidden lg:flex flex-col gap-6 w-72 shrink-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[#fb923c] rounded-[3rem] p-8 text-white h-full relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-5xl font-black mb-2">230+</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-tight">Concert <br /> Experience</p>
              </div>
              <div className="absolute top-8 right-8 w-16 h-16 border border-white/20 rounded-full flex items-center justify-center opacity-30">
                <div className="w-8 h-8 border border-white/40 rounded-full" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#fed7aa] rounded-[3rem] p-8 text-[#9a3412] h-full"
            >
              <h3 className="text-5xl font-black mb-2">100+</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-tight">Work With <br /> Singer's</p>
            </motion.div>
          </div>

          {/* Main Hero Center */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-white rounded-[4rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-[0_40px_80px_-15px_rgba(251,146,60,0.1)]"
          >
            <div className="flex-1 relative z-10 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-[#9a3412] leading-[1.1] mb-6 tracking-tighter">
                Experience the <br /> Ultimate <span className="text-[#fb923c]">DJ Vibes</span>
              </h1>
              <p className="text-sm font-black text-[#fb923c] uppercase tracking-[0.4em] mb-12">Your Soundtrack to the Nightlife</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <Button 
                  onClick={onStartListening}
                  className="bg-[#fb923c] text-white rounded-full px-12 py-8 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100 hover:bg-[#ea580c] transition-all"
                >
                  Attend Now
                </Button>
                <button onClick={onStartListening} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full border-2 border-[#fed7aa] flex items-center justify-center text-[#fb923c] group-hover:bg-[#fb923c] group-hover:text-white transition-all">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                  <span className="text-[10px] font-black text-[#fb923c] uppercase tracking-[0.2em]">Play Now...</span>
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <img src="/landing/hero_dj.png" className="w-full h-auto relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]" alt="DJ Character" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100 rounded-full blur-[100px] opacity-40" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#fb923c] rounded-[4rem] p-12 text-white flex items-center gap-10 overflow-hidden group"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-80">Services</h4>
              <p className="text-sm font-bold leading-relaxed mb-8 opacity-90">Creating soundtracks for unforgettable events. Professional DJ services tailored to you. From clubs to corporate, we've got the beats.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 cursor-pointer">f</div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 cursor-pointer">x</div>
              </div>
            </div>
            <div className="w-48 h-48 rounded-[3rem] overflow-hidden shadow-2xl shrink-0">
              <img src="/landing/service.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#9a3412] rounded-[4rem] p-12 text-white flex items-center gap-10 overflow-hidden group"
          >
            <div className="w-48 h-48 rounded-[3rem] overflow-hidden shadow-2xl shrink-0">
              <img src="/landing/event.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-80">Events Section</h4>
              <p className="text-sm font-bold leading-relaxed mb-8 opacity-90">Join us at our next event. The dance floor awaits. Feel the vibe: Upcoming DJ sessions. Don't miss out on upcoming parties.</p>
              <div className="flex justify-end gap-4 opacity-50">
                <span>© All Rights Reserved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
