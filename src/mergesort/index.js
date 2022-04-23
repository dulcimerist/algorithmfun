export default function mergesort(unsortedArray) {
    return merge(unsortedArray,0,unsortedArray.length - 1);
}

function merge(array, startIndex, endIndex) {
    if (startIndex === endIndex) {
        return [array[startIndex]];
    } else {
        let sortedArray = [];
        const midpoint = startIndex + Math.trunc((endIndex - startIndex) / 2);
        if (midpoint >= 0 && endIndex >= 0) {
    }
        const left = merge(array, startIndex, midpoint);
        const right = merge(array, midpoint + 1, endIndex);
        while (left.length > 0 && right.length > 0) {
            if (left[0] < right[0]) {
                sortedArray.push(left.shift());
            } else {
                sortedArray.push(right.shift());
            }
        }
        return sortedArray.concat(left).concat(right);
    }
}