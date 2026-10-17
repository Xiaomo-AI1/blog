/* ===== WAVE-1A 电子电路（40个数据驱动工具） ===== */
CATS.push({id:"dz", name:"电子电路"});
TOOLS.push(
 {id:"dzled", cat:"dz", icon:"💡", name:"LED限流电阻", desc:"按电源电压和LED参数算限流电阻",
  formula:"R = (Vs − Vf) ÷ If；电流用 mA 代入，内部先换算成安培。",
  inputs:[
   {id:"vs", label:"电源电压", unit:"V", def:"5"},
   {id:"vf", label:"LED压降", unit:"V", def:"2", hint:"红黄约2V，蓝白绿约3V"},
   {id:"ifx", label:"工作电流", unit:"mA", def:"20", min:0.1}
  ],
  run:"var r=(vs-vf)*1000/ifx; if(!(r>0)) return {ok:false,msg:'电源电压必须大于 LED 压降'}; var std=Math.ceil(r-1e-9); return {ok:true,html:'<div class=\"big\">R = '+r.toFixed(1)+' Ω</div><div class=\"row\">建议选用标称值 '+std+' Ω（E24 系列就近取大）</div>'};",
  test:{inputs:{vs:5,vf:2,ifx:20}, expect:"150.0"}},
 {id:"dzrser", cat:"dz", icon:"⛓️", name:"电阻串联", desc:"多个电阻串联求总阻值",
  formula:"R总 = R₁ + R₂ + R₃",
  inputs:[
   {id:"r1", label:"R1", unit:"Ω", def:"100", min:0},
   {id:"r2", label:"R2", unit:"Ω", def:"200", min:0},
   {id:"r3", label:"R3", unit:"Ω", optional:true, hint:"可空"}
  ],
  run:"var r=r1+r2+(r3||0); return {ok:true,html:'<div class=\"big\">R总 = '+r+' Ω</div>'};",
  test:{inputs:{r1:100,r2:200,r3:300}, expect:"600"}},
 {id:"dzrpar", cat:"dz", icon:"🔀", name:"电阻并联", desc:"多个电阻并联求总阻值",
  formula:"1/R总 = 1/R₁ + 1/R₂（+ 1/R₃）",
  inputs:[
   {id:"r1", label:"R1", unit:"Ω", def:"100", min:0.001},
   {id:"r2", label:"R2", unit:"Ω", def:"100", min:0.001},
   {id:"r3", label:"R3", unit:"Ω", optional:true, hint:"可空"}
  ],
  run:"var rs=[r1,r2]; if(typeof r3!=='undefined'&&r3)rs.push(r3); var s=0; for(var i=0;i<rs.length;i++){ if(!(rs[i]>0)) return {ok:false,msg:'阻值必须大于 0'}; s+=1/rs[i]; } var r=1/s; return {ok:true,html:'<div class=\"big\">R总 = '+r.toFixed(2)+' Ω</div>'};",
  test:{inputs:{r1:100,r2:100}, expect:"50.00"}},
 {id:"dzvdiv", cat:"dz", icon:"➗", name:"电阻分压", desc:"两电阻分压求输出电压",
  formula:"Vout = Vin × R₂ ÷ (R₁ + R₂)",
  inputs:[
   {id:"vin", label:"输入电压", unit:"V", def:"12"},
   {id:"r1", label:"R1（上偏置）", unit:"Ω", def:"10000", min:0.001},
   {id:"r2", label:"R2（下偏置）", unit:"Ω", def:"10000", min:0.001}
  ],
  run:"var v=vin*r2/(r1+r2); return {ok:true,html:'<div class=\"big\">Vout = '+v.toFixed(2)+' V</div>'};",
  test:{inputs:{vin:12,r1:10000,r2:10000}, expect:"6.00"}},
 {id:"dzcdiv", cat:"dz", icon:"🌊", name:"电阻分流", desc:"两支路并联求各支路电流",
  formula:"I₁ = I总 × R₂ ÷ (R₁ + R₂)，I₂ = I总 − I₁",
  inputs:[
   {id:"itot", label:"总电流", unit:"mA", def:"100", min:0.001},
   {id:"r1", label:"R1 支路", unit:"Ω", def:"100", min:0.001},
   {id:"r2", label:"R2 支路", unit:"Ω", def:"100", min:0.001}
  ],
  run:"var i1=itot*r2/(r1+r2); var i2=itot*r1/(r1+r2); return {ok:true,html:'<div class=\"big\">I₁ = '+i1.toFixed(1)+' mA，I₂ = '+i2.toFixed(1)+' mA</div>'};",
  test:{inputs:{itot:100,r1:100,r2:100}, expect:"50.0"}},
 {id:"dzcser", cat:"dz", icon:"🔋", name:"电容串联", desc:"多个电容串联求总容量",
  formula:"1/C总 = 1/C₁ + 1/C₂（+ 1/C₃）",
  inputs:[
   {id:"c1", label:"C1", unit:"μF", def:"10", min:0.000001},
   {id:"c2", label:"C2", unit:"μF", def:"10", min:0.000001},
   {id:"c3", label:"C3", unit:"μF", optional:true, hint:"可空"}
  ],
  run:"var cs=[c1,c2]; if(typeof c3!=='undefined'&&c3)cs.push(c3); var s=0; for(var i=0;i<cs.length;i++){ if(!(cs[i]>0)) return {ok:false,msg:'容量必须大于 0'}; s+=1/cs[i]; } var c=1/s; return {ok:true,html:'<div class=\"big\">C总 = '+c.toFixed(2)+' μF</div><div class=\"row\">串联后耐压为各电容耐压之和</div>'};",
  test:{inputs:{c1:10,c2:10}, expect:"5.00"}},
 {id:"dzcpar", cat:"dz", icon:"🪫", name:"电容并联", desc:"多个电容并联求总容量",
  formula:"C总 = C₁ + C₂ + C₃",
  inputs:[
   {id:"c1", label:"C1", unit:"μF", def:"10", min:0},
   {id:"c2", label:"C2", unit:"μF", def:"22", min:0},
   {id:"c3", label:"C3", unit:"μF", optional:true, hint:"可空"}
  ],
  run:"var c=c1+c2+((typeof c3!=='undefined'&&c3)?c3:0); return {ok:true,html:'<div class=\"big\">C总 = '+c+' μF</div><div class=\"row\">并联后耐压取最低者</div>'};",
  test:{inputs:{c1:10,c2:22}, expect:"32"}},
 {id:"dzlser", cat:"dz", icon:"🧲", name:"电感串联", desc:"多个电感串联求总电感（无互感）",
  formula:"L总 = L₁ + L₂ + L₃（忽略互感）",
  inputs:[
   {id:"l1", label:"L1", unit:"mH", def:"10", min:0},
   {id:"l2", label:"L2", unit:"mH", def:"22", min:0},
   {id:"l3", label:"L3", unit:"mH", optional:true, hint:"可空"}
  ],
  run:"var l=l1+l2+((typeof l3!=='undefined'&&l3)?l3:0); return {ok:true,html:'<div class=\"big\">L总 = '+l+' mH</div>'};",
  test:{inputs:{l1:10,l2:22}, expect:"32"}},
 {id:"dzlpar", cat:"dz", icon:"🌀", name:"电感并联", desc:"多个电感并联求总电感（无互感）",
  formula:"1/L总 = 1/L₁ + 1/L₂（忽略互感）",
  inputs:[
   {id:"l1", label:"L1", unit:"mH", def:"10", min:0.000001},
   {id:"l2", label:"L2", unit:"mH", def:"10", min:0.000001}
  ],
  run:"var s=1/l1+1/l2; var l=1/s; return {ok:true,html:'<div class=\"big\">L总 = '+l.toFixed(2)+' mH</div>'};",
  test:{inputs:{l1:10,l2:10}, expect:"5.00"}},
 {id:"dzrctc", cat:"dz", icon:"⏱️", name:"RC时间常数", desc:"算 RC 电路的时间常数 τ",
  formula:"τ = R × C；约 5τ 后充放电基本完成",
  inputs:[
   {id:"r", label:"电阻", unit:"Ω", def:"10000", min:0.001},
   {id:"c", label:"电容", unit:"μF", def:"10", min:0.000001}
  ],
  run:"var t=r*c/1e6; return {ok:true,html:'<div class=\"big\">τ = '+t.toFixed(3)+' s（'+(t*1000).toFixed(1)+' ms）</div><div class=\"row\">约 '+(5*t).toFixed(3)+' s 后充放电完成 99%</div>'};",
  test:{inputs:{r:10000,c:10}, expect:"0.100"}}
);
TOOLS.push(
 {id:"dz555a", cat:"dz", icon:"📻", name:"555无稳态频率占空比", desc:"555 定时器无稳态（方波）电路算频率",
  formula:"f = 1.44 ÷ ((R₁ + 2R₂) × C)；占空比 D = (R₁ + R₂) ÷ (R₁ + 2R₂)",
  inputs:[
   {id:"r1", label:"R1", unit:"kΩ", def:"10", min:0.001},
   {id:"r2", label:"R2", unit:"kΩ", def:"10", min:0.001},
   {id:"c", label:"C", unit:"μF", def:"10", min:0.000001}
  ],
  run:"var R1=r1*1000, R2=r2*1000, C=c/1e6; var f=1.44/((R1+2*R2)*C); var d=(R1+R2)/(R1+2*R2)*100; var t=1/f; return {ok:true,html:'<div class=\"big\">f = '+f.toFixed(2)+' Hz</div><div class=\"row\">占空比 '+d.toFixed(1)+'%（高电平），周期 '+t.toFixed(3)+' s</div>'};",
  test:{inputs:{r1:10,r2:10,c:10}, expect:"4.80"}},
 {id:"dz555m", cat:"dz", icon:"⏲️", name:"555单稳态脉宽", desc:"555 定时器单稳态触发脉宽",
  formula:"T = 1.1 × R × C",
  inputs:[
   {id:"r", label:"电阻", unit:"kΩ", def:"10", min:0.001},
   {id:"c", label:"电容", unit:"μF", def:"10", min:0.000001}
  ],
  run:"var t=1.1*(r*1000)*(c/1e6); return {ok:true,html:'<div class=\"big\">脉宽 T = '+t.toFixed(3)+' s（'+(t*1000).toFixed(1)+' ms）</div>'};",
  test:{inputs:{r:10,c:10}, expect:"0.110"}},
 {id:"dzlc", cat:"dz", icon:"📡", name:"LC谐振频率", desc:"LC 谐振电路的谐振频率",
  formula:"f₀ = 1 ÷ (2π√(LC))",
  inputs:[
   {id:"l", label:"电感", unit:"mH", def:"10", min:0.000001},
   {id:"c", label:"电容", unit:"nF", def:"100", min:0.000001}
  ],
  run:"var L=l/1000, C=c/1e9; var f=1/(2*Math.PI*Math.sqrt(L*C)); var fs=f>=1000?(f/1000).toFixed(3)+' kHz':f.toFixed(1)+' Hz'; return {ok:true,html:'<div class=\"big\">f₀ = '+f.toFixed(1)+' Hz（'+fs+'）</div>'};",
  test:{inputs:{l:10,c:100}, expect:"5032.9"}},
 {id:"dzrclp", cat:"dz", icon:"🔉", name:"RC低通截止频率", desc:"RC 低通滤波器的 -3dB 截止频率",
  formula:"fc = 1 ÷ (2πRC)",
  inputs:[
   {id:"r", label:"电阻", unit:"Ω", def:"1600", min:0.001},
   {id:"c", label:"电容", unit:"nF", def:"100", min:0.000001}
  ],
  run:"var fc=1/(2*Math.PI*r*(c/1e9)); return {ok:true,html:'<div class=\"big\">fc = '+fc.toFixed(1)+' Hz</div><div class=\"row\">高于 fc 的信号被衰减</div>'};",
  test:{inputs:{r:1600,c:100}, expect:"994.7"}},
 {id:"dzrchp", cat:"dz", icon:"🔊", name:"RC高通截止频率", desc:"RC 高通滤波器的 -3dB 截止频率",
  formula:"fc = 1 ÷ (2πRC)",
  inputs:[
   {id:"r", label:"电阻", unit:"Ω", def:"1000", min:0.001},
   {id:"c", label:"电容", unit:"nF", def:"1000", min:0.000001}
  ],
  run:"var fc=1/(2*Math.PI*r*(c/1e9)); return {ok:true,html:'<div class=\"big\">fc = '+fc.toFixed(1)+' Hz</div><div class=\"row\">低于 fc 的信号被衰减</div>'};",
  test:{inputs:{r:1000,c:1000}, expect:"159.2"}},
 {id:"dzninv", cat:"dz", icon:"➕", name:"同相放大器增益", desc:"运放同相比例放大电路电压增益",
  formula:"Av = 1 + Rf ÷ R₁",
  inputs:[
   {id:"rf", label:"反馈电阻 Rf", unit:"kΩ", def:"100", min:0.001},
   {id:"r1", label:"R1", unit:"kΩ", def:"10", min:0.001}
  ],
  run:"var av=1+rf/r1; return {ok:true,html:'<div class=\"big\">Av = +'+av.toFixed(2)+'</div>'};",
  test:{inputs:{rf:100,r1:10}, expect:"11.00"}},
 {id:"dzinv", cat:"dz", icon:"➖", name:"反相放大器增益", desc:"运放反相比例放大电路电压增益",
  formula:"Av = −Rf ÷ R₁",
  inputs:[
   {id:"rf", label:"反馈电阻 Rf", unit:"kΩ", def:"100", min:0.001},
   {id:"r1", label:"R1", unit:"kΩ", def:"10", min:0.001}
  ],
  run:"var av=-rf/r1; return {ok:true,html:'<div class=\"big\">Av = '+av.toFixed(2)+'</div>'};",
  test:{inputs:{rf:100,r1:10}, expect:"-10.00"}},
 {id:"dzvdb", cat:"dz", icon:"📶", name:"电压分贝换算", desc:"电压比换算成分贝 dB",
  formula:"dB = 20 × log₁₀(V₂ ÷ V₁)",
  inputs:[
   {id:"v2", label:"V2", unit:"V", def:"2", min:0.000001},
   {id:"v1", label:"V1（基准）", unit:"V", def:"1", min:0.000001}
  ],
  run:"var db=20*Math.log10(v2/v1); return {ok:true,html:'<div class=\"big\">'+db.toFixed(2)+' dB</div>'};",
  test:{inputs:{v2:2,v1:1}, expect:"6.02"}},
 {id:"dzpdb", cat:"dz", icon:"🎚️", name:"功率分贝换算", desc:"功率比换算成分贝 dB",
  formula:"dB = 10 × log₁₀(P₂ ÷ P₁)",
  inputs:[
   {id:"p2", label:"P2", unit:"W", def:"100", min:0.000001},
   {id:"p1", label:"P1（基准）", unit:"W", def:"1", min:0.000001}
  ],
  run:"var db=10*Math.log10(p2/p1); return {ok:true,html:'<div class=\"big\">'+db.toFixed(2)+' dB</div>'};",
  test:{inputs:{p2:100,p1:1}, expect:"20.00"}},
 {id:"dzdbm", cat:"dz", icon:"⚡", name:"dBm与瓦特互转", desc:"dBm 和瓦特 / 毫瓦互换",
  formula:"P(mW) = 10^(dBm/10)；dBm = 10 × log₁₀(P ÷ 1mW)",
  inputs:[
   {id:"mode", label:"方向", type:"select", options:[{v:"todbm",t:"瓦特 → dBm"},{v:"tow",t:"dBm → 瓦特"}], def:"todbm"},
   {id:"val", label:"数值", def:"1", min:0.000001, hint:"瓦特方向填 W，dBm 方向填 dBm"}
  ],
  run:"var x=parseFloat(val); if(!(x>0)) return {ok:false,msg:'数值必须大于 0'}; if(mode==='todbm'){ var db=10*Math.log10(x/0.001); return {ok:true,html:'<div class=\"big\">'+x+' W = '+db.toFixed(2)+' dBm</div>'}; } var w=Math.pow(10,(x-30)/10); var ws=w>=1?w.toFixed(3)+' W':(w*1000).toFixed(2)+' mW'; return {ok:true,html:'<div class=\"big\">'+x+' dBm = '+ws+'</div>'};",
  test:{inputs:{mode:"todbm",val:1}, expect:"30.00"}}
);
TOOLS.push(
 {id:"dzbatt", cat:"dz", icon:"🔌", name:"电池续航时间估算", desc:"按电池容量和负载电流估算续航",
  formula:"T(小时) = 电池容量(mAh) ÷ 负载电流(mA)",
  inputs:[
   {id:"cap", label:"电池容量", unit:"mAh", def:"2000", min:1},
   {id:"i", label:"负载电流", unit:"mA", def:"100", min:0.001}
  ],
  run:"var t=cap/i; return {ok:true,html:'<div class=\"big\">约 '+t.toFixed(1)+' 小时</div><div class=\"row\">理论值，实际按 80–90% 打折</div>'};",
  test:{inputs:{cap:2000,i:100}, expect:"20.0"}},
 {id:"dzbattsp", cat:"dz", icon:"🔋", name:"电池串并联", desc:"电池串联/并联后的总电压与容量",
  formula:"串联：电压相加、容量不变；并联：电压不变、容量相加",
  inputs:[
   {id:"mode", label:"方式", type:"select", options:[{v:"ser",t:"串联"},{v:"par",t:"并联"}], def:"ser"},
   {id:"n", label:"电池节数", def:"4", min:1},
   {id:"v", label:"单节电压", unit:"V", def:"3.7", min:0.001},
   {id:"cap", label:"单节容量", unit:"mAh", def:"2000", min:1}
  ],
  run:"var vv=parseFloat(v); if(!(n>=1&&vv>0&&cap>0)) return {ok:false,msg:'输入无效'}; var ov,oc; if(mode==='ser'){ ov=n*vv; oc=cap; } else { ov=vv; oc=n*cap; } return {ok:true,html:'<div class=\"big\">总电压 '+ov.toFixed(1)+' V　总容量 '+oc+' mAh</div>'};",
  test:{inputs:{mode:"ser",n:4,v:3.7,cap:2000}, expect:"14.8"}},
 {id:"dzbjt", cat:"dz", icon:"🔺", name:"三极管基极限流电阻", desc:"NPN 开关电路基极电阻取值",
  formula:"Ib = Ic ÷ β；Rb = (Vcc − Vbe) ÷ Ib",
  inputs:[
   {id:"vcc", label:"电源 Vcc", unit:"V", def:"5"},
   {id:"vbe", label:"Vbe", unit:"V", def:"0.7", hint:"硅管约0.7V"},
   {id:"ic", label:"集电极电流 Ic", unit:"mA", def:"100", min:0.001},
   {id:"beta", label:"放大倍数 β", def:"100", min:1}
  ],
  run:"if(!(vcc>vbe&&vbe>0&&ic>0&&beta>0)) return {ok:false,msg:'需满足 Vcc>Vbe>0，Ic>0，β>0'}; var rb=(vcc-vbe)*1000/(ic/beta); return {ok:true,html:'<div class=\"big\">Rb = '+rb.toFixed(0)+' Ω</div><div class=\"row\">基极电流 Ib = '+(ic/beta).toFixed(2)+' mA，就近取标称值（取小更可靠饱和）</div>'};",
  test:{inputs:{vcc:5,vbe:0.7,ic:100,beta:100}, expect:"4300"}},
 {id:"dzzener", cat:"dz", icon:"⚖️", name:"稳压二极管限流电阻", desc:"稳压管电路的限流电阻取值",
  formula:"R = (Vin − Vz) ÷ Iz",
  inputs:[
   {id:"vin", label:"输入电压", unit:"V", def:"12"},
   {id:"vz", label:"稳压值 Vz", unit:"V", def:"5.1"},
   {id:"iz", label:"稳压管电流 Iz", unit:"mA", def:"10", min:0.001}
  ],
  run:"if(!(vin>vz&&vz>0&&iz>0)) return {ok:false,msg:'需满足 Vin>Vz>0，Iz>0'}; var r=(vin-vz)*1000/iz; var p=(vin-vz)*iz/1000; return {ok:true,html:'<div class=\"big\">R = '+r.toFixed(0)+' Ω</div><div class=\"row\">电阻功耗约 '+p.toFixed(3)+' W，选 2 倍余量</div>'};",
  test:{inputs:{vin:12,vz:5.1,iz:10}, expect:"690"}},
 {id:"dzcapen", cat:"dz", icon:"⚡", name:"电容储能", desc:"电容储存的能量",
  formula:"E = ½ × C × V²",
  inputs:[
   {id:"c", label:"电容", unit:"μF", def:"1000", min:0.000001},
   {id:"v", label:"电压", unit:"V", def:"12", min:0}
  ],
  run:"var e=0.5*(c/1e6)*v*v; return {ok:true,html:'<div class=\"big\">E = '+e.toFixed(4)+' J</div>'};",
  test:{inputs:{c:1000,v:12}, expect:"0.0720"}},
 {id:"dzindz", cat:"dz", icon:"🧲", name:"电感感抗", desc:"电感在交流下的阻抗",
  formula:"XL = 2πfL",
  inputs:[
   {id:"f", label:"频率", unit:"Hz", def:"1000", min:0.000001},
   {id:"l", label:"电感", unit:"mH", def:"10", min:0.000001}
  ],
  run:"var xl=2*Math.PI*f*(l/1000); return {ok:true,html:'<div class=\"big\">XL = '+xl.toFixed(2)+' Ω</div>'};",
  test:{inputs:{f:1000,l:10}, expect:"62.83"}},
 {id:"dzcapz", cat:"dz", icon:"🌊", name:"电容容抗", desc:"电容在交流下的阻抗",
  formula:"XC = 1 ÷ (2πfC)",
  inputs:[
   {id:"f", label:"频率", unit:"Hz", def:"1000", min:0.000001},
   {id:"c", label:"电容", unit:"μF", def:"1", min:0.000001}
  ],
  run:"var xc=1/(2*Math.PI*f*(c/1e6)); return {ok:true,html:'<div class=\"big\">XC = '+xc.toFixed(2)+' Ω</div>'};",
  test:{inputs:{f:1000,c:1}, expect:"159.15"}},
 {id:"dzwheat", cat:"dz", icon:"⚖️", name:"惠斯通电桥平衡判断", desc:"判断电桥是否平衡",
  formula:"平衡条件：R₁/R₂ = R₃/R₄",
  inputs:[
   {id:"r1", label:"R1", unit:"Ω", def:"100", min:0.001},
   {id:"r2", label:"R2", unit:"Ω", def:"200", min:0.001},
   {id:"r3", label:"R3", unit:"Ω", def:"150", min:0.001},
   {id:"r4", label:"R4", unit:"Ω", def:"300", min:0.001}
  ],
  run:"var a=r1/r2, b=r3/r4; var okk=Math.abs(a-b)<1e-9; return {ok:true,html:'<div class=\"big\">'+(okk?'✅ 电桥平衡':'❌ 电桥不平衡')+'</div><div class=\"row\">R₁/R₂ = '+a.toFixed(4)+'，R₃/R₄ = '+b.toFixed(4)+'</div>'};",
  test:{inputs:{r1:100,r2:200,r3:150,r4:300}, expect:"平衡"}},
 {id:"dzshunt", cat:"dz", icon:"🔀", name:"分流器电阻计算", desc:"已知表头参数求扩量程分流电阻",
  formula:"Rsh = Ig × Rg ÷ (I − Ig)",
  inputs:[
   {id:"ig", label:"表头满偏电流 Ig", unit:"mA", def:"1", min:0.000001},
   {id:"rg", label:"表头内阻 Rg", unit:"Ω", def:"100", min:0.001},
   {id:"i", label:"目标量程", unit:"A", def:"10", min:0.000001}
  ],
  run:"var igA=ig/1000; if(!(igA>0&&rg>0&&i>igA)) return {ok:false,msg:'需满足：Ig>0，Rg>0，量程 I > Ig'}; var rsh=igA*rg/(i-igA); return {ok:true,html:'<div class=\"big\">Rsh = '+rsh.toFixed(6)+' Ω（'+(rsh*1000).toFixed(2)+' mΩ）</div><div class=\"row\">分流电阻与表头并联</div>'};",
  test:{inputs:{ig:1,rg:100,i:10}, expect:"0.010001"}},
 {id:"dzamm", cat:"dz", icon:"📟", name:"电流表扩量程", desc:"电流表扩大量程的分流电阻",
  formula:"n = I ÷ Ig；Rsh = Rg ÷ (n − 1)",
  inputs:[
   {id:"ig", label:"表头满偏电流 Ig", unit:"mA", def:"1", min:0.000001},
   {id:"rg", label:"表头内阻 Rg", unit:"Ω", def:"100", min:0.001},
   {id:"i", label:"目标量程", unit:"A", def:"1", min:0.000001}
  ],
  run:"var igA=ig/1000; if(!(igA>0&&rg>0&&i>igA)) return {ok:false,msg:'需满足量程 I 大于表头满偏电流 Ig'}; var n=i/igA; var rsh=rg/(n-1); return {ok:true,html:'<div class=\"big\">扩流倍数 n = '+n.toFixed(0)+'，Rsh = '+rsh.toFixed(4)+' Ω</div>'};",
  test:{inputs:{ig:1,rg:100,i:1}, expect:"0.1001"}}
);
TOOLS.push(
 {id:"dzvolt", cat:"dz", icon:"📟", name:"电压表扩量程", desc:"电压表扩大量程的串联电阻",
  formula:"Vg = Ig × Rg；n = V ÷ Vg；Rse = Rg × (n − 1)",
  inputs:[
   {id:"ig", label:"表头满偏电流 Ig", unit:"mA", def:"1", min:0.000001},
   {id:"rg", label:"表头内阻 Rg", unit:"Ω", def:"100", min:0.001},
   {id:"v", label:"目标量程", unit:"V", def:"10", min:0.000001}
  ],
  run:"var igA=ig/1000; if(!(igA>0&&rg>0&&v>0)) return {ok:false,msg:'输入无效'}; var vg=igA*rg; if(!(v>vg)) return {ok:false,msg:'目标量程必须大于表头满偏电压 '+vg.toFixed(3)+' V'}; var n=v/vg; var rse=rg*(n-1); return {ok:true,html:'<div class=\"big\">倍率 n = '+n.toFixed(0)+'，Rse = '+rse.toFixed(0)+' Ω</div><div class=\"row\">扩压电阻与表头串联</div>'};",
  test:{inputs:{ig:1,rg:100,v:10}, expect:"9900"}},
 {id:"dzsine", cat:"dz", icon:"〰️", name:"正弦波峰值有效值互转", desc:"正弦交流电有效值/峰值/峰峰值互换",
  formula:"Vp = Vrms × √2；Vpp = 2 × Vp",
  inputs:[
   {id:"mode", label:"已知", type:"select", options:[{v:"rms",t:"有效值 Vrms"},{v:"pk",t:"峰值 Vp"},{v:"pp",t:"峰峰值 Vpp"}], def:"rms"},
   {id:"v", label:"电压值", unit:"V", def:"220", min:0.000001}
  ],
  run:"var x=parseFloat(v); if(!(x>0)) return {ok:false,msg:'电压必须大于 0'}; var sq=Math.SQRT2, vp, vpp, vrms; if(mode==='rms'){ vrms=x; vp=x*sq; vpp=2*vp; } else if(mode==='pk'){ vp=x; vrms=x/sq; vpp=2*x; } else { vpp=x; vp=x/2; vrms=vp/sq; } return {ok:true,html:'<div class=\"big\">有效值 '+vrms.toFixed(2)+' V　峰值 '+vp.toFixed(2)+' V　峰峰值 '+vpp.toFixed(2)+' V</div>'};",
  test:{inputs:{mode:"rms",v:220}, expect:"311.13"}},
 {id:"dzwire", cat:"dz", icon:"🧵", name:"导线电阻", desc:"按材质长度截面算导线直流电阻",
  formula:"R = ρ × L ÷ S",
  inputs:[
   {id:"rho", label:"材质", type:"select", options:[{v:"0.0172",t:"铜 ρ=0.0172"},{v:"0.0283",t:"铝 ρ=0.0283"}], def:"0.0172"},
   {id:"l", label:"长度", unit:"m", def:"100", min:0.000001},
   {id:"s", label:"截面积", unit:"mm²", def:"2.5", min:0.000001}
  ],
  run:"var rh=parseFloat(rho); if(!(rh>0&&l>0&&s>0)) return {ok:false,msg:'输入无效'}; var r=rh*l/s; return {ok:true,html:'<div class=\"big\">R = '+r.toFixed(3)+' Ω</div>'};",
  test:{inputs:{rho:"0.0172",l:100,s:2.5}, expect:"0.688"}},
 {id:"dzpwr", cat:"dz", icon:"🔥", name:"电阻功耗", desc:"按电压/电流/电阻算电阻功率",
  formula:"P = V² ÷ R = I² × R = V × I",
  inputs:[
   {id:"mode", label:"已知", type:"select", options:[{v:"vr",t:"电压 + 电阻"},{v:"ir",t:"电流 + 电阻"},{v:"vi",t:"电压 + 电流"}], def:"vr"},
   {id:"v", label:"电压", unit:"V", optional:true, hint:"按需填写"},
   {id:"i", label:"电流", unit:"A", optional:true, hint:"按需填写"},
   {id:"r", label:"电阻", unit:"Ω", optional:true, hint:"按需填写"}
  ],
  run:"var p; if(mode==='vr'){ if(!(v>0&&r>0)) return {ok:false,msg:'请填写电压和电阻'}; p=v*v/r; } else if(mode==='ir'){ if(!(i>0&&r>0)) return {ok:false,msg:'请填写电流和电阻'}; p=i*i*r; } else { if(!(v>0&&i>0)) return {ok:false,msg:'请填写电压和电流'}; p=v*i; } return {ok:true,html:'<div class=\"big\">P = '+p.toFixed(2)+' W</div><div class=\"row\">选电阻额定功率 ≥ 2 倍计算值</div>'};",
  test:{inputs:{mode:"vr",v:12,r:100}, expect:"1.44"}},
 {id:"dzpull", cat:"dz", icon:"🪝", name:"上拉电阻电流", desc:"算上拉/下拉电阻的静态电流与功耗",
  formula:"I = Vcc ÷ R",
  inputs:[
   {id:"vcc", label:"电源电压", unit:"V", def:"3.3", min:0.001},
   {id:"r", label:"电阻", unit:"kΩ", def:"10", min:0.001}
  ],
  run:"var R=r*1000; var i=vcc/R*1000; var p=vcc*vcc/R*1000; return {ok:true,html:'<div class=\"big\">I = '+i.toFixed(3)+' mA</div><div class=\"row\">电阻功耗约 '+p.toFixed(2)+' mW</div>'};",
  test:{inputs:{vcc:3.3,r:10}, expect:"0.330"}},
 {id:"dzsum", cat:"dz", icon:"➕", name:"运放加法器输出", desc:"反相加法器输出电压",
  formula:"Vout = −Rf × (V₁/R₁ + V₂/R₂ [+ V₃/R₃])",
  inputs:[
   {id:"rf", label:"Rf", unit:"kΩ", def:"100", min:0.001},
   {id:"r1", label:"R1", unit:"kΩ", def:"10", min:0.001},
   {id:"v1", label:"V1", unit:"V", def:"1"},
   {id:"r2", label:"R2", unit:"kΩ", def:"10", min:0.001},
   {id:"v2", label:"V2", unit:"V", def:"2"},
   {id:"r3", label:"R3", unit:"kΩ", optional:true, hint:"可空"},
   {id:"v3", label:"V3", unit:"V", optional:true, hint:"可空"}
  ],
  run:"if(!(rf>0&&r1>0&&r2>0)) return {ok:false,msg:'电阻必须大于 0'}; var s=v1/r1+v2/r2; if(typeof r3!=='undefined'&&r3) s+=((typeof v3!=='undefined'&&v3)?v3:0)/r3; var vo=-rf*s; return {ok:true,html:'<div class=\"big\">Vout = '+vo.toFixed(2)+' V</div>'};",
  test:{inputs:{rf:100,r1:10,v1:1,r2:10,v2:2}, expect:"-30.00"}},
 {id:"dzdiff", cat:"dz", icon:"➖", name:"差分放大器输出", desc:"减法器输出电压",
  formula:"Vout = (Rf ÷ R₁) × (V₂ − V₁)（R₂=R₁、R₃=Rf 时）",
  inputs:[
   {id:"rf", label:"Rf", unit:"kΩ", def:"100", min:0.001},
   {id:"r1", label:"R1", unit:"kΩ", def:"10", min:0.001},
   {id:"v1", label:"V1（反相端）", unit:"V", def:"0.5"},
   {id:"v2", label:"V2（同相端）", unit:"V", def:"1.5"}
  ],
  run:"if(!(rf>0&&r1>0)) return {ok:false,msg:'电阻必须大于 0'}; var vo=(rf/r1)*(v2-v1); return {ok:true,html:'<div class=\"big\">Vout = '+vo.toFixed(2)+' V</div>'};",
  test:{inputs:{rf:100,r1:10,v1:0.5,v2:1.5}, expect:"10.00"}},
 {id:"dzrcchg", cat:"dz", icon:"⏱️", name:"RC充电到达时间", desc:"电容充电到指定电压所需时间",
  formula:"t = −RC × ln(1 − Vc/Vs)",
  inputs:[
   {id:"r", label:"电阻", unit:"kΩ", def:"10", min:0.001},
   {id:"c", label:"电容", unit:"μF", def:"100", min:0.000001},
   {id:"vs", label:"电源电压", unit:"V", def:"5", min:0.001},
   {id:"vc", label:"目标电压", unit:"V", def:"2.5", min:0.000001}
  ],
  run:"var R=r*1000, C=c/1e6; if(!(R>0&&C>0&&vs>0)) return {ok:false,msg:'输入无效'}; if(!(vc>0&&vc<vs)) return {ok:false,msg:'目标电压须在 0 与电源电压之间'}; var t=-R*C*Math.log(1-vc/vs); return {ok:true,html:'<div class=\"big\">t = '+t.toFixed(4)+' s</div><div class=\"row\">时间常数 τ = '+(R*C).toFixed(3)+' s</div>'};",
  test:{inputs:{r:10,c:100,vs:5,vc:2.5}, expect:"0.6931"}},
 {id:"dzlcur", cat:"dz", icon:"📈", name:"电感电流变化率", desc:"电感两端电压与电流变化率关系",
  formula:"V = L × (di/dt)，即 di/dt = V ÷ L",
  inputs:[
   {id:"v", label:"电感电压", unit:"V", def:"12", min:0.001},
   {id:"l", label:"电感", unit:"mH", def:"10", min:0.000001}
  ],
  run:"var L=l/1000; var d=v/L; return {ok:true,html:'<div class=\"big\">di/dt = '+d.toFixed(0)+' A/s</div>'};",
  test:{inputs:{v:12,l:10}, expect:"1200"}},
 {id:"dzledn", cat:"dz", icon:"💡", name:"LED串联个数", desc:"电源电压下最多串联几颗 LED",
  formula:"n = ⌊Vs ÷ Vf⌋（向下取整）",
  inputs:[
   {id:"vs", label:"电源电压", unit:"V", def:"12", min:0.001},
   {id:"vf", label:"单颗 LED 压降", unit:"V", def:"2", min:0.001}
  ],
  run:"var n=Math.floor(vs/vf); if(n<1) return {ok:false,msg:'电源电压不足以点亮一颗 LED'}; var left=vs-n*vf; return {ok:true,html:'<div class=\"big\">最多串联 '+n+' 颗</div><div class=\"row\">剩余电压 '+left.toFixed(1)+' V，建议加限流电阻</div>'};",
  test:{inputs:{vs:12,vf:2}, expect:"6"}}
);
