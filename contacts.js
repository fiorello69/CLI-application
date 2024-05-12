import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import pc from "picocolors";

const contactsPath = path.resolve("db/contacts.json");

async function loadContacts() {
  const rawData = await readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(rawData);
}

async function handleError(err) {
  console.log(pc.bgRed("There is an error:"));
  console.error(err);
}

export async function listContacts() {
  try {
    const contacts = await loadContacts();
    console.table(contacts);
  } catch (err) {
    handleError(err);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await loadContacts();

    if (!name || !email || !phone) {
      throw new Error(pc.bgRed("Invalid data provided!"));
    }

    const newContactId = randomUUID();
    const newContact = {
      id: newContactId,
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log(pc.bgGreen("The contact has been created successfully!"));
  } catch (err) {
    handleError(err);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await loadContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error(pc.bgRed("Contact not found!"));
    }
    contacts.splice(index, 1);

    const parsedContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContacts);

    console.log(pc.bgGreen("The contact has been deleted successfully!"));
  } catch (err) {
    handleError(err);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await loadContacts();

    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error(pc.bgRed("Contact not found!"));
    }

    console.log(pc.bgGreen("Contact found:"), JSON.stringify(contact, null, 2));
    return contact;
  } catch (err) {
    handleError(err);
  }
}
