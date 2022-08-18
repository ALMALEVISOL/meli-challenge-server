//TODO ADM implement chain functions, we need to change prototype

const toCamelCaseArray = (words) => {
  if (words === undefined || words === null) return "";
  if (!Array.isArray(words))
    return words[0].toUpperCase() + words.substring(1, words.length);
  let a = "";
  for (let yy = 0; yy < words.length; yy++) {
    if (words[yy] === "") {
      continue;
    }
    a += words[yy][0].toUpperCase() + words[yy].substring(1, words[yy].length);
  }
  return a;
};

const getOnlyLetters = (string) => {
  return string.replace(/[^a-zA-Z]/g, "");
};

const sanitizeLowerCase = (string) => {
  return string
    .toLowerCase()
    .replaceAll("®", "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z ]/g, "");
};

const sanitize = (string) => {
  return string
    .replaceAll("®", "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z ]/g, "");
};

const searchInsideArray = (
  arrayTo,
  keyToSearch,
  valueToSearch,
  nameMustSplit
) => {
  return arrayTo.find((element) =>
    nameMustSplit
      ? element[keyToSearch].split("|")[0] === valueToSearch
      : element[keyToSearch] === valueToSearch
  );
};

const traverseArray = (arrayTo, keyToSearch, valueToSearch, isImage) => {
  let itemFound = null;
  for (let x = 0; x < arrayTo.length; x++) {
    if (itemFound) return itemFound;
    if (arrayTo[x][keyToSearch].toLowerCase().trim() === valueToSearch) {
      itemFound = isImage ? arrayTo[x] : arrayTo[x]["characters"].trim();
      break;
    } else if (
      arrayTo[x].children &&
      arrayTo[x].children.length > 0 &&
      !itemFound
    ) {
      itemFound = traverseArray(
        arrayTo[x].children,
        keyToSearch,
        valueToSearch,
        isImage
      );
      if (itemFound) break;
    } else if (itemFound) {
      return itemFound;
    } else {
      continue;
    }
  }
  if (itemFound) return itemFound;
};

const isEmpty = (somethingToProcess) => {
  if (somethingToProcess === null || somethingToProcess === undefined)
    return true;
  if (
    somethingToProcess instanceof Object &&
    somethingToProcess.constructor === Object
  ) {
    return (
      Object.keys(somethingToProcess).length === 0 &&
      somethingToProcess.constructor === Object
    );
  }
  if (somethingToProcess instanceof String) {
    return somethingToProcess.length === 0;
  }
  return Array.isArray(somethingToProcess) && somethingToProcess.length <= 0;
};

const findFirstNumberInString = (stringToProcess) => {
  const r = /\d+/;
  return stringToProcess.match(r)[0];
};

const isEmailValid = (email) => {
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  const valid = emailRegex.test(email);
  if (!valid) return false;

  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;
  return true;
};

module.exports = { isEmpty, findFirstNumberInString, sanitize, traverseArray, isEmailValid };
