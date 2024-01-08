function R(firstNum, secondNum, amount) {
  let newNumArr = [];
  if (firstNum !== secondNum) {
    const num1 = firstNum + "" + secondNum;
    const num2 = secondNum + "" + firstNum;

    newNumArr.push({ num: num1, cost: amount }, { num: num2, cost: amount });
  } else {
    const num = firstNum + "" + secondNum;
    newNumArr.push({ num, cost: amount });
  }

  return newNumArr;
}

function Khwe(selectedNumbers, amount) {
  let newNumArr = [];

  selectedNumbers.map((number) => {
    for (let i = 0; i < 10; i++) {
      const n1 = i + "" + number.num;
      const n2 = number.num + "" + i;

      const reverseN1 = n1.split("").reverse().join("");
      const reverseN2 = n2.split("").reverse().join("");

      // to avoid the duplicate numbers (eg. 88 can't be included twice)
      if (
        n1 === n2 &&
        n1 === reverseN1 &&
        n2 === reverseN2 &&
        reverseN1 === reverseN2
      ) {
        newNumArr.push({ num: n1, cost: amount });
        continue;
      }

      newNumArr.push({ num: n1, cost: amount }, { num: n2, cost: amount });
    }

    return number;
  });

  return newNumArr;
}

function Break(selectedNumbers, amount) {
  let newNumArr = [];
  // let finalNumArr = [];

  selectedNumbers.map((selectedNumber) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let n = String(i + j);
        // if the added(calculated) number ends with selected number, then add to list
        if (n.endsWith(selectedNumber.num)) {
          let num = i + "" + j;
          // let reverseNum = num.split("").reverse().join("");
          // console.log(num, "normal num", reverseNum, "reverse num");

          // to avoid the added number to be R
          // if (!newNumArr.find(n => n.num === num || n.num === reverseNum)) {
          //     newNumArr.push({ num, cost: amount });
          // }
          newNumArr.push({ num, cost: amount });
        }
      }
    }
    return selectedNumber;
  });

  // let newArr = [];
  // newNumArr.map(n => {
  //     let strArr = n.num.split("");
  //     newArr.push(R(strArr[0], strArr[1], amount));
  //     console.log(newArr.flat());
  //     return n;
  // })
  // finalNumArr.push(newArr.flat());

  return newNumArr;
}

function NyiKo(amount) {
  let numArr = [];
  let finalNumArr = [];

  let i = 0;
  while (i < 11) {
    let n = i + "" + ++i;

    if (i - 1 === 8 && i === 9) {
      numArr.push({ num: "89", cost: amount });
      continue;
    }

    if (i - 1 === 9 && i - 2 === 8) {
      numArr.push({ num: "98", cost: amount });
      continue;
    }

    if (i - 1 === 10) {
      numArr.push({ num: "10", cost: amount });
      break;
    }
    numArr.push({ num: n, cost: amount });
  }

  numArr.map((n) => {
    let strArr = n.num.split("");

    if (
      !finalNumArr
        .flat()
        .map((n) => n.num)
        .includes(n.num)
    ) {
      finalNumArr.push(R(strArr[0], strArr[1], amount));
    }

    return n;
  });

  return finalNumArr.flat();
}

function NatKhat(amount) {
  let numArr = [];
  let finalNumArr = [];

  numArr.push(
    { num: "81", cost: amount },
    { num: "96", cost: amount },
    { num: "07", cost: amount },
    { num: "35", cost: amount },
    { num: "72", cost: amount }
  );

  numArr.map((n) => {
    let strArr = n.num.split("");
    finalNumArr.push(R(strArr[0], strArr[1], amount));
    return n;
  });

  //finalNumArr.push(newArr.flat());

  return finalNumArr.flat();
}

function Power(amount) {
  let numArr = [];
  let finalNumArr = [];

  numArr.push(
    { num: "50", cost: amount },
    { num: "49", cost: amount },
    { num: "16", cost: amount },
    { num: "72", cost: amount },
    { num: "38", cost: amount }
  );

  numArr.map((n) => {
    let strArr = n.num.split("");
    finalNumArr.push(R(strArr[0], strArr[1], amount));
    return n;
  });

  return finalNumArr.flat();
}

export { R, Khwe, Break, NyiKo, NatKhat, Power };

// const { selectedNumbers, isR, isKhwe, isBreak, amount } = formData;
//         const lengthOfSelectedNumber = selectedNumbers.length;
//         // console.log(selectedNumbers, "are selected numbers");

//         if (!isR && !isKhwe && !isBreak && lengthOfSelectedNumber === 2) {
//             // Normal
//             const num = selectedNumbers[0].num + "" + selectedNumbers[1].num;
//             console.log(checkIfAlreadyExistsInList(num));
//             setAddedToListNumbers(addedToListNumbers => {
//                 return [...addedToListNumbers, { num, cost: amount }];
//             });
//         }
//         else if (isR && lengthOfSelectedNumber === 2 && !isKhwe && !isBreak) {
//             // R
//             const num1 = selectedNumbers[0].num + "" + selectedNumbers[1].num;
//             const num2 = selectedNumbers[1].num + "" + selectedNumbers[0].num;
//             console.log("Step 2");
//             setAddedToListNumbers(addedToListNumbers => {
//                 return [...addedToListNumbers, { num: num1, cost: amount }, { num: num2, cost: amount }];
//             });
//         }
//         else if (isR && lengthOfSelectedNumber === 2 && !isKhwe && isBreak) {
//             console.log("Step 3");
//             setAddedToListNumbers(addedToListNumbers => {
//                 let prevAddedNumbers = [...addedToListNumbers];

//                 // R
//                 const num1 = selectedNumbers[0].num + "" + selectedNumbers[1].num;
//                 const num2 = selectedNumbers[1].num + "" + selectedNumbers[0].num;
//                 prevAddedNumbers.push({ num: num1, cost: amount }, { num: num2, cost: amount });
//                 console.log(prevAddedNumbers, "Added number");

//                 // Break
//                 let newArr = [];
//                 selectedNumbers.map(selectedNumber => {
//                     for (let i = 0; i < 10; i++) {
//                         for (let j = 0; j < 10; j++) {
//                             let n = String(i + j);
//                             // if the added(calculated) number ends with selected number, then add to list
//                             if (n.endsWith(selectedNumber.num)) {
//                                 let num = i + "" + j;
//                                 let reverseNum = num.split("").reverse().join("");
//                                 // console.log(num, "normal num", reverseNum, "reverse num");

//                                 // to avoid the added number to be R
//                                 if (!newArr.find(n => n.num === num || n.num === reverseNum)) {
//                                     newArr.push({ num, cost: amount });
//                                 }
//                             }
//                         }
//                     }
//                     return selectedNumber;
//                 });
//                 prevAddedNumbers.push(newArr);
//                 return prevAddedNumbers.flat();
//             });
//         }
//         else if (isR && isKhwe && lengthOfSelectedNumber === 2 && !isBreak) {
//             setAddedToListNumbers(addedToListNumbers => {
//                 let prevAddedNumbers = [...addedToListNumbers];

//                 // R
//                 const firstNum = selectedNumbers[0].num;
//                 const secondNum = selectedNumbers[1].num;
//                 const num1 = firstNum + "" + secondNum;
//                 const num2 = secondNum + "" + firstNum;
//                 prevAddedNumbers.push({ num: num1, cost: amount }, { num: num2, cost: amount });
//                 // console.log(prevAddedNumbers, "Added number");

//                 // Khwe
//                 let newArr1 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + firstNum;
//                     const n2 = firstNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr1.find(arr => arr.num === n1)) {
//                         newArr1.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr1.find(arr => arr.num === n2)) {
//                         newArr1.push({ num: n2, cost: amount })
//                     }
//                 }

//                 let newArr2 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + secondNum;
//                     const n2 = secondNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr2.find(arr => arr.num === n1)) {
//                         newArr2.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr2.find(arr => arr.num === n2)) {
//                         newArr2.push({ num: n2, cost: amount });
//                     }
//                 }
//                 prevAddedNumbers.push(newArr1, newArr2);

//                 return prevAddedNumbers.flat();
//             });
//         }
//         else if (isR && isKhwe && lengthOfSelectedNumber === 2 && isBreak) {
//             setAddedToListNumbers(addedToListNumbers => {
//                 let prevAddedNumbers = [...addedToListNumbers];

//                 // R
//                 const firstNum = selectedNumbers[0].num;
//                 const secondNum = selectedNumbers[1].num;
//                 const num1 = firstNum + "" + secondNum;
//                 const num2 = secondNum + "" + firstNum;
//                 prevAddedNumbers.push({ num: num1, cost: amount }, { num: num2, cost: amount });
//                 // console.log(prevAddedNumbers, "Added number");

//                 // Khwe
//                 let newArr1 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + firstNum;
//                     const n2 = firstNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr1.find(arr => arr.num === n1)) {
//                         newArr1.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr1.find(arr => arr.num === n2)) {
//                         newArr1.push({ num: n2, cost: amount })
//                     }
//                 }

//                 let newArr2 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + secondNum;
//                     const n2 = secondNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr2.find(arr => arr.num === n1)) {
//                         newArr2.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr2.find(arr => arr.num === n2)) {
//                         newArr2.push({ num: n2, cost: amount });
//                     }
//                 }

//                 let newArr3 = [];
//                 selectedNumbers.map(selectedNumber => {
//                     for (let i = 0; i < 10; i++) {
//                         for (let j = 0; j < 10; j++) {
//                             let n = String(i + j);

//                             if (n.endsWith(selectedNumber.num)) {
//                                 let num = i + "" + j;
//                                 let reverseNum = num.split("").reverse().join("");
//                                 // console.log(num, "normal num", reverseNum, "reverse num");
//                                 if (!newArr3.find(n => n.num === num || n.num === reverseNum)) {
//                                     newArr3.push({ num, cost: amount });
//                                 }
//                             }
//                         }
//                     }
//                     return selectedNumber;
//                 });
//                 prevAddedNumbers.push(newArr1, newArr2, newArr3);

//                 return prevAddedNumbers.flat();
//             });
//         }
//         else if (!isR && isKhwe && !isBreak) {
//             setAddedToListNumbers(addedToListNumbers => {
//                 let prevAddedNumbers = [...addedToListNumbers];

//                 const firstNum = selectedNumbers[0].num;
//                 const secondNum = selectedNumbers[1].num;
//                 // console.log(prevAddedNumbers, "Added number");

//                 // Khwe
//                 let newArr1 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + firstNum;
//                     const n2 = firstNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr1.find(arr => arr.num === n1)) {
//                         newArr1.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr1.find(arr => arr.num === n2)) {
//                         newArr1.push({ num: n2, cost: amount })
//                     }
//                 }

//                 let newArr2 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + secondNum;
//                     const n2 = secondNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr2.find(arr => arr.num === n1)) {
//                         newArr2.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr2.find(arr => arr.num === n2)) {
//                         newArr2.push({ num: n2, cost: amount });
//                     }
//                 }
//                 prevAddedNumbers.push(newArr1, newArr2);

//                 return prevAddedNumbers.flat();
//             });
//         }
//         else if (!isR && isKhwe && isBreak) {
//             setAddedToListNumbers(addedToListNumbers => {
//                 let prevAddedNumbers = [...addedToListNumbers];

//                 const firstNum = selectedNumbers[0].num;
//                 const secondNum = selectedNumbers[1].num;
//                 // console.log(prevAddedNumbers, "Added number");

//                 // Khwe
//                 let newArr1 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + firstNum;
//                     const n2 = firstNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr1.find(arr => arr.num === n1)) {
//                         newArr1.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr1.find(arr => arr.num === n2)) {
//                         newArr1.push({ num: n2, cost: amount })
//                     }
//                 }

//                 let newArr2 = [];
//                 for (let i = 0; i < 10; i++) {
//                     const n1 = i + "" + secondNum;
//                     const n2 = secondNum + "" + i;

//                     // to avoid the duplicate numbers
//                     if (!newArr2.find(arr => arr.num === n1)) {
//                         newArr2.push({ num: n1, cost: amount });
//                     }
//                     if (!newArr2.find(arr => arr.num === n2)) {
//                         newArr2.push({ num: n2, cost: amount });
//                     }
//                 }

//                 let newArr3 = [];
//                 selectedNumbers.map(selectedNumber => {
//                     for (let i = 0; i < 10; i++) {
//                         for (let j = 0; j < 10; j++) {
//                             let n = String(i + j);

//                             if (n.endsWith(selectedNumber.num)) {
//                                 let num = i + "" + j;
//                                 let reverseNum = num.split("").reverse().join("");
//                                 // console.log(num, "normal num", reverseNum, "reverse num");
//                                 if (!newArr.find(n => n.num === num || n.num === reverseNum)) {
//                                     newArr.push({ num, cost: amount });
//                                 }
//                             }
//                         }
//                     }
//                     return selectedNumber;
//                 });
//                 prevAddedNumbers.push(newArr1, newArr2, newArr3);

//                 return prevAddedNumbers.flat();
//             });
//         }
//         else if (!isR && !isKhwe && isBreak) {
//             // Break
//             setAddedToListNumbers(addedToListNumbers => {
//                 let prevAddedNumbers = [...addedToListNumbers];
//                 let newArr = [];
//                 selectedNumbers.map(selectedNumber => {
//                     for (let i = 0; i < 10; i++) {
//                         for (let j = 0; j < 10; j++) {
//                             let n = String(i + j);

//                             if (n.endsWith(selectedNumber.num)) {
//                                 let num = i + "" + j;
//                                 let reverseNum = num.split("").reverse().join("");
//                                 // console.log(num, "normal num", reverseNum, "reverse num");
//                                 if (!newArr.find(n => n.num === num || n.num === reverseNum)) {
//                                     newArr.push({ num, cost: amount });
//                                 }
//                             }
//                         }
//                     }
//                     return selectedNumber;
//                 });
//                 prevAddedNumbers.push(newArr);

//                 return prevAddedNumbers.flat();
//             })
//         }
