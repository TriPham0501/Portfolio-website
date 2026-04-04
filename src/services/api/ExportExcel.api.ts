import { API_URL, CONFIG } from "../../appconfig";
import { get } from "./index";

export type KeyValue = {
  key: string;
  value: any;
  merge?: number;
};
export function exportExcelapi(
  columns: Array<KeyValue>,
  values: Array<KeyValue[]>,
  chart?: { title: string; datas: Array<KeyValue> },
  contents?: string[]
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", CONFIG.excelService + "/MauBaoCao/inphieubaocao", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      if (this.status !== 200) {
        resolve(false);
      } else if (this.status === 200) {
        var filename = "";
        var disposition = xhr.getResponseHeader("Content-Disposition");
        if (disposition && disposition.indexOf("attachment") !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }
        var type = xhr.getResponseHeader("Content-Type") as string;

        var blob =
          typeof File === "function"
            ? new File([this.response], filename, { type: type })
            : new Blob([this.response], { type: type });
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          window.navigator.msSaveBlob(blob, filename);
        } else {
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
            }
          } else {
            (window as any).location = downloadUrl;
          }
          resolve(true);
        }
      }
    };
    xhr.send(JSON.stringify({ columns, values, chart, contents }));
  });
}
export async function exportExcelMauQuanTracTheoThoiGian(
  from: string,
  to: string
): Promise<any> {
  try {
    let url = `${API_URL}/chat-luong-nuoc/mau-quan-trac-theo-thoi-gian?from=${from}&to=${to}`;
    var response = await get(url);

    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}
