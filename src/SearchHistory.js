// SearchHistory.js

// Node for the Doubly Linked List
class Node {
  constructor(value) {
    this.value = value; // The book name
    this.prev = null;
    this.next = null;
  }
}

// Doubly Linked List to maintain order
class DoublyLinkedList {
  constructor() {
    this.head = null; // Most recent
    this.tail = null; // Least recent
    this.size = 0;
  }

  // Add a node to the front (most recent)
  addToFront(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
  }

  // Remove a node from the list
  removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    this.size--;
  }

  // Remove the least recent node (tail)
  removeTail() {
    if (!this.tail) return null;
    const tailNode = this.tail;
    this.removeNode(tailNode);
    return tailNode;
  }

  // Convert the list to an array for display
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// SearchHistory class to manage history with a Hash Map and Doubly Linked List
class SearchHistory {
  constructor(maxSize = 5) {
    this.maxSize = maxSize; // Maximum number of history items
    this.list = new DoublyLinkedList();
    this.map = new Map(); // Hash Map to store bookName -> node
  }

  // Add a book to the search history
  add(bookName) {
    // If the book is already in the history, move it to the front
    if (this.map.has(bookName)) {
      const node = this.map.get(bookName);
      this.list.removeNode(node);
      this.list.addToFront(node);
    } else {
      // If the book is not in the history, add it to the front
      const node = new Node(bookName);
      this.list.addToFront(node);
      this.map.set(bookName, node);

      // If the history exceeds the max size, remove the least recent (tail)
      if (this.list.size > this.maxSize) {
        const tailNode = this.list.removeTail();
        if (tailNode) {
          this.map.delete(tailNode.value);
        }
      }
    }

    // Save to localStorage
    this.saveToLocalStorage();
  }

  // Get the search history as an array
  getHistory() {
    return this.list.toArray();
  }

  // Load history from localStorage
  loadFromLocalStorage() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      const historyArray = JSON.parse(history);
      // Rebuild the list in reverse order (most recent first)
      for (let i = historyArray.length - 1; i >= 0; i--) {
        this.add(historyArray[i]);
      }
    }
  }

  // Save history to localStorage
  saveToLocalStorage() {
    const historyArray = this.getHistory();
    localStorage.setItem('searchHistory', JSON.stringify(historyArray));
  }
}

export default SearchHistory;