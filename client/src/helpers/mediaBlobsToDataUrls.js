const mediaBlobToDataUrl = (blobUrl) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = function (ev) {
        reject(
          `Exception reading Blob > xhr.response: ${xhr.response}\nLast Progress Event: ${ev}`
        );
      };
    };
    xhr.onerror = function (ev) {
      reject(
        `Exception fetching Blob > BlobUrl: ${blobUrl}\nLast Progress Event: ${ev}`
      );
    };

    xhr.open("GET", blobUrl);
    xhr.send();
  });
};

// null values will stay null
const mediaBlobsToDataUrls = async (blobUrls) => {
  const dataUrls = await Promise.all(
    blobUrls.map(async (blob) => {
      if (blob === null) return null;
      return await mediaBlobToDataUrl(blob);
    })
  );
  return dataUrls;
};

export default mediaBlobsToDataUrls;
