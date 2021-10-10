/**
 * To generate random integer number between min and max values
 * Using in tests to simulate the requested amount of cash
 * 
 * @param {integer} min, the limit for the minimum output value
 * @param {integer} max, the limit for the maximum output value
 * @param {boolean} base10, force output to be divisible by 10 - true by default
 * @returns any amount of money respects the entry restriction
 */
const getRandomAmount=(min, max, base10=true)=> {
    let b10=1;
    if(base10){
        min=min/10;
        max=max/10;
        b10=10;
    }
    return (Math.floor(Math.random() * (max - min + 1)) + min)*b10;
};

/**
 * To get one note value randomly using the list
 * @param {Array} notes, the list of notes
 * @returns any note from the list
 */
const getRandomNote=(notes)=>{
    return notes[Math.floor(Math.random() * notes.length)].v;
};

export { getRandomAmount, getRandomNote };