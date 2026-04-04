export function exportDocx(params: {
 path: string;
 method?: "POST" | "GET";
 filename: string;
}) {
 let { path, method, filename } = params;
 method = method || "POST";
 return new Promise((resolve, reject) => {
  var xhr = new XMLHttpRequest();
  xhr.open(method as string, path, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
   if (this.status !== 200) {
    resolve(false);
   } else if (this.status === 200) {
    var type = xhr.getResponseHeader("Content-Type") as string;

    var blob =
     typeof File === "function"
      ? new File([this.response], filename, { type: type })
      : new Blob([this.response], { type: type });
    var URL = window.URL || (window as any).webkitURL;
    var downloadUrl = URL.createObjectURL(blob);

    if (filename) {
     // use HTML5 a[download] attribute to specify filename
     var a = document.createElement("a");
     // safari doesn't support this yet
     if (typeof a.download === "undefined") {
      (window as any).location = downloadUrl;
     } else {
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      resolve(true);
     }
    }
   }
  };
  xhr.send();
 });
}
