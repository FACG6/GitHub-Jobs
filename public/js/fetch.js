const fetch = (method, url, data, cb) => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        cb(`xhr status${xhr.status}`);
        return;
      }
    } 
    const obj = JSON.parse(xhr.responseText);
    cb(null, obj);
  }

  xhr.open(method, url);
  xhr.send(data);
}

