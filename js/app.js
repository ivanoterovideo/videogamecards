// Gacha System
class GachaSystem {
    constructor() {
        this.collection = [];
    }

    draw() {
        // Logic to randomly draw an item from the collection
        const randomIndex = Math.floor(Math.random() * this.collection.length);
        return this.collection[randomIndex];
    }

    addToCollection(item) {
        this.collection.push(item);
        this.updateLocalStorage();
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('gachaCollection');
        this.collection = data ? JSON.parse(data) : [];
    }

    updateLocalStorage() {
        localStorage.setItem('gachaCollection', JSON.stringify(this.collection));
    }
}

// Collection Management
class CollectionManager {
    constructor(gachaSystem) {
        this.gachaSystem = gachaSystem;
        this.gachaSystem.loadFromLocalStorage();
    }

    filterCollection(criteria) {
        return this.gachaSystem.collection.filter(item => item.matches(criteria));
    }
}

// Example usage:
const gacha = new GachaSystem();
const collectionManager = new CollectionManager(gacha);

// Adding items to collection
gacha.addToCollection({ name: 'Rare Sword', type: 'weapon' });

// Drawing an item
const drawnItem = gacha.draw();
console.log('Drawn Item:', drawnItem);

// Filtering items
const filteredItems = collectionManager.filterCollection(item => item.type === 'weapon');
console.log('Filtered Items:', filteredItems);