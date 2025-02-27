export default function getRandomNumbers(min: number, max: number, count: number): number[] {
    if (max - min + 1 < count) {
      throw new Error("Range is smaller than the number of requested random numbers.");
    }
  
    const numbers: number[] = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
  
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
  
    return result;
}