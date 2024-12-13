
const people = process.argv[2]?.split(",")
const year = process.argv[3]

if (!year || !people) {
    console.log("Usage: node index.js <comma-separated-list> <year>. ")
    console.log("Example: node index.js Alice,Bob,Charlie 2021")
    process.exit()
}

for (let index = 0; index < people.length; index++) {
    const shiftIndex = (((year % (people.length - 1)) + 1) + index) % people.length
    console.log(people[index], "-->", people[shiftIndex])
}
