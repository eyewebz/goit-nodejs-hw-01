import * as contacts from "./contacts.js";
import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refactor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
    contacts
    .listContacts()
    .then((data) => console.log("Contacts:", data))
    .catch((err) => console.error("Error:", err));
      break;

    case "get":
    contacts
    .getContactById(id)
    .then((contact) => console.log("Contact By Id:", contact))
    .catch((err) => console.log("Error:", err));
      break;

    case "add":
    contacts
    .addContact(name, email, phone)
    .then((newContact) => console.log("New Contact:", newContact))
    .catch((err) => console.log("Error:", err));
      break;

    case "remove":
    contacts
    .removeContact(id)
    .then((removedContact) =>
      console.log("Deleted Contact:", removedContact))
    .catch((err) => console.log("Error:", err));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);