import NameSSNHashTable from './index';

test('CRUD Cycle', () => {
    const hashTable = new NameSSNHashTable();
    const testObject = {name: 'Chris Atkinson', ssn: '123-45-6789'}
    expect(hashTable.get('Chris Atkinson')).toBe(undefined);
    hashTable.add(testObject);
    expect(hashTable.get('Chris Atkinson')).toBe('123-45-6789');
    hashTable.update('Chris Atkinson', '000-00-0000');
    expect(hashTable.get('Chris Atkinson')).toBe('000-00-0000');
    hashTable.delete('Chris Atkinson');
    expect(hashTable.get('Chris Atkinson')).toBe(undefined);


});

test('CRUD cycle on collisions (as an example only - good hash tables use hashcodes which have an extremely low probability of collisions, and generally dont allow consumers to define their hash function - I just am too lazy to seek out two objects that happen to have the same hashcode)', () => {
    const hashTable = new NameSSNHashTable((name) => name.substring(0,3));
    const testObject = {name: 'Bat', ssn: '123-45-6789'}
    const collidingObject = {name: 'Batman', ssn: '987-65-4321'}
    expect(hashTable.get('Batman')).toBe(undefined);
    hashTable.add(testObject);
    hashTable.add(collidingObject);
    expect(hashTable.get('Batman')).toBe('987-65-4321');
    hashTable.update('Batman', '000-00-0000');
    expect(hashTable.get('Batman')).toBe('000-00-0000');
    hashTable.delete('Bat');
    expect(hashTable.get('Bat')).toBe(undefined);
    expect(hashTable.get('Batman')).toBe('000-00-0000');
    hashTable.delete('Batman');
    expect(hashTable.get('Batman')).toBe(undefined);

});



