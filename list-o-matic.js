
updateYears()

const yearElement = document.getElementById('year')
const peopleElement = document.getElementById('people')
const answerElement = document.getElementById("answer")

peopleElement.addEventListener('input', calculate)
yearElement.addEventListener('change', calculate)


function calculate() {
    // calcuate logic here...
    const people = peopleElement
        .value
        .split(/[\n,]+/)
        .map(x => x.trim())
        .filter(x => x !== "")
        .filter(Boolean)

    const year = yearElement.value

    
    const pairs = []

    for (let index = 0; index < people.length; index++) {
        const personTheyHaveForChristmasIndex = (((year % (people.length - 1)) + 1) + index) % people.length
        pairs.push([people[index], people[personTheyHaveForChristmasIndex]])
    }

    if (people.length < 2) {
        answerElement.innerHTML = ""
    } else {
        answerElement.innerHTML = createFormattedString(pairs)
    }
}

function copyToClipboard() {
    const textToCopy = document.getElementById("answer").innerText;
  
    // Copy to clipboard using navigator API
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }


function updateYears() {
    const currentYear = new Date().getFullYear();

    // Get the select element by ID
    const yearSelect = document.getElementById('year');

    // Generate next 10 years starting from the current year
    for (let i = -3; i <= 10; i++) {
        const yearOption = document.createElement('option');
        yearOption.value = currentYear + i;
        yearOption.textContent = currentYear + i;
        yearOption.selected = i == 0

        // Append the option to the select element
        yearSelect.appendChild(yearOption);
    }
}


function createFormattedString(pairs) {
    const longestName = Math.max(...pairs.flat().map(name => name.length));
    const arrow = ' ---> ';
    const formattedLines = pairs.map(([from, to]) => {
      const paddedFrom = from.padEnd(longestName, '\u00A0');
      const paddedTo = to.padEnd(longestName);
      return `${paddedFrom}${arrow}${paddedTo}`;
    });
    return formattedLines.join('<br/>');
  }


