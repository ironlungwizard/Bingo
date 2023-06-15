const baseUrl = process.env.REACT_APP_DB_URL
export function transportDELETE (path: string) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${baseUrl}${path}`, true);
    xhr.responseType = "json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(''))
    xhr.onload = function () {
      if (this.status == 403) {
        xhr.open("GET", `${baseUrl}auth/refresh`, true);
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(''))
        xhr.onload = function () {
          xhr.open("DELETE", `${baseUrl}${path}`, true);
          xhr.responseType = "json";
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(''))
          xhr.onload = function () {
            resolve({
              data: this.response,
            });
          }
        }
      } else {
        resolve({
          data: this.response,
        });
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
  });
};

export function transportGET (path: string) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${baseUrl}${path}`, true);
    xhr.responseType = "json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(''))
    xhr.onload = function () {
      if (this.status == 403) {
        xhr.open("GET", `${baseUrl}auth/refresh`, true);
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(''))
        xhr.onload = function () {
          xhr.open("GET", `${baseUrl}${path}`, true);
          xhr.responseType = "json";
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(''))
          xhr.onload = function () {
            resolve({
              data: this.response,
            });
          }
        }
      } else {
        resolve({
          data: this.response,
        });
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
  });
};

export function transportPUT (path: string, body: object) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `${baseUrl}${path}`, true);
    xhr.responseType = "json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body))
    xhr.onload = function () {
      if (this.status == 403) {
        xhr.open("GET", `${baseUrl}auth/refresh`, true);
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(''))
        xhr.onload = function () {
          xhr.open("PUT", `${baseUrl}${path}`, true);
          xhr.responseType = "json";
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(body))
          xhr.onload = function () {
            resolve({
              data: this.response,
            });
          }
        }
      } else {
        resolve({
          data: this.response,
        });
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
  });
};

export function transportPOST (path: string, body: object) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${baseUrl}${path}`, true);
    xhr.responseType = "json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body))
    xhr.onload = function () {
      if (this.status == 403) {
        xhr.open("GET", `${baseUrl}auth/refresh`, true);
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(''))
        xhr.onload = function () {
          xhr.open("POST", `${baseUrl}${path}`, true);
          xhr.responseType = "json";
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(body))
          xhr.onload = function () {
            resolve({
              data: this.response,
            });
          }
        }
      } else {
        resolve({
          data: this.response,
        });
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
  });
};




export async function transportPOSTold(path: string, body: object) {
  let response = await fetch(`${baseUrl}${path}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
              body
          ),
          credentials: 'include'
        })
        const result = await (response).json();
        //console.log('POST', {path})
        return result    
}

export async function transportPUTold(path: string, body: object) {
  let response = await fetch(`${baseUrl}${path}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
              body
          ),
          credentials: 'include'
        })
        const result = await (response).json();
        //console.log('PUT', {path})
        return result    
}

export async function transportGETold (path: string) {
  let response = await fetch(`${baseUrl}${path}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })
        const result = await (response).json();
        //console.log('GET', {path})
        return result    
}

export async function transportDELETEold (path: string) {
  let response = await fetch(`${baseUrl}${path}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })
        const result = await (response).json();
        //console.log('DELETE', {path})
        return result    
}





