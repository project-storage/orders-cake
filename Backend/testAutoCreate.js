// Test script to verify auto-creation functionality
const { autoCreateAllUsers } = require('./helpers/autoCreateUsers');

async function testAutoCreation() {
  console.log("Testing auto-creation functionality...\n");
  
  try {
    await autoCreateAllUsers();
    console.log("\nAuto-creation test completed successfully!");
  } catch (error) {
    console.error("Auto-creation test failed:", error);
  }
}

// Run the test
testAutoCreation();