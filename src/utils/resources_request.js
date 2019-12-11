export const ResourcesRequest = (vpath) => {
  if (vpath === undefined) {
    return '';
  }
  return `https://api.fh.shoogoome.com/resources/${vpath}`;
}
