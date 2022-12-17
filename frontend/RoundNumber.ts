export default function RoundNumber(num: number, decimal: number) {
    let places = Math.pow(10, decimal);
    return Math.round((num + Number.EPSILON) * places) / places;
}