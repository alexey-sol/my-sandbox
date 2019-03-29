// node --experimental-modules breadth-first-search.mjs
import { Node, LinkedList } from "./utils";

// I use a linked list here as a storage for items we're searching for. Why?
// Well, we pass through every single item in the list each iteration. Linked
// lists are a way faster than arrays in such a scenario. Also, we don't need
// the random access. So it's pointless to use an array here. Besides, below
// usage of the linked list is pretty close to a queue from the original [1].

// breadthFirstSearch(name: string, graph: IGraph): boolean; // [2]
// Searched for "name" in "graph" which is an object consisting of arrays of
// strings (names).
export default function breadthFirstSearch(name, graph) {
  const searchList = new LinkedList(Node);
  searchList.addToHead(name);
  const searched = []; // persons we've already checked

  while (searchList.head) {
    // If the certain person isn't who we search for, then we add all his/her
    // friends to the end of the "searchList". The person himself is removed
    // from the list in both cases. The "searchList" follows FIFO rule: every
    // time we pull out the 1st item, and add the new item to the end of the
    // list.

    const personName = searchList.removeHead(); // pop the 1st person
    const isSearched = searched.find(name =>
      (name === personName) ? true : false);

    if (!isSearched) { // did we check this person? If we did, ignore him/her
      if (isSeller(personName)) { // we've found a mango seller!
        console.log(`${personName} is who we've searched for!`);
        return true;

      } else { // oh well, add all the neighbours of the person to the list
        addToList( searchList, graph[personName] );
        searched.push(personName);
      }
    }
  }

  return false;

  // isSeller(person: string): boolean;
  function isSeller(personName) {
    // Let's pretend that if "Mango Seller" is part of the person's name, the
    // person is an actual mango seller.
    const isMangoSeller = !!( ~personName.indexOf("Mango Seller") ); // [3]
    return (isMangoSeller) ? true : false;
  }

  // addToList(linkedList: LinkedList, array: string[]): void;
  function addToList(linkedList, array) {
    array.forEach(value => linkedList.addToTail(value));
  }
};

// [1]:
/* # The original implementation from "Grokking Algorithms":

  from collections import deque

  graph = {}
  graph["you"] = ["alice", "bob", "claire"]
  graph["bob"] = ["anuj", "peggy"]
  graph["alice"] = ["peggy"]
  graph["claire"] = ["thom", "jonny"]
  graph["anuj"] = []
  graph["peggy"] = []
  graph["thom"] = []
  graph["jonny"] = []

  def
    person_is_seller(name):
      return name[-1] == "m"

  def search(name):
    search_queue = deque()
    search_queue += graph[name]
    searched = []

    while search_queue:
      person = search_queue.popleft()
      if not person in searched:
        if person_is_seller(person):
          print person + " is a mango seller!"
          return True
        else:
          search_queue += graph[person]
          searched.append(person)

      return False

  search("you")
*/

// [2]: interface IGraph { [key: string]: string[]; }
// [3]: https://learn.javascript.ru/bitwise-operators#proverka-na-1