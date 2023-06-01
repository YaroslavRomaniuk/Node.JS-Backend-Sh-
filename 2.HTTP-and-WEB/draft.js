let string = `GET /doc/test.html HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

/**
 * Parses a TCP string representation of an HTTP request and returns an object containing the parsed data.
 * @param {string} string - The TCP string representation of the HTTP request.
 * @returns {object} - An object containing the parsed data of the HTTP request.
 */
function parseTcpStringAsHttpRequest(string) {
  let methodData,
    uriData,
    headersData = {},
    bodyData,
    key,
    value;

  let bufferArray = string.split('\n');
  let startLine = bufferArray[0].split(' ');

  // Extract the method and URI from the start line
  methodData = startLine[0];
  uriData = startLine[1];

  // Iterate through the remaining lines to extract headers data
  for (let i = 1; i < bufferArray.length; i++) {
    let bufferStringArray;
    if (bufferArray[i].includes(":")) {
      bufferStringArray = bufferArray[i].split(": ");
      key = bufferStringArray[0];
      value = bufferStringArray[1];
      headersData[key] = value;
    }
  }

  // Check if the last line contains the body data
  if (!bufferArray[bufferArray.length - 1].includes(":")) {
    bodyData = bufferArray[bufferArray.length - 1];
  }

  console.log(headersData);

  return {
    method: methodData,
    uri: uriData,
    headers: headersData,
    body: bodyData,
  };
}

let test = parseTcpStringAsHttpRequest(string);
console.log(test);
