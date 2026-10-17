/* ===== WAVE-1D 日常生活 ===== */
CATS.push({id:"sh", name:"日常生活"});
TOOLS.push(
 {id:"shbmi", cat:"sh", icon:"⚖", name:"BMI身体质量指数", desc:"算BMI并判断体型",
  formula:"BMI = 体重(kg) ÷ 身高(m)²；<18.5偏瘦，18.5–24正常，24–28超重，≥28肥胖（中国标准）",
  inputs:[
   {id:"h", label:"身高", unit:"cm", def:"170", min:50, max:250},
   {id:"w", label:"体重", unit:"kg", def:"65", min:20, max:300}
  ],
  run:"var bmi=w/((h/100)*(h/100)); var c=bmi<18.5?'偏瘦':bmi<24?'正常':bmi<28?'超重':'肥胖'; return {ok:true,html:'<div class=\"big\">BMI = '+bmi.toFixed(1)+'</div><div class=\"row\">体型判断：'+c+'（仅供参考）</div>'};",
  test:{inputs:{h:170,w:65}, expect:"22.5"}},
 {id:"shbodyfat", cat:"sh", icon:"🧍", name:"体脂率估算", desc:"Deurenberg公式估算体脂率",
  formula:"体脂率% = 1.2×BMI + 0.23×年龄 − 10.8×性别 − 5.4（男=1，女=0）；男正常15–18%，女正常22–25%",
  inputs:[
   {id:"h", label:"身高", unit:"cm", def:"170", min:50, max:250},
   {id:"w", label:"体重", unit:"kg", def:"65", min:20, max:300},
   {id:"age", label:"年龄", unit:"岁", def:"30", min:10, max:100},
   {id:"sex", label:"性别", type:"select", def:"1", options:[{v:"1",t:"男"},{v:"0",t:"女"}]}
  ],
  run:"var bmi=w/((h/100)*(h/100)); var bf=1.2*bmi+0.23*age-10.8*Number(sex)-5.4; var c=Number(sex)===1?(bf<15?'偏低':bf<=18?'正常':'偏高'):(bf<22?'偏低':bf<=25?'正常':'偏高'); return {ok:true,html:'<div class=\"big\">体脂率 ≈ '+bf.toFixed(1)+'%</div><div class=\"row\">'+c+'（估算值，仅供参考）</div>'};",
  test:{inputs:{h:170,w:65,age:30,sex:"1"}, expect:"17.7"}},
 {id:"shbmr", cat:"sh", icon:"🔥", name:"基础代谢率BMR", desc:"Mifflin-St Jeor公式算静息消耗",
  formula:"男：BMR=10×体重+6.25×身高−5×年龄+5；女：BMR=10×体重+6.25×身高−5×年龄−161（kcal/天）",
  inputs:[
   {id:"h", label:"身高", unit:"cm", def:"170", min:50, max:250},
   {id:"w", label:"体重", unit:"kg", def:"65", min:20, max:300},
   {id:"age", label:"年龄", unit:"岁", def:"30", min:10, max:100},
   {id:"sex", label:"性别", type:"select", def:"1", options:[{v:"1",t:"男"},{v:"0",t:"女"}]}
  ],
  run:"var bmr=10*w+6.25*h-5*age+(Number(sex)===1?5:-161); return {ok:true,html:'<div class=\"big\">BMR ≈ '+Math.round(bmr)+' kcal/天</div><div class=\"row\">这是完全静息一天的热量消耗（估算值）</div>'};",
  test:{inputs:{h:170,w:65,age:30,sex:"1"}, expect:"1568"}},
 {id:"shtdee", cat:"sh", icon:"🍚", name:"每日热量需求TDEE", desc:"按活动强度算一天该吃多少",
  formula:"TDEE = BMR × 活动系数（久坐1.2 / 轻度1.375 / 中度1.55 / 高强度1.725 / 极高1.9）",
  inputs:[
   {id:"h", label:"身高", unit:"cm", def:"170", min:50, max:250},
   {id:"w", label:"体重", unit:"kg", def:"65", min:20, max:300},
   {id:"age", label:"年龄", unit:"岁", def:"30", min:10, max:100},
   {id:"sex", label:"性别", type:"select", def:"1", options:[{v:"1",t:"男"},{v:"0",t:"女"}]},
   {id:"act", label:"活动强度", type:"select", def:"1.55", options:[{v:"1.2",t:"久坐不动"},{v:"1.375",t:"轻度活动"},{v:"1.55",t:"中度活动"},{v:"1.725",t:"高强度"},{v:"1.9",t:"极高强度"}]}
  ],
  run:"var bmr=10*w+6.25*h-5*age+(Number(sex)===1?5:-161); var tdee=bmr*Number(act); return {ok:true,html:'<div class=\"big\">TDEE ≈ '+Math.round(tdee)+' kcal/天</div><div class=\"row\">想减脂每天少吃300–500kcal，想增肌多吃200–300kcal（仅供参考）</div>'};",
  test:{inputs:{h:170,w:65,age:30,sex:"1",act:"1.55"}, expect:"2430"}},
 {id:"shstdweight", cat:"sh", icon:"📏", name:"标准体重", desc:"按身高算标准体重范围",
  formula:"男标准=(身高−80)×0.7；女标准=(身高−70)×0.6（kg）；±10%为正常范围",
  inputs:[
   {id:"h", label:"身高", unit:"cm", def:"170", min:50, max:250},
   {id:"sex", label:"性别", type:"select", def:"1", options:[{v:"1",t:"男"},{v:"0",t:"女"}]}
  ],
  run:"var s=Number(sex)===1?(h-80)*0.7:(h-70)*0.6; var lo=(s*0.9).toFixed(1), hi=(s*1.1).toFixed(1); return {ok:true,html:'<div class=\"big\">标准体重 '+s.toFixed(1)+' kg</div><div class=\"row\">正常范围 '+lo+'–'+hi+' kg（仅供参考）</div>'};",
  test:{inputs:{h:170,sex:"1"}, expect:"63.0"}},
 {id:"shwater", cat:"sh", icon:"💧", name:"每日喝水量建议", desc:"按体重算每天该喝多少水",
  formula:"每日需水量 ≈ 体重(kg) × 30–40 ml；取中间值35ml/kg",
  inputs:[
   {id:"w", label:"体重", unit:"kg", def:"65", min:20, max:300}
  ],
  run:"var lo=Math.round(w*30), mid=Math.round(w*35), hi=Math.round(w*40); return {ok:true,html:'<div class=\"big\">建议 '+lo+'–'+hi+' ml/天</div><div class=\"row\">中间值约 '+mid+' ml（≈'+(mid/500).toFixed(1)+'瓶500ml矿泉水）；运动/高温天适当加量</div>'};",
  test:{inputs:{w:65}, expect:"2275"}},
 {id:"shsleep", cat:"sh", icon:"😴", name:"睡眠周期计算", desc:"按90分钟周期推算入睡时间",
  formula:"睡眠周期约90分钟；入睡时间 = 起床时间 − 周期数×90分钟 − 15分钟（入睡耗时）",
  inputs:[
   {id:"hh", label:"希望起床-时", unit:"时", def:"7", min:0, max:23},
   {id:"mm", label:"希望起床-分", unit:"分", def:"0", min:0, max:59},
   {id:"cyc", label:"睡几个周期", type:"select", def:"5", options:[{v:"4",t:"4个周期(6小时)"},{v:"5",t:"5个周期(7.5小时)"},{v:"6",t:"6个周期(9小时)"}]}
  ],
  run:"var t=hh*60+mm-Number(cyc)*90-15; t=((t%1440)+1440)%1440; var sh2=Math.floor(t/60), sm=t%60; var ss=sm<10?'0'+sm:''+sm; return {ok:true,html:'<div class=\"big\">建议 '+sh2+':'+ss+' 前入睡</div><div class=\"row\">按整周期醒来，白天更清醒（仅供参考）</div>'};",
  test:{inputs:{hh:7,mm:0,cyc:"5"}, expect:"23:15"}},
 {id:"shage", cat:"sh", icon:"🎂", name:"精确年龄计算", desc:"算两个日期之间差几岁几月几天",
  formula:"先算整年整月，天数不足向月份借位（按上月实际天数）",
  inputs:[
   {id:"by", label:"出生-年", def:"2000", min:1900, max:2100},
   {id:"bm", label:"出生-月", def:"1", min:1, max:12},
   {id:"bd", label:"出生-日", def:"15", min:1, max:31},
   {id:"ty", label:"目标-年", def:"2026", min:1900, max:2100},
   {id:"tm", label:"目标-月", def:"10", min:1, max:12},
   {id:"td", label:"目标-日", def:"18", min:1, max:31}
  ],
  run:"var y=ty-by, m=tm-bm, d=td-bd; if(d<0){m--; var pm=new Date(ty,tm-1,0).getDate(); d+=pm;} if(m<0){y--; m+=12;} if(y<0) return {ok:false,msg:'目标日期不能早于出生日期'}; return {ok:true,html:'<div class=\"big\">'+y+'岁'+m+'个月'+d+'天</div><div class=\"row\">可用于算宝宝月龄、工龄、合同期等</div>'};",
  test:{inputs:{by:2000,bm:1,bd:15,ty:2026,tm:10,td:18}, expect:"26岁9个月3天"}},
 {id:"shbp", cat:"sh", icon:"🩺", name:"血压判断", desc:"按中国指南判断血压分级",
  formula:"正常<120/80；正常高值120–139/80–89；1级140–159/90–99；2级160–179/100–109；3级≥180/110 mmHg",
  inputs:[
   {id:"sbp", label:"收缩压(高压)", unit:"mmHg", def:"120", min:50, max:300},
   {id:"dbp", label:"舒张压(低压)", unit:"mmHg", def:"80", min:30, max:200}
  ],
  run:"var g=(sbp>=180||dbp>=110)?'3级高血压':(sbp>=160||dbp>=100)?'2级高血压':(sbp>=140||dbp>=90)?'1级高血压':(sbp>=120||dbp>=80)?'正常高值':'正常血压'; var tip=g==='正常血压'?'继续保持':'建议咨询医生，规律监测（仅供参考）'; return {ok:true,html:'<div class=\"big\">'+g+'</div><div class=\"row\">'+sbp+'/'+dbp+' mmHg；'+tip+'</div>'};",
  test:{inputs:{sbp:120,dbp:80}, expect:"正常高值"}}
);
TOOLS.push(
 {id:"shrhr", cat:"sh", icon:"💓", name:"静息心率判断", desc:"判断安静时心率是否正常",
  formula:"成人静息心率 60–100次/分正常；<60偏慢，>100偏快；运动员可低于60",
  inputs:[
   {id:"hr", label:"静息心率", unit:"次/分", def:"72", min:20, max:220}
  ],
  run:"var c=hr<60?'偏慢':hr<=100?'正常':'偏快'; return {ok:true,html:'<div class=\"big\">'+c+'</div><div class=\"row\">'+hr+'次/分；晨起静卧时测量最准（仅供参考）</div>'};",
  test:{inputs:{hr:72}, expect:"正常"}},
 {id:"shhrzone", cat:"sh", icon:"🏃", name:"运动心率区间", desc:"按年龄算5个运动心率区间",
  formula:"最大心率≈220−年龄；热身50–60%，燃脂60–70%，有氧70–80%，无氧80–90%，极限90–100%",
  inputs:[
   {id:"age", label:"年龄", unit:"岁", def:"30", min:10, max:100}
  ],
  run:"var mx=220-age; function z(a,b){return Math.round(mx*a/100)+'–'+Math.round(mx*b/100);} return {ok:true,html:'<div class=\"big\">最大心率 ≈ '+mx+'</div><div class=\"row\">热身 '+z(50,60)+'｜燃脂 '+z(60,70)+'｜有氧 '+z(70,80)+'｜无氧 '+z(80,90)+'｜极限 '+z(90,100)+'（次/分，仅供参考）</div>'};",
  test:{inputs:{age:30}, expect:"190"}},
 {id:"shcal", cat:"sh", icon:"🏊", name:"运动卡路里消耗", desc:"按MET值算运动消耗热量",
  formula:"消耗(kcal) = MET × 体重(kg) × 时间(小时)；慢跑8，快走3.5，骑行7，游泳8，跳绳10，羽毛球5.5",
  inputs:[
   {id:"sport", label:"运动项目", type:"select", def:"8", options:[{v:"8",t:"慢跑"},{v:"3.5",t:"快走"},{v:"7",t:"骑自行车"},{v:"8",t:"游泳"},{v:"10",t:"跳绳"},{v:"5.5",t:"羽毛球"},{v:"6",t:"爬楼梯"}]},
   {id:"w", label:"体重", unit:"kg", def:"65", min:20, max:300},
   {id:"min", label:"运动时长", unit:"分钟", def:"60", min:1, max:600}
  ],
  run:"var kcal=Number(sport)*w*min/60; return {ok:true,html:'<div class=\"big\">≈ '+Math.round(kcal)+' kcal</div><div class=\"row\">约等于 '+(kcal/7700).toFixed(2)+' kg脂肪（7700kcal≈1kg脂肪，仅供参考）</div>'};",
  test:{inputs:{sport:"8",w:65,min:60}, expect:"520"}},
 {id:"shwhr", cat:"sh", icon:"📐", name:"腰臀比WHR", desc:"判断腹部脂肪堆积情况",
  formula:"WHR = 腰围 ÷ 臀围；男<0.9正常，女<0.8正常",
  inputs:[
   {id:"waist", label:"腰围", unit:"cm", def:"85", min:30, max:200},
   {id:"hip", label:"臀围", unit:"cm", def:"95", min:30, max:200},
   {id:"sex", label:"性别", type:"select", def:"1", options:[{v:"1",t:"男"},{v:"0",t:"女"}]}
  ],
  run:"var whr=waist/hip; var lim=Number(sex)===1?0.9:0.8; var c=whr<lim?'正常':'偏高（腹型肥胖风险）'; return {ok:true,html:'<div class=\"big\">WHR = '+whr.toFixed(2)+'</div><div class=\"row\">'+c+'（仅供参考）</div>'};",
  test:{inputs:{waist:85,hip:95,sex:"1"}, expect:"0.89"}},
 {id:"shfever", cat:"sh", icon:"🌡", name:"体温判断", desc:"判断体温是否发热及程度",
  formula:"<36.0偏低；36.0–37.2正常；37.3–38.0低热；38.1–39.0中等热；>39.0高热（腋温/口腔℃）",
  inputs:[
   {id:"t", label:"体温", unit:"℃", def:"37.5", min:30, max:45}
  ],
  run:"var c=t<36?'偏低':t<=37.2?'正常':t<=38?'低热':t<=39?'中等热':'高热'; return {ok:true,html:'<div class=\"big\">'+c+'</div><div class=\"row\">'+t+'℃；发热请多休息、多喝水，持续不退请就医（仅供参考）</div>'};",
  test:{inputs:{t:37.5}, expect:"低热"}},
 {id:"shduedate", cat:"sh", icon:"🤰", name:"孕期预产期", desc:"按末次月经推算预产期",
  formula:"Naegele法则：月份>3则月−3年+1，否则月+9；日期+7（超月按实际天数进位）",
  inputs:[
   {id:"yr", label:"末次月经-年", def:"2025", min:2020, max:2035},
   {id:"mo", label:"末次月经-月", def:"10", min:1, max:12},
   {id:"da", label:"末次月经-日", def:"17", min:1, max:31}
  ],
  run:"var d=new Date(mo>3?yr+1:yr, (mo>3?mo-3:mo+9)-1, da+7); var s=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'; return {ok:true,html:'<div class=\"big\">预产期 '+s+'</div><div class=\"row\">孕期约280天，实际分娩前后两周内都正常（仅供参考）</div>'};",
  test:{inputs:{yr:2025,mo:10,da:17}, expect:"2026年7月24日"}},
 {id:"shchildh", cat:"sh", icon:"👶", name:"宝宝身高预测", desc:"按父母身高预测孩子成年身高",
  formula:"男孩=(父+母+13)/2；女孩=(父+母−13)/2（cm）；±5cm为常见范围",
  inputs:[
   {id:"f", label:"父亲身高", unit:"cm", def:"175", min:130, max:220},
   {id:"m", label:"母亲身高", unit:"cm", def:"160", min:130, max:220},
   {id:"sex", label:"宝宝性别", type:"select", def:"1", options:[{v:"1",t:"男孩"},{v:"0",t:"女孩"}]}
  ],
  run:"var h=(f+m+(Number(sex)===1?13:-13))/2; return {ok:true,html:'<div class=\"big\">预测 '+h.toFixed(0)+' cm</div><div class=\"row\">常见范围 '+(h-5).toFixed(0)+'–'+(h+5).toFixed(0)+' cm；营养运动影响很大（仅供参考）</div>'};",
  test:{inputs:{f:175,m:160,sex:"1"}, expect:"174"}},
 {id:"shvision", cat:"sh", icon:"👓", name:"近视度数与焦距换算", desc:"眼镜度数和焦距互算",
  formula:"屈光度D = 1 ÷ 焦距(米)；如500度=5.00D，焦距=1÷5=0.2米=20cm",
  inputs:[
   {id:"mode", label:"换算方向", type:"select", def:"d2f", options:[{v:"d2f",t:"度数→焦距"},{v:"f2d",t:"焦距→度数"}]},
   {id:"v", label:"数值", unit:"度/cm", def:"500", min:1, max:2000}
  ],
  run:"var out, s; if(mode==='d2f'){var fcm=10000/v; out='焦距 ≈ '+fcm.toFixed(1)+' cm'; s='500度近视，看清约20cm内的东西';}else{var dd=10000/v; out='度数 ≈ '+Math.round(dd)+' 度'; s='焦距20cm约对应500度';} return {ok:true,html:'<div class=\"big\">'+out+'</div><div class=\"row\">'+s+'（近似换算）</div>'};",
  test:{inputs:{mode:"d2f",v:500}, expect:"20.0"}},
 {id:"shovulation", cat:"sh", icon:"📅", name:"排卵期推算", desc:"按月经周期推算排卵日和下次月经",
  formula:"排卵日 ≈ 上次月经首日 + (周期−14)天；下次月经 ≈ 上次首日 + 周期天",
  inputs:[
   {id:"yr", label:"上次月经-年", def:"2026", min:2020, max:2035},
   {id:"mo", label:"上次月经-月", def:"1", min:1, max:12},
   {id:"da", label:"上次月经-日", def:"1", min:1, max:31},
   {id:"cyc", label:"周期天数", unit:"天", def:"28", min:20, max:45}
  ],
  run:"function fmt(d){return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';} var ov=new Date(yr,mo-1,da+(cyc-14)); var nx=new Date(yr,mo-1,da+cyc); return {ok:true,html:'<div class=\"big\">排卵日 ≈ '+fmt(ov)+'</div><div class=\"row\">下次月经 ≈ '+fmt(nx)+'；周期不规律时仅供参考</div>'};",
  test:{inputs:{yr:2026,mo:1,da:1,cyc:28}, expect:"1月15日"}}
);
TOOLS.push(
 {id:"shmort1", cat:"sh", icon:"🏠", name:"房贷等额本息月供", desc:"算每月固定还多少、总利息",
  formula:"月供 = P×r(1+r)^n ÷ ((1+r)^n−1)；r=月利率，n=总月数；总利息=月供×n−本金",
  inputs:[
   {id:"amt", label:"贷款总额", unit:"万元", def:"100", min:1, max:10000},
   {id:"rate", label:"年利率", unit:"%", def:"3.5", min:0.1, max:20},
   {id:"yrs", label:"贷款年限", unit:"年", def:"30", min:1, max:30}
  ],
  run:"var P=amt*10000, r=rate/100/12, n=yrs*12; var f=Math.pow(1+r,n); var M=P*r*f/(f-1); var interest=M*n-P; return {ok:true,html:'<div class=\"big\">月供 '+M.toFixed(2)+' 元</div><div class=\"row\">总利息约 '+Math.round(interest)+' 元（按现行利率估算）</div>'};",
  test:{inputs:{amt:100,rate:3.5,yrs:30}, expect:"4490"}},
 {id:"shmort2", cat:"sh", icon:"🏘", name:"房贷等额本金", desc:"算首月末月月供和总利息",
  formula:"每月还本金=P/n；首月=P/n+P×r；每月递减P×r/n；总利息=P×r×(n+1)/2",
  inputs:[
   {id:"amt", label:"贷款总额", unit:"万元", def:"100", min:1, max:10000},
   {id:"rate", label:"年利率", unit:"%", def:"3.5", min:0.1, max:20},
   {id:"yrs", label:"贷款年限", unit:"年", def:"30", min:1, max:30}
  ],
  run:"var P=amt*10000, r=rate/100/12, n=yrs*12; var first=P/n+P*r, last=P/n*(1+r), interest=P*r*(n+1)/2; return {ok:true,html:'<div class=\"big\">首月 '+first.toFixed(2)+' 元</div><div class=\"row\">末月 '+last.toFixed(2)+' 元，每月递减 '+(P*r/n).toFixed(2)+' 元；总利息约 '+Math.round(interest)+' 元</div>'};",
  test:{inputs:{amt:100,rate:3.5,yrs:30}, expect:"5694"}},
 {id:"shdeposit", cat:"sh", icon:"🏦", name:"银行存款利息", desc:"算定期存款利息和本息",
  formula:"利息 = 本金 × 年利率 × 年数（银行定期多为单利）",
  inputs:[
   {id:"p", label:"本金", unit:"元", def:"100000", min:1, max:100000000},
   {id:"rate", label:"年利率", unit:"%", def:"2", min:0.01, max:20},
   {id:"yrs", label:"存几年", unit:"年", def:"3", min:0.1, max:30}
  ],
  run:"var i=p*rate/100*yrs; return {ok:true,html:'<div class=\"big\">利息 '+i.toFixed(2)+' 元</div><div class=\"row\">到期本息合计 '+(p+i).toFixed(2)+' 元</div>'};",
  test:{inputs:{p:100000,rate:2,yrs:3}, expect:"6000"}},
 {id:"shcompound", cat:"sh", icon:"📈", name:"复利终值", desc:"算利滚利后本息共多少",
  formula:"终值 = 本金 × (1+r)^n；72法则：资金翻倍约需 72÷年利率% 年",
  inputs:[
   {id:"p", label:"本金", unit:"元", def:"100000", min:1, max:100000000},
   {id:"rate", label:"年利率", unit:"%", def:"5", min:0.01, max:50},
   {id:"yrs", label:"年数", unit:"年", def:"10", min:0.1, max:50}
  ],
  run:"var fv=p*Math.pow(1+rate/100,yrs); var dbl=(72/rate).toFixed(1); return {ok:true,html:'<div class=\"big\">终值 '+fv.toFixed(0)+' 元</div><div class=\"row\">资金翻倍约需 '+dbl+' 年（72法则）</div>'};",
  test:{inputs:{p:100000,rate:5,yrs:10}, expect:"162889"}},
 {id:"shitax", cat:"sh", icon:"🧾", name:"中国个税计算", desc:"按现行税率算全年个税",
  formula:"应纳税所得额=年收入−60000−专项附加扣除；3.6万内3%，3.6–14.4万10%速扣2520，14.4–30万20%速扣16920，30–42万25%速扣31920，42–66万30%速扣52920，66–96万35%速扣85920，96万以上45%速扣181920",
  inputs:[
   {id:"income", label:"全年收入", unit:"元", def:"200000", min:0, max:100000000},
   {id:"deduct", label:"专项附加扣除", unit:"元", def:"30000", min:0, max:10000000, hint:"子女教育、房贷利息、赡养老人等合计"}
  ],
  run:"var t=income-60000-deduct; var tax=0; if(t>0){if(t<=36000)tax=t*0.03;else if(t<=144000)tax=t*0.1-2520;else if(t<=300000)tax=t*0.2-16920;else if(t<=420000)tax=t*0.25-31920;else if(t<=660000)tax=t*0.3-52920;else if(t<=960000)tax=t*0.35-85920;else tax=t*0.45-181920;} return {ok:true,html:'<div class=\"big\">应缴个税 '+Math.max(0,tax).toFixed(0)+' 元</div><div class=\"row\">按现行综合所得税率估算，实际以税务申报为准</div>'};",
  test:{inputs:{income:200000,deduct:30000}, expect:"8480"}},
 {id:"shbonus", cat:"sh", icon:"🧧", name:"年终奖个税", desc:"年终奖单独计税算税款",
  formula:"月换算=奖金÷12找税率：≤3000按3%，3000–12000按10%速扣210，12000–25000按20%速扣1410，25000–35000按25%速扣2660，35000–55000按30%速扣4410，55000–80000按35%速扣7160，80000以上45%速扣15160",
  inputs:[
   {id:"bonus", label:"年终奖", unit:"元", def:"36000", min:0, max:10000000}
  ],
  run:"var m=bonus/12, r, q; if(m<=3000){r=0.03;q=0;}else if(m<=12000){r=0.1;q=210;}else if(m<=25000){r=0.2;q=1410;}else if(m<=35000){r=0.25;q=2660;}else if(m<=55000){r=0.3;q=4410;}else if(m<=80000){r=0.35;q=7160;}else{r=0.45;q=15160;} var tax=bonus*r-q; return {ok:true,html:'<div class=\"big\">应缴 '+tax.toFixed(0)+' 元</div><div class=\"row\">到手 '+(bonus-tax).toFixed(0)+' 元（单独计税政策估算）</div>'};",
  test:{inputs:{bonus:36000}, expect:"1080"}},
 {id:"shaa", cat:"sh", icon:"🧮", name:"AA分摊", desc:"聚餐旅行人均该出多少",
  formula:"人均 = 总金额 ÷ 人数",
  inputs:[
   {id:"total", label:"总金额", unit:"元", def:"1250", min:0.01, max:10000000},
   {id:"n", label:"人数", unit:"人", def:"5", min:1, max:1000}
  ],
  run:"var per=total/n; return {ok:true,html:'<div class=\"big\">人均 '+per.toFixed(2)+' 元</div><div class=\"row\">'+n+'人分摊 '+total+' 元</div>'};",
  test:{inputs:{total:1250,n:5}, expect:"250.00"}},
 {id:"shtip", cat:"sh", icon:"💁", name:"小费计算", desc:"国外就餐小费算多少",
  formula:"小费 = 账单 × 小费比例；总价 = 账单 + 小费",
  inputs:[
   {id:"amt", label:"账单金额", unit:"元", def:"200", min:0.01, max:1000000},
   {id:"pct", label:"小费比例", type:"select", def:"15", options:[{v:"10",t:"10%"},{v:"12",t:"12%"},{v:"15",t:"15%"},{v:"18",t:"18%"},{v:"20",t:"20%"}]}
  ],
  run:"var tip=amt*Number(pct)/100; return {ok:true,html:'<div class=\"big\">小费 '+tip.toFixed(2)+' 元</div><div class=\"row\">总价 '+(amt+tip).toFixed(2)+' 元</div>'};",
  test:{inputs:{amt:200,pct:"15"}, expect:"30.00"}},
 {id:"shdiscount", cat:"sh", icon:"🏷", name:"折扣叠加计算", desc:"多重折扣后实付多少",
  formula:"实付 = 原价 × 折扣1 × 折扣2；节省 = 原价 − 实付",
  inputs:[
   {id:"price", label:"原价", unit:"元", def:"500", min:0.01, max:10000000},
   {id:"d1", label:"折扣1", unit:"折", def:"9", min:0.1, max:10},
   {id:"d2", label:"折扣2", unit:"折", def:"8", min:0.1, max:10, hint:"没有第二重就填10"}
  ],
  run:"var pay=price*d1/10*d2/10; return {ok:true,html:'<div class=\"big\">实付 '+pay.toFixed(2)+' 元</div><div class=\"row\">共节省 '+(price-pay).toFixed(2)+' 元</div>'};",
  test:{inputs:{price:500,d1:9,d2:8}, expect:"360.00"}},
 {id:"shcoupon", cat:"sh", icon:"🎟", name:"满减凑单计算", desc:"还差多少能用满减券",
  formula:"当前≥门槛：减后价=当前−优惠；否则还差=门槛−当前",
  inputs:[
   {id:"m", label:"满减门槛", unit:"元", def:"300", min:1, max:1000000},
   {id:"d", label:"优惠金额", unit:"元", def:"50", min:1, max:1000000},
   {id:"c", label:"当前金额", unit:"元", def:"260", min:0, max:1000000}
  ],
  run:"var out; if(c>=m){out='<div class=\"big\">已达标，减后 '+(c-d).toFixed(2)+' 元</div><div class=\"row\">使用满'+m+'减'+d+'优惠</div>';}else{out='<div class=\"big\">还差 '+(m-c).toFixed(2)+' 元</div><div class=\"row\">凑满'+m+'元可减'+d+'元</div>';} return {ok:true,html:out};",
  test:{inputs:{m:300,d:50,c:260}, expect:"40.00"}}
);
TOOLS.push(
 {id:"shfuel", cat:"sh", icon:"🚗", name:"汽车油耗计算", desc:"算百公里油耗和每公里油费",
  formula:"百公里油耗 = 加油量(L) ÷ 里程(km) × 100；每公里油费 = 油耗 × 油价 ÷ 100",
  inputs:[
   {id:"l", label:"加油量", unit:"升", def:"40", min:0.1, max:500},
   {id:"km", label:"行驶里程", unit:"km", def:"500", min:1, max:100000},
   {id:"price", label:"油价", unit:"元/升", def:"7.5", min:0.1, max:30}
  ],
  run:"var c=l/km*100; var per=c*price/100; return {ok:true,html:'<div class=\"big\">油耗 '+c.toFixed(1)+' L/100km</div><div class=\"row\">每公里约 '+per.toFixed(2)+' 元油费</div>'};",
  test:{inputs:{l:40,km:500,price:7.5}, expect:"8.0"}},
 {id:"shacpower", cat:"sh", icon:"❄", name:"空调耗电估算", desc:"算空调一天一月多少电费",
  formula:"日耗电(kWh)=功率(W)×小时÷1000；电费=耗电×电价",
  inputs:[
   {id:"w", label:"空调功率", unit:"W", def:"1500", min:100, max:10000},
   {id:"h", label:"每天使用", unit:"小时", def:"8", min:0.1, max:24},
   {id:"p", label:"电价", unit:"元/度", def:"0.6", min:0.1, max:5}
  ],
  run:"var kwh=w*h/1000; var day=kwh*p; return {ok:true,html:'<div class=\"big\">日耗电 '+kwh.toFixed(1)+' 度</div><div class=\"row\">日电费 '+day.toFixed(2)+' 元，月电费约 '+(day*30).toFixed(0)+' 元（估算值）</div>'};",
  test:{inputs:{w:1500,h:8,p:0.6}, expect:"12.0"}},
 {id:"shacsize", cat:"sh", icon:"🌀", name:"空调匹数选购", desc:"按房间面积推荐空调匹数",
  formula:"所需制冷量 ≈ 面积 × 200W/㎡；1匹≈2500W制冷量，向上取标准匹数",
  inputs:[
   {id:"area", label:"房间面积", unit:"㎡", def:"20", min:1, max:300}
  ],
  run:"var need=area*200; var ps=need/2500; var std=[1,1.5,2,2.5,3,5]; var rec=std[std.length-1]; for(var i=0;i<std.length;i++){if(std[i]>=ps){rec=std[i];break;}} return {ok:true,html:'<div class=\"big\">推荐 '+rec+' 匹</div><div class=\"row\">需制冷量约 '+Math.round(need)+'W（估算值，顶楼/西晒选大一档）</div>'};",
  test:{inputs:{area:20}, expect:"2 匹"}},
 {id:"shpace", cat:"sh", icon:"⏱", name:"跑步配速计算", desc:"算每公里配速和时速",
  formula:"配速 = 总秒数 ÷ 公里数；时速 = 3600 ÷ 每公里秒数",
  inputs:[
   {id:"dist", label:"距离", unit:"km", def:"10", min:0.1, max:500},
   {id:"mm", label:"用时-分", def:"50", min:0, max:10000},
   {id:"ss", label:"用时-秒", def:"0", min:0, max:59}
  ],
  run:"var tot=mm*60+ss; if(tot<=0) return {ok:false,msg:'用时必须大于0'}; var ps=tot/dist; var pm=Math.floor(ps/60), psec=Math.round(ps%60); var sss=psec<10?'0'+psec:''+psec; var v=(3600/ps).toFixed(1); return {ok:true,html:'<div class=\"big\">配速 '+pm+'分'+sss+'秒/公里</div><div class=\"row\">时速约 '+v+' km/h</div>'};",
  test:{inputs:{dist:10,mm:50,ss:0}, expect:"5分00秒"}},
 {id:"shcharge", cat:"sh", icon:"🔋", name:"手机充电时间估算", desc:"按电池和充电功率估算充满时间",
  formula:"电池能量Wh=容量(mAh)×3.7÷1000；时间≈能量÷充电功率×1.3（含损耗）",
  inputs:[
   {id:"mah", label:"电池容量", unit:"mAh", def:"5000", min:500, max:30000},
   {id:"w", label:"充电功率", unit:"W", def:"65", min:1, max:300}
  ],
  run:"var wh=mah*3.7/1000; var mins=wh/w*1.3*60; return {ok:true,html:'<div class=\"big\">约 '+Math.round(mins)+' 分钟</div><div class=\"row\">0–100%理论估算，涓流充电阶段会更慢</div>'};",
  test:{inputs:{mah:5000,w:65}, expect:"22"}},
 {id:"shexpress", cat:"sh", icon:"📦", name:"快递运费计算", desc:"首重续重算快递费",
  formula:"费用 = 首重价 + max(0, 重量−首重) × 续重单价",
  inputs:[
   {id:"wt", label:"包裹重量", unit:"kg", def:"3.5", min:0.01, max:1000},
   {id:"fw", label:"首重", unit:"kg", def:"1", min:0.1, max:100},
   {id:"fp", label:"首重价格", unit:"元", def:"12", min:0, max:10000},
   {id:"cp", label:"续重单价", unit:"元/kg", def:"8", min:0, max:1000}
  ],
  run:"var fee=fp+Math.max(0,wt-fw)*cp; return {ok:true,html:'<div class=\"big\">运费 '+fee.toFixed(2)+' 元</div><div class=\"row\">各快递公司计费规则略有差异</div>'};",
  test:{inputs:{wt:3.5,fw:1,fp:12,cp:8}, expect:"32.00"}},
 {id:"shparking", cat:"sh", icon:"🅿", name:"停车费计算", desc:"按时长单价和封顶算停车费",
  formula:"费用 = min(小时 × 单价, 封顶价)",
  inputs:[
   {id:"h", label:"停车时长", unit:"小时", def:"3.5", min:0.1, max:720},
   {id:"rate", label:"单价", unit:"元/小时", def:"5", min:0, max:100},
   {id:"cap", label:"封顶价", unit:"元", def:"30", min:0, max:10000}
  ],
  run:"var fee=Math.min(h*rate,cap); return {ok:true,html:'<div class=\"big\">停车费 '+fee.toFixed(2)+' 元</div><div class=\"row\">不足1小时多按1小时计的请自行取整</div>'};",
  test:{inputs:{h:3.5,rate:5,cap:30}, expect:"17.50"}},
 {id:"shproperty", cat:"sh", icon:"🏢", name:"物业费计算", desc:"算物业费总额",
  formula:"物业费 = 面积 × 单价 × 月数",
  inputs:[
   {id:"area", label:"房屋面积", unit:"㎡", def:"120", min:1, max:10000},
   {id:"rate", label:"单价", unit:"元/㎡/月", def:"2.5", min:0, max:100},
   {id:"m", label:"月数", unit:"月", def:"12", min:1, max:120}
  ],
  run:"var fee=area*rate*m; return {ok:true,html:'<div class=\"big\">物业费 '+fee.toFixed(2)+' 元</div><div class=\"row\">'+m+'个月共计</div>'};",
  test:{inputs:{area:120,rate:2.5,m:12}, expect:"3600.00"}}
);
TOOLS.push(
 {id:"shheat", cat:"sh", icon:"🔥", name:"暖气费计算", desc:"按面积算取暖费",
  formula:"暖气费 = 供暖面积 × 单价（元/㎡）",
  inputs:[
   {id:"area", label:"供暖面积", unit:"㎡", def:"120", min:1, max:10000},
   {id:"rate", label:"单价", unit:"元/㎡", def:"25", min:0, max:200}
  ],
  run:"var fee=area*rate; return {ok:true,html:'<div class=\"big\">暖气费 '+fee.toFixed(2)+' 元</div><div class=\"row\">一个采暖季</div>'};",
  test:{inputs:{area:120,rate:25}, expect:"3000.00"}},
 {id:"shwaterbill", cat:"sh", icon:"🚰", name:"水费计算", desc:"阶梯水价算水费",
  formula:"一档内：用量×一档价；超出一档：一档上限×一档价＋超出×二档价",
  inputs:[
   {id:"use", label:"用水量", unit:"吨", def:"15", min:0, max:100000},
   {id:"l1", label:"一档上限", unit:"吨", def:"10", min:1, max:100000},
   {id:"p1", label:"一档单价", unit:"元/吨", def:"3", min:0, max:100},
   {id:"p2", label:"二档单价", unit:"元/吨", def:"5", min:0, max:100}
  ],
  run:"var fee=use<=l1?use*p1:l1*p1+(use-l1)*p2; return {ok:true,html:'<div class=\"big\">水费 '+fee.toFixed(2)+' 元</div><div class=\"row\">各地阶梯标准不同，请按当地水价调整</div>'};",
  test:{inputs:{use:15,l1:10,p1:3,p2:5}, expect:"55.00"}},
 {id:"shgas", cat:"sh", icon:"🧯", name:"燃气费计算", desc:"按用气量算燃气费",
  formula:"燃气费 = 用气量(m³) × 单价",
  inputs:[
   {id:"use", label:"用气量", unit:"m³", def:"30", min:0, max:100000},
   {id:"p", label:"单价", unit:"元/m³", def:"3.5", min:0, max:100}
  ],
  run:"var fee=use*p; return {ok:true,html:'<div class=\"big\">燃气费 '+fee.toFixed(2)+' 元</div><div class=\"row\">阶梯气价地区请分档计算</div>'};",
  test:{inputs:{use:30,p:3.5}, expect:"105.00"}},
 {id:"shrice", cat:"sh", icon:"🍚", name:"煮饭米水比例", desc:"几杯米放多少水",
  formula:"大米 米:水 ≈ 1 : 1.2（体积）；1杯米≈150g，需水约180ml",
  inputs:[
   {id:"cup", label:"米量", unit:"杯", def:"3", min:0.5, max:50}
  ],
  run:"var ml=Math.round(cup*180); return {ok:true,html:'<div class=\"big\">加水约 '+ml+' ml</div><div class=\"row\">'+cup+'杯米（约'+Math.round(cup*150)+'g）；新米稍减、陈米稍加；电饭煲常用内胆刻度也可参考</div>'};",
  test:{inputs:{cup:3}, expect:"540"}},
 {id:"shshoe", cat:"sh", icon:"👟", name:"鞋码换算", desc:"脚长换算中/欧/美/英码",
  formula:"对照表（脚长cm→中欧/美/英）：23→36/5.5/5，24→38/6.5/6，25→40/8/7.5，26→42/9.5/9，27→44/11/10.5，28→46/12.5/12，取最接近",
  inputs:[
   {id:"cm", label:"脚长", unit:"cm", def:"26", min:20, max:32}
  ],
  run:"var t=[[23,36,'5.5','5'],[23.5,37,'6','5.5'],[24,38,'6.5','6'],[24.5,39,'7.5','7'],[25,40,'8','7.5'],[25.5,41,'8.5','8'],[26,42,'9.5','9'],[26.5,43,'10','9.5'],[27,44,'11','10.5'],[27.5,45,'11.5','11'],[28,46,'12.5','12']]; var best=t[0], bd=99; for(var i=0;i<t.length;i++){var dd=Math.abs(cm-t[i][0]); if(dd<bd){bd=dd;best=t[i];}} return {ok:true,html:'<div class=\"big\">中/欧码 '+best[1]+'</div><div class=\"row\">美码 '+best[2]+'｜英码 '+best[3]+'（对照表近似值，试穿为准）</div>'};",
  test:{inputs:{cm:26}, expect:"42"}},
 {id:"shtile", cat:"sh", icon:"🧱", name:"地砖数量估算", desc:"铺砖需要买多少块",
  formula:"块数 = 面积 ÷ (砖长×砖宽) × 1.05损耗，向上取整",
  inputs:[
   {id:"area", label:"铺贴面积", unit:"㎡", def:"20", min:0.1, max:10000},
   {id:"l", label:"砖长", unit:"cm", def:"60", min:1, max:200},
   {id:"w", label:"砖宽", unit:"cm", def:"60", min:1, max:200}
  ],
  run:"var n=Math.ceil(area/(l*w/10000)*1.05); return {ok:true,html:'<div class=\"big\">约 '+n+' 块</div><div class=\"row\">已含5%切割损耗；异形铺贴适当多买</div>'};",
  test:{inputs:{area:20,l:60,w:60}, expect:"59"}},
 {id:"shpaint", cat:"sh", icon:"🪣", name:"油漆用量估算", desc:"刷墙需要几桶漆",
  formula:"用量(升) = 面积 × 遍数 ÷ 10（约10㎡/升/遍）；桶数按5L/桶向上取整",
  inputs:[
   {id:"area", label:"涂刷面积", unit:"㎡", def:"100", min:1, max:10000},
   {id:"n", label:"涂刷遍数", unit:"遍", def:"2", min:1, max:5}
  ],
  run:"var L=area*n/10; var b=Math.ceil(L/5); return {ok:true,html:'<div class=\"big\">约 '+L.toFixed(1)+' 升（'+b+'桶）</div><div class=\"row\">按5L/桶计；深色盖浅色多加一遍</div>'};",
  test:{inputs:{area:100,n:2}, expect:"20.0"}}
);
