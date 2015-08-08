
console.log("start");
chrome.tabs.query({"active": true}, function(tab){
  var current_tab = tab[0];
  var url = current_tab.url;
  var title = current_tab.title;
  $("li.current_tab span").text(url);
  $("li.current_tab span").attr("data-url", url);
  chrome.contentSettings.javascript.get({"primaryUrl": url+"*"}, function(status){
    $("li.current_tab button").text(turn(status.setting));
    $("li.current_tab button").attr("data-status", status.setting);
    $("li.current_tab button").on("click", change_status);
  });
});
console.log("end");

function change_status(e){
  var target = $(e.target);
  var parent = target.parents("li.current_tab");
  var url = parent.find("span").attr("data-url");
  var status = parent.find("button").attr("data-status");
  var new_status = status=="allow"?"block":"allow";
  chrome.contentSettings.javascript.set({"primaryPattern": url+"*", "setting": new_status}, function(){
    parent.find("button").text(turn(new_status));
    parent.find("button").attr('data-status', new_status);
    chrome.tabs.reload();
  });
}

// better for human read in popup html
function turn(status){
  return status=="allow"?"block":"allow";
}
