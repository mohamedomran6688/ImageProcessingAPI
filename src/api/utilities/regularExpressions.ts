const re =
  /\/resize(\/*?)\?file_name=([-a-zA-Z0-9_.]*)&width=([0-9]*)&height=([0-9]*)/;

// check url is match with re or not
const matchResizeUrl = (url: string): boolean => {
  const matchArry: RegExpMatchArray | null = url.match(re);
  if (matchArry === null) return false;
  if (url !== matchArry[0]) return false;
  return true;
};

export default matchResizeUrl;
