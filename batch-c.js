/* ===== BATCH-C 综合工具 ===== */
/* 纯计算函数（无 DOM 依赖，可单独测试） */

/* 1. 断路器电流：单相 Iz=P/(U·cosφ)；三相 Iz=P/(√3·U·cosφ)；推荐 In≥1.25×Iz */
function calcBrkCur(p){
  const P=num(p.P), U=num(p.U), cos=num(p.cos);
  const three = p.phase==="3";
  const k = three ? Math.sqrt(3) : 1;
  if(!(P>0)) return {ok:false, msg:"负载功率必须大于 0"};
  if(!(U>0)) return {ok:false, msg:"电压必须大于 0"};
  if(!(cos>0 && cos<=1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
  const Iz = P/(k*U*cos);
  const brk = breakerSize(Iz);
  return {ok:true, Iz:Iz, need:brk.need, rec:brk.rec, three:three};
}

/* 2. 电功率单位互转 */
function calcEpConv(p){
  const mode = p.mode;
  if(mode==="kva2va"){
    const kva=num(p.kva);
    if(!(kva>=0)) return {ok:false, msg:"千伏安数值无效"};
    return {ok:true, mode:mode, va:kva*1000};
  }
  if(mode==="a2v"){
    const I=num(p.I), P=num(p.P);
    if(!(I>0)) return {ok:false, msg:"电流必须大于 0"};
    if(!(P>=0)) return {ok:false, msg:"功率无效"};
    return {ok:true, mode:mode, V:P/I};
  }
  const U=num(p.U), cos=num(p.cos);
  const three = p.phase==="3";
  const k = three ? Math.sqrt(3) : 1;
  if(!(U>0)) return {ok:false, msg:"电压必须大于 0"};
  if(mode==="w2a"){
    const P=num(p.P);
    if(!(P>=0)) return {ok:false, msg:"功率无效"};
    if(!(cos>0 && cos<=1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
    return {ok:true, mode:mode, I:P/(k*U*cos)};
  }
  if(mode==="a2w"){
    const I=num(p.I);
    if(!(I>=0)) return {ok:false, msg:"电流无效"};
    if(!(cos>0 && cos<=1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
    return {ok:true, mode:mode, P:k*U*I*cos};
  }
  if(mode==="a2va"||mode==="a2kva"){
    const I=num(p.I);
    if(!(I>=0)) return {ok:false, msg:"电流无效"};
    return {ok:true, mode:mode, S:k*U*I};
  }
  return {ok:false, msg:"未知换算模式"};
}

/* 3. 视频监控存储：容量(GB)=码率(Mbps)×3600×24×天数×路数÷8÷1024 */
function calcNvrStore(p){
  const br=num(p.br), chn=num(p.ch), days=num(p.days);
  if(!(br>0)) return {ok:false, msg:"单路码率必须大于 0"};
  if(!(chn>0 && Number.isInteger(chn))) return {ok:false, msg:"路数必须为正整数"};
  if(!(days>0)) return {ok:false, msg:"存储天数必须大于 0"};
  const gb = br*3600*24*days*chn/8/1024;
  return {ok:true, gb:gb, tb:gb/1024};
}

/* ===== 工具注册 ===== */
TOOLS.push(
 {id:"brkcur", cat:"dgjs", icon:"⎋", name:"断路器电流计算器", desc:"按负载功率算工作电流并推荐断路器规格",
  formula:"单相 Iz = P ÷ (U × cosφ)；三相 Iz = P ÷ (√3 × U × cosφ)；推荐断路器 In ≥ 1.25 × Iz，向上取标准规格（6/10/16/20/25/32/40/50/63/80/100A）。电机负载建议选用 D 型脱扣曲线断路器。"},
 {id:"epconv", cat:"dwhs", icon:"⇄", name:"电功率单位互转", desc:"瓦特/安培/伏安/千伏安/伏特之间互转",
  formula:"I = P ÷ (k × U × cosφ)；P = k × U × I × cosφ；S = k × U × I；1kVA = 1000VA；V = P ÷ I。其中单相 k=1，三相 k=√3。"},
 {id:"nvrstore", cat:"dgjs", icon:"◉", name:"视频监控存储容量计算器", desc:"按码率、路数、天数算监控存储容量",
  formula:"总容量(GB) = 码率(Mbps) × 3600 × 24 × 天数 × 路数 ÷ 8 ÷ 1024；1TB = 1024GB。"}
);

/* ===== 各工具表单 ===== */
RENDER["brkcur"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("负载功率 P（kW）", '<input id="cP" inputmode="decimal" placeholder="如 7.5">')+
    field("电压 U（V）", '<input id="cU" inputmode="decimal" placeholder="单相如 220，三相如 380" value="380">')+
    field("相数", '<select id="cPhase"><option value="1">单相</option><option value="3" selected>三相</option></select>')+
    field("功率因数 cosφ", '<input id="cCos" inputmode="decimal" placeholder="如 0.85" value="0.85">',
      "断路器按 In ≥ 1.25 × 工作电流选取");
  $("#calcBtn").onclick=function(){
    const r=calcBrkCur({P:num(val("cP"))*1000, U:val("cU"), phase:val("cPhase"), cos:val("cCos")});
    if(!r.ok) return showErr(r.msg);
    let h='<div class="big">工作电流 Iz ≈ '+trim(r.Iz,2)+' A</div>'+
      '<div class="row">1.25 × Iz = '+trim(r.need,2)+' A</div>';
    if(r.rec==null) h+='<div class="row">超出常用规格（最大 100A），建议分路供电或查手册选型。</div>';
    else h+='<div class="big">推荐断路器：'+r.rec+' A</div>';
    if(r.three) h+='<div class="row">💡 电机负载建议选用 D 型脱扣曲线断路器，以躲开启动电流冲击。</div>';
    showRes(h);
  };
};

RENDER["epconv"]=function(tool){
  const f=shell(tool);
  const MODES=[
    {v:"w2a",  t:"瓦特 → 安培"},
    {v:"a2w",  t:"安培 → 瓦特"},
    {v:"a2va", t:"安培 → 伏安(VA)"},
    {v:"a2kva",t:"安培 → 千伏安(kVA)"},
    {v:"kva2va",t:"千伏安 → 伏安"},
    {v:"a2v",  t:"安培 → 伏特（需功率）"}
  ];
  f.innerHTML=
    field("换算模式", '<select id="eMode">'+MODES.map(function(m){return '<option value="'+m.v+'">'+m.t+'</option>';}).join("")+'</select>')+
    '<div id="eFields"></div>';
  function drawFields(){
    const m=val("eMode");
    const phaseSel=field("相数", '<select id="ePhase"><option value="1">单相</option><option value="3">三相</option></select>');
    const uIn=field("电压 U（V）", '<input id="eU" inputmode="decimal" placeholder="单相如 220，三相如 380">');
    const cosIn=field("功率因数 cosφ", '<input id="eCos" inputmode="decimal" placeholder="如 0.85" value="0.85">');
    const pIn=field("功率 P（W）", '<input id="eP" inputmode="decimal" placeholder="如 7500">');
    const iIn=field("电流 I（A）", '<input id="eI" inputmode="decimal" placeholder="如 13.4">');
    let h="";
    if(m==="w2a") h=pIn+uIn+phaseSel+cosIn;
    else if(m==="a2w") h=iIn+uIn+phaseSel+cosIn;
    else if(m==="a2va"||m==="a2kva") h=iIn+uIn+phaseSel;
    else if(m==="kva2va") h=field("容量（kVA）", '<input id="eKva" inputmode="decimal" placeholder="如 10">');
    else if(m==="a2v") h=iIn+pIn;
    $("#eFields").innerHTML=h;
  }
  $("#eMode").onchange=drawFields; drawFields();
  $("#calcBtn").onclick=function(){
    const m=val("eMode");
    const r=calcEpConv({mode:m, P:val("eP"), U:val("eU"), I:val("eI"),
      phase:val("ePhase"), cos:val("eCos"), kva:val("eKva")});
    if(!r.ok) return showErr(r.msg);
    let h="";
    if(m==="w2a") h='<div class="big">I = '+trim(r.I,3)+' A</div><div class="row">I = P ÷ (k × U × cosφ)，单相 k=1，三相 k=√3。</div>';
    else if(m==="a2w") h='<div class="big">P = '+trim(r.P,2)+' W（'+trim(r.P/1000,3)+' kW）</div><div class="row">P = k × U × I × cosφ。</div>';
    else if(m==="a2va") h='<div class="big">S = '+trim(r.S,2)+' VA</div><div class="row">S = k × U × I（视在功率）。</div>';
    else if(m==="a2kva") h='<div class="big">S = '+trim(r.S/1000,3)+' kVA</div><div class="row">S = k × U × I ÷ 1000。</div>';
    else if(m==="kva2va") h='<div class="big">'+val("eKva")+' kVA = '+trim(r.va,2)+' VA</div>';
    else if(m==="a2v") h='<div class="big">V = '+trim(r.V,2)+' V</div><div class="row">V = P ÷ I。</div>';
    showRes(h);
  };
};

RENDER["nvrstore"]=function(tool){
  const f=shell(tool);
  f.innerHTML=
    field("单路码率（Mbps）", '<input id="nBr" inputmode="decimal" placeholder="如 4" value="4">',
      "常见：720P 约 2M，1080P 约 4M，4K 约 8M（H.264；H.265 可减半估算）")+
    field("摄像头路数", '<input id="nCh" inputmode="numeric" placeholder="如 8" value="8">')+
    field("存储天数", '<input id="nDays" inputmode="decimal" placeholder="如 30" value="30">');
  $("#calcBtn").onclick=function(){
    const r=calcNvrStore({br:val("nBr"), ch:val("nCh"), days:val("nDays")});
    if(!r.ok) return showErr(r.msg);
    showRes('<div class="big">约需 '+trim(r.gb,1)+' GB（≈ '+trim(r.tb,2)+' TB）</div>'+
      '<div class="row">按 '+val("nBr")+'Mbps × '+val("nCh")+'路 × '+val("nDays")+'天连续录制计算，建议再预留 10%～20% 余量。</div>');
  };
};
