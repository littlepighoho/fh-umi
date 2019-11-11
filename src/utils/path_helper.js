
import { Base64 } from 'js-base64';


export const buildResourcePath = (vpath) => {
  if (!vpath) return null;
  const bpath = Base64.encode(vpath);
  // console.log(bpath);
  const h = bpath.replace('/', '*');
  const p = h.replace('+', '-');
  return `https://api.fh.shoogoome.com/resources/${vpath}`;
}