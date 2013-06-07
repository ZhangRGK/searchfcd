$(function() {
	//初始化
	var cmdArray = new Array();
	cmdArray.push(new command("search",function(strs) {
		console.log("search");
	}));

	cmdArray.push(new command("next",function(strs) {
		//TODO next page
	}));

	cmdArray.push(new command("pre",function(strs) {

	}));

	cmdArray.push(new command("clear",function(strs) {

	}));
	//事件
	$("#cmdline").keypress(function (e){
		if(e.keyCode==13) {
			var input = $(this);
			var commandstr = input.val();
			var strs = commandstr.split(" ");
			for(var i in cmdArray) {
				var cmd = cmdArray[i];
				if(cmd.keyword == strs[0]) {
					cmd.callback(strs);
					input.val("");
				}
			}
			//TODO invoke callback function
			
		}
	});

	//方法
});

var command = function(keyword,callback) {
	this.keyword = keyword;
	this.callback = callback;
}