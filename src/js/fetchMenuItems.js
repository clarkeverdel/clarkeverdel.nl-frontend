require("dotenv").config();

// Will be used to fetch menu items in build phase
// Generates a JSON output that needs to be stored on the server
module.exports = async () => {
  const menuItemsRes = await fetch(
    `${process.env.API_URL}/wp-json/menus/v1/menus/header-menu`,
  ); // gets items from db or api

  const menuItems = await menuItemsRes.json();
  return {
    // cacheable: true,
    code: `module.exports = ${JSON.stringify(menuItems)}`
  }
}
