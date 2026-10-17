import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Calculator,
  Bike, Award, HelpCircle, Truck, RefreshCw, Phone, Mail, ArrowRight,
  Sparkles, Clock, Ruler
} from 'lucide-react'

export default function InfoPage({ pageType }) {
  const location = useLocation()
  const type = pageType || location.pathname.replace('/', '')

  // Finance Calculator State
  const [loanAmount, setLoanAmount] = useState(3500)
  const [depositPercent, setDepositPercent] = useState(10)
  const [termMonths, setTermMonths] = useState(24)

  const depositAmount = Math.round((loanAmount * depositPercent) / 100)
  const financedAmount = loanAmount - depositAmount
  const monthlyPayment = Math.ceil(financedAmount / termMonths)

  // Cycle to Work Calculator State
  const [bikePackageValue, setBikePackageValue] = useState(2500)
  const [taxRate, setTaxRate] = useState(40) // 20% standard, 40% higher
  const c2wEstimatedSavings = Math.round((bikePackageValue * (taxRate + 2)) / 100)
  const c2wNetCost = bikePackageValue - c2wEstimatedSavings
  const c2wMonthlyDeduction = Math.round(c2wNetCost / 12)

  return (
    <div className="pt-[var(--pb-nav-height,112px)] min-h-screen bg-pb-black">
      {/* Header Banner */}
      <div className="bg-pb-black-card border-b border-pb-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-xs font-body text-pb-muted mb-4">
            <Link to="/" className="hover:text-pb-orange transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white capitalize">{type.replace('-', ' ')}</span>
          </nav>

          {type === 'finance' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-pb-orange/15 border border-pb-orange/30 text-xs font-display font-700 text-pb-orange uppercase tracking-wider mb-3">
                <CreditCard size={14} /> 0% APR Representative
              </div>
              <h1 className="pb-title text-white tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Interest-Free Finance
              </h1>
              <p className="text-pb-silver max-w-2xl text-base mt-2 font-body">
                Split your mountain bike purchase into bite-sized monthly payments with 0% APR interest across 12, 24, or 36 months. Instant decision, zero hidden charges.
              </p>
            </div>
          )}

          {type === 'cycle-to-work' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-pb-success/15 border border-pb-success/30 text-xs font-display font-700 text-pb-success uppercase tracking-wider mb-3">
                <Bike size={14} /> Save up to 42% on Mountain Bikes & Gear
              </div>
              <h1 className="pb-title text-white tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Cycle to Work Scheme
              </h1>
              <p className="text-pb-silver max-w-2xl text-base mt-2 font-body">
                Pay through salary sacrifice with tax exemption on full suspension bikes, e-MTBs, safety gear, and accessories.
              </p>
            </div>
          )}

          {type === 'advice' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-pb-orange/15 border border-pb-orange/30 text-xs font-display font-700 text-pb-orange uppercase tracking-wider mb-3">
                <Ruler size={14} /> Technical Buyer's Resource
              </div>
              <h1 className="pb-title text-white tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                MTB Sizing & Geometry Guide
              </h1>
              <p className="text-pb-silver max-w-2xl text-base mt-2 font-body">
                Understand reach, stack, head tube angles, and find the perfect mountain bike frame size tailored to your height and riding discipline.
              </p>
            </div>
          )}

          {type === 'help' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-pb-orange/15 border border-pb-orange/30 text-xs font-display font-700 text-pb-orange uppercase tracking-wider mb-3">
                <ShieldCheck size={14} /> Cytech Workshop Inspection
              </div>
              <h1 className="pb-title text-white tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Customer Care & Workshop Guarantee
              </h1>
              <p className="text-pb-silver max-w-2xl text-base mt-2 font-body">
                Every Peak Bikes build undergoes a rigorous 42-point Cytech Pre-Delivery Inspection (PDI), certified shock tune, and premium dispatch packaging.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* FINANCE PAGE CONTENT */}
        {type === 'finance' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Interactive Calculator */}
              <div className="lg:col-span-7 bg-pb-black-card border border-pb-border p-6 sm:p-8 rounded-sm space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-pb-border">
                  <Calculator size={20} className="text-pb-orange" />
                  <h2 className="font-display font-800 text-lg uppercase text-white tracking-wide">
                    0% APR Finance Calculator
                  </h2>
                </div>

                {/* Bike Value Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-pb-silver font-display font-700 uppercase tracking-wider">Purchase Price</span>
                    <span className="text-white font-mono font-bold text-xl">£{loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="8000"
                    step="100"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-pb-orange cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-pb-muted mt-1 font-mono">
                    <span>£500</span>
                    <span>£8,000</span>
                  </div>
                </div>

                {/* Deposit Buttons */}
                <div>
                  <span className="block text-pb-silver font-display font-700 text-xs uppercase tracking-wider mb-2">
                    Deposit ({depositPercent}% — £{depositAmount.toLocaleString()})
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 30, 50].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setDepositPercent(pct)}
                        className={`py-2 rounded-sm text-xs font-display font-700 uppercase border transition-colors ${
                          depositPercent === pct
                            ? 'bg-pb-orange border-pb-orange text-white'
                            : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-orange/40 hover:text-white'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Repayment Term */}
                <div>
                  <span className="block text-pb-silver font-display font-700 text-xs uppercase tracking-wider mb-2">
                    Repayment Duration
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[12, 24, 36].map((months) => (
                      <button
                        key={months}
                        onClick={() => setTermMonths(months)}
                        className={`py-3 rounded-sm text-xs font-display font-700 uppercase border transition-colors ${
                          termMonths === months
                            ? 'bg-pb-orange border-pb-orange text-white'
                            : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-orange/40 hover:text-white'
                        }`}
                      >
                        {months} Months (0% APR)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Summary */}
                <div className="p-5 bg-pb-black rounded border border-pb-border space-y-3">
                  <div className="flex justify-between text-sm text-pb-silver">
                    <span>Deposit Payable Now</span>
                    <span className="font-mono text-white font-bold">£{depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-pb-silver">
                    <span>Amount Financed</span>
                    <span className="font-mono text-white">£{financedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-pb-silver">
                    <span>Representative APR</span>
                    <span className="text-pb-success font-bold font-display uppercase">0.0% APR</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-pb-border text-white">
                    <span className="font-display font-800 text-base uppercase">Monthly Payment</span>
                    <span className="text-pb-orange font-mono font-bold text-2xl">£{monthlyPayment}/mo</span>
                  </div>
                </div>

                <Link
                  to="/bikes"
                  className="w-full pb-btn-primary justify-center text-sm py-3.5"
                >
                  Browse Mountain Bikes with 0% Finance <ArrowRight size={16} />
                </Link>
              </div>

              {/* Explanatory Trust Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                  <h3 className="font-display font-800 text-sm uppercase text-white tracking-wide flex items-center gap-2">
                    <ShieldCheck size={18} className="text-pb-orange" />
                    How It Works
                  </h3>
                  <ul className="space-y-2 text-xs text-pb-silver font-body leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-pb-orange text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</span>
                      <span>Add your mountain bike and gear to your basket (minimum spend £250).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-pb-orange text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</span>
                      <span>Select 0% APR Finance at checkout and complete the 2-minute online application.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-pb-orange text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</span>
                      <span>Receive an instant credit decision and sign digitally via SMS.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-pb-orange text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">4</span>
                      <span>Your bike is built, tuned by Cytech mechanics, and shipped directly to your door.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                  <h3 className="font-display font-800 text-sm uppercase text-white tracking-wide">
                    Eligibility Criteria
                  </h3>
                  <div className="space-y-1.5 text-xs text-pb-silver font-body">
                    <p>• UK resident for at least 3 years</p>
                    <p>• At least 18 years of age</p>
                    <p>• In regular full-time or part-time employment (min 16 hours/week)</p>
                    <p>• UK bank account capable of direct debits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CYCLE TO WORK CONTENT */}
        {type === 'cycle-to-work' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* C2W Savings Calculator */}
              <div className="lg:col-span-7 bg-pb-black-card border border-pb-border p-6 sm:p-8 rounded-sm space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-pb-border">
                  <Calculator size={20} className="text-pb-success" />
                  <h2 className="font-display font-800 text-lg uppercase text-white tracking-wide">
                    Tax Savings Estimator
                  </h2>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-pb-silver font-display font-700 uppercase tracking-wider">Package Value (Bike + Safety Gear)</span>
                    <span className="text-white font-mono font-bold text-xl">£{bikePackageValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="6000"
                    step="100"
                    value={bikePackageValue}
                    onChange={(e) => setBikePackageValue(Number(e.target.value))}
                    className="w-full accent-pb-success cursor-pointer"
                  />
                </div>

                <div>
                  <span className="block text-pb-silver font-display font-700 text-xs uppercase tracking-wider mb-2">
                    Your Income Tax Bracket
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTaxRate(20)}
                      className={`py-3 px-4 rounded-sm text-xs font-display font-700 uppercase border text-left transition-colors ${
                        taxRate === 20
                          ? 'bg-pb-success/20 border-pb-success text-white'
                          : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-success/40'
                      }`}
                    >
                      <div className="font-bold">Standard Rate (20%)</div>
                      <div className="text-[11px] text-pb-muted font-normal">Income under £50,270</div>
                    </button>
                    <button
                      onClick={() => setTaxRate(40)}
                      className={`py-3 px-4 rounded-sm text-xs font-display font-700 uppercase border text-left transition-colors ${
                        taxRate === 40
                          ? 'bg-pb-success/20 border-pb-success text-white'
                          : 'bg-pb-black border-pb-border text-pb-silver hover:border-pb-success/40'
                      }`}
                    >
                      <div className="font-bold">Higher Rate (40%)</div>
                      <div className="text-[11px] text-pb-muted font-normal">Income over £50,270</div>
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-pb-black rounded border border-pb-border space-y-3">
                  <div className="flex justify-between text-sm text-pb-silver">
                    <span>Retail Value</span>
                    <span className="font-mono text-white line-through">£{bikePackageValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-pb-success font-bold">
                    <span>Estimated Tax & NI Savings ({taxRate + 2}%)</span>
                    <span className="font-mono">- £{c2wEstimatedSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-pb-border text-white">
                    <span className="font-display font-800 text-base uppercase">Effective Monthly Cost (12 mo)</span>
                    <span className="text-pb-success font-mono font-bold text-2xl">£{c2wMonthlyDeduction}/mo</span>
                  </div>
                </div>

                <Link
                  to="/bikes"
                  className="w-full pb-btn-primary justify-center text-sm py-3.5"
                >
                  Explore Bikes Eligible for Cycle to Work <ArrowRight size={16} />
                </Link>
              </div>

              {/* Providers & Steps */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                  <h3 className="font-display font-800 text-sm uppercase text-white tracking-wide">
                    Supported Scheme Providers
                  </h3>
                  <p className="text-xs text-pb-silver font-body leading-relaxed">
                    Peak Bikes accepts certificate vouchers from all major UK Cycle to Work administrators:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {['Cyclescheme', 'Bike2Work Scheme', 'Green Commute Initiative', 'Vivup Benefits', 'Halfords Cycle2Work', 'My Benefits World'].map((provider) => (
                      <div key={provider} className="p-2.5 bg-pb-black rounded border border-pb-border text-xs text-white font-medium text-center">
                        {provider}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                  <h3 className="font-display font-800 text-sm uppercase text-white tracking-wide">
                    How to Redeem Your Voucher
                  </h3>
                  <div className="space-y-2 text-xs text-pb-silver font-body">
                    <p>1. Select your bike and note down the exact size and specifications.</p>
                    <p>2. Request a Cycle to Work quote from our sales desk or apply via your employer's scheme portal.</p>
                    <p>3. Once your employer approves and issues the voucher code, email it to <strong className="text-white">schemes@peakbikes.com</strong>.</p>
                    <p>4. We allocate stock immediately and ship your bike with zero upfront payment required.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADVICE / SIZING GUIDE CONTENT */}
        {type === 'advice' && (
          <div className="space-y-10">
            {/* Sizing Table */}
            <div className="bg-pb-black-card border border-pb-border rounded-sm p-6 sm:p-8 space-y-6">
              <h2 className="font-display font-800 text-xl uppercase text-white tracking-tight flex items-center gap-2">
                <Ruler size={20} className="text-pb-orange" />
                Mountain Bike Frame Size Chart
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-body">
                  <thead>
                    <tr className="border-b border-pb-border text-xs font-display font-700 uppercase tracking-wider text-pb-muted">
                      <th className="py-3 px-4">Frame Size</th>
                      <th className="py-3 px-4">Rider Height (Imperial)</th>
                      <th className="py-3 px-4">Rider Height (Metric)</th>
                      <th className="py-3 px-4">Inside Leg Inseam</th>
                      <th className="py-3 px-4">Recommended Reach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pb-border/50 text-pb-silver">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white font-mono">Small (S)</td>
                      <td className="py-3 px-4">5'2" – 5'6"</td>
                      <td className="py-3 px-4">157 – 168 cm</td>
                      <td className="py-3 px-4">27" – 30" (68 – 76 cm)</td>
                      <td className="py-3 px-4 font-mono">435 – 450 mm</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] bg-pb-orange/5">
                      <td className="py-3 px-4 font-bold text-pb-orange font-mono">Medium (M)</td>
                      <td className="py-3 px-4 text-white">5'6" – 5'10"</td>
                      <td className="py-3 px-4 text-white">168 – 178 cm</td>
                      <td className="py-3 px-4 text-white">30" – 32" (76 – 81 cm)</td>
                      <td className="py-3 px-4 font-mono text-white">455 – 470 mm</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white font-mono">Large (L)</td>
                      <td className="py-3 px-4">5'10" – 6'2"</td>
                      <td className="py-3 px-4">178 – 188 cm</td>
                      <td className="py-3 px-4">32" – 34" (81 – 86 cm)</td>
                      <td className="py-3 px-4 font-mono">475 – 490 mm</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white font-mono">X-Large (XL)</td>
                      <td className="py-3 px-4">6'2" – 6'6"</td>
                      <td className="py-3 px-4">188 – 198 cm</td>
                      <td className="py-3 px-4">34" – 36" (86 – 91 cm)</td>
                      <td className="py-3 px-4 font-mono">495 – 515 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Geometry Principles Explained */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                <span className="text-pb-orange font-mono text-xs font-bold uppercase tracking-widest">01 / STABILITY</span>
                <h3 className="font-display font-800 text-lg uppercase text-white">Head Tube Angle</h3>
                <p className="text-xs text-pb-silver font-body leading-relaxed">
                  Slacker angles (63°–64°) push the front wheel out ahead of you, preventing "over-the-bars" feelings on steep alpine chutes. Steeper angles (65°–67°) deliver quicker steering in tight singletrack.
                </p>
              </div>

              <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                <span className="text-pb-orange font-mono text-xs font-bold uppercase tracking-widest">02 / FIT</span>
                <h3 className="font-display font-800 text-lg uppercase text-white">Reach & Cockpit</h3>
                <p className="text-xs text-pb-silver font-body leading-relaxed">
                  Reach is the horizontal distance from the bottom bracket to the center of the head tube. It defines how much room you have when standing out of the saddle on descents.
                </p>
              </div>

              <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-3">
                <span className="text-pb-orange font-mono text-xs font-bold uppercase tracking-widest">03 / POWER</span>
                <h3 className="font-display font-800 text-lg uppercase text-white">Effective Seat Angle</h3>
                <p className="text-xs text-pb-silver font-body leading-relaxed">
                  Steeper seat tube angles (77°–79°) place your hips forward above the bottom bracket, keeping your front wheel planted on technical 25%+ gradient climbs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WORKSHOP & HELP CONTENT */}
        {type === 'help' && (
          <div className="space-y-10">
            {/* Cytech Inspection Checklist */}
            <div className="bg-pb-black-card border border-pb-border rounded-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pb-border">
                <div>
                  <h2 className="font-display font-800 text-xl uppercase text-white tracking-tight flex items-center gap-2">
                    <ShieldCheck size={22} className="text-pb-orange" />
                    42-Point Cytech Workshop Inspection (PDI)
                  </h2>
                  <p className="text-xs text-pb-muted font-body mt-1">
                    Every mountain bike is assembled and test-ridden by accredited technicians before boxing.
                  </p>
                </div>
                <span className="px-3 py-1 bg-pb-success/15 border border-pb-success/40 text-pb-success text-xs font-display font-700 uppercase rounded">
                  100% Ride Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-pb-silver">
                <div className="space-y-2">
                  <h3 className="font-display font-700 text-white uppercase text-sm">Suspension & Frame</h3>
                  <p>✓ Fork & rear shock pressure set to rider weight</p>
                  <p>✓ Rebound and compression dampers checked</p>
                  <p>✓ All frame pivot bearings torqued to specification</p>
                  <p>✓ Dropper post cable tension and actuation verified</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-700 text-white uppercase text-sm">Wheels & Braking</h3>
                  <p>✓ Spoke tension checked and rims trued within 0.5mm</p>
                  <p>✓ Tubeless rim tape inspected & Peaty's sealant added</p>
                  <p>✓ Hydraulic calipers centered with zero rotor rub</p>
                  <p>✓ Lever throw and bite point calibrated</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-700 text-white uppercase text-sm">Drivetrain & Safety</h3>
                  <p>✓ Derailleur hanger aligned with DAG precision gauge</p>
                  <p>✓ High/low limits and B-tension micro-tuned</p>
                  <p>✓ Crankset and bottom bracket torqued</p>
                  <p>✓ Shifter battery charged & paired (AXS models)</p>
                </div>
              </div>
            </div>

            {/* Support Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-2">
                <Phone size={20} className="text-pb-orange" />
                <h3 className="font-display font-800 text-white uppercase text-sm">Rider Support Line</h3>
                <p className="text-xs text-pb-silver font-body">Talk with a mechanic Monday to Friday 9am–5:30pm.</p>
                <p className="text-sm font-mono font-bold text-white pt-2">0800 123 4567</p>
              </div>

              <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-2">
                <Mail size={20} className="text-pb-orange" />
                <h3 className="font-display font-800 text-white uppercase text-sm">Email Consultation</h3>
                <p className="text-xs text-pb-silver font-body">Ask geometry, suspension tuning, or sizing questions.</p>
                <p className="text-sm font-mono font-bold text-white pt-2">support@peakbikes.com</p>
              </div>

              <div className="p-6 bg-pb-black-card border border-pb-border rounded-sm space-y-2">
                <Truck size={20} className="text-pb-orange" />
                <h3 className="font-display font-800 text-white uppercase text-sm">Next Day UK Delivery</h3>
                <p className="text-xs text-pb-silver font-body">Custom heavy-duty bike box with tool kit & pedals included.</p>
                <p className="text-sm font-mono font-bold text-pb-success pt-2">Tracked via DPD Pro</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
