function printData<T>(data: T): T {
  return data;
}


const numberValue = printData<number>(500);
const stringValue = printData<string>("TypeScript");
const booleanValue = printData<boolean>(true);


console.log(numberValue);
console.log(stringValue);
console.log(booleanValue);