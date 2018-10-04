browser.browserAction.disable(sender.tab.id);

// listen for sendMessage() from content script
browser.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // set the icon for the browser action from sendMessage() in content script
    if(request.iconPath40 || request.iconPath20){
      browser.browserAction.setIcon({
        path: {
          "40": request.iconPath40,
          "20": request.iconPath20
        },
        tabId: sender.tab.id
      });
    }

    // if(request.fetch){
    //   fetch(request.fetch, function(data){
    //     browser.runtime.sendMessage({
    //       fetchResult: data
    //     })
    //   })
    // }
  }
);

// function fetch(url, cb){
//   var req = new XMLHttpRequest()
//   req.onreadystatechange = function(){
//     if(this.readyState === 4 && this.status == 200){
//       let json
//       try{
//         json = JSON.parse(this.responseText)
//       }catch(e){
//         console.log("error", e)
//       }
//       cb(json || this.responseText)
//     }
//   }
//   req.open("GET", url)
//   req.send()
// }