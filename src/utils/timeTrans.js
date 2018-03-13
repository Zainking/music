function timeTrans ( second ){
  const minute = parseInt(second / 60);
  second = second % 60;
  return `${minute}:${second<10?0:''}${second}`
}
export default timeTrans;
