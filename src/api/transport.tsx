import { refreshFetch } from "./auth";




// export async function transportPOST1(path: string, body: object) {
//   let response = await fetch(`http://localhost:8080/${path}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(
//                 body
//             ),
//             credentials: 'include'
//           }).then(response => {
//             if (response.status === 403) {
//             refreshFetch().then(async Response => {
//           let response = await fetch(`http://localhost:8080/${path}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(
//                     body
//                 ),
//                 credentials: 'include'
//               }).then(response => (response).json())
//               .then (result =>  {return result})
//           }) 
//         }
//         })
//         }   


// export async function transportPOST4(path: string, body: object) {
//     await fetch(`http://localhost:8080/${path}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(
//               body
//           ),
//           credentials: 'include'
//         }
//         ).then(async response => {
//           if (response.status === 403) {
//              throw new Error('403 is unacceptable for me!');
//           } else {
//             const result = await (response).json();
//             console.log('regular', result)
//             return result
//           }
//           }).catch( e => {
//                     refreshFetch().then(async Response => {
//                       const response: any = await fetch(`http://localhost:8080/${path}`, {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify(
//                                 body
//                             ),
//                             credentials: 'include'
//                           })
//                           const result = await (response).json();
//                           console.log('catch', result, e)
//                           return result
//                       }) 
      
      
//       })       
// }

export async function transportPOSTold(path: string, body: object) {
  let response = await fetch(`http://localhost:8080/${path}`, {
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
  let response = await fetch(`http://localhost:8080/${path}`, {
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
  let response = await fetch(`http://localhost:8080/${path}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })
        const result = await (response).json();
        //console.log('GET', {path})
        return result    
}

export async function transportDELETE(path: string) {
  let response = await fetch(`http://localhost:8080/${path}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })
        const result = await (response).json();
        //console.log('DELETE', {path})
        return result    
}


export function transportGET (path: string) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:8080/${path}`, true);
    xhr.responseType = "json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(''))
    xhr.onload = function () {
      if (this.status == 403) {
        refreshFetch().then(async Response => {
          xhr.open("GET", `http://localhost:8080/${path}`, true);
          xhr.responseType = "json";
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(''))
          xhr.onload = function () {
            resolve({
              data: this.response,
            });
          }
        })
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
    xhr.open("PUT", `http://localhost:8080/${path}`, true);
    xhr.responseType = "json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body))
    xhr.onload = function () {
      if (this.status == 403) {
        refreshFetch().then(async Response => {
          xhr.open("POST", `http://localhost:8080/${path}`, true);
          xhr.responseType = "json";
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(body))
          xhr.onload = function () {
            resolve({
              data: this.response,
            });
          }
        })
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

export function transportPOST(path: string, body: object) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", `http://localhost:8080/${path}`, true);
      xhr.responseType = "json";
      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(body))
      xhr.onload = function () {
        if (this.status == 403) {
          refreshFetch().then(async Response => {
            xhr.open("POST", `http://localhost:8080/${path}`, true);
            xhr.responseType = "json";
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body))
            xhr.onload = function () {
              resolve({
                data: this.response,
              });
            }
          })
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




// export async function transportPOST1(path: string, body: object) {
//     const response: any = await fetch(`http://localhost:8080/${path}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(
//                     body
//                 ),
//                 credentials: 'include'
//               }
//               ).then(response => {

//     if (!response.ok && response.status === 403) {
//      console.log(response.status);
//      console.log((response).json());
//      refreshFetch().then(async Response => {
//       const response = await fetch(`http://localhost:8080/${path}`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(
//                         body
//                     ),
//                     credentials: 'include'
//                   })
//                   const result = await (response).json();
//                   console.log(1,result )
//                   return result
//      })
//   } else {
//     const result = (response).json();
//     console.log(2,result )
//     return result
//   }
// })
// } 




// export async function transportPOST(path: string, body: object) {
//   try {
//   let response = await fetch(`http://localhost:8080/${path}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(
//               body
//           ),
//           credentials: 'include'
//         })
//         if (!response.ok) {
//           throw new Error(`Error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         return result;
//       } catch (err) {
//           refreshFetch().then(async Response => {
//             let response = await fetch(`http://localhost:8080/${path}`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(
//                   body
//               ),
//               credentials: 'include'
//             })
//             const result = await (response).json();
//             console.log(1,result )
//             return result
//           })    
//         console.log(err);
//       }
//     }

// export async function preTransportPOST(path: string, body: object) {
//   transportPOST(path, body).then(Response => {
//     if (Response.status === 403) {
//       refreshFetch().then(async Response => {
//         let response = await fetch(`http://localhost:8080/${path}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(
//               body
//           ),
//           credentials: 'include'
//         })
//         const result = await (response).json();
//         console.log(1,result )
//         return result
//       })
//     } else {
//       console.log(2,Response )
//       return Response  
//     }       
// })}



  // let response = await fetch(`http://localhost:8080/${path}`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(
  //             body
  //         ),
  //         credentials: 'include'
  //       })
  //       const result = await (response).json();
  //       if (response.status === 403) {
  //         refreshFetch().then(async Response => {
  //           let response = await fetch(`http://localhost:8080/${path}`, {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify(
  //                 body
  //             ),
  //             credentials: 'include'
  //           })
  //           const result = await (response).json();
  //           console.log(1,result )
  //           return result
  //         })
  //       } else {
  //         console.log(2,result )
  //         return result  
  //       }       


  


  