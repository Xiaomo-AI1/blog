/* ===== WAVE-1C 单位换算（41个） ===== */
TOOLS.push(
 {id:"uclen", cat:"dwhs", icon:"📏", name:"长度单位换算", desc:"米/千米/厘米/毫米/微米/英寸/英尺/码/英里互转",
  formula:"1km=1000m；1m=100cm=1000mm；1μm=10⁻⁶m；1in=2.54cm；1ft=30.48cm；1yd=0.9144m；1mi=1.609344km",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"m",t:"米(m)"},{v:"km",t:"千米(km)"},{v:"cm",t:"厘米(cm)"},{v:"mm",t:"毫米(mm)"},{v:"um",t:"微米(μm)"},{v:"nm",t:"纳米(nm)"},{v:"in",t:"英寸(in)"},{v:"ft",t:"英尺(ft)"},{v:"yd",t:"码(yd)"},{v:"mi",t:"英里(mi)"}], def:"km"},
   {id:"to", label:"到", type:"select", options:[{v:"m",t:"米(m)"},{v:"km",t:"千米(km)"},{v:"cm",t:"厘米(cm)"},{v:"mm",t:"毫米(mm)"},{v:"um",t:"微米(μm)"},{v:"nm",t:"纳米(nm)"},{v:"in",t:"英寸(in)"},{v:"ft",t:"英尺(ft)"},{v:"yd",t:"码(yd)"},{v:"mi",t:"英里(mi)"}], def:"m"}
  ],
  run:"var k={m:1,km:1000,cm:0.01,mm:0.001,um:1e-6,nm:1e-9,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"km",to:"m"}, expect:"1000"}},
 {id:"ucarea", cat:"dwhs", icon:"🟧", name:"面积单位换算", desc:"平方米/公顷/亩/英亩/平方英尺互转",
  formula:"1公顷=10000㎡；1亩≈666.667㎡；1英亩=4046.856㎡；1ft²=0.092903㎡",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"m2",t:"平方米(㎡)"},{v:"km2",t:"平方千米(k㎡)"},{v:"cm2",t:"平方厘米(c㎡)"},{v:"mm2",t:"平方毫米"},{v:"ha",t:"公顷"},{v:"mu",t:"亩"},{v:"acre",t:"英亩"},{v:"ft2",t:"平方英尺(ft²)"},{v:"in2",t:"平方英寸(in²)"}], def:"ha"},
   {id:"to", label:"到", type:"select", options:[{v:"m2",t:"平方米(㎡)"},{v:"km2",t:"平方千米(k㎡)"},{v:"cm2",t:"平方厘米(c㎡)"},{v:"mm2",t:"平方毫米"},{v:"ha",t:"公顷"},{v:"mu",t:"亩"},{v:"acre",t:"英亩"},{v:"ft2",t:"平方英尺(ft²)"},{v:"in2",t:"平方英寸(in²)"}], def:"m2"}
  ],
  run:"var k={m2:1,km2:1e6,cm2:1e-4,mm2:1e-6,ha:1e4,mu:666.6666666666666,acre:4046.8564224,ft2:0.09290304,in2:0.00064516};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"ha",to:"m2"}, expect:"10000"}},
 {id:"ucvol", cat:"dwhs", icon:"🧊", name:"体积单位换算", desc:"立方米/立方厘米/升/毫升互转",
  formula:"1m³=1000L；1L=1000mL=1000cm³",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"m3",t:"立方米(m³)"},{v:"cm3",t:"立方厘米(cm³)"},{v:"mm3",t:"立方毫米"},{v:"L",t:"升(L)"},{v:"mL",t:"毫升(mL)"}], def:"m3"},
   {id:"to", label:"到", type:"select", options:[{v:"m3",t:"立方米(m³)"},{v:"cm3",t:"立方厘米(cm³)"},{v:"mm3",t:"立方毫米"},{v:"L",t:"升(L)"},{v:"mL",t:"毫升(mL)"}], def:"L"}
  ],
  run:"var k={m3:1,cm3:1e-6,mm3:1e-9,L:0.001,mL:1e-6};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"m3",to:"L"}, expect:"1000"}},
 {id:"ucfluid", cat:"dwhs", icon:"🛢️", name:"容积单位换算", desc:"升/毫升/美制加仑/英制加仑/液盎司互转",
  formula:"1美制加仑=3.785411784L；1英制加仑=4.54609L；1美制液盎司≈29.574mL",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"L",t:"升(L)"},{v:"mL",t:"毫升(mL)"},{v:"gal_us",t:"美制加仑(gal)"},{v:"qt_us",t:"美制夸脱(qt)"},{v:"pt_us",t:"美制品脱(pt)"},{v:"floz_us",t:"美制液盎司(fl oz)"},{v:"gal_uk",t:"英制加仑(gal)"},{v:"m3",t:"立方米(m³)"}], def:"gal_us"},
   {id:"to", label:"到", type:"select", options:[{v:"L",t:"升(L)"},{v:"mL",t:"毫升(mL)"},{v:"gal_us",t:"美制加仑(gal)"},{v:"qt_us",t:"美制夸脱(qt)"},{v:"pt_us",t:"美制品脱(pt)"},{v:"floz_us",t:"美制液盎司(fl oz)"},{v:"gal_uk",t:"英制加仑(gal)"},{v:"m3",t:"立方米(m³)"}], def:"L"}
  ],
  run:"var k={L:1,mL:0.001,gal_us:3.785411784,qt_us:0.946352946,pt_us:0.473176473,floz_us:0.0295735295625,gal_uk:4.54609,m3:1000};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"gal_us",to:"L"}, expect:"3.7854"}},
 {id:"ucmass", cat:"dwhs", icon:"⚖️", name:"重量质量换算", desc:"千克/克/斤/两/磅/盎司/吨互转",
  formula:"1斤=0.5kg=10两；1磅=0.45359237kg；1盎司=28.3495g；1吨=1000kg",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"kg",t:"千克(kg)"},{v:"g",t:"克(g)"},{v:"mg",t:"毫克(mg)"},{v:"t",t:"吨(t)"},{v:"jin",t:"斤"},{v:"liang",t:"两"},{v:"lb",t:"磅(lb)"},{v:"oz",t:"盎司(oz)"},{v:"ton_us",t:"美吨"},{v:"ton_uk",t:"英吨"}], def:"kg"},
   {id:"to", label:"到", type:"select", options:[{v:"kg",t:"千克(kg)"},{v:"g",t:"克(g)"},{v:"mg",t:"毫克(mg)"},{v:"t",t:"吨(t)"},{v:"jin",t:"斤"},{v:"liang",t:"两"},{v:"lb",t:"磅(lb)"},{v:"oz",t:"盎司(oz)"},{v:"ton_us",t:"美吨"},{v:"ton_uk",t:"英吨"}], def:"jin"}
  ],
  run:"var k={kg:1,g:0.001,mg:1e-6,t:1000,jin:0.5,liang:0.05,lb:0.45359237,oz:0.028349523125,ton_us:907.18474,ton_uk:1016.0469088};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kg",to:"jin"}, expect:"2"}},
 {id:"uctemp", cat:"dwhs", icon:"🌡️", name:"温度单位换算", desc:"摄氏度/华氏度/开尔文互转",
  formula:"°F=°C×9/5+32；K=°C+273.15",
  inputs:[
   {id:"v", label:"数值", def:"100"},
   {id:"from", label:"从", type:"select", options:[{v:"C",t:"摄氏度(°C)"},{v:"F",t:"华氏度(°F)"},{v:"K",t:"开尔文(K)"}], def:"C"},
   {id:"to", label:"到", type:"select", options:[{v:"C",t:"摄氏度(°C)"},{v:"F",t:"华氏度(°F)"},{v:"K",t:"开尔文(K)"}], def:"F"}
  ],
  run:"var c;if(from===\"C\")c=v;else if(from===\"F\")c=(v-32)*5/9;else c=v-273.15;var r;if(to===\"C\")r=c;else if(to===\"F\")r=c*9/5+32;else r=c+273.15;function f(x){if(!isFinite(x))return '超出范围';var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' °'+from+' = '+f(r)+' °'+to+'</div>'};",
  test:{inputs:{v:100,from:"C",to:"F"}, expect:"212"}},
 {id:"ucspeed", cat:"dwhs", icon:"🚗", name:"速度单位换算", desc:"米/秒/千米/时/英里/时/节互转",
  formula:"1m/s=3.6km/h；1mph=0.44704m/s；1节=1.852km/h",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"ms",t:"米/秒(m/s)"},{v:"kmh",t:"千米/时(km/h)"},{v:"mph",t:"英里/时(mph)"},{v:"fts",t:"英尺/秒(ft/s)"},{v:"knot",t:"节(kn)"}], def:"ms"},
   {id:"to", label:"到", type:"select", options:[{v:"ms",t:"米/秒(m/s)"},{v:"kmh",t:"千米/时(km/h)"},{v:"mph",t:"英里/时(mph)"},{v:"fts",t:"英尺/秒(ft/s)"},{v:"knot",t:"节(kn)"}], def:"kmh"}
  ],
  run:"var k={ms:1,kmh:1/3.6,mph:0.44704,fts:0.3048,knot:0.5144444444444445};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"ms",to:"kmh"}, expect:"3.6"}},
 {id:"ucaccel", cat:"dwhs", icon:"🚀", name:"加速度单位换算", desc:"米/秒²/重力加速度g/伽互转",
  formula:"1g=9.80665m/s²；1Gal=0.01m/s²",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"ms2",t:"米/秒²(m/s²)"},{v:"g",t:"重力加速度(g)"},{v:"khms",t:"千米/时·秒(km/h/s)"},{v:"fts2",t:"英尺/秒²(ft/s²)"},{v:"gal",t:"伽(Gal)"}], def:"g"},
   {id:"to", label:"到", type:"select", options:[{v:"ms2",t:"米/秒²(m/s²)"},{v:"g",t:"重力加速度(g)"},{v:"khms",t:"千米/时·秒(km/h/s)"},{v:"fts2",t:"英尺/秒²(ft/s²)"},{v:"gal",t:"伽(Gal)"}], def:"ms2"}
  ],
  run:"var k={ms2:1,g:9.80665,khms:1/3.6,fts2:0.3048,gal:0.01};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"g",to:"ms2"}, expect:"9.80665"}},
 {id:"ucpress", cat:"dwhs", icon:"🗜️", name:"压力单位换算", desc:"帕/千帕/兆帕/巴/psi/毫米汞柱/大气压互转",
  formula:"1bar=100kPa；1atm=101325Pa；1psi≈6894.76Pa；1mmHg≈133.322Pa",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"Pa",t:"帕(Pa)"},{v:"kPa",t:"千帕(kPa)"},{v:"MPa",t:"兆帕(MPa)"},{v:"bar",t:"巴(bar)"},{v:"mbar",t:"毫巴(mbar)"},{v:"psi",t:"磅/平方英寸(psi)"},{v:"mmHg",t:"毫米汞柱(mmHg)"},{v:"atm",t:"标准大气压(atm)"},{v:"inHg",t:"英寸汞柱(inHg)"}], def:"bar"},
   {id:"to", label:"到", type:"select", options:[{v:"Pa",t:"帕(Pa)"},{v:"kPa",t:"千帕(kPa)"},{v:"MPa",t:"兆帕(MPa)"},{v:"bar",t:"巴(bar)"},{v:"mbar",t:"毫巴(mbar)"},{v:"psi",t:"磅/平方英寸(psi)"},{v:"mmHg",t:"毫米汞柱(mmHg)"},{v:"atm",t:"标准大气压(atm)"},{v:"inHg",t:"英寸汞柱(inHg)"}], def:"kPa"}
  ],
  run:"var k={Pa:1,kPa:1000,MPa:1e6,bar:1e5,mbar:100,psi:6894.757293168,mmHg:133.322387415,atm:101325,inHg:3386.389};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"bar",to:"kPa"}, expect:"100"}},
 {id:"ucenergy", cat:"dwhs", icon:"🔥", name:"能量热量换算", desc:"焦耳/卡/千瓦时/英热单位/电子伏特互转",
  formula:"1kWh=3.6×10⁶J；1cal=4.184J；1BTU≈1055.056J；1eV≈1.602×10⁻¹⁹J",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"J",t:"焦耳(J)"},{v:"kJ",t:"千焦(kJ)"},{v:"cal",t:"卡(cal)"},{v:"kcal",t:"千卡(kcal)"},{v:"Wh",t:"瓦时(Wh)"},{v:"kWh",t:"千瓦时(kWh)"},{v:"eV",t:"电子伏特(eV)"},{v:"BTU",t:"英热单位(BTU)"},{v:"ftlb",t:"英尺磅(ft·lbf)"}], def:"kWh"},
   {id:"to", label:"到", type:"select", options:[{v:"J",t:"焦耳(J)"},{v:"kJ",t:"千焦(kJ)"},{v:"cal",t:"卡(cal)"},{v:"kcal",t:"千卡(kcal)"},{v:"Wh",t:"瓦时(Wh)"},{v:"kWh",t:"千瓦时(kWh)"},{v:"eV",t:"电子伏特(eV)"},{v:"BTU",t:"英热单位(BTU)"},{v:"ftlb",t:"英尺磅(ft·lbf)"}], def:"J"}
  ],
  run:"var k={J:1,kJ:1000,cal:4.184,kcal:4184,Wh:3600,kWh:3.6e6,eV:1.602176634e-19,BTU:1055.05585262,ftlb:1.3558179483314004};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kWh",to:"J"}, expect:"3600000"}},
 {id:"ucpower", cat:"dwhs", icon:"⚡", name:"功率单位换算", desc:"瓦/千瓦/兆瓦/马力/BTU时互转",
  formula:"1公制马力=735.499W；1英制马力=745.700W；1BTU/h≈0.293W",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"W",t:"瓦(W)"},{v:"kW",t:"千瓦(kW)"},{v:"MW",t:"兆瓦(MW)"},{v:"hp_m",t:"公制马力(PS)"},{v:"hp_i",t:"英制马力(hp)"},{v:"BTUh",t:"BTU/时"},{v:"fplbs",t:"英尺磅/秒"}], def:"kW"},
   {id:"to", label:"到", type:"select", options:[{v:"W",t:"瓦(W)"},{v:"kW",t:"千瓦(kW)"},{v:"MW",t:"兆瓦(MW)"},{v:"hp_m",t:"公制马力(PS)"},{v:"hp_i",t:"英制马力(hp)"},{v:"BTUh",t:"BTU/时"},{v:"fplbs",t:"英尺磅/秒"}], def:"W"}
  ],
  run:"var k={W:1,kW:1000,MW:1e6,hp_m:735.49875,hp_i:745.6998715822702,BTUh:0.2930710701722222,fplbs:1.3558179483314004};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kW",to:"W"}, expect:"1000"}},
 {id:"uctimelen", cat:"dwhs", icon:"⏱️", name:"时间单位换算", desc:"秒/分/时/天/周/月/年互转",
  formula:"1天=86400s；1平均年=31557600s(365.25天)；1平均月=2629746s",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"s",t:"秒(s)"},{v:"ms",t:"毫秒(ms)"},{v:"min",t:"分钟(min)"},{v:"h",t:"小时(h)"},{v:"day",t:"天(d)"},{v:"week",t:"周"},{v:"month",t:"月(平均)"},{v:"year",t:"年(平均)"}], def:"h"},
   {id:"to", label:"到", type:"select", options:[{v:"s",t:"秒(s)"},{v:"ms",t:"毫秒(ms)"},{v:"min",t:"分钟(min)"},{v:"h",t:"小时(h)"},{v:"day",t:"天(d)"},{v:"week",t:"周"},{v:"month",t:"月(平均)"},{v:"year",t:"年(平均)"}], def:"s"}
  ],
  run:"var k={s:1,ms:0.001,min:60,h:3600,day:86400,week:604800,month:2629746,year:31557600};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"h",to:"s"}, expect:"3600"}},
 {id:"ucangle", cat:"dwhs", icon:"📐", name:"角度单位换算", desc:"弧度/度/梯度/周/角分/角秒互转",
  formula:"π rad=180°；1周=360°=400grad；1°=60′=3600″",
  inputs:[
   {id:"v", label:"数值", def:"180"},
   {id:"from", label:"从", type:"select", options:[{v:"rad",t:"弧度(rad)"},{v:"deg",t:"度(°)"},{v:"grad",t:"梯度(grad)"},{v:"turn",t:"周"},{v:"arcmin",t:"角分(′)"},{v:"arcsec",t:"角秒(″)"}], def:"deg"},
   {id:"to", label:"到", type:"select", options:[{v:"rad",t:"弧度(rad)"},{v:"deg",t:"度(°)"},{v:"grad",t:"梯度(grad)"},{v:"turn",t:"周"},{v:"arcmin",t:"角分(′)"},{v:"arcsec",t:"角秒(″)"}], def:"rad"}
  ],
  run:"var k={rad:1,deg:Math.PI/180,grad:Math.PI/200,turn:2*Math.PI,arcmin:Math.PI/10800,arcsec:Math.PI/648000};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:180,from:"deg",to:"rad"}, expect:"3.14159265"}},
 {id:"ucdata", cat:"dwhs", icon:"💾", name:"数据存储换算", desc:"B/KB/MB/GB/TB/PB/比特互转",
  formula:"1KB=1024B；1MB=1024KB；1字节=8比特",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"B",t:"字节(B)"},{v:"KB",t:"千字节(KB)"},{v:"MB",t:"兆字节(MB)"},{v:"GB",t:"吉字节(GB)"},{v:"TB",t:"太字节(TB)"},{v:"PB",t:"拍字节(PB)"},{v:"bit",t:"比特(bit)"},{v:"Kb",t:"千比特(Kb)"},{v:"Mb",t:"兆比特(Mb)"}], def:"GB"},
   {id:"to", label:"到", type:"select", options:[{v:"B",t:"字节(B)"},{v:"KB",t:"千字节(KB)"},{v:"MB",t:"兆字节(MB)"},{v:"GB",t:"吉字节(GB)"},{v:"TB",t:"太字节(TB)"},{v:"PB",t:"拍字节(PB)"},{v:"bit",t:"比特(bit)"},{v:"Kb",t:"千比特(Kb)"},{v:"Mb",t:"兆比特(Mb)"}], def:"MB"}
  ],
  run:"var k={B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776,PB:1125899906842624,bit:0.125,Kb:128,Mb:131072};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"GB",to:"MB"}, expect:"1024"}},
 {id:"ucrate", cat:"dwhs", icon:"📶", name:"传输速率换算", desc:"bps/kbps/Mbps/Gbps/KB/s互转",
  formula:"1Mbps=1000kbps；1MB/s=8Mbps（速率按1000进位）",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"bps",t:"比特/秒(bps)"},{v:"kbps",t:"千比特/秒(kbps)"},{v:"Mbps",t:"兆比特/秒(Mbps)"},{v:"Gbps",t:"吉比特/秒(Gbps)"},{v:"KBs",t:"千字节/秒(KB/s)"},{v:"MBs",t:"兆字节/秒(MB/s)"}], def:"Mbps"},
   {id:"to", label:"到", type:"select", options:[{v:"bps",t:"比特/秒(bps)"},{v:"kbps",t:"千比特/秒(kbps)"},{v:"Mbps",t:"兆比特/秒(Mbps)"},{v:"Gbps",t:"吉比特/秒(Gbps)"},{v:"KBs",t:"千字节/秒(KB/s)"},{v:"MBs",t:"兆字节/秒(MB/s)"}], def:"kbps"}
  ],
  run:"var k={bps:1,kbps:1000,Mbps:1e6,Gbps:1e9,KBs:8000,MBs:8e6};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"Mbps",to:"kbps"}, expect:"1000"}},
 {id:"ucflow", cat:"dwhs", icon:"🌊", name:"体积流量换算", desc:"立方米/秒/升/秒/加仑/分互转",
  formula:"1m³/s=1000L/s；1gpm≈0.06309L/s；1cfm≈0.47195L/s",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"m3s",t:"立方米/秒(m³/s)"},{v:"Ls",t:"升/秒(L/s)"},{v:"Lm",t:"升/分(L/min)"},{v:"m3h",t:"立方米/时(m³/h)"},{v:"gpm",t:"美制加仑/分(gpm)"},{v:"cfm",t:"立方英尺/分(cfm)"}], def:"m3s"},
   {id:"to", label:"到", type:"select", options:[{v:"m3s",t:"立方米/秒(m³/s)"},{v:"Ls",t:"升/秒(L/s)"},{v:"Lm",t:"升/分(L/min)"},{v:"m3h",t:"立方米/时(m³/h)"},{v:"gpm",t:"美制加仑/分(gpm)"},{v:"cfm",t:"立方英尺/分(cfm)"}], def:"Ls"}
  ],
  run:"var k={m3s:1,Ls:0.001,Lm:0.001/60,m3h:1/3600,gpm:0.0000630902,cfm:0.0004719474432};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"m3s",to:"Ls"}, expect:"1000"}},
 {id:"ucdensity", cat:"dwhs", icon:"🧪", name:"密度单位换算", desc:"千克/立方米/克/立方厘米互转",
  formula:"1g/cm³=1000kg/m³；1lb/ft³≈16.018kg/m³",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"kgm3",t:"千克/立方米(kg/m³)"},{v:"gcm3",t:"克/立方厘米(g/cm³)"},{v:"glm3",t:"克/升(g/L)"},{v:"lbft3",t:"磅/立方英尺(lb/ft³)"}], def:"gcm3"},
   {id:"to", label:"到", type:"select", options:[{v:"kgm3",t:"千克/立方米(kg/m³)"},{v:"gcm3",t:"克/立方厘米(g/cm³)"},{v:"glm3",t:"克/升(g/L)"},{v:"lbft3",t:"磅/立方英尺(lb/ft³)"}], def:"kgm3"}
  ],
  run:"var k={kgm3:1,gcm3:1000,glm3:1,lbft3:16.01846337396014};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"gcm3",to:"kgm3"}, expect:"1000"}},
 {id:"ucforce", cat:"dwhs", icon:"💪", name:"力单位换算", desc:"牛顿/千牛/磅力/千克力/达因互转",
  formula:"1kgf=9.80665N；1lbf≈4.44822N；1dyn=10⁻⁵N",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"N",t:"牛顿(N)"},{v:"kN",t:"千牛(kN)"},{v:"dyn",t:"达因(dyn)"},{v:"lbf",t:"磅力(lbf)"},{v:"kgf",t:"千克力(kgf)"},{v:"ozf",t:"盎司力(ozf)"}], def:"kgf"},
   {id:"to", label:"到", type:"select", options:[{v:"N",t:"牛顿(N)"},{v:"kN",t:"千牛(kN)"},{v:"dyn",t:"达因(dyn)"},{v:"lbf",t:"磅力(lbf)"},{v:"kgf",t:"千克力(kgf)"},{v:"ozf",t:"盎司力(ozf)"}], def:"N"}
  ],
  run:"var k={N:1,kN:1000,dyn:1e-5,lbf:4.4482216152605,kgf:9.80665,ozf:0.2780138509537812};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kgf",to:"N"}, expect:"9.80665"}},
 {id:"uctorque", cat:"dwhs", icon:"🔩", name:"扭矩单位换算", desc:"牛米/千克力米/磅力英尺互转",
  formula:"1kgf·m=9.80665N·m；1lbf·ft≈1.35582N·m",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"Nm",t:"牛米(N·m)"},{v:"kNm",t:"千牛米(kN·m)"},{v:"kgfm",t:"千克力米(kgf·m)"},{v:"lbfft",t:"磅力英尺(lbf·ft)"},{v:"lbfin",t:"磅力英寸(lbf·in)"}], def:"Nm"},
   {id:"to", label:"到", type:"select", options:[{v:"Nm",t:"牛米(N·m)"},{v:"kNm",t:"千牛米(kN·m)"},{v:"kgfm",t:"千克力米(kgf·m)"},{v:"lbfft",t:"磅力英尺(lbf·ft)"},{v:"lbfin",t:"磅力英寸(lbf·in)"}], def:"kgfm"}
  ],
  run:"var k={Nm:1,kNm:1000,kgfm:9.80665,lbfft:1.3558179483314004,lbfin:0.1129848250276167};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"Nm",to:"kgfm"}, expect:"0.10197"}},
 {id:"ucfreq", cat:"dwhs", icon:"〰️", name:"频率转速换算", desc:"赫兹/千赫兹/转速rpm互转",
  formula:"1rps=60rpm=1Hz；f=1/T",
  inputs:[
   {id:"v", label:"数值", def:"3000"},
   {id:"from", label:"从", type:"select", options:[{v:"Hz",t:"赫兹(Hz)"},{v:"kHz",t:"千赫兹(kHz)"},{v:"MHz",t:"兆赫兹(MHz)"},{v:"GHz",t:"吉赫兹(GHz)"},{v:"rpm",t:"转/分(rpm)"},{v:"rps",t:"转/秒(rps)"}], def:"rpm"},
   {id:"to", label:"到", type:"select", options:[{v:"Hz",t:"赫兹(Hz)"},{v:"kHz",t:"千赫兹(kHz)"},{v:"MHz",t:"兆赫兹(MHz)"},{v:"GHz",t:"吉赫兹(GHz)"},{v:"rpm",t:"转/分(rpm)"},{v:"rps",t:"转/秒(rps)"}], def:"Hz"}
  ],
  run:"var k={Hz:1,kHz:1000,MHz:1e6,GHz:1e9,rpm:1/60,rps:1};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:3000,from:"rpm",to:"Hz"}, expect:"50"}},
 {id:"uccharge", cat:"dwhs", icon:"🔋", name:"电荷量换算", desc:"库仑/毫库/安时/毫安时互转",
  formula:"1Ah=3600C；Q=I×t",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"C",t:"库仑(C)"},{v:"mC",t:"毫库(mC)"},{v:"uC",t:"微库(μC)"},{v:"nC",t:"纳库(nC)"},{v:"Ah",t:"安时(Ah)"},{v:"mAh",t:"毫安时(mAh)"}], def:"Ah"},
   {id:"to", label:"到", type:"select", options:[{v:"C",t:"库仑(C)"},{v:"mC",t:"毫库(mC)"},{v:"uC",t:"微库(μC)"},{v:"nC",t:"纳库(nC)"},{v:"Ah",t:"安时(Ah)"},{v:"mAh",t:"毫安时(mAh)"}], def:"C"}
  ],
  run:"var k={C:1,mC:0.001,uC:1e-6,nC:1e-9,Ah:3600,mAh:3.6};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"Ah",to:"C"}, expect:"3600"}},
 {id:"uccurrent", cat:"dwhs", icon:"A", name:"电流单位换算", desc:"安培/毫安/微安/千安互转",
  formula:"1A=1000mA；1kA=1000A",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"A",t:"安培(A)"},{v:"mA",t:"毫安(mA)"},{v:"uA",t:"微安(μA)"},{v:"kA",t:"千安(kA)"}], def:"A"},
   {id:"to", label:"到", type:"select", options:[{v:"A",t:"安培(A)"},{v:"mA",t:"毫安(mA)"},{v:"uA",t:"微安(μA)"},{v:"kA",t:"千安(kA)"}], def:"mA"}
  ],
  run:"var k={A:1,mA:0.001,uA:1e-6,kA:1000};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"A",to:"mA"}, expect:"1000"}},
 {id:"ucvolt", cat:"dwhs", icon:"V", name:"电压单位换算", desc:"伏特/毫伏/微伏/千伏/兆伏互转",
  formula:"1kV=1000V；1V=1000mV",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"V",t:"伏特(V)"},{v:"mV",t:"毫伏(mV)"},{v:"uV",t:"微伏(μV)"},{v:"kV",t:"千伏(kV)"},{v:"MV",t:"兆伏(MV)"}], def:"kV"},
   {id:"to", label:"到", type:"select", options:[{v:"V",t:"伏特(V)"},{v:"mV",t:"毫伏(mV)"},{v:"uV",t:"微伏(μV)"},{v:"kV",t:"千伏(kV)"},{v:"MV",t:"兆伏(MV)"}], def:"V"}
  ],
  run:"var k={V:1,mV:0.001,uV:1e-6,kV:1000,MV:1e6};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kV",to:"V"}, expect:"1000"}},
 {id:"ucres", cat:"dwhs", icon:"Ω", name:"电阻单位换算", desc:"欧姆/千欧/兆欧/毫欧互转",
  formula:"1kΩ=1000Ω；1MΩ=10⁶Ω",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"ohm",t:"欧姆(Ω)"},{v:"kohm",t:"千欧(kΩ)"},{v:"Mohm",t:"兆欧(MΩ)"},{v:"mohm",t:"毫欧(mΩ)"}], def:"kohm"},
   {id:"to", label:"到", type:"select", options:[{v:"ohm",t:"欧姆(Ω)"},{v:"kohm",t:"千欧(kΩ)"},{v:"Mohm",t:"兆欧(MΩ)"},{v:"mohm",t:"毫欧(mΩ)"}], def:"ohm"}
  ],
  run:"var k={ohm:1,kohm:1000,Mohm:1e6,mohm:0.001};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kohm",to:"ohm"}, expect:"1000"}},
 {id:"uccond", cat:"dwhs", icon:"S", name:"电导单位换算", desc:"西门子/毫西/微西/纳西互转",
  formula:"G=1/R；1S=1000mS",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"S",t:"西门子(S)"},{v:"mS",t:"毫西门子(mS)"},{v:"uS",t:"微西门子(μS)"},{v:"nS",t:"纳西门子(nS)"}], def:"mS"},
   {id:"to", label:"到", type:"select", options:[{v:"S",t:"西门子(S)"},{v:"mS",t:"毫西门子(mS)"},{v:"uS",t:"微西门子(μS)"},{v:"nS",t:"纳西门子(nS)"}], def:"S"}
  ],
  run:"var k={S:1,mS:0.001,uS:1e-6,nS:1e-9};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"mS",to:"S"}, expect:"0.001"}},
 {id:"ucflux", cat:"dwhs", icon:"🧲", name:"磁通量换算", desc:"韦伯/毫韦伯/麦克斯韦互转",
  formula:"1Wb=10⁸Mx；Φ=B×S",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"Wb",t:"韦伯(Wb)"},{v:"mWb",t:"毫韦伯(mWb)"},{v:"Mx",t:"麦克斯韦(Mx)"}], def:"Wb"},
   {id:"to", label:"到", type:"select", options:[{v:"Wb",t:"韦伯(Wb)"},{v:"mWb",t:"毫韦伯(mWb)"},{v:"Mx",t:"麦克斯韦(Mx)"}], def:"Mx"}
  ],
  run:"var k={Wb:1,mWb:0.001,Mx:1e-8};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"Wb",to:"Mx"}, expect:"100000000"}},
 {id:"ucillum", cat:"dwhs", icon:"💡", name:"照度单位换算", desc:"勒克斯/英尺烛光/辐透互转",
  formula:"1fc≈10.764lx；1ph=10⁴lx",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"lux",t:"勒克斯(lx)"},{v:"fc",t:"英尺烛光(fc)"},{v:"ph",t:"辐透(ph)"}], def:"fc"},
   {id:"to", label:"到", type:"select", options:[{v:"lux",t:"勒克斯(lx)"},{v:"fc",t:"英尺烛光(fc)"},{v:"ph",t:"辐透(ph)"}], def:"lux"}
  ],
  run:"var k={lux:1,fc:10.76391041670972,ph:1e4};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"fc",to:"lux"}, expect:"10.7639"}},
 {id:"uchp", cat:"dwhs", icon:"🐎", name:"马力千瓦互转", desc:"千瓦/公制马力/英制马力互转",
  formula:"1公制马力=0.73549875kW；1英制马力≈0.7457kW",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"kW",t:"千瓦(kW)"},{v:"W",t:"瓦(W)"},{v:"hpm",t:"公制马力(PS)"},{v:"hpi",t:"英制马力(hp)"},{v:"BTUh",t:"BTU/时"}], def:"hpm"},
   {id:"to", label:"到", type:"select", options:[{v:"kW",t:"千瓦(kW)"},{v:"W",t:"瓦(W)"},{v:"hpm",t:"公制马力(PS)"},{v:"hpi",t:"英制马力(hp)"},{v:"BTUh",t:"BTU/时"}], def:"kW"}
  ],
  run:"var k={kW:1,W:0.001,hpm:0.73549875,hpi:0.7456998715822702,BTUh:0.0002930710701722222};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"hpm",to:"kW"}, expect:"0.73549875"}},
 {id:"ucbtu", cat:"dwhs", icon:"♨", name:"BTU热量换算", desc:"英热单位/焦耳/瓦时/色姆互转",
  formula:"1MMBTU=10⁶BTU；1BTU≈1055.056J；1therm=10⁵BTU",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"BTU",t:"英热单位(BTU)"},{v:"kBTU",t:"千BTU"},{v:"MMBTU",t:"百万BTU"},{v:"J",t:"焦耳(J)"},{v:"kJ",t:"千焦(kJ)"},{v:"Wh",t:"瓦时(Wh)"},{v:"therm",t:"美制色姆(therm)"}], def:"MMBTU"},
   {id:"to", label:"到", type:"select", options:[{v:"BTU",t:"英热单位(BTU)"},{v:"kBTU",t:"千BTU"},{v:"MMBTU",t:"百万BTU"},{v:"J",t:"焦耳(J)"},{v:"kJ",t:"千焦(kJ)"},{v:"Wh",t:"瓦时(Wh)"},{v:"therm",t:"美制色姆(therm)"}], def:"BTU"}
  ],
  run:"var k={BTU:1,kBTU:1000,MMBTU:1e6,J:0.0009478171203133172,kJ:0.9478171203133172,Wh:0.2930710701722222,therm:1e5};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"MMBTU",to:"BTU"}, expect:"1000000"}},
 {id:"uccal", cat:"dwhs", icon:"🍚", name:"卡路里焦耳换算", desc:"卡/千卡/焦耳/瓦时互转",
  formula:"1cal=4.184J；1kcal=4184J（食物大卡）",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"J",t:"焦耳(J)"},{v:"cal",t:"卡(cal)"},{v:"kcal",t:"千卡(kcal)"},{v:"kJ",t:"千焦(kJ)"},{v:"Wh",t:"瓦时(Wh)"}], def:"kcal"},
   {id:"to", label:"到", type:"select", options:[{v:"J",t:"焦耳(J)"},{v:"cal",t:"卡(cal)"},{v:"kcal",t:"千卡(kcal)"},{v:"kJ",t:"千焦(kJ)"},{v:"Wh",t:"瓦时(Wh)"}], def:"J"}
  ],
  run:"var k={J:1,cal:4.184,kcal:4184,kJ:1000,Wh:3600};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"kcal",to:"J"}, expect:"4184"}},
 {id:"ucairpress", cat:"dwhs", icon:"🌪", name:"气压单位换算", desc:"百帕/毫米汞柱/英寸汞柱/大气压互转",
  formula:"1atm=1013.25hPa；1mmHg≈1.3332hPa；1inHg≈33.864hPa",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"hPa",t:"百帕(hPa)"},{v:"Pa",t:"帕(Pa)"},{v:"kPa",t:"千帕(kPa)"},{v:"mmHg",t:"毫米汞柱(mmHg)"},{v:"inHg",t:"英寸汞柱(inHg)"},{v:"atm",t:"标准大气压(atm)"},{v:"psi",t:"磅/平方英寸(psi)"}], def:"atm"},
   {id:"to", label:"到", type:"select", options:[{v:"hPa",t:"百帕(hPa)"},{v:"Pa",t:"帕(Pa)"},{v:"kPa",t:"千帕(kPa)"},{v:"mmHg",t:"毫米汞柱(mmHg)"},{v:"inHg",t:"英寸汞柱(inHg)"},{v:"atm",t:"标准大气压(atm)"},{v:"psi",t:"磅/平方英寸(psi)"}], def:"hPa"}
  ],
  run:"var k={hPa:1,Pa:0.01,kPa:10,mmHg:1.33322387415,inHg:33.8638866667,atm:1013.25,psi:68.94757293168};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"atm",to:"hPa"}, expect:"1013.25"}},
 {id:"ucfuel", cat:"dwhs", icon:"⛽", name:"油耗单位换算", desc:"升/百公里/美制mpg/英制mpg互转",
  formula:"mpg(美)=235.2146÷(L/100km)；mpg(英)=282.4809÷(L/100km)；km/L=100÷(L/100km)",
  inputs:[
   {id:"v", label:"数值", def:"8"},
   {id:"from", label:"从", type:"select", options:[{v:"l100km",t:"升/百公里(L/100km)"},{v:"mpg_us",t:"美制英里/加仑(mpg)"},{v:"mpg_uk",t:"英制英里/加仑(mpg)"},{v:"kml",t:"千米/升(km/L)"}], def:"l100km"},
   {id:"to", label:"到", type:"select", options:[{v:"l100km",t:"升/百公里(L/100km)"},{v:"mpg_us",t:"美制英里/加仑(mpg)"},{v:"mpg_uk",t:"英制英里/加仑(mpg)"},{v:"kml",t:"千米/升(km/L)"}], def:"mpg_us"}
  ],
  run:"var base;if(from===\"l100km\")base=v;else if(from===\"mpg_us\")base=235.2145833/v;else if(from===\"mpg_uk\")base=282.4809363/v;else base=100/v;var r;if(to===\"l100km\")r=base;else if(to===\"mpg_us\")r=235.2145833/base;else if(to===\"mpg_uk\")r=282.4809363/base;else r=100/base;function f(x){if(!isFinite(x))return '超出范围';var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:8,from:"l100km",to:"mpg_us"}, expect:"29.40"}},
 {id:"uccook", cat:"dwhs", icon:"🍳", name:"烹饪单位换算", desc:"克/毫升/杯/汤匙/茶匙/盎司互转",
  formula:"以水为基准：1美制杯≈236.59mL；1汤匙≈14.787mL；1茶匙≈4.929mL；1盎司=28.3495g",
  inputs:[
   {id:"v", label:"数值", def:"1", hint:"体积与重量按水换算（1mL≈1g）"},
   {id:"from", label:"从", type:"select", options:[{v:"g",t:"克(g)"},{v:"ml",t:"毫升(mL)"},{v:"oz",t:"盎司(oz)"},{v:"lb",t:"磅(lb)"},{v:"cup_us",t:"美制杯(cup)"},{v:"tbsp_us",t:"美制汤匙(tbsp)"},{v:"tsp_us",t:"美制茶匙(tsp)"}], def:"cup_us"},
   {id:"to", label:"到", type:"select", options:[{v:"g",t:"克(g)"},{v:"ml",t:"毫升(mL)"},{v:"oz",t:"盎司(oz)"},{v:"lb",t:"磅(lb)"},{v:"cup_us",t:"美制杯(cup)"},{v:"tbsp_us",t:"美制汤匙(tbsp)"},{v:"tsp_us",t:"美制茶匙(tsp)"}], def:"ml"}
  ],
  run:"var k={g:1,ml:1,oz:28.349523125,lb:453.59237,cup_us:236.5882365,tbsp_us:14.78676478125,tsp_us:4.92892159375};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"cup_us",to:"ml"}, expect:"236.588"}},
 {id:"ucscreen", cat:"dwhs", icon:"📺", name:"屏幕尺寸换算", desc:"英寸↔厘米（屏幕对角线）",
  formula:"1in=2.54cm（屏幕对角线尺寸）",
  inputs:[
   {id:"v", label:"数值", def:"55"},
   {id:"from", label:"从", type:"select", options:[{v:"inch",t:"英寸(in)"},{v:"cm",t:"厘米(cm)"}], def:"inch"},
   {id:"to", label:"到", type:"select", options:[{v:"inch",t:"英寸(in)"},{v:"cm",t:"厘米(cm)"}], def:"cm"}
  ],
  run:"var k={cm:1,inch:2.54};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:55,from:"inch",to:"cm"}, expect:"139.7"}},
 {id:"ucnmi", cat:"dwhs", icon:"⚓", name:"海里公里换算", desc:"海里/千米/米/英里互转",
  formula:"1海里=1.852km（子午线1角分）",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"km",t:"千米(km)"},{v:"m",t:"米(m)"},{v:"nmi",t:"海里(nmi)"},{v:"mi",t:"英里(mi)"}], def:"nmi"},
   {id:"to", label:"到", type:"select", options:[{v:"km",t:"千米(km)"},{v:"m",t:"米(m)"},{v:"nmi",t:"海里(nmi)"},{v:"mi",t:"英里(mi)"}], def:"km"}
  ],
  run:"var k={km:1,m:0.001,nmi:1.852,mi:1.609344};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"nmi",to:"km"}, expect:"1.852"}},
 {id:"ucly", cat:"dwhs", icon:"🌌", name:"光年单位换算", desc:"光年/千米/天文单位/秒差距互转",
  formula:"1光年≈9.4607×10¹²km≈63241AU≈0.3066pc",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"ly",t:"光年(ly)"},{v:"km",t:"千米(km)"},{v:"au",t:"天文单位(AU)"},{v:"pc",t:"秒差距(pc)"}], def:"ly"},
   {id:"to", label:"到", type:"select", options:[{v:"ly",t:"光年(ly)"},{v:"km",t:"千米(km)"},{v:"au",t:"天文单位(AU)"},{v:"pc",t:"秒差距(pc)"}], def:"km"}
  ],
  run:"var k={ly:1,km:1.0570008340246155e-13,au:0.000015812507401615812,pc:3.261563777167436};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"ly",to:"km"}, expect:"9460730472580"}},
 {id:"ucmu", cat:"dwhs", icon:"🌾", name:"亩平方米换算", desc:"亩/平方米/公顷/英亩互转",
  formula:"1亩=2000/3㎡≈666.667㎡；15亩=1公顷",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"m2",t:"平方米(㎡)"},{v:"mu",t:"亩"},{v:"ha",t:"公顷"},{v:"km2",t:"平方千米(k㎡)"},{v:"acre",t:"英亩"}], def:"mu"},
   {id:"to", label:"到", type:"select", options:[{v:"m2",t:"平方米(㎡)"},{v:"mu",t:"亩"},{v:"ha",t:"公顷"},{v:"km2",t:"平方千米(k㎡)"},{v:"acre",t:"英亩"}], def:"m2"}
  ],
  run:"var k={m2:1,mu:666.6666666666666,ha:10000,km2:1e6,acre:4046.8564224};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"mu",to:"m2"}, expect:"666.666"}},
 {id:"uccatty", cat:"dwhs", icon:"斤", name:"斤公斤换算", desc:"斤/两/千克/克/磅互转",
  formula:"1斤=0.5kg=10两=500g",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"kg",t:"千克(kg)"},{v:"jin",t:"斤"},{v:"liang",t:"两"},{v:"g",t:"克(g)"},{v:"lb",t:"磅(lb)"}], def:"jin"},
   {id:"to", label:"到", type:"select", options:[{v:"kg",t:"千克(kg)"},{v:"jin",t:"斤"},{v:"liang",t:"两"},{v:"g",t:"克(g)"},{v:"lb",t:"磅(lb)"}], def:"g"}
  ],
  run:"var k={kg:1,jin:0.5,liang:0.05,g:0.001,lb:0.45359237};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"jin",to:"g"}, expect:"500"}},
 {id:"ucchi", cat:"dwhs", icon:"尺", name:"尺米换算", desc:"市尺/市寸/市丈/米互转",
  formula:"1丈=10尺；1尺=10寸=1/3m",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"m",t:"米(m)"},{v:"chi",t:"尺"},{v:"cun",t:"寸"},{v:"zhang",t:"丈"},{v:"km",t:"千米(km)"}], def:"zhang"},
   {id:"to", label:"到", type:"select", options:[{v:"m",t:"米(m)"},{v:"chi",t:"尺"},{v:"cun",t:"寸"},{v:"zhang",t:"丈"},{v:"km",t:"千米(km)"}], def:"m"}
  ],
  run:"var k={m:1,chi:1/3,cun:1/30,zhang:10/3,km:1000};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"zhang",to:"m"}, expect:"3.333333"}},
 {id:"ucdb", cat:"dwhs", icon:"🔊", name:"分贝功率换算", desc:"dBm/dBW/瓦/毫瓦互转",
  formula:"P(W)=10^((dBm-30)/10)；dBm=10·lg(P/1mW)；dBm=dBW+30",
  inputs:[
   {id:"v", label:"数值", def:"0"},
   {id:"from", label:"从", type:"select", options:[{v:"dBm",t:"分贝毫瓦(dBm)"},{v:"dBW",t:"分贝瓦(dBW)"},{v:"W",t:"瓦(W)"},{v:"mW",t:"毫瓦(mW)"},{v:"kW",t:"千瓦(kW)"}], def:"dBm"},
   {id:"to", label:"到", type:"select", options:[{v:"dBm",t:"分贝毫瓦(dBm)"},{v:"dBW",t:"分贝瓦(dBW)"},{v:"W",t:"瓦(W)"},{v:"mW",t:"毫瓦(mW)"},{v:"kW",t:"千瓦(kW)"}], def:"W"}
  ],
  run:"var w;if(from===\"dBm\")w=Math.pow(10,(v-30)/10);else if(from===\"dBW\")w=Math.pow(10,v/10);else if(from===\"W\")w=v;else if(from===\"mW\")w=v/1000;else w=v*1000;var r;if(to===\"dBm\")r=10*Math.log10(w)+30;else if(to===\"dBW\")r=10*Math.log10(w);else if(to===\"W\")r=w;else if(to===\"mW\")r=w*1000;else r=w/1000;function f(x){if(!isFinite(x))return '超出范围';var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:0,from:"dBm",to:"W"}, expect:"0.001"}},
 {id:"ucconc", cat:"dwhs", icon:"🧫", name:"浓度单位换算", desc:"ppm/mg/L/百分比/ppb互转",
  formula:"以水为基准：1ppm=1mg/L；1%=10000ppm",
  inputs:[
   {id:"v", label:"数值", def:"1"},
   {id:"from", label:"从", type:"select", options:[{v:"ppm",t:"百万分比(ppm)"},{v:"mgL",t:"毫克/升(mg/L)"},{v:"gL",t:"克/升(g/L)"},{v:"pct",t:"百分比(%)"},{v:"ppb",t:"十亿分比(ppb)"}], def:"pct"},
   {id:"to", label:"到", type:"select", options:[{v:"ppm",t:"百万分比(ppm)"},{v:"mgL",t:"毫克/升(mg/L)"},{v:"gL",t:"克/升(g/L)"},{v:"pct",t:"百分比(%)"},{v:"ppb",t:"十亿分比(ppb)"}], def:"ppm"}
  ],
  run:"var k={ppm:1,mgL:1,gL:1000,pct:10000,ppb:0.001};var r=v*k[from]/k[to];function f(x){if(!isFinite(x))return '超出范围';if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-6))return x.toPrecision(6);var s=x.toFixed(10).replace(/\\.?0+$/,'');return s===''?'0':s;}return {ok:true,html:'<div class=\"big\">'+v+' '+from+' = '+f(r)+' '+to+'</div>'};",
  test:{inputs:{v:1,from:"pct",to:"ppm"}, expect:"10000"}}
);
