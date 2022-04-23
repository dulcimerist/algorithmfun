import hash from 'object-hash';

export default class NameSSNHashTable {
    constructor (hashFunction = (name) => { return hash(name)}) {
        this.hashFunction = hashFunction;
        this.table = [];
    }

    add({name, ssn}) {
        if (!this.table[this.hashFunction(name)]) {
            this.table[this.hashFunction(name)] = {value: {name: name, ssn: ssn}};
        } else {
            //Not a pointer to a different index, just building on the object within that index
            this.table[this.hashFunction(name)].next = {value: {name: name, ssn: ssn}, next: this.table[this.hashFunction(name)].next}
        }
    }

    get(name) {
        const matchingRecord = this.#findValue(name)
        if (!matchingRecord) {
            return undefined;
        } else {
            return matchingRecord?.value?.ssn;
        }
    }

    #findValue(name) {
        let currentIndex = this.table[this.hashFunction(name)];
        while (currentIndex?.value?.name !== name && currentIndex?.value?.name !== undefined) {
            currentIndex = currentIndex?.next;
        }
        if (!currentIndex) {
            return undefined;
        } else {
            return currentIndex;
        }
    }

    update(name, ssn) {
        this.#findValue(name).value.ssn = ssn;
    }

    delete(name) {
        // For whatever reason, `this.#findValue(name) = this.#findValue(name).next` didn't work here. wat. 
        // Pass by reference, but only kind of and only sometimes (arrays + objects, kinda). Thanks JS
        let currentIndex = this.#findValue(name);
        if (currentIndex?.next !== undefined) {
            currentIndex.value = currentIndex.next?.value;
            currentIndex.next = currentIndex.next?.next;
        }
        else {
            currentIndex.value = undefined;
            currentIndex.next = undefined;
        }

        
    }
}