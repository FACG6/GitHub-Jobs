const fetch = (method, url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        cb(`xhr status${xhr.status}`);
        return;
      }
      console.log('hi')
      const obj = JSON.parse(xhr.responseText);
      cb(null, obj);
    } 
    
  }

  xhr.open(method, url);
  xhr.send(data);
}

