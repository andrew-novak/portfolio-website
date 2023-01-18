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
const splitMedia = (mediaArray) => {
  return mediaArray.reduce(
    (accumulator, obj) => {
      return {
        serverFilenames: [...accumulator.serverFilenames, obj.serverFilename],
        clientBlobs: [...accumulator.clientBlobs, obj.clientBlob],
      };
    },
    { serverFilenames: [], clientBlobs: [] }
  );
};

export default splitMedia;
