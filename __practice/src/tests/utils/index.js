//
export function descriptor(str) {
  let j = "\n     ⧳ ";
  let top = "";
  let bottom = "\n     ";

  for (let i = -3; i < str.length; i++) {
    top += "▰";
    bottom += "▰";
  }
  let desc = `${top}${j}${str.toUpperCase()}${bottom}`;

  return desc;
}

//
export function itStr(str) {
  let j = "✪ ";
  let desc = j.concat(str);
  return desc;
}


export function logTestResponse(resBody) {
  
    console.log("▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰");
    console.log(" cuerpo de la respuesta\n".toUpperCase());
    console.log(JSON.stringify(resBody));
    console.log("▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰");
}
