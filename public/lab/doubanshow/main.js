"use strict";

function refreshCover(douban_id){
	var douban="http://t.douban.com";

	if(document.getElementById("douban_ra")===null){
        var ele = document.createElement('div');
        ele.id = "douban_ra";
		document.body.appendChild(ele);
	}
    var scriptEle = document.createElement('script');
    scriptEle.id = 'script';
    scriptEle.src = "http://api.douban.com/people/"+douban_id+"/favsongs?max-results=50&alt=xd&callback=db_success&apikey=0f85e9acfb703eb32e91bd06f250bc19";
	document.getElementsByTagName('head')[0].appendChild(scriptEle);
}

function db_success(c){
	var d=c.entry,b='<ul>';
	for(var a=0;a<d.length;a++){
		var str=d[a].cover.$t;
		str=str.replace(/mpic/, "lpic");
		b+='<li><a target="_blank" href="'+d[a].subject_url.$t+'"><span>'+d[a].title.$t+'</br></br><small>'+d[a].artist.$t+'</small></br></br><small>'+d[a].album.$t+'</small></span><img src="'+str+'" class="blur"/></a>';
		b+="</li>";
	}
	b+="</ul>";
	b+='<div class="dbbottom"><a target="_blank" href="http://douban.fm">Powered by Douban.FM</a>&nbsp;&nbsp;<a target="_blank" href="http://cyrilis.com">返回首页 Cyril IS</a> &nbsp; Copyricht @ 2012</div>';
	document.getElementById("douban_ra").innerHTML=b;
    var link = document.getElementById("user_link");
    var userName = c.title.$t.slice(0,-4);
    link.href = "http://www.douban.com/people/"+ (window.douban_id||window.db_doubanid);
    link.innerText = userName || window.db_doubanid;
}

refreshCover(window.db_doubanid);

function refreshCover_btn(){
    window.douban_id = document.getElementsByName('id')[0].value;
    refreshCover(window.douban_id);
}