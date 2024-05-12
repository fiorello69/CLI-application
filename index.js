import { Command } from "commander";
import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} from "./contacts.js";
import pc from "picocolors";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn(pc.red("\x1B[31m Unknown action type!"));
      console.log(pc.bgGreen("Available actions:"));
      console.log("- node index.js -a list /List all contacts.");
      console.log("- node index.js -a get -i id /Get contact by ID.");
      console.log(
        '- node index.js -a add -n "name" -e "email" -p "phone" /Add a new contact. (Please use "")'
      );
      console.log("- node index.js -a remove -i id /Remove contact by ID.");
  }
}

invokeAction(argv);
