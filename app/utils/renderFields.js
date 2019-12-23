export const normalizePhone = (value) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

export const normalizeZip = (value) => {
  if (!value){
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 5){
    return onlyNums;
  }
}

export const extractNumbers = (value) => {
  if (!value){
    return value
  }
  let extractedValue = value.replace(/[^\d]/g, ''); 

  if (extractedValue) {
 return extractedValue
}
  return ""
}

export const normalizeOccurence = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 2) {
    return onlyNums;
  }
}

export const CombineVisitsObjectByDate = (visitArr) => {
  let visitsObj = visitArr.reduce((r, a) => {
    r[a.visitDate] = r[a.visitDate] || [];
    r[a.visitDate].push(a);
    return r;
}, Object.create(null));

return visitsObj;
}

export const changeToDecimal = (text , n) => {
  
  if(text.length < n){
    return extractNumbers(text)
  }else if(text.length >= n && text[n-1]!=="."){
    let updatedText = text.slice(0, -(text.length - (n-1)))
    return extractNumbers(updatedText)
  }
  let splitString = text.split('.')
  return extractNumbers(splitString[0]) + "."+extractNumbers(splitString[1])
  
}

export const changeToWeightDecimal = text => {
  let value = text && text.length > 2 && text[2] === '.'?changeToDecimal(text,3):changeToDecimal(text,4)
  return value
}


export const extractNumbersAndDot = (value) => {
  if (!value){
    return value
  }
  let extractedValue = value.replace(/[^\d.]/g, ''); 

  if (extractedValue) {
 return extractedValue
}
  return ""
}
