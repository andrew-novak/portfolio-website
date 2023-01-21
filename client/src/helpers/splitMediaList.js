/*
Returns two arrays with a length of the mediaArray each.
If one index has a value assigned, then its equivalent
in the other array should be null.
A value should be always in one array or the other,
never in both or none.

mediaArray argument example:
[
  { serverFilename: "232323.png", clientBlob: null },
  { serverFilename: "587645.jpg", clientBlob: null },
  { serverFilename: null, clientBlob: "blob:http://localhost....." },
]

function output example:
{
  serverFilenames: [
    "232323.png",
    "587645.jpg",
    null,
  ],
  clientBlobs: [
    null,
    null,
    "blob:http://localhost....."
  ]
}
*/
const splitMediaList = (mediaList) => {
  /*
  Old:
  return mediaArray.reduce(
    (accumulator, obj) => {
      return {
        serverFilenames: [...accumulator.serverFilenames, obj.serverFilename],
        clientBlobs: [...accumulator.clientBlobs, obj.clientBlob],
      };
    },
    // default:
    { serverFilenames: [], clientBlobs: [] }
  );
  */
  return mediaList.reduce(
    (accumulator, obj, index) => {
      for (let key of Object.keys(obj)) {
        // Create the accumulator array property related
        // to the key if it doesn't exist yet.
        // The created array will be null-filled and with
        // length equal to the length of mediaList.
        // e.g. accumulator.serverFilenames = [null, null, null];
        if (!accumulator[key + "s"]) {
          accumulator[key + "s"] = new Array(mediaList.length).fill(null);
        }

        accumulator[key + "s"][index] = mediaList[index][key];
        return accumulator;
      }
    },
    // default accumulator:
    {}
  );
};

export default splitMediaList;
