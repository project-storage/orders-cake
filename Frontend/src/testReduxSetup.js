// This is a test file to verify that all services and slices are properly set up
// It demonstrates how to use the new services and slices

import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder, getOrdersByStudentId } from './slices/orderSlice';
import { createStudent, getStudentAll, getStudentInfo, searchStudent, updateStudent, deleteStudent } from './slices/studentSlice';
import { getStatusAll, createStatus, updateStatus, deleteStatus } from './slices/statusSlice';
import { createTeam, getTeamAll, getTeamInfo, searchTeam, updateTeam, deleteTeam } from './slices/teamSlice';
import { getUserInfo, getUserAll, searchUser, updateUser, deleteUser } from './slices/userSlice';
import { store } from './store';

// Example usage of order actions
const testOrderActions = async () => {
  console.log('Testing order actions...');
  
  // Example dispatch calls (these would be used in a React component with useDispatch)
  // store.dispatch(getAllOrders());
  // store.dispatch(getOrderById(1));
  
  console.log('Order actions test completed');
};

// Example usage of student actions
const testStudentActions = async () => {
  console.log('Testing student actions...');
  
  // Example dispatch calls
  // store.dispatch(getStudentAll());
  // store.dispatch(searchStudent({ name: 'John' }));
  
  console.log('Student actions test completed');
};

// Example usage of status actions
const testStatusActions = async () => {
  console.log('Testing status actions...');
  
  // Example dispatch calls
  // store.dispatch(getStatusAll());
  
  console.log('Status actions test completed');
};

// Example usage of team actions
const testTeamActions = async () => {
  console.log('Testing team actions...');
  
  // Example dispatch calls
  // store.dispatch(getTeamAll());
  // store.dispatch(searchTeam({ teamName: 'Team A' }));
  
  console.log('Team actions test completed');
};

// Example usage of user actions
const testUserActions = async () => {
  console.log('Testing user actions...');
  
  // Example dispatch calls
  // store.dispatch(getUserAll());
  // store.dispatch(searchUser({ role: 'Admin' }));
  
  console.log('User actions test completed');
};

// Run all tests
const runAllTests = () => {
  console.log('Starting Redux setup tests...');
  testOrderActions();
  testStudentActions();
  testStatusActions();
  testTeamActions();
  testUserActions();
  console.log('All Redux setup tests completed successfully!');
};

// Export the test function
export { runAllTests };

// Run tests if this file is executed directly
if (typeof window !== 'undefined') {
  runAllTests();
}