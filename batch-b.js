/* ===== BATCH-B 线缆工具 ===== */
/* 纯计算函数（无 DOM 依赖，可单独测试） */

/* 1. AWG 与 mm² 对照表（截面单位 mm²） */
var AWG_TABLE=[
 {a:"4/0",s:107.2},{a:"3/0",s:85.0},{a:"2/0",s:67.4},{a:"1/0",s:53.5},
 {a:"1",s:42.4},{a:"2",s:33.6},{a:"4",s:21.2},{a:"6",s:13.3},
 {a:"8",s:8.37},{a:"10",s:5.26},{a:"12",s:3.31},{a:"14",s:2.08},
 {a:"16",s:1.31},{a:"18",s:0.823},{a:"20",s:0.519}
];
function calcAwg(p){
  if(p.mode==="toMM"){
    const r=AWG_TABLE.find(function(x){return x.a===p.awg;});
    if(!r) return {ok:false, msg:"请选择 AWG 规格"};
    return {ok:true, mode:"toMM", awg:r.a, s:r.s};
  }
  const s=num(p.s);
  if(!(s>0)) return {ok:false, msg:"请输入大于 0 的截面"};
  let best=AWG_TABLE[0], bd=Math.abs(AWG_TABLE[0].s-s);
  AWG_TABLE.forEach(function(x){
    const d=Math.abs(x.s-s);
    if(d<bd){ bd=d; best=x; }
  });
  return {ok:true, mode:"toAWG", s:s, awg:best.a, nearS:best.s};
}

/* 2. 功率算线径：先算电流，再按铜芯载流量参考表向上取线径（参考值） */
var PWR_CABLE_TABLE=[
 {s:1.5,a:15},{s:2.5,a:25},{s:4,a:32},{s:6,a:40},
 {s:10,a:60},{s:16,a:80},{s:25,a:110},{s:35,a:135}
];
function calcPwrCable(p){
  const PkW=num(p.P), U=num(p.U), cos=num(p.cos);
  const three = p.phase==="3";
  const k = three ? Math.sqrt(3) : 1;
  if(!(PkW>0)) return {ok:false, msg:"功率必须大于 0"};
  if(!(U>0)) return {ok:false, msg:"电压必须大于 0"};
  if(!(cos>0 && cos<=1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
  const I=PkW*1000/(k*U*cos);
  const rec=PWR_CABLE_TABLE.find(function(x){return x.a>=I;});
  return {ok:true, I:I, rec:rec||null};
}

/* 3. 线径截面积：S=π(d/2)²；反求 d=2√(S/π) */
function calcWireArea(p){
  if(p.mode==="toD"){
    const S=num(p.S);
    if(!(S>0)) return {ok:false, msg:"截面必须大于 0"};
    return {ok:true, mode:"toD", S:S, d:2*Math.sqrt(S/Math.PI)};
  }
  const d=num(p.d);
  if(!(d>0)) return {ok:false, msg:"直径必须大于 0"};
  return {ok:true, mode:"toS", d:d, S:Math.PI*Math.pow(d/2,2)};
}

/* 4. 充电桩布线线径：预设规格 + 距离超过 30 米升一档（参考值） */
var EV_SIZES=[2.5,4,6,10,16,25];
var EV_PRESETS=[
 {label:"7kW（单相）", I:32, base:6},
 {label:"11kW（三相）", I:16, base:4},
 {label:"21kW（三相）", I:32, base:6}
];
function calcEvCable(p){
  const pr=EV_PRESETS[parseInt(p.preset,10)];
  if(!pr) return {ok:false, msg:"请选择充电桩规格"};
  const L=num(p.L);
  if(!(L>0)) return {ok:false, msg:"布线距离必须大于 0"};
  let size=pr.base, bumped=false;
  if(L>30){
    const i=EV_SIZES.indexOf(pr.base);
    if(i>=0 && i<EV_SIZES.length-1){ size=EV_SIZES[i+1]; bumped=true; }
  }
  return {ok:true, preset:pr.label, I:pr.I, L:L, size:size, bumped:bumped};
}

/* 5. 铜排尺寸：按工作电流向上匹配 TMY 铜排规格（载流量为参考值） */
var BUSBAR_TABLE=[
 {w:30,t:4,a:280},{w:40,t:4,a:380},{w:50,t:5,a:550},
 {w:60,t:6,a:750},{w:80,t:8,a:1050}
];
function calcBusbar(p){
  const I=num(p.I);
  if(!(I>0)) return {ok:false, msg:"工作电流必须大于 0"};
  const rec=BUSBAR_TABLE.find(function(x){return x.a>=I;});
  return {ok:true, I:I, rec:rec||null};
}

/* 6. 铜排质量价格：重量kg=长(m)×宽(mm)×厚(mm)×8.9/1000；价格=重量×单价 */
function calcBusbarCost(p){
  const L=num(p.L), W=num(p.W), T=num(p.T), price=num(p.price);
  if(!(L>0 && W>0 && T>0)) return {ok:false, msg:"长度、宽度、厚度都必须大于 0"};
  if(!(price>=0)) return {ok:false, msg:"铜价单价无效"};
  const kg=L*W*T*8.9/1000;
  return {ok:true, kg:kg, cost:kg*price};
}

/* 7. 交直流：直流 P=U×I；交流单相 P=U×I×cosφ；功率电流互求 */
function calcAcDc(p){
  const U=num(p.U);
  if(!(U>0)) return {ok:false, msg:"电压必须大于 0"};
  const ac = p.type==="ac";
  let cos=1;
  if(ac){
    cos=num(p.cos);
    if(!(cos>0 && cos<=1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
  }
  if(p.mode==="I"){
    const P=num(p.P);
    if(!(P>=0)) return {ok:false, msg:"功率无效"};
    return {ok:true, mode:"I", ac:ac, U:U, P:P, I:P/(U*cos)};
  }
  const I=num(p.I);
  if(!(I>=0)) return {ok:false, msg:"电流无效"};
  return {ok:true, mode:"P", ac:ac, U:U, I:I, P:U*I*cos};
}

/* ============ 工具注册 ============ */
TOOLS.push(
 {id:"awg", cat:"dgjs", icon:"Ø", name:"AWG与mm²线径转换", desc:"美标 AWG 与国标 mm² 线径对照互查",
  formula:"对照表（mm²）：4/0=107.2、3/0=85.0、2/0=67.4、1/0=53.5、1=42.4、2=33.6、4=21.2、6=13.3、8=8.37、10=5.26、12=3.31、14=2.08、16=1.31、18=0.823、20=0.519。输入 mm² 时按最接近的标准截面匹配。"},
 {id:"pwrcable", cat:"dgjs", icon:"⚡", name:"功率算线径", desc:"按功率电压算电流，再按载流量参考表推荐铜芯线径",
  formula:"单相 I = P ÷ (U × cosφ)；三相 I = P ÷ (√3 × U × cosφ)。线径按铜芯载流量参考值（A）向上取：1.5→15、2.5→25、4→32、6→40、10→60、16→80、25→110、35→135。"},
 {id:"wirearea", cat:"dgjs", icon:"◯", name:"线径截面积计算", desc:"已知直径求截面，或已知截面求直径",
  formula:"S = π × (d ÷ 2)²；反求直径 d = 2 × √(S ÷ π)。S 为截面积（mm²），d 为直径（mm）。"},
 {id:"evcable", cat:"dgjs", icon:"🔌", name:"充电桩布线线径", desc:"按充电桩功率与布线距离推荐铜芯线径",
  formula:"7kW 单相约 32A → 6mm²；11kW 三相约 16A → 4mm²；21kW 三相约 32A → 6mm²（均为参考值）。布线距离超过 30 米时线径升一档。"},
 {id:"busbar", cat:"dgjs", icon:"▭", name:"铜排尺寸计算器", desc:"按工作电流推荐 TMY 铜排规格",
  formula:"按 TMY 铜排载流量参考值（A）向上匹配：30×4→280、40×4→380、50×5→550、60×6→750、80×8→1050。"},
 {id:"busbarcost", cat:"dgjs", icon:"元", name:"铜排质量价格计算", desc:"算铜排重量与材料价格",
  formula:"重量(kg) = 长度(m) × 宽度(mm) × 厚度(mm) × 8.9 ÷ 1000；价格 = 重量 × 铜价单价(元/kg)。铜密度取 8.9 g/cm³。"},
 {id:"acdc", cat:"dgjs", icon:"~", name:"交直流电流转换", desc:"已知功率求电流、已知电流求功率（交/直流）",
  formula:"直流：P = U × I；交流单相：P = U × I × cosφ。求电流：直流 I = P ÷ U，交流 I = P ÷ (U × cosφ)；求功率：P = U × I（×cosφ）。"}
);

/* ============ 各工具表单 ============ */
RENDER["awg"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("换算方向", '<select id="aMode"><option value="toMM">AWG → mm²</option><option value="toAWG">mm² → AWG</option></select>')+
    '<div id="aBox"></div>';
  function draw(){
    if(val("aMode")==="toMM"){
      $("#aBox").innerHTML=field("AWG 规格",
        '<select id="aAwg">'+AWG_TABLE.map(function(r){return '<option value="'+r.a+'">'+r.a+'</option>';}).join("")+'</select>');
    }else{
      $("#aBox").innerHTML=field("截面（mm²）", '<input id="aS" inputmode="decimal" placeholder="如 4">',
        "按最接近的标准截面匹配 AWG 规格");
    }
  }
  $("#aMode").onchange=draw; draw();
  $("#calcBtn").onclick=function(){
    const m=val("aMode");
    const r=calcAwg(m==="toMM"?{mode:"toMM",awg:val("aAwg")}:{mode:"toAWG",s:val("aS")});
    if(!r.ok) return showErr(r.msg);
    if(r.mode==="toMM") showRes('<div class="big">AWG '+r.awg+' ≈ '+trim(r.s)+' mm²</div>');
    else showRes('<div class="big">'+trim(r.s)+' mm² ≈ AWG '+r.awg+'</div>'+
      '<div class="row">最接近的标准规格为 AWG '+r.awg+'（'+trim(r.nearS)+' mm²）。</div>');
  };
  const t=document.createElement("div");
  t.innerHTML='<table class="ref"><tr><th>AWG</th><th>截面 (mm²)</th></tr>'+
    AWG_TABLE.map(function(r){return "<tr><td>"+r.a+"</td><td>"+r.s+"</td></tr>";}).join("")+"</table>";
  f.appendChild(t);
};

RENDER["pwrcable"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("相数", '<select id="pcPhase"><option value="1">单相</option><option value="3">三相</option></select>')+
    field("功率 P（kW）", '<input id="pcP" inputmode="decimal" placeholder="如 10">')+
    field("电压 U（V）", '<input id="pcU" inputmode="decimal" placeholder="单相如 220，三相如 380">')+
    field("功率因数 cosφ", '<input id="pcCos" inputmode="decimal" placeholder="如 0.8" value="0.8">',
      "先算工作电流，再按铜芯载流量参考值向上取线径");
  $("#calcBtn").onclick=function(){
    const r=calcPwrCable({phase:val("pcPhase"),P:val("pcP"),U:val("pcU"),cos:val("pcCos")});
    if(!r.ok) return showErr(r.msg);
    let h='<div class="big">工作电流 ≈ '+trim(r.I,2)+' A</div>';
    if(r.rec) h+='<div class="row">推荐铜芯线径：<b>'+r.rec.s+' mm²</b>（载流量参考值 '+r.rec.a+'A ≥ '+trim(r.I,2)+'A）</div>'+
      '<div class="row">参考值：考虑敷设方式、环境温度与规范要求后选型。</div>';
    else h+='<div class="row">电流 '+trim(r.I,1)+' A 超出常用参考表（最大 135A），建议分路供电或查手册选型。</div>';
    showRes(h);
  };
};

RENDER["wirearea"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("计算方向", '<select id="waMode"><option value="toS">已知直径 → 求截面</option><option value="toD">已知截面 → 求直径</option></select>')+
    '<div id="waBox"></div>';
  function draw(){
    if(val("waMode")==="toS"){
      $("#waBox").innerHTML=field("直径 d（mm）", '<input id="waD" inputmode="decimal" placeholder="如 2.5">');
    }else{
      $("#waBox").innerHTML=field("截面 S（mm²）", '<input id="waS" inputmode="decimal" placeholder="如 4">');
    }
  }
  $("#waMode").onchange=draw; draw();
  $("#calcBtn").onclick=function(){
    const m=val("waMode");
    const r=calcWireArea(m==="toS"?{mode:"toS",d:val("waD")}:{mode:"toD",S:val("waS")});
    if(!r.ok) return showErr(r.msg);
    if(r.mode==="toS") showRes('<div class="big">S = '+trim(r.S,3)+' mm²</div><div class="row">直径 '+trim(r.d)+' mm → 截面 π×(d÷2)²。</div>');
    else showRes('<div class="big">d = '+trim(r.d,3)+' mm</div><div class="row">截面 '+trim(r.S)+' mm² → 直径 2×√(S÷π)。</div>');
  };
};

RENDER["evcable"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("充电桩规格",
      '<select id="evP">'+EV_PRESETS.map(function(p,i){return '<option value="'+i+'">'+p.label+'（约 '+p.I+'A）</option>';}).join("")+'</select>')+
    field("布线距离（米，单程）", '<input id="evL" inputmode="decimal" placeholder="如 25">',
      "距离超过 30 米时线径自动升一档");
  $("#calcBtn").onclick=function(){
    const r=calcEvCable({preset:val("evP"),L:val("evL")});
    if(!r.ok) return showErr(r.msg);
    showRes('<div class="big">推荐铜芯线径：'+r.size+' mm²</div>'+
      '<div class="row">'+r.preset+'，工作电流约 '+r.I+'A，布线距离 '+trim(r.L)+' 米。'+
      (r.bumped?'距离超过 30 米，已升一档。':'')+'</div>'+
      '<div class="row">参考值：实际安装请按规范并考虑穿管、环境温度等因素。</div>');
  };
};

RENDER["busbar"]=function(tool){
  const f=shell(tool);
  f.innerHTML=field("工作电流（A）", '<input id="bbI" inputmode="decimal" placeholder="如 500">',
    "按 TMY 铜排载流量参考值向上匹配规格");
  $("#calcBtn").onclick=function(){
    const r=calcBusbar({I:val("bbI")});
    if(!r.ok) return showErr(r.msg);
    if(r.rec) showRes('<div class="big">推荐铜排：'+r.rec.w+'×'+r.rec.t+' mm</div>'+
      '<div class="row">载流量参考值 '+r.rec.a+'A ≥ '+trim(r.I,1)+'A。参考值：请按规范校验动热稳定。</div>');
    else showRes('<div class="row">电流 '+trim(r.I,1)+' A 超出常用参考表（最大 1050A），建议多根并列或查手册选型。</div>');
  };
  const t=document.createElement("div");
  t.innerHTML='<table class="ref"><tr><th>规格 (mm)</th><th>载流量参考值 (A)</th></tr>'+
    BUSBAR_TABLE.map(function(r){return "<tr><td>"+r.w+"×"+r.t+"</td><td>"+r.a+"</td></tr>";}).join("")+"</table>"+
    '<div class="hint" style="margin-top:6px">参考值，仅供学习参考。</div>';
  f.appendChild(t);
};

RENDER["busbarcost"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("长度（米）", '<input id="bcL" inputmode="decimal" placeholder="如 2">')+
    field("宽度（mm）", '<input id="bcW" inputmode="decimal" placeholder="如 50">')+
    field("厚度（mm）", '<input id="bcT" inputmode="decimal" placeholder="如 5">')+
    field("铜价单价（元/kg）", '<input id="bcP" inputmode="decimal" placeholder="如 80">');
  $("#calcBtn").onclick=function(){
    const r=calcBusbarCost({L:val("bcL"),W:val("bcW"),T:val("bcT"),price:val("bcP")});
    if(!r.ok) return showErr(r.msg);
    showRes('<div class="big">重量 ≈ '+trim(r.kg,3)+' kg</div>'+
      '<div class="row">材料价格 ≈ ¥'+trim(r.cost,2)+'</div>');
  };
};

RENDER["acdc"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("电流类型", '<select id="adType"><option value="dc">直流 DC</option><option value="ac">交流单相 AC</option></select>')+
    field("求什么", '<select id="adMode"><option value="I">已知功率 → 求电流</option><option value="P">已知电流 → 求功率</option></select>')+
    field("电压 U（V）", '<input id="adU" inputmode="decimal" placeholder="如 220">')+
    field("功率 P（W）", '<input id="adP" inputmode="decimal" placeholder="求电流时填">')+
    field("电流 I（A）", '<input id="adI" inputmode="decimal" placeholder="求功率时填">')+
    '<div id="adCosBox">'+field("功率因数 cosφ（交流）", '<input id="adCos" inputmode="decimal" placeholder="如 0.8" value="0.8">')+'</div>';
  function drawCos(){ $("#adCosBox").style.display = val("adType")==="ac" ? "" : "none"; }
  $("#adType").onchange=drawCos; drawCos();
  $("#calcBtn").onclick=function(){
    const r=calcAcDc({type:val("adType"),mode:val("adMode"),U:val("adU"),P:val("adP"),I:val("adI"),cos:val("adCos")});
    if(!r.ok) return showErr(r.msg);
    if(r.mode==="I") showRes('<div class="big">I = '+trim(r.I,3)+' A</div><div class="row">'+(r.ac?"交流单相 I = P ÷ (U × cosφ)":"直流 I = P ÷ U")+'。</div>');
    else showRes('<div class="big">P = '+trim(r.P,2)+' W</div><div class="row">'+(r.ac?"交流单相 P = U × I × cosφ":"直流 P = U × I")+'。</div>');
  };
};
