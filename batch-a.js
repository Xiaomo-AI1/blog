/* ===== BATCH-A 电机工具 ===== */
/* 纯计算函数（无 DOM 依赖，可单独测试） */
var SQRT3_A = Math.sqrt(3);
function _motorBase(p){
  var U = num(p.U), cos = num(p.cos), eta = num(p.eta);
  if(!(U > 0)) return {ok:false, msg:"电压必须大于 0"};
  if(!(cos > 0 && cos <= 1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
  if(!(eta > 0 && eta <= 1)) return {ok:false, msg:"效率应在 (0,1] 之间"};
  return {ok:true, U:U, cos:cos, eta:eta};
}
/* 1. 三相异步电机轴功率 P2=√3·U·I·cosφ·η（W）；或已知 P2(kW) 反求电流 */
function calcMotorP2(p){
  var b = _motorBase(p); if(!b.ok) return b;
  var I = num(p.I);
  if(!(I >= 0)) return {ok:false, msg:"电流无效"};
  return {ok:true, P2:SQRT3_A * b.U * I * b.cos * b.eta};
}
function calcMotorI(p){
  var b = _motorBase(p); if(!b.ok) return b;
  var P2 = num(p.P2);
  if(!(P2 >= 0)) return {ok:false, msg:"轴功率无效"};
  return {ok:true, I:P2 * 1000 / (SQRT3_A * b.U * b.cos * b.eta)};
}
/* 2. 电机电压 U=P2/(√3·I·cosφ·η)，P2 单位 kW */
function calcMotorU(p){
  var P2 = num(p.P2), I = num(p.I), cos = num(p.cos), eta = num(p.eta);
  if(!(P2 >= 0)) return {ok:false, msg:"轴功率无效"};
  if(!(I > 0)) return {ok:false, msg:"电流必须大于 0"};
  if(!(cos > 0 && cos <= 1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
  if(!(eta > 0 && eta <= 1)) return {ok:false, msg:"效率应在 (0,1] 之间"};
  return {ok:true, U:P2 * 1000 / (SQRT3_A * I * cos * eta)};
}
/* 4. 电机效率 η=P2/P1×100% */
function calcMotorEff(p){
  var P2 = num(p.P2), P1 = num(p.P1);
  if(!(P2 >= 0)) return {ok:false, msg:"轴功率无效"};
  if(!(P1 > 0)) return {ok:false, msg:"输入电功率必须大于 0"};
  return {ok:true, eta:P2 / P1 * 100};
}
/* 5. 电机功率因数 cosφ=P2/(√3·U·I·η)，P2 单位 kW */
function calcMotorPF(p){
  var P2 = num(p.P2), U = num(p.U), I = num(p.I), eta = num(p.eta);
  if(!(P2 >= 0)) return {ok:false, msg:"轴功率无效"};
  if(!(U > 0)) return {ok:false, msg:"电压必须大于 0"};
  if(!(I > 0)) return {ok:false, msg:"电流必须大于 0"};
  if(!(eta > 0 && eta <= 1)) return {ok:false, msg:"效率应在 (0,1] 之间"};
  var cos = P2 * 1000 / (SQRT3_A * U * I * eta);
  if(!(cos > 0 && cos <= 1)) return {ok:false, msg:"计算结果超出 (0,1] 范围，请检查输入"};
  return {ok:true, cos:cos};
}
/* 6. 发电机：视在功率 S(kVA)=P(kW)/cosφ；三相 P=√3·U·I·cosφ；备用≈1.1×主用 */
function calcGen(p){
  var cos = num(p.cos);
  if(!(cos > 0 && cos <= 1)) return {ok:false, msg:"功率因数应在 (0,1] 之间"};
  if(p.mode === "P"){
    var U = num(p.U), I = num(p.I);
    if(!(U > 0)) return {ok:false, msg:"电压必须大于 0"};
    if(!(I >= 0)) return {ok:false, msg:"电流无效"};
    return {ok:true, mode:"P", P:SQRT3_A * U * I * cos / 1000};
  }
  var P = num(p.P);
  if(!(P >= 0)) return {ok:false, msg:"负载功率无效"};
  var S = P / cos;
  return {ok:true, mode:"S", S:S, backup:1.1 * S};
}
/* 7. 变压器：U2=U1·N2/N1；变比 k=U1/U2；三相容量 S=√3·U·I */
function calcTrans(p){
  if(p.mode === "S"){
    var U = num(p.U), I = num(p.I);
    if(!(U > 0)) return {ok:false, msg:"电压必须大于 0"};
    if(!(I >= 0)) return {ok:false, msg:"电流无效"};
    return {ok:true, mode:"S", S:SQRT3_A * U * I / 1000};
  }
  var U1 = num(p.U1), N1 = num(p.N1), N2 = num(p.N2);
  if(!(U1 > 0)) return {ok:false, msg:"一次电压必须大于 0"};
  if(!(N1 > 0 && N2 > 0)) return {ok:false, msg:"一二次匝数都必须大于 0"};
  var U2 = U1 * N2 / N1;
  return {ok:true, mode:"U", U2:U2, k:U1 / U2};
}

/* ===== 注册分类与工具 ===== */
CATS.push({id:"dj", name:"电机工具"});
TOOLS.push(
 {id:"mpower", cat:"dj", icon:"M", name:"电机功率计算器", desc:"三相异步电机：已知电压电流求轴功率，或已知功率求电流",
  formula:"P₂ = √3 × U × I × cosφ × η（W）；反求电流 I = P₂ ÷ (√3 × U × cosφ × η)。η 为效率，填小数。"},
 {id:"mvolt", cat:"dj", icon:"V", name:"电机电压计算器", desc:"已知轴功率、电流、功率因数、效率，反求电机额定电压",
  formula:"U = P₂ ÷ (√3 × I × cosφ × η)。P₂ 按 kW 输入，内部自动换算为 W。"},
 {id:"mcur", cat:"dj", icon:"A", name:"电机电流计算器", desc:"已知轴功率、电压、功率因数、效率，求电机额定电流",
  formula:"I = P₂ ÷ (√3 × U × cosφ × η)。P₂ 按 kW 输入，内部自动换算为 W。"},
 {id:"meff", cat:"dj", icon:"η", name:"电机效率计算器", desc:"轴功率除以输入电功率，得电机效率百分比",
  formula:"η = P₂ ÷ P₁ × 100%。P₂ 为轴功率（铭牌功率），P₁ 为输入电功率。"},
 {id:"mpf", cat:"dj", icon:"λ", name:"电机功率因数计算器", desc:"已知轴功率、电压、电流、效率，反求电机功率因数",
  formula:"cosφ = P₂ ÷ (√3 × U × I × η)。结果应在 (0,1] 之间，超出请检查输入。"},
 {id:"genpower", cat:"dj", icon:"⚡", name:"发电机功率计算器", desc:"按负载功率算发电机视在功率，或算三相发电机输出功率",
  formula:"视在功率 S(kVA) = P(kW) ÷ cosφ；三相输出 P = √3 × U × I × cosφ；备用功率 ≈ 1.1 × 主用功率。"},
 {id:"transvolt", cat:"dj", icon:"⇅", name:"变压器电压计算器", desc:"按匝数比算二次电压与变比，或算三相变压器容量",
  formula:"U₂ = U₁ × N₂ ÷ N₁；变比 k = U₁ ÷ U₂ = N₁ ÷ N₂；三相容量 S = √3 × U × I。"}
);

/* ===== 各工具表单 ===== */
RENDER["mpower"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("求什么", '<select id="mMode"><option value="P2">求轴功率 P₂</option><option value="I">求电流 I</option></select>') +
    field("额定电压 U（V）", '<input id="mU" inputmode="decimal" placeholder="如 380" value="380">') +
    field("电流 I（A）", '<input id="mI" inputmode="decimal" placeholder="求轴功率时填，如 14.9">') +
    field("轴功率 P₂（kW）", '<input id="mP2" inputmode="decimal" placeholder="求电流时填，如 7.5">') +
    field("功率因数 cosφ", '<input id="mCos" inputmode="decimal" placeholder="如 0.85" value="0.85">') +
    field("效率 η", '<input id="mEta" inputmode="decimal" placeholder="如 0.9" value="0.9">',
      "效率填小数，如 90% 填 0.9");
  $("#calcBtn").onclick = function(){
    if(val("mMode") === "P2"){
      var r = calcMotorP2({U:val("mU"), I:val("mI"), cos:val("mCos"), eta:val("mEta")});
      if(!r.ok) return showErr(r.msg);
      showRes('<div class="big">轴功率 P₂ = ' + trim(r.P2 / 1000) + ' kW</div>' +
        '<div class="row">P₂ = √3 × U × I × cosφ × η。</div>');
    }else{
      var r2 = calcMotorI({P2:val("mP2"), U:val("mU"), cos:val("mCos"), eta:val("mEta")});
      if(!r2.ok) return showErr(r2.msg);
      showRes('<div class="big">额定电流 I = ' + trim(r2.I, 2) + ' A</div>' +
        '<div class="row">I = P₂ ÷ (√3 × U × cosφ × η)，P₂ 已按 kW 换算为 W。</div>');
    }
  };
};
RENDER["mvolt"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("轴功率 P₂（kW）", '<input id="vP2" inputmode="decimal" placeholder="如 7.5">') +
    field("电流 I（A）", '<input id="vI" inputmode="decimal" placeholder="如 14.9">') +
    field("功率因数 cosφ", '<input id="vCos" inputmode="decimal" placeholder="如 0.85" value="0.85">') +
    field("效率 η", '<input id="vEta" inputmode="decimal" placeholder="如 0.9" value="0.9">',
      "效率填小数，如 90% 填 0.9");
  $("#calcBtn").onclick = function(){
    var r = calcMotorU({P2:val("vP2"), I:val("vI"), cos:val("vCos"), eta:val("vEta")});
    if(!r.ok) return showErr(r.msg);
    showRes('<div class="big">额定电压 U = ' + trim(r.U, 1) + ' V</div>' +
      '<div class="row">U = P₂ ÷ (√3 × I × cosφ × η)。</div>');
  };
};
RENDER["mcur"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("轴功率 P₂（kW）", '<input id="cP2" inputmode="decimal" placeholder="如 7.5">') +
    field("额定电压 U（V）", '<input id="cU" inputmode="decimal" placeholder="如 380" value="380">') +
    field("功率因数 cosφ", '<input id="cCos" inputmode="decimal" placeholder="如 0.85" value="0.85">') +
    field("效率 η", '<input id="cEta" inputmode="decimal" placeholder="如 0.9" value="0.9">',
      "效率填小数，如 90% 填 0.9");
  $("#calcBtn").onclick = function(){
    var r = calcMotorI({P2:val("cP2"), U:val("cU"), cos:val("cCos"), eta:val("cEta")});
    if(!r.ok) return showErr(r.msg);
    showRes('<div class="big">额定电流 I = ' + trim(r.I, 2) + ' A</div>' +
      '<div class="row">I = P₂ ÷ (√3 × U × cosφ × η)，P₂ 已按 kW 换算为 W。</div>');
  };
};
RENDER["meff"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("轴功率 P₂（kW）", '<input id="eP2" inputmode="decimal" placeholder="如 7.5">',
      "电机铭牌功率即为轴功率") +
    field("输入电功率 P₁（kW）", '<input id="eP1" inputmode="decimal" placeholder="如 8.33">',
      "可用电表实测，或 P₁ = √3 × U × I × cosφ ÷ 1000");
  $("#calcBtn").onclick = function(){
    var r = calcMotorEff({P2:val("eP2"), P1:val("eP1")});
    if(!r.ok) return showErr(r.msg);
    var note = r.eta > 100 ? '<div class="row">⚠ 结果超过 100%，请检查输入是否正确。</div>' : "";
    showRes('<div class="big">效率 η = ' + trim(r.eta, 2) + ' %</div>' +
      '<div class="row">η = P₂ ÷ P₁ × 100%。</div>' + note);
  };
};
RENDER["mpf"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("轴功率 P₂（kW）", '<input id="fP2" inputmode="decimal" placeholder="如 7.5">') +
    field("额定电压 U（V）", '<input id="fU" inputmode="decimal" placeholder="如 380" value="380">') +
    field("电流 I（A）", '<input id="fI" inputmode="decimal" placeholder="如 14.9">') +
    field("效率 η", '<input id="fEta" inputmode="decimal" placeholder="如 0.9" value="0.9">',
      "效率填小数，如 90% 填 0.9");
  $("#calcBtn").onclick = function(){
    var r = calcMotorPF({P2:val("fP2"), U:val("fU"), I:val("fI"), eta:val("fEta")});
    if(!r.ok) return showErr(r.msg);
    showRes('<div class="big">功率因数 cosφ = ' + trim(r.cos, 3) + '</div>' +
      '<div class="row">cosφ = P₂ ÷ (√3 × U × I × η)。</div>');
  };
};
RENDER["genpower"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("求什么", '<select id="gMode"><option value="S">求发电机视在功率 S</option><option value="P">求三相发电机输出功率 P</option></select>') +
    field("用电设备总功率 P（kW）", '<input id="gP" inputmode="decimal" placeholder="求视在功率时填，如 80">') +
    field("发电机电压 U（V）", '<input id="gU" inputmode="decimal" placeholder="求输出功率时填，如 400">') +
    field("发电机电流 I（A）", '<input id="gI" inputmode="decimal" placeholder="求输出功率时填，如 144">') +
    field("功率因数 cosφ", '<input id="gCos" inputmode="decimal" placeholder="如 0.8" value="0.8">');
  $("#calcBtn").onclick = function(){
    if(val("gMode") === "S"){
      var r = calcGen({mode:"S", P:val("gP"), cos:val("gCos")});
      if(!r.ok) return showErr(r.msg);
      showRes('<div class="big">所需视在功率 S = ' + trim(r.S, 1) + ' kVA</div>' +
        '<div class="row">S = P ÷ cosφ；备用功率建议 ≈ ' + trim(r.backup, 1) + ' kVA（按 1.1 倍主用功率）。</div>');
    }else{
      var r2 = calcGen({mode:"P", U:val("gU"), I:val("gI"), cos:val("gCos")});
      if(!r2.ok) return showErr(r2.msg);
      showRes('<div class="big">输出功率 P = ' + trim(r2.P, 1) + ' kW</div>' +
        '<div class="row">P = √3 × U × I × cosφ。</div>');
    }
  };
};
RENDER["transvolt"] = function(tool){
  var f = shell(tool);
  f.innerHTML =
    field("求什么", '<select id="tMode"><option value="U">求二次电压 U₂ / 变比</option><option value="S">求三相容量 S</option></select>') +
    field("一次电压 U₁（V）", '<input id="tU1" inputmode="decimal" placeholder="如 10000">') +
    field("一次匝数 N₁", '<input id="tN1" inputmode="decimal" placeholder="如 1000">') +
    field("二次匝数 N₂", '<input id="tN2" inputmode="decimal" placeholder="如 40">') +
    field("电压 U（V，求容量时填）", '<input id="tU" inputmode="decimal" placeholder="如 400">') +
    field("电流 I（A，求容量时填）", '<input id="tI" inputmode="decimal" placeholder="如 1443">');
  $("#calcBtn").onclick = function(){
    if(val("tMode") === "U"){
      var r = calcTrans({mode:"U", U1:val("tU1"), N1:val("tN1"), N2:val("tN2")});
      if(!r.ok) return showErr(r.msg);
      showRes('<div class="big">二次电压 U₂ = ' + trim(r.U2, 1) + ' V</div>' +
        '<div class="row">变比 k = U₁ ÷ U₂ = ' + trim(r.k, 3) + '（= N₁ ÷ N₂）。</div>');
    }else{
      var r2 = calcTrans({mode:"S", U:val("tU"), I:val("tI")});
      if(!r2.ok) return showErr(r2.msg);
      showRes('<div class="big">三相容量 S = ' + trim(r2.S, 1) + ' kVA</div>' +
        '<div class="row">S = √3 × U × I。</div>');
    }
  };
};
