How to run application:

1. Follow instructions https://reactnative.dev/docs/getting-started to get started with react native
2. Install IntelliJ or Netbeans for the Android Emulator
3. Import project into IDE
4. Edit run configurations: 
    
    a. Select the + sign in the top left corner
    
    b. Select React Native from the dropdown
    
    c. Name the configuration 'run app'
5. Select 'Terminal' at the bottom of the IDE
6. Type 'npm install' and wait for the process to finish
7. Add a device in the AVD manager for your IDE
8. Start the device
9. On the IDE, click the 'Run' icon or press 'Shift + F10'
10. Wait for the application to load on the device.




Troubleshooting:
 
You may run into an issue with Metro, the error may say that the syntax is incorrect.

Navigate to node_modules folder -> metro_config -> src -> defaults -> blacklist.js

replace the sharedBlacklist syntax var with the one below:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
]; 