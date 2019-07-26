export function isvalidPhone(str) {
    const reg = /^1[34578][0-9]\d{8}$/
    return reg.test(str)
};
export function isvalidIDCard(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
};
export function isvalidPay(low, high, pay) {
  low = Number(low);
  high = Number(high);
  pay = Number(pay);
  return (pay!=null && pay>=low && pay <=high)
}
