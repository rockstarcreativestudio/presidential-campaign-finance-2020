(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){e.exports=a(261)},261:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(99),o=a.n(c),l=a(5),i=a(6),s=a(8),u=a(7),d=a(9),m=(a(51),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("nav",{className:"nav bg-dark"},r.a.createElement("div",{className:"row w-100 py-4"},r.a.createElement("div",{className:"container text-center"},r.a.createElement("h2",{className:"text-white"},"Presdential Candidates 2020"),r.a.createElement("h3",{className:"text-warning"},"Finances in Truth")))))}}]),t}(n.Component)),p=a(17),h=a(31),f=a.n(h),v=function(e){function t(e){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){f()({method:"GET",url:"https://api.open.fec.gov/v1/candidates/search/?office=P&election_year=2020&incumbent_challenge=I&incumbent_challenge=C&page=1&per_page=50&sort_nulls_last=false&has_raised_funds=true&sort=name&sort_hide_null=false&sort_null_only=false&is_active_candidate=true&api_key=".concat("sO43O5ckT95cJQG6p0apWTZgdYR1xKP1MB65AVoT","&candidate_status=C&year=2020")}).then(function(e){var t=e.data.results;console.log(t);var a=t.map(function(e,t){var a=e.name.split(",").reverse().join(" "),n=e.party,r=e.principal_committees[0].committee_id,c={};return c.name=a+" - "+n,c.value=r,c}).sort(function(e,t){return e.name>t.name?1:-1}),n=document.getElementById("prez");n.options.length=0,a.forEach(function(e,t){n.options[n.options.length]=new Option(a[t].name,a[t].value)})}).catch(function(e){return console.log("Danger, Will Robinson! "+e)})}},{key:"render",value:function(){var e=this.props.handleSelect;return r.a.createElement("div",null,r.a.createElement("div",{className:"d-flex justify-content-center pt-4"},r.a.createElement("div",{className:"form-group row text-center align-middle"},r.a.createElement("label",{htmlFor:"prez",className:"col-auto col-form-label col-form-label-sm"},r.a.createElement("span",{className:"h6 text-dark"},"Select a Candidate")),r.a.createElement("div",{className:"col-auto"},r.a.createElement("select",{className:"form-control",id:"prez",onChange:e})))))}}]),t}(n.Component),b=a(100),g=(a(123),"sO43O5ckT95cJQG6p0apWTZgdYR1xKP1MB65AVoT"),E=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleSelect=function(e){var t=e.currentTarget.value;a.setState({isLoading:!0}),f()({method:"GET",url:"https://api.open.fec.gov/v1/committee/".concat(t,"/schedules/schedule_a/by_size/?per_page=20&cycle=2020&page=1&sort_hide_null=false&sort=-cycle&api_key=").concat(g,"&sort_null_only=false&sort_nulls_last=true\n                        ")}).then(function(e){var t=e.data.results.map(function(e){return{size:e.size,total:e.total,count:e.count}}).sort(function(e,t){return e.size>t.size?1:-1});a.setState({data:t,isLoading:!1})}).catch(function(e){console.log("Danger, Will Robinson! "+e),a.setState({isLoading:!1})})},a.buildBar=function(e){var t=p.d("#holder").append("svg").attr("viewBox","0 0 1000 600").attr("perserveAspectRatio","xMinYMid").append("g").attr("transform","translate("+1e3/1.75+", 300)");console.log(a.state.data);var n=p.c().range(["#ed5565","#f8ac59","#23c6c8","#1ab394","#1c84c6"]).domain(function(e,t){return a.state.data[t].count}),r=Math.min(1e3,600)/2,c=.3*r,o=Object(b.a)().attr("id","tooltip").offset([100,0]).attr("class","tooltip").html(function(e,t){return"Total Donations: $"+a.state.data[t].total+"<br /># of Donations in Category: "+(a.state.data[t].count?a.state.data[t].count:0)+"<br />"+a.state.data[t].size});t.call(o);var l=p.b().value(function(e){return e.total}).sort(null),i=p.a().innerRadius(c).outerRadius(r);t.selectAll(".oArc").data(l(e)).enter().append("path").attr("fill",function(e,t){return n(t)}).attr("stroke","#5a5a5a").attr("class","oArc").attr("d",i).on("mouseover",o.show).on("mouseout",o.hide),p.c().domain(["< $200","$200.01 - $499.99","$500 - $999.99","$1000 - $1999.99","> $2000"]).range(["#ed5565","#f8ac59","#23c6c8","#1ab394","#1c84c6"]),p.d("#legend").append("svg").attr("viewBox","0 0 300 75").attr("perserveAspectRatio","xMinYMid")},a.state={isLoading:!1,data:{}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(){this.buildBar(this.state.data)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v,{handleSelect:this.handleSelect}),this.state.isLoading?r.a.createElement("h3",{className:"text-primary text-center"},"Data Loading . . ."," "):r.a.createElement("div",null,r.a.createElement("div",{id:"holder"})))}}]),t}(n.Component),O=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("section",null,r.a.createElement("div",{className:"row bg-secondary chartrow"},r.a.createElement("div",{id:"chartbox",className:"bg-white shadow-lg mx-auto"},r.a.createElement(E,null)))))}}]),t}(n.Component),j=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"footer",className:"row bg-dark w-100 text-center py-2"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"h6 text-white text-center"},"\xa9",(new Date).getFullYear()," Megan Bailey || Data provided by"," ",r.a.createElement("a",{className:"text-warning",href:"https://api.open.fec.gov/developers"},"FEC API")))))}}]),t}(n.Component),y=a(101);a.n(y).a.config();var w=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(m,null),r.a.createElement(O,null),r.a.createElement(j,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},51:function(e,t,a){}},[[102,1,2]]]);
//# sourceMappingURL=main.0b1b9760.chunk.js.map