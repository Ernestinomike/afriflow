import { useState, useEffect } from "react";

const C = {
  bg:"#06070E",surface:"#0C0D18",card:"#10121F",border:"#1C2035",
  gold:"#F4A700",goldLt:"#FFD166",green:"#00C896",blue:"#4C8EF7",
  red:"#FF4D6D",text:"#EDF0FF",muted:"#5A6080",purple:"#9945FF",
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:${C.bg};font-family:'DM Sans',sans-serif;color:${C.text};-webkit-font-smoothing:antialiased}
  button{font-family:'DM Sans',sans-serif}select,input{font-family:'DM Sans',sans-serif}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:${C.surface}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes glow{0%,100%{box-shadow:0 0 18px #F4A70030}50%{box-shadow:0 0 36px #F4A70055}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
  @keyframes slideIn{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
  .fu{animation:fadeUp .45s ease both}
  .fi{animation:fadeIn .3s ease both}
  .spin{animation:spin .9s linear infinite}
  .glow-btn{animation:glow 2.5s ease infinite}
  .pulse{animation:pulse 1.8s ease infinite}
  .slide-in{animation:slideIn .35s cubic-bezier(.32,.72,0,1) both}
  .ticker-wrap{overflow:hidden;width:100%}
  .ticker-inner{display:inline-flex;animation:ticker 26s linear infinite;white-space:nowrap}
  .hover-lift{transition:transform .18s ease,box-shadow .18s ease;cursor:pointer}
  .hover-lift:hover{transform:translateY(-2px);box-shadow:0 8px 24px #00000040}
  .tab{padding:9px 0;border:none;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;cursor:pointer;transition:all .18s;flex:1}
  .tab.on{background:${C.gold};color:${C.bg}}
  .tab.off{background:transparent;color:${C.muted}}
  .tab.off:hover{color:${C.text}}
  .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:200;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(8px)}
  .modal{background:${C.card};border:1px solid ${C.border};border-top:1px solid ${C.border};border-radius:24px 24px 0 0;padding:28px 22px 44px;width:100%;max-width:480px}
  .inp{background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:12px 14px;color:${C.text};font-size:14px;width:100%;outline:none;transition:border-color .18s}
  .inp:focus{border-color:${C.gold}60}
  .sel{background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:12px 14px;color:${C.text};font-size:14px;width:100%;outline:none;cursor:pointer;-webkit-appearance:none}
  input[type=range]{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;background:${C.border};outline:none}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${C.gold};cursor:pointer;box-shadow:0 0 8px ${C.gold}60}
  .bar{height:5px;border-radius:3px;background:${C.border};overflow:hidden}
  .bar-fill{height:100%;border-radius:3px;transition:width .7s ease}
`;

const Ic = ({ n, s=18, c="currentColor" }) => {
  const icons = {
    wallet:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M16 14h.01"/></svg>,
    down:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.5}><path d="M12 5v14m7-7-7 7-7-7"/></svg>,
    up:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.5}><path d="M12 19V5m-7 7 7-7 7 7"/></svg>,
    swap:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4"/></svg>,
    bank:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>,
    copy:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    check:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg>,
    close:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.5}><path d="M18 6 6 18M6 6l12 12"/></svg>,
    bolt:<svg width={s} height={s} fill={c} viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>,
    shield:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    globe:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>,
    sol:<svg width={s} height={s} viewBox="0 0 397.7 311.7" fill={c}><path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm0-164c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM391.2 18.2H73.8c-3.5 0-6.8 1.4-9.2 3.8L1.9 84.7C-2.2 88.8.7 95.8 6.5 95.8h317.4c3.5 0 6.8-1.4 9.2-3.8l62.7-62.7c4.1-4.1 1.2-11.1-4.6-11.1z"/></svg>,
    chart:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    user:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    phone:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill={c}/></svg>,
    info:<svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };
  return icons[n] || null;
};

const FX = 1548;
const WALLET_FULL = "7xKD9mVbNpRQyF4s8HtLwZcE2uJo6aXi3mPqYgWrT1e";
const WALLET_SHORT = "7xKD...T1e";
const BANKS = ["GTBank","Access Bank","UBA","Zenith Bank","First Bank","Fidelity","OPay","PalmPay","Kuda","Moniepoint"];
const TICKER_ITEMS = ["USDC/NGN ₦1,548 ▲0.3%","SOL/USD $148.20 ▲2.1%","Network fee ~$0.000005","Settlement < 5 sec ⚡","AfriFlow fee: 1% flat","No hidden charges ✓","USDC/NGN ₦1,548 ▲0.3%","SOL/USD $148.20 ▲2.1%","Network fee ~$0.000005","Settlement < 5 sec ⚡","AfriFlow fee: 1% flat","No hidden charges ✓"];
const INIT_TXS = [
  {id:1,type:"in",  label:"Payment · Client (US)",   usdc:250, ngn:387000, when:"2h ago"},
  {id:2,type:"swap",label:"Converted to NGN",         usdc:100, ngn:154800, when:"Yesterday"},
  {id:3,type:"out", label:"Withdrawn → GTBank",        usdc:80,  ngn:123840, when:"2 days ago"},
  {id:4,type:"in",  label:"Payment · Client (UK)",    usdc:500, ngn:774000, when:"4 days ago"},
  {id:5,type:"out", label:"Withdrawn → OPay",          usdc:200, ngn:309600, when:"6 days ago"},
];

const fmt = n => Number(n).toLocaleString();
const Badge = ({label, color=C.green}) => (
  <span style={{background:color+"18",color,border:`1px solid ${color}35`,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700,letterSpacing:".05em"}}>{label}</span>
);

function Spinner({color=C.gold}){
  return <div style={{width:48,height:48,border:`3px solid ${color}`,borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto 20px"}} className="spin"/>;
}

function ReceiveModal({onClose}){
  const [copied,setCopied]=useState(false);
  return(
    <div className="modal-bg fi" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal slide-in">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <span style={{fontFamily:"Syne",fontSize:20,fontWeight:800}}>Receive USDC</span>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><Ic n="close" s={20} c={C.muted}/></button>
        </div>
        <div style={{background:"#fff",borderRadius:16,padding:14,width:152,height:152,margin:"0 auto 18px",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width={124} height={124} viewBox="0 0 124 124">
            {[[0,0],[84,0],[0,84]].map(([x,y],i)=>(
              <g key={i}>
                <rect x={x} y={y} width={40} height={40} rx={3} fill="#000"/>
                <rect x={x+6} y={y+6} width={28} height={28} rx={2} fill="#fff"/>
                <rect x={x+10} y={y+10} width={20} height={20} rx={1} fill="#000"/>
              </g>
            ))}
            {Array.from({length:64},(_,k)=>{
              const row=Math.floor(k/8)*13+46,col=(k%8)*13+46;
              const inCorner=(row<46&&col<46)||(row<46&&col>84)||(row>84&&col<46);
              return !inCorner&&((k*137+59)%100>42)?<rect key={k} x={col+1} y={row+1} width={11} height={11} rx={1} fill="#000"/>:null;
            })}
          </svg>
        </div>
        <div style={{textAlign:"center",fontSize:12,color:C.muted,marginBottom:10}}>Your Solana Wallet (Devnet)</div>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <code style={{flex:1,fontSize:11,wordBreak:"break-all"}}>{WALLET_FULL}</code>
          <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)}} style={{background:"none",border:"none",cursor:"pointer",flexShrink:0}}>
            <Ic n={copied?"check":"copy"} s={16} c={copied?C.green:C.muted}/>
          </button>
        </div>
        <div style={{background:C.gold+"12",border:`1px solid ${C.gold}30`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.gold,display:"flex",gap:8}}>
          <Ic n="info" s={14} c={C.gold}/>
          <span>Send only <b>USDC (SPL)</b> on the <b>Solana</b> network</span>
        </div>
      </div>
    </div>
  );
}

function ConvertModal({onClose,usdc,onDone}){
  const [amt,setAmt]=useState(Math.min(50,Math.floor(usdc)));
  const [step,setStep]=useState("input");
  const ngn=Math.floor(amt*FX);
  const fee=(amt*0.01).toFixed(2);

  if(step==="proc") return(
    <div className="modal-bg fi"><div className="modal slide-in" style={{textAlign:"center",padding:"52px 22px"}}>
      <Spinner color={C.gold}/>
      <div style={{fontFamily:"Syne",fontSize:18,fontWeight:800,marginBottom:6}}>Processing on Solana</div>
      <div style={{color:C.muted,fontSize:13}}>~2 seconds · network fee $0.000005</div>
    </div></div>
  );

  if(step==="done") return(
    <div className="modal-bg fi"><div className="modal slide-in" style={{textAlign:"center"}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:C.green+"18",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Ic n="check" s={30} c={C.green}/></div>
      <div style={{fontFamily:"Syne",fontSize:20,fontWeight:800,marginBottom:6}}>Conversion Complete</div>
      <div style={{color:C.muted,fontSize:13,marginBottom:6}}>You received</div>
      <div style={{fontFamily:"Syne",fontSize:38,fontWeight:800,color:C.gold,letterSpacing:"-.02em"}}>₦{fmt(ngn)}</div>
      <div style={{color:C.muted,fontSize:13,marginTop:6,marginBottom:22}}>from {amt} USDC · fee ${fee}</div>
      <button onClick={()=>{onDone(amt);onClose()}} style={{background:C.gold,color:C.bg,border:"none",borderRadius:12,padding:"14px 0",width:"100%",fontFamily:"Syne",fontWeight:800,fontSize:15,cursor:"pointer"}}>Done</button>
    </div></div>
  );

  return(
    <div className="modal-bg fi" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal slide-in">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <span style={{fontFamily:"Syne",fontSize:20,fontWeight:800}}>Convert to ₦ Naira</span>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><Ic n="close" s={20} c={C.muted}/></button>
        </div>
        <div style={{background:C.surface,borderRadius:14,padding:16,marginBottom:10}}>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>You send</div>
          <input type="range" min={1} max={Math.max(1,Math.floor(usdc))} value={amt} onChange={e=>setAmt(Number(e.target.value))}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10,alignItems:"center"}}>
            <div style={{fontFamily:"Syne",fontSize:32,fontWeight:800,color:C.gold}}>{amt}</div>
            <Badge label="USDC" color={C.gold}/>
          </div>
          <div style={{fontSize:12,color:C.muted,marginTop:5}}>Balance: {usdc.toFixed(2)} USDC</div>
        </div>
        <div style={{textAlign:"center",padding:"4px 0"}}><Ic n="swap" s={20} c={C.muted}/></div>
        <div style={{background:C.surface,borderRadius:14,padding:16,marginBottom:16}}>
          <div style={{fontSize:12,color:C.muted,marginBottom:6}}>You receive</div>
          <div style={{fontFamily:"Syne",fontSize:32,fontWeight:800,color:C.green}}>₦{fmt(ngn)}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:5}}>Rate: 1 USDC = ₦{fmt(FX)} · Fee: ${fee} (1%)</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.muted,marginBottom:18}}>
          <span>⚡ Settles in &lt;5 seconds</span><span>🔒 Non-custodial</span><span>✅ On-chain</span>
        </div>
        <button onClick={()=>{setStep("proc");setTimeout(()=>setStep("done"),2000)}} className="glow-btn" style={{background:C.gold,color:C.bg,border:"none",borderRadius:14,padding:"15px 0",width:"100%",fontFamily:"Syne",fontWeight:800,fontSize:16,cursor:"pointer"}}>
          Convert Now →
        </button>
      </div>
    </div>
  );
}

function WithdrawModal({onClose,ngn,onDone}){
  const [amt,setAmt]=useState("");
  const [bank,setBank]=useState(BANKS[0]);
  const [acct,setAcct]=useState("");
  const [step,setStep]=useState("input");
  const valid=amt&&Number(amt)>0&&Number(amt)<=ngn&&acct.length===10;

  if(step==="proc") return(
    <div className="modal-bg fi"><div className="modal slide-in" style={{textAlign:"center",padding:"52px 22px"}}>
      <Spinner color={C.green}/>
      <div style={{fontFamily:"Syne",fontSize:18,fontWeight:800,marginBottom:6}}>Connecting to {bank}</div>
      <div style={{color:C.muted,fontSize:13}}>Verifying on-chain → Processing off-ramp</div>
    </div></div>
  );

  if(step==="done") return(
    <div className="modal-bg fi"><div className="modal slide-in" style={{textAlign:"center"}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:C.green+"18",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Ic n="bank" s={28} c={C.green}/></div>
      <div style={{fontFamily:"Syne",fontSize:20,fontWeight:800,marginBottom:6}}>Withdrawal Initiated</div>
      <div style={{color:C.muted,fontSize:13,marginBottom:6}}>Sending to {bank} · {acct}</div>
      <div style={{fontFamily:"Syne",fontSize:38,fontWeight:800,color:C.green,letterSpacing:"-.02em"}}>₦{fmt(amt)}</div>
      <div style={{margin:"12px 0 22px"}}><Badge label="⏱ Processing · 3–5 mins" color={C.gold}/></div>
      <button onClick={()=>{onDone(Number(amt));onClose()}} style={{background:C.green,color:C.bg,border:"none",borderRadius:12,padding:"14px 0",width:"100%",fontFamily:"Syne",fontWeight:800,fontSize:15,cursor:"pointer"}}>Done</button>
    </div></div>
  );

  return(
    <div className="modal-bg fi" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal slide-in">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <span style={{fontFamily:"Syne",fontSize:20,fontWeight:800}}>Withdraw to Bank</span>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><Ic n="close" s={20} c={C.muted}/></button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Amount (₦)</div>
            <input className="inp" type="number" placeholder={`Max ₦${fmt(ngn)}`} value={amt} onChange={e=>setAmt(e.target.value)}/>
          </div>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Bank / Mobile Money</div>
            <select className="sel" value={bank} onChange={e=>setBank(e.target.value)}>
              {BANKS.map(b=><option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Account Number</div>
            <input className="inp" type="text" placeholder="10-digit number" maxLength={10} value={acct} onChange={e=>setAcct(e.target.value.replace(/\D/g,"").slice(0,10))}/>
          </div>
        </div>
        <div style={{display:"flex",gap:16,margin:"16px 0 18px",fontSize:12,color:C.muted}}>
          <span>⏱ 3–5 min</span><span>🔒 KYC-lite</span><span>💸 No hidden fees</span>
        </div>
        <button onClick={()=>{setStep("proc");setTimeout(()=>setStep("done"),2500)}} disabled={!valid} style={{background:valid?C.green:C.border,color:valid?C.bg:C.muted,border:"none",borderRadius:14,padding:"15px 0",width:"100%",fontFamily:"Syne",fontWeight:800,fontSize:16,cursor:valid?"pointer":"not-allowed",transition:"all .2s"}}>
          Withdraw Funds →
        </button>
      </div>
    </div>
  );
}

function TxRow({tx}){
  const isIn=tx.type==="in", isSw=tx.type==="swap";
  const color=isIn?C.green:isSw?C.gold:C.red;
  const icon=isIn?"down":isSw?"swap":"up";
  return(
    <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:`1px solid ${C.border}`}}>
      <div style={{width:40,height:40,borderRadius:12,background:color+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Ic n={icon} s={16} c={color}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:500,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tx.label}</div>
        <div style={{fontSize:11,color:C.muted}}>{tx.when} · <span style={{color:C.green}}>✓ confirmed</span></div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:14,fontWeight:700,color,fontFamily:"Syne"}}>{isIn?"+":"-"}{tx.usdc} USDC</div>
        <div style={{fontSize:11,color:C.muted}}>₦{fmt(tx.ngn)}</div>
      </div>
    </div>
  );
}

function Landing({onConnect}){
  const feats=[
    {icon:"bolt",  color:C.gold,  t:"Instant Settlement",  d:"Payments land in under 5 seconds on Solana. Not 3–5 business days."},
    {icon:"shield",color:C.green, t:"Only 1% Fee",          d:"Payoneer charges 3–5%. AfriFlow takes 1% flat — nothing hidden ever."},
    {icon:"globe", color:C.blue,  t:"No Gatekeeping",       d:"No invite, no US address, no credit card. Just connect your wallet."},
    {icon:"phone", color:C.purple,t:"Mobile-First",         d:"Designed for Android and low-bandwidth. Works in any mobile browser."},
  ];
  return(
    <div style={{padding:"34px 20px 0"}}>
      <div className="fu" style={{textAlign:"center",marginBottom:32}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:C.gold+"14",border:`1px solid ${C.gold}35`,borderRadius:20,padding:"6px 14px",fontSize:11,color:C.gold,fontWeight:700,marginBottom:18,letterSpacing:".05em"}}>
          <Ic n="sol" s={12} c={C.purple}/> BUILT ON SOLANA · USDC PAYMENTS
        </div>
        <h1 style={{fontFamily:"Syne",fontSize:34,fontWeight:800,lineHeight:1.1,letterSpacing:"-.03em",marginBottom:14}}>
          Get Paid Globally.<br/><span style={{color:C.gold}}>Spend Locally.</span>
        </h1>
        <p style={{color:C.muted,fontSize:15,lineHeight:1.8,maxWidth:300,margin:"0 auto 26px"}}>
          The on-chain payment rail for African freelancers. Receive USDC, convert to ₦, withdraw to your bank — all in under a minute.
        </p>
        <button onClick={onConnect} className="glow-btn" style={{background:C.gold,color:C.bg,border:"none",borderRadius:14,padding:"15px 30px",fontFamily:"Syne",fontWeight:800,fontSize:15,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:9}}>
          <Ic n="wallet" s={17} c={C.bg}/> Connect Phantom Wallet
        </button>
        <div style={{marginTop:10,fontSize:12,color:C.muted}}>Non-custodial · No KYC to start · Solana Devnet</div>
      </div>

      {/* Comparison table */}
      <div className="fu" style={{animationDelay:"80ms",background:C.card,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden",marginBottom:18}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
          {[
            ["","Payoneer / Grey","AfriFlow ✓"],
            ["Fee","3 – 5%","1% only"],
            ["Speed","1 – 5 days","< 5 secs"],
            ["Access","Invite + docs","Just a wallet"],
            ["Tech","Centralised","On-chain"],
          ].map((row,ri)=>row.map((cell,ci)=>(
            <div key={`${ri}-${ci}`} style={{
              padding:"11px 10px",fontSize:ri===0?11:13,textAlign:"center",
              fontWeight:ri===0||ci===0?700:400,
              color:ri===0?C.muted:ci===2?C.green:ci===0?C.muted:C.red,
              background:ri===0?C.surface:"transparent",
              borderBottom:ri<4?`1px solid ${C.border}`:"none",
              fontFamily:ri===0||ci===0?"Syne":"DM Sans",
              letterSpacing:ri===0?".06em":"normal",
            }}>{ri===0&&ci===2?<span style={{color:C.gold}}>{cell}</span>:cell}</div>
          )))}
        </div>
      </div>

      {/* Features */}
      {feats.map(({icon,color,t,d},i)=>(
        <div key={i} className="fu hover-lift" style={{animationDelay:`${i*70+160}ms`,background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"16px 18px",display:"flex",gap:14,alignItems:"flex-start",marginBottom:10}}>
          <div style={{width:44,height:44,borderRadius:13,background:color+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${color}25`}}>
            <Ic n={icon} s={20} c={color}/>
          </div>
          <div>
            <div style={{fontFamily:"Syne",fontWeight:700,fontSize:15,marginBottom:4}}>{t}</div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{d}</div>
          </div>
        </div>
      ))}

      <div className="fu" style={{animationDelay:"480ms",background:"linear-gradient(135deg,#120E04,#080C12)",border:`1px solid ${C.gold}30`,borderRadius:18,padding:"22px 20px",textAlign:"center",marginBottom:24,marginTop:8}}>
        <div style={{fontFamily:"Syne",fontSize:12,color:C.gold,fontWeight:700,letterSpacing:".08em",marginBottom:8}}>THE VISION</div>
        <div style={{fontFamily:"Syne",fontSize:18,fontWeight:800,lineHeight:1.5,marginBottom:8}}>Become the default financial rail<br/>for Africa's digital workforce.</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>500M+ working-age Africans · $50B+ remittance market · 1% fee model</div>
      </div>
    </div>
  );
}

function Dashboard({usdc,ngn,txs,onModal}){
  const [tab,setTab]=useState("txs");
  const totalIn=txs.filter(t=>t.type==="in").reduce((s,t)=>s+t.usdc,0);
  const savedFees=(totalIn*0.04).toFixed(2);

  return(
    <>
      {/* Hero card */}
      <div className="fu" style={{margin:"18px 18px 0",background:"linear-gradient(135deg,#1A1508 0%,#080C18 100%)",border:`1px solid ${C.gold}28`,borderRadius:22,padding:"22px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:140,height:140,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}12,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Syne",marginBottom:6}}>USDC Balance</div>
            <div style={{fontFamily:"Syne",fontSize:42,fontWeight:800,color:C.gold,letterSpacing:"-.03em",lineHeight:1}}>${usdc.toFixed(2)}</div>
            <div style={{fontSize:13,color:C.muted,marginTop:7}}>≈ ₦{fmt(Math.floor(usdc*FX))}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,justifyContent:"flex-end",marginBottom:8}}>
              <Ic n="sol" s={13} c={C.purple}/>
              <span style={{fontSize:12,color:C.purple,fontWeight:600}}>Solana Devnet</span>
            </div>
            <Badge label="⚡ Live" color={C.green}/>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,display:"flex",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>₦ Balance</div>
            <div style={{fontFamily:"Syne",fontSize:20,fontWeight:700}}>₦{fmt(Math.floor(ngn))}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Total Earned</div>
            <div style={{fontFamily:"Syne",fontSize:20,fontWeight:700,color:C.green}}>+${totalIn}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:10,margin:"14px 18px 0"}}>
        {[{label:"Receive",icon:"down",color:C.gold,m:"receive"},{label:"Convert",icon:"swap",color:C.green,m:"convert"},{label:"Withdraw",icon:"bank",color:C.blue,m:"withdraw"}].map(({label,icon,color,m})=>(
          <button key={m} onClick={()=>onModal(m)} className="hover-lift" style={{flex:1,background:color+"12",border:`1px solid ${color}30`,borderRadius:16,padding:"16px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:9,cursor:"pointer",transition:"all .18s"}}>
            <div style={{width:40,height:40,borderRadius:13,background:color+"20",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ic n={icon} s={19} c={color}/>
            </div>
            <span style={{fontFamily:"Syne",fontWeight:700,fontSize:13,color}}>{label}</span>
          </button>
        ))}
      </div>

      {/* Stats strip */}
      <div style={{display:"flex",gap:10,margin:"12px 18px 0",overflowX:"auto",paddingBottom:2}}>
        {[{l:"FX Rate",v:`₦${fmt(FX)}`,s:"per USDC"},{l:"Network Fee",v:"$0.000005",s:"vs $2+ elsewhere"},{l:"Speed",v:"< 5 sec",s:"settlement"},{l:"Fees Saved",v:`$${savedFees}`,s:"vs Payoneer 4%"}].map(({l,v,s},i)=>(
          <div key={i} className="hover-lift" style={{flexShrink:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",minWidth:112}}>
            <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:".08em",fontFamily:"Syne",marginBottom:5}}>{l}</div>
            <div style={{fontFamily:"Syne",fontSize:18,fontWeight:800,color:C.goldLt,letterSpacing:"-.01em"}}>{v}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:3}}>{s}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,margin:"18px 18px 0",background:C.surface,border:`1px solid ${C.border}`,borderRadius:13,padding:4}}>
        {[["txs","Transactions"],["analytics","Analytics"]].map(([k,l])=>(
          <button key={k} className={`tab ${tab===k?"on":"off"}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>

      {tab==="txs"?(
        <div style={{margin:"0 18px"}}>
          {txs.slice(0,7).map(tx=><TxRow key={tx.id} tx={tx}/>)}
          {txs.length===0&&<div style={{textAlign:"center",color:C.muted,padding:"32px 0",fontSize:14}}>No transactions yet</div>}
        </div>
      ):(
        <div style={{margin:"16px 18px 0"}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:20,marginBottom:14}}>
            <div style={{fontFamily:"Syne",fontWeight:700,marginBottom:18}}>This Month</div>
            {[{l:"Received",v:750,m:1000,c:C.green},{l:"Converted",v:300,m:750,c:C.gold},{l:"Withdrawn",v:280,m:300,c:C.blue}].map(({l,v,m,c})=>(
              <div key={l} style={{marginBottom:18}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:13}}>
                  <span style={{color:C.muted}}>{l}</span>
                  <span style={{color:c,fontFamily:"Syne",fontWeight:700}}>${v} USDC</span>
                </div>
                <div className="bar"><div className="bar-fill" style={{width:`${(v/m)*100}%`,background:`linear-gradient(90deg,${c},${c}88)`}}/></div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            {[{l:"Saved vs Payoneer",v:`$${savedFees}`,s:"in fees",c:C.green},{l:"Transactions",v:txs.length,s:"all confirmed",c:C.gold}].map(({l,v,s,c})=>(
              <div key={l} className="hover-lift" style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px"}}>
                <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:".08em",fontFamily:"Syne",marginBottom:6}}>{l}</div>
                <div style={{fontFamily:"Syne",fontSize:26,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:3}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function AfriFlow(){
  const [connected,setConnected]=useState(false);
  const [usdc,setUsdc]=useState(320.50);
  const [ngn,setNgn]=useState(155000);
  const [txs,setTxs]=useState(INIT_TXS);
  const [modal,setModal]=useState(null);

  const addTx=tx=>setTxs(p=>[{id:Date.now(),...tx},...p]);

  const handleConvert=amt=>{
    setUsdc(p=>Math.max(0,parseFloat((p-amt).toFixed(2))));
    setNgn(p=>p+Math.floor(amt*FX));
    addTx({type:"swap",label:"Converted to NGN",usdc:amt,ngn:Math.floor(amt*FX),when:"just now"});
  };
  const handleWithdraw=ngnAmt=>{
    setNgn(p=>Math.max(0,p-ngnAmt));
    addTx({type:"out",label:"Withdrawn to Bank",usdc:Math.round(ngnAmt/FX),ngn:ngnAmt,when:"just now"});
  };

  return(
    <>
      <style>{STYLES}</style>
      {modal==="receive" &&<ReceiveModal  onClose={()=>setModal(null)}/>}
      {modal==="convert" &&<ConvertModal  onClose={()=>setModal(null)} usdc={usdc} onDone={handleConvert}/>}
      {modal==="withdraw"&&<WithdrawModal onClose={()=>setModal(null)} ngn={ngn}   onDone={handleWithdraw}/>}

      <div style={{minHeight:"100vh",background:C.bg,maxWidth:480,margin:"0 auto",paddingBottom:100}}>
        {/* Ambient glow */}
        <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:400,height:240,background:`radial-gradient(ellipse 80% 100% at 50% -20%,${C.gold}0D,transparent)`,pointerEvents:"none",zIndex:0}}/>

        {/* HEADER */}
        <div style={{position:"sticky",top:0,zIndex:50,background:C.bg+"EC",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,borderRadius:10,background:`linear-gradient(135deg,${C.gold},#FF6B35)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ic n="globe" s={17} c={C.bg}/>
            </div>
            <span style={{fontFamily:"Syne",fontWeight:800,fontSize:20,letterSpacing:"-.02em"}}>
              AfriFlow<span style={{color:C.gold}}>.</span>
            </span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {connected&&(
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:"5px 11px",fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:C.green}} className="pulse"/>
                {WALLET_SHORT}
              </div>
            )}
            <button onClick={()=>setConnected(!connected)} style={{background:connected?C.surface:C.gold,color:connected?C.text:C.bg,border:`1px solid ${connected?C.border:C.gold}`,borderRadius:20,padding:"7px 13px",fontSize:12,fontFamily:"Syne",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}>
              <Ic n="wallet" s={13} c={connected?C.text:C.bg}/>
              {connected?"Connected":"Connect"}
            </button>
          </div>
        </div>

        {/* FX TICKER */}
        <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"7px 0"}}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {TICKER_ITEMS.map((item,i)=>(
                <span key={i} style={{fontSize:11,color:item.includes("▲")?C.green:C.muted,marginRight:36,letterSpacing:".03em"}}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN */}
        {connected
          ? <Dashboard usdc={usdc} ngn={ngn} txs={txs} onModal={setModal}/>
          : <Landing onConnect={()=>setConnected(true)}/>
        }

        {/* BOTTOM NAV */}
        {connected&&(
          <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.surface+"F0",backdropFilter:"blur(16px)",borderTop:`1px solid ${C.border}`,display:"flex",zIndex:50}}>
            {[
              {k:"home",  icon:"chart", label:"Dashboard",  action:null},
              {k:"recv",  icon:"down",  label:"Receive",     action:"receive"},
              {k:"conv",  icon:"swap",  label:"Convert",     action:"convert"},
              {k:"with",  icon:"bank",  label:"Withdraw",    action:"withdraw"},
            ].map(({k,icon,label,action})=>{
              const isAct=!!action;
              const color=isAct?C.gold:C.muted;
              return(
                <button key={k} onClick={()=>action?setModal(action):null} style={{flex:1,background:"none",border:"none",padding:"12px 4px 10px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:36,height:36,borderRadius:11,background:isAct?C.gold+"15":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s"}}>
                    <Ic n={icon} s={18} c={color}/>
                  </div>
                  <span style={{fontSize:10,color,fontFamily:"Syne",fontWeight:600}}>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
