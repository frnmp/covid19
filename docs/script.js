var all_data=[],statewise={},maxConfirmed=0,lastUpdated="",confirmed_delta=0,deaths_delta=0,recovered_delta=0,states_delta=0;let total={};var stateWiseTableData,sort_order,key_values=0,numStatesInfected=0,sort_field=0,table_columns=[{key:"state",display_name:"State"},{key:"confirmed",display_name:"Confirmed"},{key:"recovered",display_name:"Recovered"},{key:"deaths",display_name:"Deaths"},{key:"active",display_name:"Active"}];function constructTweetButton(){var e=(new Date).toLocaleString("en-US",{timeZone:"Asia/Kolkata"});let t=(e=new Date(e)).toLocaleString();key_values.confirmeddelta,key_values.recovereddelta;const a=`COVID-19 India : 📊 as of ${t} IST\n    Total Confirmed : ${total.confirmed}\n    Total Recovered : ${total.recovered}\n    Total Deceased  : ${total.deaths}\n\n    Number of cases reported today: ${Math.abs(key_values.confirmeddelta)}\n\n    Follow @covid19indiaorg\n\n    #COVID19India #SocialDistancing\n    More @`;jQuery("#twitter_share").attr("data-text",a),jQuery("#twitter_share").addClass("twitter-share-button");try{twttr.widgets.load()}catch(e){console.log(e)}}function is_touch_device(){try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}}function initMapStuff(){var e=L.map("map").setView([22.5,82],3);e.setMaxBounds(e.getBounds()),e.setView([22.5,82],4),is_touch_device()&&(e.dragging.disable(),e.tap.disable()),L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhZmVlcS1ldCIsImEiOiJjazgwZ2Jta20wZ2lxM2tsbjBmbnpsNGQyIn0.JyWxwnlx0oDopQ8JWM8YZA",{maxZoom:6,minZoom:4,id:"mapbox/light-v9",tileSize:512,zoomOffset:-1}).addTo(e);var t,a=L.control();function o(e){t.resetStyle(),a.update();var o=e.target;o.setStyle({weight:1,color:"#000000",dashArray:""}),L.Browser.ie||L.Browser.opera||L.Browser.edge||o.bringToFront(),a.update(o.feature.properties)}function r(e){t.resetStyle(e.target),a.update()}a.onAdd=function(e){return this._div=L.DomUtil.create("div","info"),this.update(),this._div},a.update=function(e){e&&(this._div.innerHTML="<h4>"+e.NAME_1+"</h4><pre>Confirmed: "+statewise[e.NAME_1].confirmed+"<br>Recovered: "+statewise[e.NAME_1].recovered+"<br>Deaths   : "+statewise[e.NAME_1].deaths+"<br>Active   : "+statewise[e.NAME_1].active+"</pre>")},a.addTo(e),t=L.geoJson(statesData,{style:function(e){var t=0;return statewise[e.properties.NAME_1]&&(t=statewise[e.properties.NAME_1].confirmed),{weight:1,opacity:1,color:"#bfbfbf",fillOpacity:.05*(t>0)+t/maxConfirmed*.9,fillColor:"red"}},onEachFeature:function(e,t){t.on({mouseover:o,mouseout:r,click:o})}}).addTo(e)}function getLocalTime(e){try{let t=new Date(e.replace("at ","")+" GMT+530");return isNaN(t)?e:moment(+t).from()}catch(t){return e}}function constructTable(e){var t="<thead>";return t+="<tr>",table_columns.forEach((function(e,a){t+="<th><a href='' col_id='"+a+"' onclick='sort(this,event)'>"+e.display_name+"</a></th>"})),t+="</tr></thead><tbody>",e.forEach((e,a)=>{"Total"!==e.state&&(t+="<tr>",table_columns.forEach(a=>{parseInt(e.confirmed)>0&&(t+="<td>"+e[a.key]+"</td>")}),t+="</tr>")}),t+='<tr class="totals">',table_columns.forEach(e=>{t+="<td>"+total[e.key]+"</td>"}),t+="</tr></tbody",$("table#prefectures-table").html(t),t}function sort(e,t){t.stopPropagation(),t.preventDefault();const a=$(e).attr("col_id");var o=stateWiseTableData.splice(0,1);(sort_order=a==sort_field?sort_order:void 0)||(sort_order=0==a?"A":"D");const r=table_columns[a].key;stateWiseTableData.sort((e,t)=>{let a=e[r],o=t[r];return"state"!=r&&(a=parseInt(a),o=parseInt(o)),"D"==sort_order?a>o?-1:1:a>o?1:-1}),stateWiseTableData.unshift(o[0]),sort_field=a,sort_order="A"==sort_order?"D":"A",constructTable(stateWiseTableData)}$.getJSON("https://api.covid19india.org/data.json",(function(e){stateWiseTableData=e.statewise,key_values=e.key_values[0],stateWiseTableData.forEach(e=>{e.active=parseInt(e.active),e.confirmed=parseInt(e.confirmed),e.deaths=parseInt(e.deaths),e.recovered=parseInt(e.recovered),"Total"===e.state?total=e:(e.confirmed>0&&numStatesInfected++,maxConfirmed=e.confirmed>maxConfirmed?e.confirmed:maxConfirmed,console.log(maxConfirmed),statewise[e.state]=e)}),tablehtml=constructTable(stateWiseTableData),$("div#states-value").html(numStatesInfected),$("div#confvalue").html(total.confirmed),$("div#deathsvalue").html(total.deaths),$("div#recoveredvalue").html(total.recovered),$("strong#last-updated").html(getLocalTime(lastupdatedtime)),key_values.confirmeddelta&&$("div#confirmed_delta").html("( +"+key_values.confirmeddelta+")"),key_values.deceaseddelta&&$("div#deaths_delta").html("( +"+key_values.deceaseddelta+")"),key_values.recovereddelta&&$("div#recovered_delta").html("( +"+key_values.recovereddelta+")"),key_values.statesdelta&&$("div#states_delta").html("( +"+key_values.statesdelta+")"),initMapStuff(),constructTweetButton()}));
