//code from https://www.thiscodeworks.com/60ba5e962a26a50014a43d70

let countValuesInObj = (obj, value) => {
    let count = 0;
    for (const property in obj) {
      if (typeof obj[property] === "object") {
        count = count + countValuesInObj(obj[property], value);
      }
      if (obj[property] === value) {
        return 1; // count = count + 1; // count++;
      }
    }
    return count;
  };

export { countValuesInObj };