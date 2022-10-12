import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeperr {

  // data type below
  // "public" - important so that we can see the Note
  // data type from other files.
  public type Note = {
    title: Text;
    content: Text;
  };

  // List is going to contain Note type
  // we created an array of Note objects
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {

    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));

  };

  public query func readNotes(): async [Note] {
    // Converting the list to an array
    // Thus, reading the notes
    return List.toArray(notes);
  };

  public func removeNote(id: Nat) {
    // take the first <id> - amount - items
    let listFront = List.take(notes, id);
    // drop the first <id + 1> - amount - items
    let listBack = List.drop(notes, id + 1);
    // how to combine them???
    notes := List.append(listFront, listBack);
  };

  // After I made the below update to the code structure, the Note also gets emptied out because 
  // the code got updated. In order to force it to store data, we are going to use - stable there.
  // Debug.print("Bla bla bla");

}

// CRUD method being used here
// Create, Read, Update, and Delete.