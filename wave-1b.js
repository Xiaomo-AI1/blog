/* ===== WAVE-1B 数学计算 ===== */
CATS.push({id:"sx", name:"数学计算"});
TOOLS.push(
 {id:"sxlinear1", cat:"sx", icon:"x", name:"一元一次方程", desc:"ax+b=0 求 x",
  formula:"x=−b/a（a≠0）",
  inputs:[
   {id:"a", label:"系数 a", def:"2"},
   {id:"b", label:"常数 b", def:"-4"}
  ],
  run:"if(a===0){ if(b===0) return {ok:true,html:'<div class=\"big\">无穷多解</div>'}; return {ok:true,html:'<div class=\"big\">无解</div><div class=\"row\">a=0 且 b≠0</div>'}; } var x=-b/a; return {ok:true,html:'<div class=\"big\">x='+x+'</div>'};",
  test:{inputs:{a:2,b:-4}, expect:"x=2"}},
 {id:"sxquad", cat:"sx", icon:"∑", name:"一元二次方程求解", desc:"ax²+bx+c=0 求实数根",
  formula:"Δ=b²−4ac；x=(−b±√Δ)/2a",
  inputs:[
   {id:"a", label:"系数 a", def:"1"},
   {id:"b", label:"系数 b", def:"-3"},
   {id:"c", label:"常数 c", def:"2"}
  ],
  run:"if(a===0) return {ok:false,msg:'a不能为0'}; var d=b*b-4*a*c; if(d<0) return {ok:true,html:'<div class=\"big\">无实数根</div><div class=\"row\">Δ='+d.toFixed(2)+' < 0</div>'}; var x1=(-b+Math.sqrt(d))/(2*a), x2=(-b-Math.sqrt(d))/(2*a); return {ok:true,html:'<div class=\"big\">x₁='+x1.toFixed(4)+', x₂='+x2.toFixed(4)+'</div>'};",
  test:{inputs:{a:1,b:-3,c:2}, expect:"x₁=2.0000"}},
 {id:"sxlinear2", cat:"sx", icon:"⎧", name:"二元一次方程组", desc:"a₁x+b₁y=c₁，a₂x+b₂y=c₂ 求解",
  formula:"D=a₁b₂−a₂b₁；x=(c₁b₂−c₂b₁)/D，y=(a₁c₂−a₂c₁)/D",
  inputs:[
   {id:"a1", label:"a₁", def:"1"},
   {id:"b1", label:"b₁", def:"1"},
   {id:"c1", label:"c₁", def:"5"},
   {id:"a2", label:"a₂", def:"1"},
   {id:"b2", label:"b₂", def:"-1"},
   {id:"c2", label:"c₂", def:"1"}
  ],
  run:"var D=a1*b2-a2*b1; if(D===0) return {ok:false,msg:'两直线平行或重合，无唯一解'}; var x=(c1*b2-c2*b1)/D, y=(a1*c2-a2*c1)/D; return {ok:true,html:'<div class=\"big\">x='+x+', y='+y+'</div>'};",
  test:{inputs:{a1:1,b1:1,c1:5,a2:1,b2:-1,c2:1}, expect:"x=3, y=2"}},
 {id:"sxcircle", cat:"sx", icon:"○", name:"圆面积周长", desc:"已知半径求圆的面积和周长",
  formula:"面积=πr²，周长=2πr",
  inputs:[
   {id:"r", label:"半径 r", def:"5", min:0}
  ],
  run:"if(r<=0) return {ok:false,msg:'半径必须大于0'}; var s=Math.PI*r*r, c=2*Math.PI*r; return {ok:true,html:'<div class=\"big\">面积='+s.toFixed(4)+'</div><div class=\"row\">周长='+c.toFixed(4)+'</div>'};",
  test:{inputs:{r:5}, expect:"面积=78.5398"}},
 {id:"sxsphere", cat:"sx", icon:"●", name:"球体积表面积", desc:"已知半径求球的体积和表面积",
  formula:"体积=4/3·πr³，表面积=4πr²",
  inputs:[
   {id:"r", label:"半径 r", def:"3", min:0}
  ],
  run:"if(r<=0) return {ok:false,msg:'半径必须大于0'}; var v=4/3*Math.PI*r*r*r, s=4*Math.PI*r*r; return {ok:true,html:'<div class=\"big\">体积='+v.toFixed(4)+'</div><div class=\"row\">表面积='+s.toFixed(4)+'</div>'};",
  test:{inputs:{r:3}, expect:"体积=113.0973"}},
 {id:"sxcylinder", cat:"sx", icon:"▭", name:"圆柱体积表面积", desc:"已知底半径和高求圆柱体积和表面积",
  formula:"体积=πr²h，表面积=2πr(r+h)",
  inputs:[
   {id:"r", label:"底面半径 r", def:"2", min:0},
   {id:"h", label:"高 h", def:"5", min:0}
  ],
  run:"if(r<=0||h<=0) return {ok:false,msg:'半径和高必须大于0'}; var v=Math.PI*r*r*h, s=2*Math.PI*r*(r+h); return {ok:true,html:'<div class=\"big\">体积='+v.toFixed(4)+'</div><div class=\"row\">表面积='+s.toFixed(4)+'</div>'};",
  test:{inputs:{r:2,h:5}, expect:"体积=62.8319"}},
 {id:"sxcone", cat:"sx", icon:"▽", name:"圆锥体积", desc:"已知底半径和高求圆锥体积",
  formula:"体积=1/3·πr²h",
  inputs:[
   {id:"r", label:"底面半径 r", def:"3", min:0},
   {id:"h", label:"高 h", def:"4", min:0}
  ],
  run:"if(r<=0||h<=0) return {ok:false,msg:'半径和高必须大于0'}; var v=Math.PI*r*r*h/3; return {ok:true,html:'<div class=\"big\">体积='+v.toFixed(4)+'</div>'};",
  test:{inputs:{r:3,h:4}, expect:"体积=37.6991"}},
 {id:"sxheron", cat:"sx", icon:"△", name:"三角形海伦面积", desc:"已知三边长求三角形面积",
  formula:"s=(a+b+c)/2，面积=√[s(s−a)(s−b)(s−c)]",
  inputs:[
   {id:"a", label:"边 a", def:"3", min:0},
   {id:"b", label:"边 b", def:"4", min:0},
   {id:"c", label:"边 c", def:"5", min:0}
  ],
  run:"if(a<=0||b<=0||c<=0) return {ok:false,msg:'边长必须大于0'}; if(a+b<=c||a+c<=b||b+c<=a) return {ok:false,msg:'不满足三角形两边之和大于第三边'}; var s=(a+b+c)/2, area=Math.sqrt(s*(s-a)*(s-b)*(s-c)); return {ok:true,html:'<div class=\"big\">面积='+area.toFixed(4)+'</div>'};",
  test:{inputs:{a:3,b:4,c:5}, expect:"面积=6.0000"}},
 {id:"sxtrapezoid", cat:"sx", icon:"⏢", name:"梯形面积", desc:"已知上底、下底和高求梯形面积",
  formula:"面积=(上底+下底)×高÷2",
  inputs:[
   {id:"a", label:"上底 a", def:"4", min:0},
   {id:"b", label:"下底 b", def:"6", min:0},
   {id:"h", label:"高 h", def:"5", min:0}
  ],
  run:"if(a<0||b<0||h<=0) return {ok:false,msg:'请输入有效的边长和高'}; var s=(a+b)*h/2; return {ok:true,html:'<div class=\"big\">面积='+s+'</div>'};",
  test:{inputs:{a:4,b:6,h:5}, expect:"面积=25"}},
 {id:"sxsector", cat:"sx", icon:"◔", name:"扇形面积弧长", desc:"已知半径和圆心角求扇形面积与弧长",
  formula:"弧长=2πr×θ/360，面积=πr²×θ/360",
  inputs:[
   {id:"r", label:"半径 r", def:"6", min:0},
   {id:"ang", label:"圆心角θ（度）", def:"60", min:0, max:360}
  ],
  run:"if(r<=0) return {ok:false,msg:'半径必须大于0'}; if(ang<=0||ang>360) return {ok:false,msg:'圆心角应在(0,360]度之间'}; var l=2*Math.PI*r*ang/360, s=Math.PI*r*r*ang/360; return {ok:true,html:'<div class=\"big\">弧长='+l.toFixed(4)+'</div><div class=\"row\">面积='+s.toFixed(4)+'</div>'};",
  test:{inputs:{r:6,ang:60}, expect:"弧长=6.2832"}},
 {id:"sxpythag", cat:"sx", icon:"∟", name:"勾股定理求边", desc:"已知直角三角形两边求第三边",
  formula:"c=√(a²+b²)；b=√(c²−a²)",
  inputs:[
   {id:"mode", label:"求哪条边", type:"select", options:[{v:"c",t:"求斜边 c（已知 a、b）"},{v:"b",t:"求直角边 b（已知 a、斜边 c）"}], def:"c"},
   {id:"x", label:"直角边 a", def:"3", min:0},
   {id:"y", label:"直角边 b（或斜边 c）", def:"4", min:0}
  ],
  run:"if(x<=0||y<=0) return {ok:false,msg:'边长必须大于0'}; if(mode==='c'){ var c=Math.sqrt(x*x+y*y); return {ok:true,html:'<div class=\"big\">斜边 c='+c.toFixed(4)+'</div>'}; } if(y<=x) return {ok:false,msg:'斜边必须大于直角边 a'}; var b=Math.sqrt(y*y-x*x); return {ok:true,html:'<div class=\"big\">直角边 b='+b.toFixed(4)+'</div>'};",
  test:{inputs:{mode:"c",x:3,y:4}, expect:"斜边 c=5.0000"}},
 {id:"sxtrig", cat:"sx", icon:"∿", name:"三角函数值", desc:"已知角度求 sin/cos/tan 值",
  formula:"先化为弧度：rad=角度×π/180",
  inputs:[
   {id:"fn", label:"函数", type:"select", options:[{v:"sin",t:"sin 正弦"},{v:"cos",t:"cos 余弦"},{v:"tan",t:"tan 正切"}], def:"sin"},
   {id:"deg", label:"角度（度）", def:"30"}
  ],
  run:"var r=deg*Math.PI/180, v=fn==='sin'?Math.sin(r):fn==='cos'?Math.cos(r):Math.tan(r); if(!isFinite(v)) return {ok:false,msg:'该角度下函数值无定义'}; return {ok:true,html:'<div class=\"big\">'+fn+'('+deg+'°)='+v.toFixed(6)+'</div>'};",
  test:{inputs:{fn:"sin",deg:30}, expect:"sin(30°)=0.500000"}},
 {id:"sxatrig", cat:"sx", icon:"∠", name:"反三角函数求角度", desc:"已知三角函数值求对应角度",
  formula:"θ=arcsin(x)×180/π（arccos、arctan 同理）",
  inputs:[
   {id:"fn", label:"函数", type:"select", options:[{v:"asin",t:"arcsin"},{v:"acos",t:"arccos"},{v:"atan",t:"arctan"}], def:"asin"},
   {id:"x", label:"函数值 x", def:"0.5"}
  ],
  run:"if((fn==='asin'||fn==='acos')&&(x<-1||x>1)) return {ok:false,msg:'arcsin/arccos 的定义域为 [-1,1]'}; var r=fn==='asin'?Math.asin(x):fn==='acos'?Math.acos(x):Math.atan(x); var d=r*180/Math.PI; return {ok:true,html:'<div class=\"big\">'+fn+'('+x+')='+d.toFixed(4)+'°</div>'};",
  test:{inputs:{fn:"asin",x:0.5}, expect:"asin(0.5)=30.0000°"}},
 {id:"sxlog", cat:"sx", icon:"㏒", name:"对数计算", desc:"计算以 a 为底 b 的对数",
  formula:"logₐb=ln b / ln a",
  inputs:[
   {id:"a", label:"底数 a", def:"10"},
   {id:"b", label:"真数 b", def:"100"}
  ],
  run:"if(a<=0||a===1) return {ok:false,msg:'底数须大于0且不等于1'}; if(b<=0) return {ok:false,msg:'真数须大于0'}; var v=Math.log(b)/Math.log(a); return {ok:true,html:'<div class=\"big\">logₐb='+v.toFixed(6)+'</div>'};",
  test:{inputs:{a:10,b:100}, expect:"logₐb=2.000000"}},
 {id:"sxexp", cat:"sx", icon:"eˣ", name:"指数计算", desc:"计算自然指数 eˣ 的值",
  formula:"e≈2.718281828",
  inputs:[
   {id:"x", label:"指数 x", def:"1"}
  ],
  run:"var v=Math.exp(x); if(!isFinite(v)) return {ok:false,msg:'结果溢出'}; return {ok:true,html:'<div class=\"big\">e^'+x+'='+v.toFixed(6)+'</div>'};",
  test:{inputs:{x:1}, expect:"e^1=2.718282"}},
 {id:"sxfact", cat:"sx", icon:"!", name:"阶乘", desc:"计算 n!（n 为非负整数）",
  formula:"n!=1×2×…×n，0!=1",
  inputs:[
   {id:"n", label:"n", def:"5", min:0}
  ],
  run:"if(n<0||Math.floor(n)!==n) return {ok:false,msg:'n 须为非负整数'}; if(n>170) return {ok:false,msg:'n 过大，结果溢出'}; var r=1; for(var i=2;i<=n;i++) r*=i; return {ok:true,html:'<div class=\"big\">'+n+'!='+r+'</div>'};",
  test:{inputs:{n:5}, expect:"5!=120"}},
 {id:"sxperm", cat:"sx", icon:"A", name:"排列数 A(n,m)", desc:"从 n 个不同元素中取 m 个排列",
  formula:"A(n,m)=n!/(n−m)!=n×(n−1)×…×(n−m+1)",
  inputs:[
   {id:"n", label:"n", def:"5", min:0},
   {id:"m", label:"m", def:"3", min:0}
  ],
  run:"if(Math.floor(n)!==n||Math.floor(m)!==m||n<0||m<0) return {ok:false,msg:'n、m 须为非负整数'}; if(m>n) return {ok:false,msg:'m 不能大于 n'}; var r=1; for(var i=0;i<m;i++) r*=n-i; return {ok:true,html:'<div class=\"big\">A('+n+','+m+')='+r+'</div>'};",
  test:{inputs:{n:5,m:3}, expect:"A(5,3)=60"}},
 {id:"sxcomb", cat:"sx", icon:"C", name:"组合数 C(n,m)", desc:"从 n 个不同元素中取 m 个组合",
  formula:"C(n,m)=n!/[m!(n−m)!]",
  inputs:[
   {id:"n", label:"n", def:"5", min:0},
   {id:"m", label:"m", def:"2", min:0}
  ],
  run:"if(Math.floor(n)!==n||Math.floor(m)!==m||n<0||m<0) return {ok:false,msg:'n、m 须为非负整数'}; if(m>n) return {ok:false,msg:'m 不能大于 n'}; var k=Math.min(m,n-m), r=1; for(var i=1;i<=k;i++) r=r*(n-k+i)/i; return {ok:true,html:'<div class=\"big\">C('+n+','+m+')='+Math.round(r)+'</div>'};",
  test:{inputs:{n:5,m:2}, expect:"C(5,2)=10"}},
 {id:"sxarith", cat:"sx", icon:"≋", name:"等差数列求和", desc:"已知首项、公差、项数求前 n 项和",
  formula:"Sₙ=n[2a₁+(n−1)d]/2",
  inputs:[
   {id:"a1", label:"首项 a₁", def:"1"},
   {id:"d", label:"公差 d", def:"2"},
   {id:"n", label:"项数 n", def:"10", min:1}
  ],
  run:"if(Math.floor(n)!==n||n<1) return {ok:false,msg:'项数须为正整数'}; var s=n*(2*a1+(n-1)*d)/2; return {ok:true,html:'<div class=\"big\">S='+s+'</div><div class=\"row\">末项 aₙ='+(a1+(n-1)*d)+'</div>'};",
  test:{inputs:{a1:1,d:2,n:10}, expect:"S=100"}},
 {id:"sxgeom", cat:"sx", icon:"⋯", name:"等比数列求和", desc:"已知首项、公比、项数求前 n 项和",
  formula:"q≠1 时 Sₙ=a₁(1−qⁿ)/(1−q)；q=1 时 Sₙ=n·a₁",
  inputs:[
   {id:"a1", label:"首项 a₁", def:"1"},
   {id:"q", label:"公比 q", def:"2"},
   {id:"n", label:"项数 n", def:"10", min:1}
  ],
  run:"if(Math.floor(n)!==n||n<1) return {ok:false,msg:'项数须为正整数'}; var s=q===1?a1*n:a1*(1-Math.pow(q,n))/(1-q); return {ok:true,html:'<div class=\"big\">S='+s+'</div>'};",
  test:{inputs:{a1:1,q:2,n:10}, expect:"S=1023"}},
 {id:"sxgcd", cat:"sx", icon:"÷", name:"最大公约数", desc:"求两个整数的最大公约数",
  formula:"辗转相除法",
  inputs:[
   {id:"a", label:"整数 a", def:"48"},
   {id:"b", label:"整数 b", def:"18"}
  ],
  run:"if(Math.floor(a)!==a||Math.floor(b)!==b) return {ok:false,msg:'请输入整数'}; var x=Math.abs(a), y=Math.abs(b); if(x===0&&y===0) return {ok:false,msg:'a、b 不能同时为 0'}; while(y){ var t=x%y; x=y; y=t; } return {ok:true,html:'<div class=\"big\">gcd='+x+'</div>'};",
  test:{inputs:{a:48,b:18}, expect:"gcd=6"}},
 {id:"sxlcm", cat:"sx", icon:"×", name:"最小公倍数", desc:"求两个整数的最小公倍数",
  formula:"lcm=|a×b|/gcd(a,b)",
  inputs:[
   {id:"a", label:"整数 a", def:"12"},
   {id:"b", label:"整数 b", def:"18"}
  ],
  run:"if(Math.floor(a)!==a||Math.floor(b)!==b) return {ok:false,msg:'请输入整数'}; var x=Math.abs(a), y=Math.abs(b); if(x===0||y===0) return {ok:false,msg:'a、b 不能为 0'}; var g=function(p,q){ while(q){ var t=p%q; p=q; q=t; } return p; }(x,y); return {ok:true,html:'<div class=\"big\">lcm='+x*y/g+'</div>'};",
  test:{inputs:{a:12,b:18}, expect:"lcm=36"}},
 {id:"sxprime", cat:"sx", icon:"?", name:"质数判断", desc:"判断一个整数是否为质数",
  formula:"试除法：依次检验 2 到 √n 的因数",
  inputs:[
   {id:"n", label:"整数 n", def:"17"}
  ],
  run:"if(Math.floor(n)!==n) return {ok:false,msg:'请输入整数'}; if(n<2) return {ok:true,html:'<div class=\"big\">'+n+' 不是质数</div>'}; if(n===2) return {ok:true,html:'<div class=\"big\">2 是质数</div>'}; if(n%2===0) return {ok:true,html:'<div class=\"big\">'+n+' 不是质数</div><div class=\"row\">能被 2 整除</div>'}; for(var i=3;i*i<=n;i+=2){ if(n%i===0) return {ok:true,html:'<div class=\"big\">'+n+' 不是质数</div><div class=\"row\">能被 '+i+' 整除</div>'}; } return {ok:true,html:'<div class=\"big\">'+n+' 是质数</div>'};",
  test:{inputs:{n:17}, expect:"17 是质数"}},
 {id:"sxfraction", cat:"sx", icon:"½", name:"分数化简", desc:"把分数约分到最简形式",
  formula:"分子分母同除以最大公约数",
  inputs:[
   {id:"p", label:"分子", def:"12"},
   {id:"q", label:"分母", def:"18"}
  ],
  run:"if(Math.floor(p)!==p||Math.floor(q)!==q) return {ok:false,msg:'请输入整数'}; if(q===0) return {ok:false,msg:'分母不能为 0'}; var x=Math.abs(p), y=Math.abs(q); var g=function(a,b){ while(b){ var t=a%b; a=b; b=t; } return a; }(x,y); var np=p/g, nq=q/g; if(nq<0){ np=-np; nq=-nq; } var s=nq===1?String(np):np+'/'+nq; return {ok:true,html:'<div class=\"big\">'+p+'/'+q+' = '+s+'</div>'};",
  test:{inputs:{p:12,q:18}, expect:"12/18 = 2/3"}},
 {id:"sxpct", cat:"sx", icon:"%", name:"百分比计算", desc:"三种常用百分比换算",
  formula:"x 是 y 的 x/y×100%；y 的 x% 为 y×x/100",
  inputs:[
   {id:"mode", label:"计算类型", type:"select", options:[{v:"a",t:"x 是 y 的百分之几"},{v:"b",t:"y 的 x% 是多少"},{v:"c",t:"x 比 y 多百分之几"}], def:"a"},
   {id:"x", label:"x", def:"30"},
   {id:"y", label:"y", def:"120"}
  ],
  run:"if(mode==='a'){ if(y===0) return {ok:false,msg:'y 不能为 0'}; return {ok:true,html:'<div class=\"big\">'+(x/y*100)+'%</div>'}; } if(mode==='b'){ return {ok:true,html:'<div class=\"big\">'+(y*x/100)+'</div>'}; } if(y===0) return {ok:false,msg:'y 不能为 0'}; return {ok:true,html:'<div class=\"big\">'+((x-y)/y*100)+'%</div>'};",
  test:{inputs:{mode:"a",x:30,y:120}, expect:"25%"}},
 {id:"sxdiscount", cat:"sx", icon:"折", name:"折扣计算", desc:"按折扣算现价和省了多少钱",
  formula:"现价=原价×折扣/10",
  inputs:[
   {id:"p", label:"原价（元）", def:"100", min:0},
   {id:"d", label:"折扣（几折，如8折填8）", def:"8", min:0, max:10}
  ],
  run:"if(p<0) return {ok:false,msg:'原价不能为负'}; if(d<0||d>10) return {ok:false,msg:'折扣应在 0~10 之间'}; var now=p*d/10; return {ok:true,html:'<div class=\"big\">现价 '+now.toFixed(2)+' 元</div><div class=\"row\">省了 '+(p-now).toFixed(2)+' 元</div>'};",
  test:{inputs:{p:100,d:8}, expect:"现价 80.00 元"}},
 {id:"sxmean", cat:"sx", icon:"x̄", name:"平均数", desc:"求一组数的算术平均值（后两项可选）",
  formula:"平均值=总和÷个数",
  inputs:[
   {id:"n1", label:"数值 1", def:"80"},
   {id:"n2", label:"数值 2", def:"90"},
   {id:"n3", label:"数值 3", def:"100"},
   {id:"n4", label:"数值 4（可选）", def:"", optional:true},
   {id:"n5", label:"数值 5（可选）", def:"", optional:true}
  ],
  run:"var a=[n1,n2,n3,n4,n5].filter(function(v){return v!==null&&v!==undefined;}); if(a.length===0) return {ok:false,msg:'至少输入一个数值'}; var s=0; for(var i=0;i<a.length;i++) s+=a[i]; return {ok:true,html:'<div class=\"big\">平均值='+(s/a.length)+'</div><div class=\"row\">共 '+a.length+' 个数</div>'};",
  test:{inputs:{n1:80,n2:90,n3:100,n4:null,n5:null}, expect:"平均值=90"}},
 {id:"sxwmean", cat:"sx", icon:"⚖", name:"加权平均数", desc:"按权重求加权平均值",
  formula:"加权平均=Σ(数值×权重)/Σ权重",
  inputs:[
   {id:"x1", label:"数值 1", def:"80"},
   {id:"w1", label:"权重 1", def:"2", min:0},
   {id:"x2", label:"数值 2", def:"90"},
   {id:"w2", label:"权重 2", def:"3", min:0},
   {id:"x3", label:"数值 3", def:"100"},
   {id:"w3", label:"权重 3", def:"5", min:0}
  ],
  run:"var sw=w1+w2+w3; if(sw===0) return {ok:false,msg:'权重之和不能为 0'}; if(w1<0||w2<0||w3<0) return {ok:false,msg:'权重不能为负'}; var v=(x1*w1+x2*w2+x3*w3)/sw; return {ok:true,html:'<div class=\"big\">加权平均='+v+'</div>'};",
  test:{inputs:{x1:80,w1:2,x2:90,w2:3,x3:100,w3:5}, expect:"加权平均=93"}},
 {id:"sxstddev", cat:"sx", icon:"σ", name:"标准差", desc:"求一组数的总体标准差（后两项可选）",
  formula:"σ=√[Σ(xᵢ−x̄)²/n]",
  inputs:[
   {id:"n1", label:"数值 1", def:"2"},
   {id:"n2", label:"数值 2", def:"4"},
   {id:"n3", label:"数值 3", def:"4"},
   {id:"n4", label:"数值 4（可选）", def:"4", optional:true},
   {id:"n5", label:"数值 5（可选）", def:"5", optional:true}
  ],
  run:"var a=[n1,n2,n3,n4,n5].filter(function(v){return v!==null&&v!==undefined;}); if(a.length===0) return {ok:false,msg:'至少输入一个数值'}; var s=0,i; for(i=0;i<a.length;i++) s+=a[i]; var m=s/a.length, v=0; for(i=0;i<a.length;i++) v+=(a[i]-m)*(a[i]-m); v/=a.length; return {ok:true,html:'<div class=\"big\">σ='+Math.sqrt(v).toFixed(4)+'</div><div class=\"row\">平均值='+m+'</div>'};",
  test:{inputs:{n1:2,n2:4,n3:4,n4:4,n5:5}, expect:"σ=0.9798"}},
 {id:"sxmedian", cat:"sx", icon:"M", name:"中位数", desc:"求一组数排序后的中间值（后两项可选）",
  formula:"排序后取中间；偶数个取中间两数平均",
  inputs:[
   {id:"n1", label:"数值 1", def:"3"},
   {id:"n2", label:"数值 2", def:"1"},
   {id:"n3", label:"数值 3", def:"2"},
   {id:"n4", label:"数值 4（可选）", def:"", optional:true},
   {id:"n5", label:"数值 5（可选）", def:"", optional:true}
  ],
  run:"var a=[n1,n2,n3,n4,n5].filter(function(v){return v!==null&&v!==undefined;}); if(a.length===0) return {ok:false,msg:'至少输入一个数值'}; a.sort(function(p,q){return p-q;}); var m=a.length%2===1?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2; return {ok:true,html:'<div class=\"big\">中位数='+m+'</div>'};",
  test:{inputs:{n1:3,n2:1,n3:2,n4:null,n5:null}, expect:"中位数=2"}},
 {id:"sxmatadd", cat:"sx", icon:"⊞", name:"2×2矩阵加法", desc:"两个 2×2 矩阵相加",
  formula:"C=A+B，对应元素相加",
  inputs:[
   {id:"a11", label:"a₁₁", def:"1"},
   {id:"a12", label:"a₁₂", def:"2"},
   {id:"a21", label:"a₂₁", def:"3"},
   {id:"a22", label:"a₂₂", def:"4"},
   {id:"b11", label:"b₁₁", def:"5"},
   {id:"b12", label:"b₁₂", def:"6"},
   {id:"b21", label:"b₂₁", def:"7"},
   {id:"b22", label:"b₂₂", def:"8"}
  ],
  run:"return {ok:true,html:'<div class=\"big\">['+(a11+b11)+' '+(a12+b12)+']<br>['+(a21+b21)+' '+(a22+b22)+']</div>'};",
  test:{inputs:{a11:1,a12:2,a21:3,a22:4,b11:5,b12:6,b21:7,b22:8}, expect:"[10 12]"}},
 {id:"sxmatmul", cat:"sx", icon:"✕", name:"2×2矩阵乘法", desc:"两个 2×2 矩阵相乘",
  formula:"cᵢⱼ=Σaᵢₖbₖⱼ",
  inputs:[
   {id:"a11", label:"a₁₁", def:"1"},
   {id:"a12", label:"a₁₂", def:"2"},
   {id:"a21", label:"a₂₁", def:"3"},
   {id:"a22", label:"a₂₂", def:"4"},
   {id:"b11", label:"b₁₁", def:"5"},
   {id:"b12", label:"b₁₂", def:"6"},
   {id:"b21", label:"b₂₁", def:"7"},
   {id:"b22", label:"b₂₂", def:"8"}
  ],
  run:"var c11=a11*b11+a12*b21, c12=a11*b12+a12*b22, c21=a21*b11+a22*b21, c22=a21*b12+a22*b22; return {ok:true,html:'<div class=\"big\">['+c11+' '+c12+']<br>['+c21+' '+c22+']</div>'};",
  test:{inputs:{a11:1,a12:2,a21:3,a22:4,b11:5,b12:6,b21:7,b22:8}, expect:"[43 50]"}},
 {id:"sxmatdet", cat:"sx", icon:"||", name:"2×2行列式", desc:"求 2×2 矩阵的行列式",
  formula:"det=a₁₁a₂₂−a₁₂a₂₁",
  inputs:[
   {id:"a11", label:"a₁₁", def:"1"},
   {id:"a12", label:"a₁₂", def:"2"},
   {id:"a21", label:"a₂₁", def:"3"},
   {id:"a22", label:"a₂₂", def:"4"}
  ],
  run:"var d=a11*a22-a12*a21; return {ok:true,html:'<div class=\"big\">det='+d+'</div>'};",
  test:{inputs:{a11:1,a12:2,a21:3,a22:4}, expect:"det=-2"}},
 {id:"sxraddeg", cat:"sx", icon:"π", name:"弧度角度互转", desc:"弧度与角度互相换算",
  formula:"角度=弧度×180/π；弧度=角度×π/180",
  inputs:[
   {id:"mode", label:"换算方向", type:"select", options:[{v:"r2d",t:"弧度 → 角度"},{v:"d2r",t:"角度 → 弧度"}], def:"r2d"},
   {id:"x", label:"数值", def:"3.14159"}
  ],
  run:"var v=mode==='r2d'?x*180/Math.PI:x*Math.PI/180; var u=mode==='r2d'?'°':' rad'; return {ok:true,html:'<div class=\"big\">'+v.toFixed(4)+u+'</div>'};",
  test:{inputs:{mode:"r2d",x:3.14159}, expect:"179.9998°"}},
 {id:"sxsci", cat:"sx", icon:"×10", name:"科学计数法展开", desc:"科学计数法与普通数字互转",
  formula:"a×10ⁿ",
  inputs:[
   {id:"mode", label:"换算方向", type:"select", options:[{v:"s2p",t:"科学计数法 → 普通数字"},{v:"p2s",t:"普通数字 → 科学计数法"}], def:"s2p"},
   {id:"coef", label:"系数 a（或普通数字）", def:"1.5"},
   {id:"exp", label:"指数 n", def:"8"}
  ],
  run:"if(mode==='s2p'){ var v=coef*Math.pow(10,exp); if(!isFinite(v)) return {ok:false,msg:'结果溢出'}; return {ok:true,html:'<div class=\"big\">'+coef+'×10^'+exp+' = '+v+'</div>'}; } if(coef===0) return {ok:true,html:'<div class=\"big\">0</div>'}; var e=Math.floor(Math.log10(Math.abs(coef))), c=coef/Math.pow(10,e); return {ok:true,html:'<div class=\"big\">'+coef+' = '+c.toFixed(6)+'×10^'+e+'</div>'};",
  test:{inputs:{mode:"s2p",coef:1.5,exp:8}, expect:"= 150000000"}},
 {id:"sxsqrt", cat:"sx", icon:"√", name:"平方根", desc:"求非负数的算术平方根",
  formula:"√x（x≥0）",
  inputs:[
   {id:"x", label:"x", def:"2", min:0}
  ],
  run:"if(x<0) return {ok:false,msg:'负数没有实数平方根'}; return {ok:true,html:'<div class=\"big\">√'+x+'='+Math.sqrt(x).toFixed(6)+'</div>'};",
  test:{inputs:{x:2}, expect:"√2=1.414214"}},
 {id:"sxcbrt", cat:"sx", icon:"∛", name:"立方根", desc:"求实数的立方根",
  formula:"∛x",
  inputs:[
   {id:"x", label:"x", def:"27"}
  ],
  run:"return {ok:true,html:'<div class=\"big\">∛'+x+'='+Math.cbrt(x).toFixed(6)+'</div>'};",
  test:{inputs:{x:27}, expect:"∛27=3.000000"}},
 {id:"sxpow", cat:"sx", icon:"^", name:"幂运算", desc:"计算 a 的 n 次方",
  formula:"aⁿ",
  inputs:[
   {id:"a", label:"底数 a", def:"2"},
   {id:"n", label:"指数 n", def:"10"}
  ],
  run:"var v=Math.pow(a,n); if(!isFinite(v)) return {ok:false,msg:'结果溢出或无定义'}; return {ok:true,html:'<div class=\"big\">'+a+'^'+n+'='+v+'</div>'};",
  test:{inputs:{a:2,n:10}, expect:"2^10=1024"}},
 {id:"sxdivmod", cat:"sx", icon:"÷", name:"带余除法", desc:"求整数除法的商和余数",
  formula:"a=b×q+r（0≤r<|b|）",
  inputs:[
   {id:"a", label:"被除数 a", def:"17"},
   {id:"b", label:"除数 b", def:"5"}
  ],
  run:"if(b===0) return {ok:false,msg:'除数不能为 0'}; var q=Math.trunc(a/b), r=a-q*b; return {ok:true,html:'<div class=\"big\">'+a+'÷'+b+' 商='+q+' 余='+r+'</div>'};",
  test:{inputs:{a:17,b:5}, expect:"商=3 余=2"}},
 {id:"sxpctchg", cat:"sx", icon:"↗", name:"百分比变化", desc:"求从旧值到新值的变化率（增长率）",
  formula:"变化率=(新值−旧值)/旧值×100%",
  inputs:[
   {id:"old", label:"旧值", def:"80"},
   {id:"nw", label:"新值", def:"100"}
  ],
  run:"if(old===0) return {ok:false,msg:'旧值不能为 0'}; var v=(nw-old)/old*100; return {ok:true,html:'<div class=\"big\">'+v.toFixed(2)+'%</div>'};",
  test:{inputs:{old:80,nw:100}, expect:"25.00%"}},
 {id:"sxring", cat:"sx", icon:"◎", name:"圆环面积", desc:"已知内外半径求圆环面积",
  formula:"面积=π(R²−r²)",
  inputs:[
   {id:"R", label:"外半径 R", def:"5", min:0},
   {id:"r", label:"内半径 r", def:"3", min:0}
  ],
  run:"if(R<=0||r<0) return {ok:false,msg:'半径须为非负数且外半径大于0'}; if(R<=r) return {ok:false,msg:'外半径须大于内半径'}; var s=Math.PI*(R*R-r*r); return {ok:true,html:'<div class=\"big\">面积='+s.toFixed(4)+'</div>'};",
  test:{inputs:{R:5,r:3}, expect:"面积=50.2655"}},
 {id:"sxdist", cat:"sx", icon:"↔", name:"两点间距离", desc:"求平面上两点间的直线距离",
  formula:"d=√[(x₂−x₁)²+(y₂−y₁)²]",
  inputs:[
   {id:"x1", label:"x₁", def:"0"},
   {id:"y1", label:"y₁", def:"0"},
   {id:"x2", label:"x₂", def:"3"},
   {id:"y2", label:"y₂", def:"4"}
  ],
  run:"var d=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); return {ok:true,html:'<div class=\"big\">距离='+d.toFixed(4)+'</div>'};",
  test:{inputs:{x1:0,y1:0,x2:3,y2:4}, expect:"距离=5.0000"}}
);
