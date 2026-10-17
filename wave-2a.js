/* ===== WAVE-2A 时间日期（40个数据驱动工具） ===== */
CATS.push({id:"sjrq", name:"时间日期"});
TOOLS.push(
 {id:"sjdiff", cat:"sjrq", icon:"📅", name:"日期差计算", desc:"算两个日期相差多少天",
  formula:"相差天数 = |日期2 − 日期1| ÷ 86400000（按自然日，UTC）",
  inputs:[
   {id:"d1", label:"日期1", type:"text", def:"2026-01-01", ph:"YYYY-MM-DD"},
   {id:"d2", label:"日期2", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t1=Date.parse(d1),t2=Date.parse(d2); if(isNaN(t1)||isNaN(t2)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var days=Math.round(Math.abs(t2-t1)/86400000); return {ok:true,html:'<div class=big>相差 '+days+' 天</div>'};",
  test:{inputs:{d1:"2026-01-01",d2:"2026-01-11"}, expect:"相差 10 天"}},
 {id:"sjage", cat:"sjrq", icon:"🎂", name:"年龄精确计算", desc:"按出生日期和基准日期算周岁",
  formula:"先算整年数，再按月日借位调整",
  inputs:[
   {id:"birth", label:"出生日期", type:"text", def:"2000-01-01", ph:"YYYY-MM-DD"},
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var b=new Date(Date.parse(birth)),r=new Date(Date.parse(ref)); if(isNaN(b)||isNaN(r)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; if(r<b) return {ok:false,msg:'基准日期不能早于出生日期'}; var y=r.getUTCFullYear()-b.getUTCFullYear(),m=r.getUTCMonth()-b.getUTCMonth(),d=r.getUTCDate()-b.getUTCDate(); if(d<0){m--;var pm=new Date(Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),0)).getUTCDate();d+=pm;} if(m<0){y--;m+=12;} return {ok:true,html:'<div class=big>'+y+'岁 '+m+'个月 '+d+'天</div>'};",
  test:{inputs:{birth:"2000-01-01",ref:"2026-10-18"}, expect:"26岁 9个月 17天"}},
 {id:"sjcountdown", cat:"sjrq", icon:"⏳", name:"倒计时", desc:"距目标日期还有多少天",
  formula:"剩余天数 = (目标日期 − 基准日期) ÷ 86400000",
  inputs:[
   {id:"target", label:"目标日期", type:"text", def:"2026-12-25", ph:"YYYY-MM-DD"},
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t1=Date.parse(target),t2=Date.parse(ref); if(isNaN(t1)||isNaN(t2)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var diff=Math.round((t1-t2)/86400000); if(diff<0) return {ok:true,html:'<div class=big>已过去 '+(-diff)+' 天</div>'}; if(diff===0) return {ok:true,html:'<div class=big>就是今天！</div>'}; return {ok:true,html:'<div class=big>还有 '+diff+' 天</div>'};",
  test:{inputs:{target:"2026-12-25",ref:"2026-10-18"}, expect:"还有 68 天"}},
 {id:"sjcountup", cat:"sjrq", icon:"⏱️", name:"正计时", desc:"从某日期到现在过去了多少天",
  formula:"已过天数 = (基准日期 − 起始日期) ÷ 86400000",
  inputs:[
   {id:"start", label:"起始日期", type:"text", def:"2026-01-01", ph:"YYYY-MM-DD"},
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t1=Date.parse(start),t2=Date.parse(ref); if(isNaN(t1)||isNaN(t2)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var diff=Math.round((t2-t1)/86400000); if(diff<0) return {ok:false,msg:'起始日期不能晚于基准日期'}; return {ok:true,html:'<div class=big>已过去 '+diff+' 天</div>'};",
  test:{inputs:{start:"2026-01-01",ref:"2026-10-18"}, expect:"已过去 290 天"}},
 {id:"sjworkday", cat:"sjrq", icon:"💼", name:"工作日计算", desc:"两日期之间有多少个工作日（不含周末）",
  formula:"逐日遍历，跳过周六周日",
  inputs:[
   {id:"d1", label:"开始日期", type:"text", def:"2026-10-01", ph:"YYYY-MM-DD"},
   {id:"d2", label:"结束日期", type:"text", def:"2026-10-11", ph:"YYYY-MM-DD"}
  ],
  run:"var a=Date.parse(d1),b=Date.parse(d2); if(isNaN(a)||isNaN(b)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var s=Math.min(a,b),e=Math.max(a,b); var total=Math.round((e-s)/86400000); if(total>3660) return {ok:false,msg:'日期范围太大（限10年内）'}; var n=0; for(var i=0;i<total;i++){var dow=new Date(s+i*86400000).getUTCDay(); if(dow>=1&&dow<=5)n++;} return {ok:true,html:'<div class=big>工作日 '+n+' 天</div><div class=row>共 '+total+' 天（含起点不含终点）</div>'};",
  test:{inputs:{d1:"2026-10-01",d2:"2026-10-11"}, expect:"工作日 7 天"}},
 {id:"sjworkadd", cat:"sjrq", icon:"📆", name:"N个工作日后", desc:"从某日期起推N个工作日是几号",
  formula:"逐日递增，跳过周六周日",
  inputs:[
   {id:"d", label:"起始日期", type:"text", def:"2026-10-16", ph:"YYYY-MM-DD"},
   {id:"n", label:"工作日数", def:"3", min:1, max:1000}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; if(!(n>=1)||n>1000) return {ok:false,msg:'天数须在1~1000'}; var cur=t,c=0; while(c<n){cur+=86400000;var dow=new Date(cur).getUTCDay(); if(dow>=1&&dow<=5)c++;} var dd=new Date(cur); var s=dd.getUTCFullYear()+'-'+String(dd.getUTCMonth()+1).padStart(2,'0')+'-'+String(dd.getUTCDate()).padStart(2,'0'); return {ok:true,html:'<div class=big>'+s+'</div><div class=row>'+n+'个工作日后</div>'};",
  test:{inputs:{d:"2026-10-16",n:3}, expect:"2026-10-21"}},
 {id:"sjleap", cat:"sjrq", icon:"🐸", name:"闰年判断", desc:"判断某年是不是闰年",
  formula:"能被4整除但不能被100整除，或能被400整除",
  inputs:[
   {id:"y", label:"年份", def:"2024", min:1, max:9999}
  ],
  run:"var leap=(y%4===0&&y%100!==0)||y%400===0; return {ok:true,html:'<div class=big>'+y+'年 '+(leap?'是闰年（366天）':'是平年（365天）')+'</div>'};",
  test:{inputs:{y:2024}, expect:"是闰年"}},
 {id:"sjweekday", cat:"sjrq", icon:"🗓️", name:"星期几查询", desc:"查某日期是星期几",
  formula:"用 Date.getUTCDay() 查星期",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var w=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][new Date(t).getUTCDay()]; return {ok:true,html:'<div class=big>'+d+' 是 '+w+'</div>'};",
  test:{inputs:{d:"2026-10-18"}, expect:"星期日"}},
 {id:"sjxingzuo", cat:"sjrq", icon:"♈", name:"星座查询", desc:"按出生月日查星座",
  formula:"按黄道十二宫日期区间划分",
  inputs:[
   {id:"m", label:"月份", def:"3", min:1, max:12},
   {id:"day", label:"日期", def:"21", min:1, max:31}
  ],
  run:"var x=''; if((m==3&&day>=21)||(m==4&&day<=19))x='白羊座'; else if((m==4&&day>=20)||(m==5&&day<=20))x='金牛座'; else if((m==5&&day>=21)||(m==6&&day<=21))x='双子座'; else if((m==6&&day>=22)||(m==7&&day<=22))x='巨蟹座'; else if((m==7&&day>=23)||(m==8&&day<=22))x='狮子座'; else if((m==8&&day>=23)||(m==9&&day<=22))x='处女座'; else if((m==9&&day>=23)||(m==10&&day<=23))x='天秤座'; else if((m==10&&day>=24)||(m==11&&day<=22))x='天蝎座'; else if((m==11&&day>=23)||(m==12&&day<=21))x='射手座'; else if((m==12&&day>=22)||(m==1&&day<=19))x='摩羯座'; else if((m==1&&day>=20)||(m==2&&day<=18))x='水瓶座'; else x='双鱼座'; return {ok:true,html:'<div class=big>'+m+'月'+day+'日 是 '+x+'</div>'};",
  test:{inputs:{m:3,day:21}, expect:"白羊座"}},
 {id:"sjshengxiao", cat:"sjrq", icon:"🐎", name:"生肖查询", desc:"按出生年份查生肖",
  formula:"生肖 = (年份 − 4) mod 12",
  inputs:[
   {id:"y", label:"出生年份", def:"2026", min:1900, max:2100}
  ],
  run:"var s=['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'][(((y-4)%12)+12)%12]; return {ok:true,html:'<div class=big>'+y+'年 属'+s+'</div>'};",
  test:{inputs:{y:2026}, expect:"属马"}},
 {id:"sjganzhi", cat:"sjrq", icon:"📜", name:"干支纪年", desc:"查某年的天干地支",
  formula:"天干=(年−4)mod10，地支=(年−4)mod12",
  inputs:[
   {id:"y", label:"年份", def:"2026", min:1900, max:2100}
  ],
  run:"var tg=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'][(((y-4)%10)+10)%10]; var dz=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'][(((y-4)%12)+12)%12]; return {ok:true,html:'<div class=big>'+y+'年 是'+tg+dz+'年</div>'};",
  test:{inputs:{y:2026}, expect:"丙午年"}},
 {id:"sjaddtime", cat:"sjrq", icon:"➕", name:"时间加减", desc:"几点几分加减N分钟",
  formula:"总分钟 ± N，再对1440取模",
  inputs:[
   {id:"time", label:"时间", type:"text", def:"12:30", ph:"HH:mm"},
   {id:"op", label:"操作", type:"select", options:[{v:"1",t:"加上"},{v:"-1",t:"减去"}], def:"1"},
   {id:"mins", label:"分钟数", def:"90", min:0}
  ],
  run:"var p=time.split(':'); var h=parseInt(p[0]),m=parseInt(p[1]); if(p.length!==2||isNaN(h)||isNaN(m)||h<0||h>23||m<0||m>59) return {ok:false,msg:'时间格式应为HH:mm'}; var total=h*60+m+parseInt(op)*mins; total=((total%1440)+1440)%1440; var s=String(Math.floor(total/60)).padStart(2,'0')+':'+String(total%60).padStart(2,'0'); return {ok:true,html:'<div class=big>'+s+'</div>'};",
  test:{inputs:{time:"12:30",op:"1",mins:90}, expect:"14:00"}},
 {id:"sjtimezone", cat:"sjrq", icon:"🌍", name:"时区换算", desc:"北京时间换算到其他时区",
  formula:"目标时间 = 北京时间 − 8小时 + 目标时区偏移",
  inputs:[
   {id:"time", label:"北京时间", type:"text", def:"12:00", ph:"HH:mm"},
   {id:"tz", label:"目标时区", type:"select", options:[{v:"0",t:"UTC±0 伦敦"},{v:"1",t:"UTC+1 巴黎"},{v:"8",t:"UTC+8 北京"},{v:"9",t:"UTC+9 东京"},{v:"10",t:"UTC+10 悉尼"},{v:"-5",t:"UTC-5 纽约"},{v:"-8",t:"UTC-8 洛杉矶"}], def:"0"}
  ],
  run:"var p=time.split(':'); var h=parseInt(p[0]),m=parseInt(p[1]); if(p.length!==2||isNaN(h)||isNaN(m)||h<0||h>23||m<0||m>59) return {ok:false,msg:'时间格式应为HH:mm'}; var tgt=h*60+m-8*60+parseInt(tz)*60; var off=0; while(tgt<0){tgt+=1440;off--;} while(tgt>=1440){tgt-=1440;off++;} var s=String(Math.floor(tgt/60)).padStart(2,'0')+':'+String(tgt%60).padStart(2,'0'); if(off!==0)s+='（'+(off>0?'+':'')+off+'天）'; return {ok:true,html:'<div class=big>'+s+'</div>'};",
  test:{inputs:{time:"12:00",tz:"0"}, expect:"04:00"}},
 {id:"sjts2date", cat:"sjrq", icon:"🔢", name:"时间戳转日期", desc:"Unix时间戳转成日期时间",
  formula:"日期 = new Date(时间戳)，按UTC显示",
  inputs:[
   {id:"ts", label:"时间戳", def:"0", min:0},
   {id:"unit", label:"单位", type:"select", options:[{v:"s",t:"秒"},{v:"ms",t:"毫秒"}], def:"s"}
  ],
  run:"var ms=unit==='s'?ts*1000:ts; var d=new Date(ms); if(isNaN(d.getTime())) return {ok:false,msg:'时间戳无效'}; function f2(n){return String(n).padStart(2,'0');} var s=d.getUTCFullYear()+'-'+f2(d.getUTCMonth()+1)+'-'+f2(d.getUTCDate())+' '+f2(d.getUTCHours())+':'+f2(d.getUTCMinutes())+':'+f2(d.getUTCSeconds()); return {ok:true,html:'<div class=big>'+s+'</div><div class=row>UTC时间</div>'};",
  test:{inputs:{ts:0,unit:"s"}, expect:"1970-01-01 00:00:00"}}
);

TOOLS.push(
 {id:"sjdate2ts", cat:"sjrq", icon:"⏱️", name:"日期转时间戳", desc:"日期转成Unix时间戳",
  formula:"时间戳 = Date.parse(日期) ÷ 1000（秒）",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"1970-01-01", ph:"YYYY-MM-DD"},
   {id:"unit", label:"单位", type:"select", options:[{v:"s",t:"秒"},{v:"ms",t:"毫秒"}], def:"s"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var out=unit==='s'?t/1000:t; return {ok:true,html:'<div class=big>'+out+' '+(unit==='s'?'秒':'毫秒')+'</div>'};",
  test:{inputs:{d:"1970-01-01",unit:"s"}, expect:"0 秒"}},
 {id:"sjafterndays", cat:"sjrq", icon:"🔮", name:"N天后是几号", desc:"从某日期推算N天后的日期",
  formula:"目标日期 = 起始日期 + N × 86400000",
  inputs:[
   {id:"d", label:"起始日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"},
   {id:"n", label:"天数N（可为负数表示N天前）", def:"100"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var dd=new Date(t+n*86400000); function f2(x){return String(x).padStart(2,'0');} var s=dd.getUTCFullYear()+'-'+f2(dd.getUTCMonth()+1)+'-'+f2(dd.getUTCDate()); return {ok:true,html:'<div class=big>'+s+'</div>'};",
  test:{inputs:{d:"2026-10-18",n:100}, expect:"2027-01-26"}},
 {id:"sjquarter", cat:"sjrq", icon:"🗂️", name:"季度判断", desc:"查某月份属于第几季度",
  formula:"Q1=1–3月，Q2=4–6月，Q3=7–9月，Q4=10–12月",
  inputs:[
   {id:"m", label:"月份", def:"10", min:1, max:12}
  ],
  run:"var q=Math.ceil(m/3); return {ok:true,html:'<div class=big>'+m+'月 是 第'+['一','二','三','四'][q-1]+'季度</div>'};",
  test:{inputs:{m:10}, expect:"第四季度"}},
 {id:"sjyearprog", cat:"sjrq", icon:"📊", name:"一年进度", desc:"今年已经过去了百分之多少",
  formula:"进度 = 当年第几天 ÷ 全年天数 × 100%",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var dd=new Date(t); var y=dd.getUTCFullYear(); var leap=(y%4===0&&y%100!==0)||y%400===0; var doy=Math.floor((t-Date.parse(y+'-01-01'))/86400000)+1; var pct=(doy/(leap?366:365)*100).toFixed(1); return {ok:true,html:'<div class=big>'+pct+'%</div><div class=row>'+y+'年已过去 '+doy+' 天</div>'};",
  test:{inputs:{d:"2026-10-18"}, expect:"79.7"}},
 {id:"sjmonthleft", cat:"sjrq", icon:"📆", name:"本月剩余天数", desc:"本月还剩多少天",
  formula:"剩余 = 当月总天数 − 今天日期",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var dd=new Date(t); var dim=new Date(Date.UTC(dd.getUTCFullYear(),dd.getUTCMonth()+1,0)).getUTCDate(); var left=dim-dd.getUTCDate(); return {ok:true,html:'<div class=big>剩余 '+left+' 天</div><div class=row>不含今天</div>'};",
  test:{inputs:{d:"2026-10-18"}, expect:"剩余 13 天"}},
 {id:"sjduedate", cat:"sjrq", icon:"🤰", name:"预产期计算", desc:"按末次月经算预产期",
  formula:"预产期 = 末次月经第一天 + 280天",
  inputs:[
   {id:"last", label:"末次月经第一天", type:"text", def:"2026-01-01", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(last); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var dd=new Date(t+280*86400000); function f2(x){return String(x).padStart(2,'0');} var s=dd.getUTCFullYear()+'-'+f2(dd.getUTCMonth()+1)+'-'+f2(dd.getUTCDate()); return {ok:true,html:'<div class=big>预产期 '+s+'</div><div class=row>仅供参考，请遵医嘱</div>'};",
  test:{inputs:{last:"2026-01-01"}, expect:"2026-10-08"}},
 {id:"sjretire", cat:"sjrq", icon:"🏖️", name:"退休倒计时", desc:"距退休还有多少天",
  formula:"退休日期 = 出生日期 + 退休年龄（年）",
  inputs:[
   {id:"birth", label:"出生日期", type:"text", def:"1990-05-20", ph:"YYYY-MM-DD"},
   {id:"age", label:"退休年龄", def:"60", min:40, max:80},
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var b=Date.parse(birth),r=Date.parse(ref); if(isNaN(b)||isNaN(r)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var bd=new Date(b); var rd=new Date(Date.UTC(bd.getUTCFullYear()+age,bd.getUTCMonth(),bd.getUTCDate())); var diff=Math.round((rd.getTime()-r)/86400000); function f2(x){return String(x).padStart(2,'0');} var rs=rd.getUTCFullYear()+'-'+f2(rd.getUTCMonth()+1)+'-'+f2(rd.getUTCDate()); if(diff<0) return {ok:true,html:'<div class=big>已退休 '+(-diff)+' 天</div>'}; return {ok:true,html:'<div class=big>距退休还有 '+diff+' 天</div><div class=row>退休日期 '+rs+'（约'+(diff/365).toFixed(1)+'年）</div>'};",
  test:{inputs:{birth:"1990-05-20",age:60,ref:"2026-10-18"}, expect:"8615 天"}},
 {id:"sjchunjie", cat:"sjrq", icon:"🧧", name:"春节倒计时", desc:"距下一个春节还有多少天",
  formula:"查春节日期表，取基准日期之后最近的一个",
  inputs:[
   {id:"ref", label:"基准日期", type:"text", def:"2026-01-01", ph:"YYYY-MM-DD"}
  ],
  run:"var CJ=['2024-02-10','2025-01-29','2026-02-17','2027-02-06','2028-01-26','2029-02-13','2030-02-03','2031-01-23']; var r=Date.parse(ref); if(isNaN(r)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; for(var i=0;i<CJ.length;i++){var t=Date.parse(CJ[i]); if(t>=r){var diff=Math.round((t-r)/86400000); if(diff===0) return {ok:true,html:'<div class=big>今天就是春节！🧧</div>'}; return {ok:true,html:'<div class=big>距春节（'+CJ[i]+'）还有 '+diff+' 天</div>'};}} return {ok:false,msg:'超出日期表范围（2024–2031）'};",
  test:{inputs:{ref:"2026-01-01"}, expect:"还有 47 天"}},
 {id:"sjguoqing", cat:"sjrq", icon:"🇨🇳", name:"国庆倒计时", desc:"距下一个国庆节还有多少天",
  formula:"每年10月1日，取基准日期之后最近的一个",
  inputs:[
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var r=Date.parse(ref); if(isNaN(r)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var y=new Date(r).getUTCFullYear(); var g=Date.parse(y+'-10-01'); if(g<=r)g=Date.parse((y+1)+'-10-01'); var diff=Math.round((g-r)/86400000); return {ok:true,html:'<div class=big>距国庆节还有 '+diff+' 天</div>'};",
  test:{inputs:{ref:"2026-10-18"}, expect:"还有 348 天"}},
 {id:"sjjieqi", cat:"sjrq", icon:"🌾", name:"24节气查询", desc:"查某月日当前处于哪个节气",
  formula:"按节气大致日期表匹配（简化版）",
  inputs:[
   {id:"m", label:"月份", def:"3", min:1, max:12},
   {id:"day", label:"日期", def:"21", min:1, max:31}
  ],
  run:"var J=[['小寒',105],['大寒',120],['立春',204],['雨水',219],['惊蛰',305],['春分',320],['清明',404],['谷雨',420],['立夏',505],['小满',521],['芒种',606],['夏至',621],['小暑',707],['大暑',723],['立秋',807],['处暑',823],['白露',907],['秋分',923],['寒露',1008],['霜降',1023],['立冬',1107],['小雪',1122],['大雪',1207],['冬至',1222]]; var key=m*100+day,cur='冬至'; for(var i=0;i<J.length;i++){if(key>=J[i][1])cur=J[i][0];} return {ok:true,html:'<div class=big>'+m+'月'+day+'日 处于'+cur+'</div><div class=row>简化版，按大致日期划分</div>'};",
  test:{inputs:{m:3,day:21}, expect:"春分"}},
 {id:"sjmoon", cat:"sjrq", icon:"🌙", name:"月相估算", desc:"按日期估算月相",
  formula:"以2000-01-06新月为基准，朔望月29.53天",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2000-01-06", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var ref=Date.parse('2000-01-06'); var age=(((t-ref)/86400000)%29.530588853+29.530588853)%29.530588853; var names=['新月','娥眉月','上弦月','盈凸月','满月','亏凸月','下弦月','残月']; var idx=Math.floor(age/3.6913236)%8; return {ok:true,html:'<div class=big>'+names[idx]+'</div><div class=row>月龄约 '+age.toFixed(1)+' 天（估算）</div>'};",
  test:{inputs:{d:"2000-01-06"}, expect:"新月"}},
 {id:"sjsectohms", cat:"sjrq", icon:"⏲️", name:"秒转时分秒", desc:"把秒数换算成几小时几分几秒",
  formula:"小时=秒÷3600取整，余类推",
  inputs:[
   {id:"s", label:"秒数", def:"3661", min:0}
  ],
  run:"var h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=Math.floor(s%60); return {ok:true,html:'<div class=big>'+h+'小时 '+m+'分 '+ss+'秒</div>'};",
  test:{inputs:{s:3661}, expect:"1小时 1分 1秒"}},
 {id:"sjhmstosec", cat:"sjrq", icon:"🔄", name:"时分秒转秒", desc:"把时分秒换算成总秒数",
  formula:"总秒 = 时×3600 + 分×60 + 秒",
  inputs:[
   {id:"h", label:"小时", def:"1", min:0},
   {id:"mi", label:"分钟", def:"1", min:0, max:59},
   {id:"s", label:"秒", def:"1", min:0, max:59}
  ],
  run:"var t=h*3600+mi*60+s; return {ok:true,html:'<div class=big>'+t+' 秒</div>'};",
  test:{inputs:{h:1,mi:1,s:1}, expect:"3661"}},
 {id:"sjbirthday", cat:"sjrq", icon:"🎁", name:"生日倒计时", desc:"距下个生日还有多少天",
  formula:"取基准日期之后最近的生日日期",
  inputs:[
   {id:"m", label:"出生月份", def:"6", min:1, max:12},
   {id:"day", label:"出生日期", def:"15", min:1, max:31},
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"function f2(x){return String(x).padStart(2,'0');} var r=Date.parse(ref); if(isNaN(r)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var y=new Date(r).getUTCFullYear(); var b=Date.parse(y+'-'+f2(m)+'-'+f2(day)); if(isNaN(b))b=Date.parse(y+'-02-28'); if(b<r){y++;b=Date.parse(y+'-'+f2(m)+'-'+f2(day)); if(isNaN(b))b=Date.parse(y+'-02-28');} var diff=Math.round((b-r)/86400000); if(diff===0) return {ok:true,html:'<div class=big>生日快乐！🎂</div>'}; return {ok:true,html:'<div class=big>距生日还有 '+diff+' 天</div>'};",
  test:{inputs:{m:6,day:15,ref:"2026-10-18"}, expect:"还有 240 天"}}
);

TOOLS.push(
 {id:"sjanni", cat:"sjrq", icon:"💕", name:"纪念日天数", desc:"从某个日子到现在多少天了",
  formula:"天数 = (基准日期 − 起始日期) ÷ 86400000",
  inputs:[
   {id:"start", label:"起始日期", type:"text", def:"2020-01-01", ph:"YYYY-MM-DD"},
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t1=Date.parse(start),t2=Date.parse(ref); if(isNaN(t1)||isNaN(t2)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var diff=Math.round((t2-t1)/86400000); if(diff<0) return {ok:false,msg:'起始日期不能晚于基准日期'}; return {ok:true,html:'<div class=big>已经 '+diff+' 天</div><div class=row>这是第 '+(diff+1)+' 天</div>'};",
  test:{inputs:{start:"2020-01-01",ref:"2026-10-18"}, expect:"已经 2482 天"}},
 {id:"sjshichen", cat:"sjrq", icon:"🏮", name:"时辰换算", desc:"现代小时换算成古代时辰",
  formula:"每2小时一个时辰，23点起为子时",
  inputs:[
   {id:"h", label:"小时（24小时制）", def:"12", min:0, max:23}
  ],
  run:"var names=['子时','丑时','寅时','卯时','辰时','巳时','午时','未时','申时','酉时','戌时','亥时']; var idx=Math.floor(((h+1)%24)/2); var s=idx*2-1<0?23:idx*2-1; var e=(idx*2+1)%24; return {ok:true,html:'<div class=big>'+h+'点 是 '+names[idx]+'</div><div class=row>'+s+':00–'+e+':00</div>'};",
  test:{inputs:{h:12}, expect:"午时"}},
 {id:"sjweeknum", cat:"sjrq", icon:"🔢", name:"一年第几周", desc:"查某日期是一年中的第几周",
  formula:"周数 = ceil(当年天数 ÷ 7)（按自然周）",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var y=new Date(t).getUTCFullYear(); var doy=Math.floor((t-Date.parse(y+'-01-01'))/86400000)+1; var w=Math.ceil(doy/7); return {ok:true,html:'<div class=big>'+y+'年 第 '+w+' 周</div>'};",
  test:{inputs:{d:"2026-10-18"}, expect:"第 42 周"}},
 {id:"sjweekendcount", cat:"sjrq", icon:"🛋️", name:"某月周末天数", desc:"查某个月有几个周六周日",
  formula:"遍历当月每天，数周六周日",
  inputs:[
   {id:"y", label:"年份", def:"2026", min:1900, max:2100},
   {id:"m", label:"月份", def:"10", min:1, max:12}
  ],
  run:"var dim=new Date(Date.UTC(y,m,0)).getUTCDate(); var n=0; for(var i=1;i<=dim;i++){var dow=new Date(Date.UTC(y,m-1,i)).getUTCDay(); if(dow===0||dow===6)n++;} return {ok:true,html:'<div class=big>'+y+'年'+m+'月 周末共 '+n+' 天</div>'};",
  test:{inputs:{y:2026,m:10}, expect:"9 天"}},
 {id:"sjworkhours", cat:"sjrq", icon:"🏢", name:"某月法定工时", desc:"按工作日算某月应出勤小时",
  formula:"工时 = (当月天数 − 周末天数) × 8",
  inputs:[
   {id:"y", label:"年份", def:"2026", min:1900, max:2100},
   {id:"m", label:"月份", def:"10", min:1, max:12}
  ],
  run:"var dim=new Date(Date.UTC(y,m,0)).getUTCDate(); var we=0; for(var i=1;i<=dim;i++){var dow=new Date(Date.UTC(y,m-1,i)).getUTCDay(); if(dow===0||dow===6)we++;} var wd=dim-we; return {ok:true,html:'<div class=big>'+(wd*8)+' 小时</div><div class=row>'+y+'年'+m+'月工作日 '+wd+' 天（未扣法定节假日）</div>'};",
  test:{inputs:{y:2026,m:10}, expect:"176 小时"}},
 {id:"sjagegroup", cat:"sjrq", icon:"👥", name:"年龄段判断", desc:"按年龄划分人群阶段",
  formula:"<6婴幼儿，6–12儿童，13–17青少年，18–35青年，36–59中年，≥60老年",
  inputs:[
   {id:"age", label:"年龄", def:"25", min:0, max:150}
  ],
  run:"var g=age<6?'婴幼儿':age<=12?'儿童':age<=17?'青少年':age<=35?'青年':age<=59?'中年':'老年'; return {ok:true,html:'<div class=big>'+age+'岁：'+g+'</div>'};",
  test:{inputs:{age:25}, expect:"青年"}},
 {id:"sjdayofyear", cat:"sjrq", icon:"📍", name:"一年第几天", desc:"查某日期是一年中的第几天",
  formula:"天数 = (日期 − 当年1月1日) ÷ 86400000 + 1",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var y=new Date(t).getUTCFullYear(); var doy=Math.floor((t-Date.parse(y+'-01-01'))/86400000)+1; return {ok:true,html:'<div class=big>'+y+'年 第 '+doy+' 天</div>'};",
  test:{inputs:{d:"2026-10-18"}, expect:"第 291 天"}},
 {id:"sjnextweekday", cat:"sjrq", icon:"➡️", name:"下一个周几", desc:"从某日期起最近的周几是几号",
  formula:"往后找第一个目标星期（含当天）",
  inputs:[
   {id:"ref", label:"基准日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"},
   {id:"target", label:"目标星期", type:"select", options:[{v:"1",t:"周一"},{v:"2",t:"周二"},{v:"3",t:"周三"},{v:"4",t:"周四"},{v:"5",t:"周五"},{v:"6",t:"周六"},{v:"0",t:"周日"}], def:"5"}
  ],
  run:"var t=Date.parse(ref); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var dow=new Date(t).getUTCDay(); var delta=(parseInt(target)-dow+7)%7; var dd=new Date(t+delta*86400000); function f2(x){return String(x).padStart(2,'0');} var s=dd.getUTCFullYear()+'-'+f2(dd.getUTCMonth()+1)+'-'+f2(dd.getUTCDate()); return {ok:true,html:'<div class=big>'+s+'</div>'};",
  test:{inputs:{ref:"2026-10-18",target:"5"}, expect:"2026-10-23"}},
 {id:"sjmonthdays", cat:"sjrq", icon:"🗓️", name:"某月天数", desc:"查某年某月有多少天",
  formula:"用 Date.UTC(年,月,0) 取上月最后一天",
  inputs:[
   {id:"y", label:"年份", def:"2024", min:1900, max:2100},
   {id:"m", label:"月份", def:"2", min:1, max:12}
  ],
  run:"var dim=new Date(Date.UTC(y,m,0)).getUTCDate(); return {ok:true,html:'<div class=big>'+y+'年'+m+'月 有 '+dim+' 天</div>'};",
  test:{inputs:{y:2024,m:2}, expect:"29 天"}},
 {id:"sjweekstartend", cat:"sjrq", icon:"↔️", name:"本周起止日期", desc:"查某日期所在周的周一起止",
  formula:"周一起 = 日期 − ((星期几+6) mod 7)，周日 = 周一 + 6",
  inputs:[
   {id:"d", label:"日期", type:"text", def:"2026-10-18", ph:"YYYY-MM-DD"}
  ],
  run:"var t=Date.parse(d); if(isNaN(t)) return {ok:false,msg:'日期格式应为YYYY-MM-DD'}; var dow=new Date(t).getUTCDay(); var mon=new Date(t-((dow+6)%7)*86400000), sun=new Date(t-((dow+6)%7)*86400000+6*86400000); function f(x){var z=new Date(x);return z.getUTCFullYear()+'-'+String(z.getUTCMonth()+1).padStart(2,'0')+'-'+String(z.getUTCDate()).padStart(2,'0');} return {ok:true,html:'<div class=big>'+f(mon)+' ~ '+f(sun)+'</div><div class=row>周一至周日</div>'};",
  test:{inputs:{d:"2026-10-18"}, expect:"2026-10-12 ~ 2026-10-18"}},
 {id:"sjseason", cat:"sjrq", icon:"🍂", name:"季节判断", desc:"按月份判断季节（气象划分）",
  formula:"3–5春，6–8夏，9–11秋，12/1/2冬",
  inputs:[
   {id:"m", label:"月份", def:"10", min:1, max:12}
  ],
  run:"var s=(m>=3&&m<=5)?'春季':(m>=6&&m<=8)?'夏季':(m>=9&&m<=11)?'秋季':'冬季'; return {ok:true,html:'<div class=big>'+m+'月 是 '+s+'</div>'};",
  test:{inputs:{m:10}, expect:"秋季"}},
 {id:"sjxusui", cat:"sjrq", icon:"🧧", name:"虚岁计算", desc:"按年份算虚岁",
  formula:"虚岁 = 当前年份 − 出生年份 + 1",
  inputs:[
   {id:"birthY", label:"出生年份", def:"2000", min:1900, max:2100},
   {id:"nowY", label:"当前年份", def:"2026", min:1900, max:2100}
  ],
  run:"if(nowY<birthY) return {ok:false,msg:'当前年份不能早于出生年份'}; return {ok:true,html:'<div class=big>虚岁 '+(nowY-birthY+1)+' 岁</div>'};",
  test:{inputs:{birthY:2000,nowY:2026}, expect:"虚岁 27 岁"}}
);
