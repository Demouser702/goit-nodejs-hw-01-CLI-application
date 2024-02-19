const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

function listContacts() {
  let contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  console.table(contacts);
}
function addContact(name, email, phone) {
  let contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Contact has been added.");
    }
  });
}
function getContactById(contactID) {
  console.log("Contact ID:", contactID);
  const id = parseInt(contactID);
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const contact = contacts.find((contactPerson) => contactPerson.id === id);
  console.log(contact);
}
function removeContact(contactId) {
  let contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  contacts = contacts.filter((c) => c.id !== contactId);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact with ID ${contactId} has been removed.`);
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
